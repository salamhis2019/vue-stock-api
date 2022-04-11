<template>
  <div class="tabs">
    <button class="stocks-button">Stocks</button>
    <button class="crypto-button">Crypto</button>
  </div>

  <div class="container">
    <!-- INPUT CONTAINER -->
    <InputSection 
      @lookUpSymbol="fetchApi()"
      @update:modelValue="value => symbol = value"
      v-model="symbol"
      :errorClass="errorClass"
    />
    <!-- CONTENT LOADED IF THE FETCH IS SUCCESSFUL -->
    <div v-if="loadInfoContainer" class="info-container" :id='errorClass'>
      <DataSection 
        :stockInfo="stockInfo"
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
</template>

<script>
import DataSection from '@/components/Data-section.vue'
import InputSection from '@/components/Input-section.vue'
import ErrorPopup from '@/components/Error-popup.vue'

// GLOBAL VARIABLES
const APIKEY = 'LTSY55G9R1CJFQ11'

export default {
  name: 'app',
  components: {
    DataSection,
    InputSection,
    ErrorPopup
  },
  data () {
    return {
      symbol: '',
      stockInfo: {
        openPrice: '',
        closePrice: '',
        highPrice: '',
        lowPrice: '',
        volume: '',
        ticker: '',
      },
      loadingUrl: '',
      loadInfoContainer: false,
      isLoading: false,
      errorClass: false,
      loadingImage: require('../src/images/loading.gif')
    }
  }, 
  methods: {
    fetchApi () {
      this.isLoading = true
      const ticker = this.symbol.toUpperCase()
      fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${ticker}&interval=5min&apikey=${APIKEY}`)
        .then((res) => res.json())
        .then((data) => this.getData(data))
        // .then(() => (this.isLoading = true))
        .catch((err) =>  this.errorMessage(err))
    },
    getData(data) {
      console.log('Request complete')
      console.log(data)
      // CLEAR INPUT FIELD
      this.symbol = ""

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


      // REMOVE ERROR CLASS AND LOAD THE INFO CONTAINER
      this.errorClass = false
      this.loadInfoContainer = true
    },
    errorMessage(data) {
      console.error('This is an error try again "' + data + '"')
      this.errorClass = 'outline-error'
      console.log(this.symbol)

      this.symbol = ""
      this.loadInfoContainer = false
    }
  }
}
</script>

<style>

  /* GLOBAL STYLES */
  * {
    font-family: 'Nunito', sans-serif;
  }

  body {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;

    background: linear-gradient(to bottom, #1097f728, #03254ef1), url('./images/background.webp');
    background-size: cover;
    background-position: center;
  }

  .logo {
    width: 15%;
  }

  .container {
    box-sizing: border-box;
    width: 900px;
    margin: 0 auto;
    
    background-color: #E7F0FF;
  }

  .default-text {
    padding-bottom: 1em;
  }

  /* NAV AREA */

  .tabs {
    width: 500px;
    margin: 0 auto 2.5em auto;

    text-align: center;
  }

  .stocks-button, .crypto-button {
    height: 2em;
    width: 175px;

    background-color: #E7F0FF;
    color: #03254E;
    font-size: 1.2em;
    font-family: 'Nunito', sans-serif;

    border: none;
    cursor: pointer;
    transition: 0.2s ease
  }

  .stocks-button:hover, .crypto-button:hover {
    background-color: #ececec;
  }

  .stocks-button {
    border-right: 1px solid #03254E;
  }

  .crypto-button {
    border-left: 1px solid #03254E;
  }
</style>