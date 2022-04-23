<template>
  <base-card>
    <!-- INPUT CONTAINER -->
    <InputSection 
      @fetchApi="fetchApi"
      :dataSectionStyle="dataSectionStyle"
    />
    <div>
      <DataSection 
        :fetchedInfo="stockInfo"
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

import DataSection from '@/components/Data-section.vue'
import RecentlyViewedArea from '@/components/additionalAdds/Recently-viewed.vue'
import InputSection from '@/components/Input-section.vue'

export default {
  name: 'stock-section',
  components: {
    DataSection,
    InputSection,
    RecentlyViewedArea
  },
  data () {
    return {
      VUE_APP_APIKEY: process.env.VUE_APP_APIKEY,
      // DATA FROM API
      apiData: null,
      apiDataDaily: null,
      apiInfo: {
        timeSeries: null,
        recentTime: null,
        metaData: null
      },
      // DATA FOR STOCK INFO
      stockInfo: {
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
      // DYNAMIC STYLES
      dataSectionStyle: 'stock-container'
    }
  },
  computed: {
    // THIS FUNCTION WAS NOT ABLE TO BE MANIPULATED WHEN ADDRESSED IN THE METHODS SECTION
    // WILL REVISIT IMPLEMENTING THE RECENTLY VIEWED MANIPULATION IN THE FUTURE 
    recentlyViewedItems: function () {
      return [...this.recentlyViewed].reverse().slice(0, 3)
    },

    tickerComputed: function () {
      return '$' + this.apiData[this.apiInfo.metaData]['2. Symbol']
    },

    openPriceComputed: function() {
      return Number(Object.values(this.apiDataDaily[Object.keys(this.apiDataDaily)[1]])[0]['1. open']).toFixed(2)
    },
    
    closePriceComputed: function() {
      return Number(Object.values(this.apiDataDaily[Object.keys(this.apiDataDaily)[1]])[0]['4. close']).toFixed(2)
    },

    lowestPriceComputed: function () {
      let minimum = Object.values(this.apiData[this.apiInfo.timeSeries]).map((data) => Number(data['3. low']))
      let lowestPrice = Math.min(...minimum) 
      return lowestPrice.toFixed(2)
    },

    highestPriceComputed: function () {
      let maximum = Object.values(this.apiData[this.apiInfo.timeSeries]).map((data) => Number(data['2. high']))
      let highestPrice = Math.max(...maximum)
      return highestPrice.toFixed(2)
    },

    totalVolumeComputed: function () {
      let volume = Object.values(this.apiData[this.apiInfo.timeSeries]).map((data) => Number(data['5. volume']))
      const totalVolume = volume.reduce((acc, volume) => {
        return acc + volume
      }, 0)
      return totalVolume.toLocaleString()
    },

    percentChangeComputed: function () {
      const difference = Number(this.closePriceComputed - this.openPriceComputed)
      const percentChange = difference / this.openPriceComputed * 100
      return percentChange.toFixed(2) + '%'
    },

    priceChangeComputed: function () {
      return Number(this.closePriceComputed - this.openPriceComputed).toFixed(2)
    }
  },
  methods: {
    async fetchApi (userInputSymbol) {

      const APIKEY = this.VUE_APP_APIKEY
      this.isLoading = true
      this.stockLoadingError = false
      const ticker = userInputSymbol.toUpperCase()

      // FETCH DATA FROM STOCK API
      const response = await fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${ticker}&interval=5min&apikey=${APIKEY}`)
      const data = await response.json()
        .then((data) => this.getData(data))
        .then(() => (this.isLoading = false))
        .catch((err) => this.errorMessage(err))
      
      return data
    },
    getData(data) {
      this.apiData = data
      this.loadInfoContainer = true
      this.isLoading = false

      // ASSIGNING EQUATIONS TO DATA TO GET EASIER ACCESS TO KEYS FROM THE API 
      this.apiInfo.timeSeries = Object.keys(data)[1]
      this.apiInfo.recentTime = Object.keys(data[this.apiInfo.timeSeries])[0]  
      this.apiInfo.metaData = Object.keys(data)[0]
      
      // TICKER ON UI
      this.stockInfo.ticker = this.tickerComputed

      // LOWEST PRICE
      this.stockInfo.lowPrice = this.lowestPriceComputed

      // HIGHEST PRICE
      this.stockInfo.highPrice = this.highestPriceComputed

      // GET TOTAL VOLUME
      this.stockInfo.volume = this.totalVolumeComputed

      // RAW TICKER
      this.stockInfo.rawTicker = data[this.apiInfo.metaData]['2. Symbol']

      this.userInputSymbol = ""
      
      this.fetchOpenAndClose()
    },
    async fetchOpenAndClose() {
      const response = await fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${this.stockInfo.rawTicker}&interval=5min&apikey=${this.VUE_APP_APIKEY}`)
      const data = await response.json()
        .then((data) => this.getOpenAndClose(data))
        .catch((err) => this.errorMessage(err))

      return data
    },
    getOpenAndClose (data) {
      this.apiDataDaily = data

      // OPEN PRICE
      this.stockInfo.openPrice = this.openPriceComputed

      // CLOSING PRICE 
      this.stockInfo.closePrice = this.closePriceComputed

      // PERCENT CHANGE
      this.stockInfo.percentChange = this.percentChangeComputed

      // DIFFERENCE
      this.stockInfo.priceChange = this.priceChangeComputed

      // PUSH DATA TO RECENTLY VIEWED ARRAY
      const recentData = {
        id: new Date().valueOf(),
        ticker: this.stockInfo.ticker,
        open: this.stockInfo.openPrice,
        close: this.stockInfo.closePrice,
        high: this.stockInfo.highPrice,
        low: this.stockInfo.lowPrice,
        volume: this.stockInfo.volume
      }
      this.recentlyViewed.push(recentData)

      return (this.stockInfo.openPrice < this.stockInfo.closePrice) ? this.stockInfo.stockPerformance = 'gained' : this.stockInfo.stockPerformance = 'lost'
    },
    // DISPLAY ERROR MESSAGE IF THE USER INPUT IS NOT VALID
    errorMessage(data) {
      console.error('This is an error try again "' + data + '"')

      console.log(data.Note)

      this.ticker = ""
      this.stockLoadingError = true
    }, 
    // DELETE RECENTLY VIEWED ITEM FROM DOM
    deleteRecent(i) {
      this.recentlyViewed.reverse().splice(i, 1)
    }
  }
}
</script>

<style scoped>
  /* ERROR CONTAINER */
  .error-container {
    text-align: center;
  }
</style>