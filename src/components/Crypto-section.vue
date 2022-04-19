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
    :recentlyViewedArr="recentlyViewed"
  />
</template>

<script>

import InputSection from '@/components/Input-section.vue'
import DataSection from '@/components/Data-section.vue'
import RecentlyViewedArea from '@/components/recentlyViewed/Recently-viewed.vue'

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
      apiData: '',
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
    // recentlyViewedItems() {
    //   return [...this.recentlyViewed].reverse().slice(0,3)
    // }
    tickerComputed: function () {
      return '$' + this.apiData[this.apiInfo.metaData]['2. Digital Currency Code']
    },
    openPriceComputed: function () {
      return Number(this.apiData[this.apiInfo.timeSeries][this.apiInfo.recentTime]['1. open']).toFixed(2)
    },
    closePriceComputed: function () {
      return Number(this.apiData[this.apiInfo.timeSeries][this.apiInfo.recentTime]['4. close'])
    },
    highestPriceComputed: function () {
      const max = Object.values(this.apiData[this.apiInfo.timeSeries]).map((values) => values['2. high'])
      const highestPrice = Math.max(...max)
      return highestPrice.toFixed(2)
    },
    lowestPriceComputed: function () {
      const min = Object.values(this.apiData[this.apiInfo.timeSeries]).map((values) => values['3. low'])
      const minPrice = Math.min(...min)
      return minPrice
    },
    totalVolumeComputed: function () {
      const volumes = Object.values(this.apiData[this.apiInfo.timeSeries]).map((values) => values['5. volume'])

      const totalVolume = volumes.reduce((acc, volume) => { return acc + volume},0)
      return totalVolume.toLocaleString()
    }
  },
  methods: {
    async fetchApi (userInputSymbol) {
      this.isLoading = true
      this.stockLoadingError = false

      const ticker = userInputSymbol.toUpperCase()
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

      // PUSH RECENTS TO UI AND ADDING RECENLTY VIEWED AREA
      const recentData = {
        id: new Date().valueOf(),
        ticker: this.cryptoInfo.ticker,
        open: this.cryptoInfo.openPrice,
        close: this.cryptoInfo.closePrice,
      }
      this.recentlyViewed.push(recentData)

      this.recentlyViewed = this.recentlyViewed.reverse().slice(0, 3)

    },
    errorMessage(data) {
      console.error('This is an error try again "' + data + '"')

      this.ticker = ""
      this.stockLoadingError = true
    },
    deleteRecent(i) {
      this.recentlyViewed.splice(i, 1)
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