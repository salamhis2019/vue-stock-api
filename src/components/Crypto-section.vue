<template>
  <base-card>
    <InputSection 
      @fetchApi="fetchApi"
    />
    <div>
      <CryptoDataSection 
        :isLoading="isLoading"
        :stockLoadingError="stockLoadingError"
        :loadInfoContainer="loadInfoContainer"
        :dataSectionStyle="dataSectionStyle"
      />      
    </div>
  </base-card>
  <StockChart 
    v-if="loadInfoContainer"
    :closingPrices="closePriceArray"
    :timeLabels="timesArray"
    :chartOption="chartOption"
    id="stock-chart"
  />
  <RecentlyViewedArea
    :recentlyViewedArr="recentlyViewedItems"
    :dataSectionStyle="dataSectionStyle"
    :deleteRecent="deleteRecent"
  />
</template>

<script>

import InputSection from '@/components/Input-section.vue'
import CryptoDataSection from '@/components/CryptoData-section.vue'
import RecentlyViewedArea from '@/components/additionalAdds/Recently-viewed.vue'
import StockChart from '@/components/additionalAdds/Stock-chart.vue'
import axios from 'axios'

export default {
  name: 'CryptoSection',
  components: {
    InputSection,
    CryptoDataSection,
    RecentlyViewedArea,
    StockChart
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
      // DATA FOR UI ELEMENTS LOADING
      loadInfoContainer: false,
      stockLoadingError: false,
      isLoading: false,
      // DATA RELATED TO RECENTLY VIEWED SECTION IN UI
      recentlyViewed: [],
      // DYNAMIC STYLING
      dataSectionStyle: 'crypto-container',
      // CHART INFO
      timesArray: [],
      closePriceArray: [],
      chartData: [],
      chartOption: {
        color: '#1097f7'
      }
    }
  },
  computed: {
    recentlyViewedItems: function () {
      return [...this.recentlyViewed].reverse().slice(0, 3)
    },

    tickerComputed: function () {
      return this.apiData[this.apiInfo.metaData]['2. Digital Currency Code']
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
      
      // FETCH DATA FROM STOCK API
      try {
        const {data} = await axios.get(`https://www.alphavantage.co/query?function=CRYPTO_INTRADAY&symbol=${ticker}&market=USD&interval=5min&apikey=${this.VUE_APP_APIKEY}`)
        this.showData(data)
        this.isLoading = false
      } catch(error) {
        this.errorMessage(error)
      }
    },
    showData(data) { 
      console.log('datasuccess')
      this.apiData = data
      this.loadInfoContainer = true
      this.isLoading = false
      document.body.classList.add('crypto')

      // RESET CHART DATA CHART
      this.closingPrices = []
      this.timesArray = []

      // SHOW THE DATA CONTAINER
      this.apiInfo.metaData = Object.keys(data)[0]
      this.apiInfo.timeSeries = Object.keys(data)[1]
      this.apiInfo.recentTime = Object.keys(data[this.apiInfo.timeSeries])[0]

      // GET TICKER
      this.$store.state.cryptoInfo.ticker = this.tickerComputed

      // GET THE HIGHEST PRICE
      this.$store.state.cryptoInfo.highPrice = this.highestPriceComputed

      // GET THE LOWEST PRICE
      this.$store.state.cryptoInfo.lowPrice = this.lowestPriceComputed

      // CALCULATE VOLUME FOR THE DAY 
      this.$store.state.cryptoInfo.volume = this.totalVolumeComputed

      // RAW TICKER
      this.$store.state.cryptoInfo.rawTicker = this.tickerComputed

      // TIMES ARRAY INFO
      const times = Object.keys(Object.values(data)[1]).map((time) => time.slice(11,19))
      times.forEach(time => this.timesArray.push(time))
      this.timesArray = [...this.timesArray].reverse()

      // CLOSING PRICE ARRAY
      this.closePriceArray.length = 0
      const closePrices = Object.values(data['Time Series Crypto (5min)']).map((info) => info['4. close'])
      closePrices.forEach(closePrice => this.closePriceArray.push(closePrice))
      this.closePriceArray = [...this.closePriceArray].reverse()

      // CALL FUNCTION THAT CATCHES DATA FROM THE DAILY API
      this.fetchOpenAndClose()
    },
    async fetchOpenAndClose() {
      const response = await fetch(`https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_DAILY&symbol=${this.$store.state.cryptoInfo.rawTicker}&market=USD&apikey=${this.VUE_APP_APIKEY}`)
      const data = await response.json()
        .then((data) => this.getOpenAndClose(data))
        .catch((err) => this.errorMessage(err))

      return data
    },
    getOpenAndClose (data) {
      console.log('datasuccess')
      this.apiDataDaily = data
      console.log(this.apiDataDaily)

      // OPEN PRICE
      this.$store.state.cryptoInfo.openPrice = this.openPriceComputed

      // CLOSING PRICE 
      this.$store.state.cryptoInfo.closePrice = this.closePriceComputed

      // PERCENT CHANGE
      this.$store.state.cryptoInfo.percentChange = this.percentChangeComputed

      // DIFFERENCE
      this.$store.state.cryptoInfo.priceChange = this.priceChangeComputed

      // PUSH DATA TO RECENTLY VIEWED ARRAY
      const recentData = {
        id: new Date().valueOf(),
        ticker: this.$store.state.cryptoInfo.ticker,
        open: this.$store.state.cryptoInfo.openPrice,
        close: this.$store.state.cryptoInfo.closePrice,
        high: this.$store.state.cryptoInfo.highPrice,
        low: this.$store.state.cryptoInfo.lowPrice,
        volume: this.$store.state.cryptoInfo.volume
      }
      this.recentlyViewed.push(recentData)

      return (this.$store.state.cryptoInfo.openPrice < this.$store.state.cryptoInfo.closePrice) ? this.$store.state.cryptoInfo.stockPerformance = 'gained' : this.$store.state.cryptoInfo.stockPerformance = 'lost'
    },
    errorMessage(data) {
      console.error('This is an error try again "' + data + '"')

      console.log('data failed')
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