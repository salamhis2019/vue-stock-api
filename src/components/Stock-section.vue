<template>
  <base-card>
    <!-- INPUT CONTAINER -->
    <InputSection 
      @fetchApi="fetchApi"
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
import InputSection from '@/components/Input-section.vue'
import RecentlyViewedArea from '@/components/recentlyViewed/Recently-viewed.vue'

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
      apiData: '',
      apiInfo: {
        timeSeries: null,
        recentTime: null,
        metaData: null
      },
      // DATA FOR STOCK INFO
      symbol: '',
      stockInfo: {
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
    openPriceComputed: function () {  
      return Number(this.apiData[this.apiInfo.timeSeries][this.apiInfo.recentTime]['1. open']).toFixed(2)
    },
    closePriceComputed: function () {
      return Number(this.apiData[this.apiInfo.timeSeries][this.apiInfo.recentTime]['4. close']).toFixed(2)
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

      // OPEN PRICE
      this.stockInfo.openPrice = this.openPriceComputed

      // CLOSING PRICE 
      this.stockInfo.closePrice = this.closePriceComputed

      // LOWEST PRICE
      this.stockInfo.lowPrice = this.lowestPriceComputed

      // HIGHEST PRICE
      this.stockInfo.highPrice = this.highestPriceComputed

      // GET TOTAL VOLUME
      this.stockInfo.volume = this.totalVolumeComputed

      // ADDING RECENTLY VIEWED AREA AND PUSHING EMPTY ITEMS TO INSTANTIATED STACK
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

      // REVERSE AND SPLICE STRING FOR RIGHT TO LEFT SEQUENTIAL VIEW ON UI
      // this.recentlyViewed.reverse().slice(0 ,3)

      this.userInputSymbol = ""
    },
    // DISPLAY ERROR MESSAGE IF THE USER INPUT IS NOT VALID
    errorMessage(data) {
      console.error('This is an error try again "' + data + '"')

      this.ticker = ""
      this.stockLoadingError = true
    }, 
    // DELETE RECENTLY VIEWED ITEM FROM DOM
    deleteRecent(i) {
      this.recentlyViewed.splice(i, 1)
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