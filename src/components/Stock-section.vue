<template>
  <div class="container">
    <!-- INPUT CONTAINER -->
    <InputSection 
      @fetchApi="fetchApi"
      :errorClass="errorClass"
    />
    <!-- CONTENT LOADED IF THE FETCH IS SUCCESSFUL -->
    <div v-if="loadInfoContainer" :class="dataSectionStyle" :id='errorClass'>
      <DataSection 
        :fetchedInfo="stockInfo"
      />
    </div>
    <!-- ERROR CONTAINER -->
    <div v-else class="error-container">
      <ErrorPopup 
        :isLoading="isLoading"
        :loadingImage="loadingImage"
      />
    </div>
  </div>
  <p class="recent-text">Recently Viewed</p>
  <div class="recently-viewed">
    <div 
      class="recent-container" 
      v-for="(info, i) in recentlyViewed" 
      :key="info.id"
    >
      <div class="recent-header">
        <h1 class="recently-viewed-ticker">{{ info.ticker }}</h1>
        <i class="material-icons" @click="deleteRecent(i)">close</i>
      </div>
      <div class="recent-info-container">
        <p>Open: {{ info.open }}</p>
        <p>Close: {{ info.close }}</p>
      </div>
    </div>
  </div>
</template>

<script>

import DataSection from '@/components/Data-section.vue'
import InputSection from '@/components/Input-section.vue'
import ErrorPopup from '@/components/Error-popup.vue'

const APIKEY = 'LTSY55G9R1CJFQ11'

export default {
  name: 'stock-section',
  components: {
    DataSection,
    InputSection,
    ErrorPopup
  },
  data () {
    return {
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
      isLoading: false,
      errorClass: false,
      loadingImage: require('../images/stock.gif'),
      // DATA RELATED TO RECENTLY VIEWED SECTION IN UI
      recentlyViewed: [],
      // DYNAMIC STYLES
      dataSectionStyle: 'stock-container'
    }
  },
  methods: {
    fetchApi (userInputSymbol) {
      this.isLoading = true
      const ticker = userInputSymbol.toUpperCase()
      fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${ticker}&interval=5min&apikey=${APIKEY}`)
        .then((res) => res.json())
        .then((data) => this.getData(data))
        .then(() => (this.isLoading = false))
        .catch((err) =>  this.errorMessage(err))
    },
    getData(data) {
      console.log(data)
      this.loadInfoContainer = true
      // CLEAR INPUT FIELD
      this.symbol = ""

      this.isLoading = false

      // SET CONTAINER TO SHOW WHEN THE API IS SUCCESSFULLY FETCHED
      const metaData = Object.keys(data)[0]
      const ticker = data[metaData]['2. Symbol']

      // GET PRICE FROM USER
      const timeSeries = Object.keys(data)[1]
      const recentTime = Object.keys(data[timeSeries])[0]    
      
      // CHANGE TICKER ON UI
      this.stockInfo.ticker = '$' + ticker

      // OPEN PRICE
      this.stockInfo.openPrice = Number(data[timeSeries][recentTime]['1. open']).toFixed(2)

      // CLOSING PRICE MODIFICATION
      this.stockInfo.closePrice = Number(data[timeSeries][recentTime]['4. close']).toFixed(2)

      // LOWEST PRICE
      let minimum = Object.values(data['Time Series (5min)']).map((data) => Number(data['3. low']))
      let lowestPrice = Math.min(...minimum)
      this.stockInfo.lowPrice = lowestPrice

      // HIGHEST PRICE
      let maximum = Object.values(data['Time Series (5min)']).map((data) => Number(data['3. low']))
      let highestPrice = Math.max(...maximum)
      console.log(highestPrice)
      this.stockInfo.highPrice = highestPrice

      // GET TOTAL VOLUME
      let volume = Object.values(data['Time Series (5min)']).map((data) => Number(data['5. volume']))
      const totalVolume = volume.reduce((acc, volume) => {
        return acc + volume
      }, 0)

      this.stockInfo.volume = totalVolume

      // ADDING RECENTLY VIEWED AREA
      const recentData = {
        id: new Date().valueOf(),
        ticker: this.stockInfo.ticker,
        open: this.stockInfo.openPrice,
        close: this.stockInfo.closePrice
      }

      if (this.recentlyViewed.length < 3) {
        this.recentlyViewed.push(recentData)
      } 

      if (this.recentlyViewed.length === 3) {
        this.recentlyViewed.pop()
        this.recentlyViewed.push(recentData)
      }

      // REMOVE ERROR CLASS AND LOAD THE INFO CONTAINER
      this.errorClass = false

      this.userInputSymbol = ""

      console.log(this.recentlyViewed.length)
    },
    errorMessage(data) {
      console.error('This is an error try again "' + data + '"')
      this.errorClass = 'outline-error'
      console.log(this.symbol)

      this.symbol = ""
      this.loadInfoContainer = false
    }, 
    // DELETE RECENTLY VIEWED ITEM FROM DOM
    deleteRecent(i) {
      this.recentlyViewed.splice(i,1)
    }
  }
}
</script>

<style scoped>
  /* DATA CONTAINER STYLES */
    .stock-container {
    box-sizing: border-box;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    row-gap: 1em;
    height: 200px;
    max-width: 900px;

    margin: 2em auto;
    padding: 1em;

    background: linear-gradient(to left, #10ce1f, #003805);
    color: #E7F0FF;
  }

  /* MAIN CONTAINER STYLES */
  .container {
    box-sizing: border-box;
    width: 900px;
    margin: 0 auto;
    
    background-color: #E7F0FF;
  }

  /* ERROR CONTAINER */
    .error-container {
      text-align: center;
    }

  /* RECENTLY VIEWED AREA */

  .recent-text {
    display: flex;
    flex-direction: row;
  }
          
  .recent-text:before,
  .recent-text:after {
    content: "";
    flex: 1 1;
    border-bottom: 2px solid rgb(255, 255, 255);
    margin: auto;
  }

  .recent-text {
    color: #E7F0FF;
    text-align: center;

    font-size: 1.5em;
    font-weight: 600;
  }

  .recently-viewed {
    display: grid;
    text-align: center;

    grid-template-columns: repeat(3, 1fr);
    column-gap: 1em;
  }

  .recent-container {
    box-sizing: border-box;
    height: 225px;
    padding: 1em;

    background: rgb(3,37,78);
    background: radial-gradient(circle, #10ce1f 0%, #004906 85%);
    box-shadow: 4px 4px #E7F0FF;
    color: #E7F0FF;
  }

  .recent-header {
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 75px;
  }

  .recently-viewed-ticker {
    font-family: 'Oxygen', sans-serif;
    font-weight: 300;
  }

  .material-icons {
    font-size: 36px;
    cursor: pointer;

    transition: 0.3s ease;
  }

  .material-icons:hover {
    color: #3d3d3d;
  }

  .material-icons:active {
    transform: translateY(-1px);
    transform: translatex(-1px);
  }

  .recent-info-container {
    text-align: left;
    padding-left: 2.1em;
  }

  .recent-info-container p {
    font-size: 1.2em;
  }
</style>