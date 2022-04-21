<template>
  <base-card>
    <InputSection 
      @fetchApi="fetchApi"
    />
    <div>
      <DataSection 
        :fetchedInfo="cryptoInfo"
        :apiMethodInfo="apiData"
        :isLoading="isLoading"
        :stockLoadingError="stockLoadingError"
        :loadInfoContainer="loadInfoContainer"
        :dataSectionStyle="dataSectionStyle"
      />      
    </div>
  </base-card>
  <RecentlyViewedArea
    :recentlyViewedArr="recentlyViewedItems"
    :dataSectionStyle="dataSectionStyle"
    :deleteRecent="deleteRecent"
  />
</template>

<script>

import InputSection from '@/components/Input-section.vue'
import DataSection from '@/components/Data-section.vue'
import RecentlyViewedArea from '@/components/additionalAdds/Recently-viewed.vue'

export default {
  name: 'CryptoSection',
  components: {
    InputSection,
    DataSection,
    RecentlyViewedArea
  },
  data () {
    return {
      VUE_APP_APIKEY: process.env.VUE_APP_APIKEY,
      apiData: null,
      apiDataDaily: null,
      apiInfo: {
        timeSeries: null,
        recentTime: null,
        metaData: null
      },
      cryptoInfo: {
        openPrice: '',
        closePrice: '',
        highPrice: '',
        lowPrice: '',
        volume: '',
        ticker: '',
        rawTicker: null,
        stockPerformance: null,
        percentChange: null, 
        priceChange: null
      },
      // DATA FOR UI ELEMENTS LOADING
      loadInfoContainer: false,
      stockLoadingError: false,
      isLoading: false,
      // DATA RELATED TO RECENTLY VIEWED SECTION IN UI
      recentlyViewed: [],
      // DYNAMIC STYLING
      dataSectionStyle: 'crypto-container'
    }
  },
  computed: {
    recentlyViewedItems: function () {
      return [...this.recentlyViewed].reverse().slice(0, 3)
    },

    tickerComputed: function () {
      return '$' + this.apiData[this.apiInfo.metaData]['2. Digital Currency Code']
    },

    openPriceComputed: function () {
      return Number(Object.values(this.apiDataDaily[Object.keys(this.apiDataDaily)[1]])[0]['1a. open (USD)']).toFixed(4)
    },

    closePriceComputed: function () {
      return Number(Object.values(this.apiDataDaily[Object.keys(this.apiDataDaily)[1]])[0]['4a. close (USD)']).toFixed(4)
    },
    
    highestPriceComputed: function () {
      const max = Object.values(this.apiData[this.apiInfo.timeSeries]).map((values) => values['2. high'])
      const highestPrice = Math.max(...max)
      return highestPrice.toFixed(4)
    },

    lowestPriceComputed: function () {
      const min = Object.values(this.apiData[this.apiInfo.timeSeries]).map((values) => values['3. low'])
      const minPrice = Math.min(...min)
      return minPrice.toFixed(4)
    },

    totalVolumeComputed: function () {
      const volumes = Object.values(this.apiData[this.apiInfo.timeSeries]).map((values) => values['5. volume'])

      const totalVolume = volumes.reduce((acc, volume) => { return acc + volume},0)
      return totalVolume.toLocaleString()
    },

    percentChangeComputed: function () {
      const difference = Number(this.closePriceComputed - this.openPriceComputed)
      const percentChange = difference / this.openPriceComputed * 100
      return percentChange.toFixed(2) + '%'
    },

    priceChangeComputed: function () {
      return Number(this.closePriceComputed - this.openPriceComputed).toFixed(4)
    }
  },
  methods: {
    async fetchApi (userInputSymbol) {
      this.isLoading = true
      this.stockLoadingError = false

      const ticker = userInputSymbol.toUpperCase()
      this.cryptoInfo.rawTicker = ticker
      // FETCH DATA FROM STOCK API
      const response = await fetch(`https://www.alphavantage.co/query?function=CRYPTO_INTRADAY&symbol=${ticker}&market=USD&interval=5min&apikey=${this.VUE_APP_APIKEY}`)
      const data = await response.json()
        .then((res) => this.showData(res))
        .then(() => this.isLoading = false)
        .catch((err) => this.errorMessage(err))
      
      return data
    },
    showData(data) { 
      this.apiData = data
      this.loadInfoContainer = true
      this.isLoading = false
      document.body.classList.add('crypto')

      // SHOW THE DATA CONTAINER
      this.apiInfo.metaData = Object.keys(data)[0]
      this.apiInfo.timeSeries = Object.keys(data)[1]
      this.apiInfo.recentTime = Object.keys(data[this.apiInfo.timeSeries])[0]

      // GET TICKER
      this.cryptoInfo.ticker = this.tickerComputed

      // GET THE OPENING PRICE
      this.cryptoInfo.openPrice = this.openPriceComputed

      // GET THE CLOSING PRICE FOR THE STOCK
      this.cryptoInfo.closePrice = this.closePriceComputed

      // GET THE HIGHEST PRICE
      this.cryptoInfo.highPrice = this.highestPriceComputed

      // GET THE LOWEST PRICE
      this.cryptoInfo.lowPrice = this.lowestPriceComputed

      // CALCULATE VOLUME FOR THE DAY 
      this.cryptoInfo.volume = this.totalVolumeComputed

      this.fetchOpenAndClose()
    },
    async fetchOpenAndClose() {
      const response = await fetch(`https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_DAILY&symbol=${this.cryptoInfo.rawTicker}&market=USD&apikey=${this.VUE_APP_APIKEY}`)
      const data = await response.json()
        .then((data) => this.getOpenAndClose(data))
        .catch((err) => this.errorMessage(err))

      return data
    },
    getOpenAndClose (data) {
      this.apiDataDaily = data
      console.log(Object.values(this.apiDataDaily[Object.keys(this.apiDataDaily)[1]])[0]['4a. close (USD)'])

      // OPEN PRICE
      this.cryptoInfo.openPrice = this.openPriceComputed

      // CLOSING PRICE 
      this.cryptoInfo.closePrice = this.closePriceComputed

      // PERCENT CHANGE
      this.cryptoInfo.percentChange = this.percentChangeComputed

      // DIFFERENCE
      this.cryptoInfo.priceChange = this.priceChangeComputed

      // PUSH DATA TO RECENTLY VIEWED ARRAY
      const recentData = {
        id: new Date().valueOf(),
        ticker: this.cryptoInfo.ticker,
        open: this.cryptoInfo.openPrice,
        close: this.cryptoInfo.closePrice,
        high: this.cryptoInfo.highPrice,
        low: this.cryptoInfo.lowPrice,
        volume: this.cryptoInfo.volume
      }
      this.recentlyViewed.push(recentData)

      return (this.cryptoInfo.openPrice < this.cryptoInfo.closePrice) ? this.cryptoInfo.stockPerformance = 'gained' : this.cryptoInfo.stockPerformance = 'lost'
    },
    errorMessage(data) {
      console.error('This is an error try again "' + data + '"')

      this.apiDataDaily = data
      this.ticker = ""
      this.stockLoadingError = true
    },
    deleteRecent(i) {
      this.recentlyViewed.reverse().splice(i, 1)
    },
  },
}
</script>

<style scoped>
  /* ERROR CONTAINER */
  .error-container {
    text-align: center;
  }
</style>