/* 
  The issue is that the input that the user types in to is a component, and in the 'FetchApi' method it takes in the data called 'symbol' and uses that to look up the ticker the user wants. When I console.log(ticker) or symbol in the 'fetchApi' function, the result is a blank string. App.vue is not seeing the input that the user is putting in, which is resulting in the error. 

  Question: 
  How can we use the value of the input in a child component within the parent component (App.vue)?
*/

/* eslint-disable no-unused-vars */
<template>
  <div class="container">
    <!-- INPUT CONTAINER -->
    <InputSection 
      @fetchApi="fetchApi($events)"
      :symbolInput="symbol"
    />
    <!-- CONTENT LOADED IF THE FETCH IS SUCCESSFUL -->
    <div v-if="loadInfoContainer" class="info-container" :id='errorClass'>
      <DataSection 
        :openPrice="openPrice"
        :closePrice="closePrice"
        :highPrice="highPrice"
        :lowPrice="lowPrice"
        :ticker="ticker"
        :volume="volume"  
      />
    </div>
    <!-- ERROR CONTAINER -->
    <div v-else class="error-container">
      <h1 class="default-text">Please enter valid ticker</h1>
      <img v-if="isLoading" :src="loadingImage" alt="" style="width: 15%">
    </div>
  </div>
</template>

<script>
import DataSection from '@/components/Data-section.vue'
import InputSection from '@/components/Input-section.vue'

// GLOBAL VARIABLES
const APIKEY = 'LTSY55G9R1CJFQ11'

export default {
  name: 'app',
  components: {
    DataSection,
    InputSection
  },
  data () {
    return {
      symbol: '',
      openPrice: '',
      closePrice: '',
      highPrice: '',
      lowPrice: '',
      volume: '',
      ticker: '',
      loadingUrl: '',
      loadInfoContainer: false,
      isLoading: false,
      errorClass: false,
      loadingImage: require('../src/images/loading.gif')
    }
  }, 
  methods: {
    fetchApi (sym) {
      this.isLoading = true
      this.symbol = sym
      console.log(sym)
      const ticker = this.symbol.toUpperCase()
      fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${ticker}&interval=5min&apikey=${APIKEY}`)
        .then((res) => res.json())
        .then((data) => this.getData(data))
        .then(() => (this.isLoading = true))
        .catch((err) => this.errorMessage(err))
    },
    getData(data) {
      // CLEAR INPUT FIELD
      this.symbol = ""

      // SET CONTAINER TO SHOW WHEN THE API IS SUCCESSFULLY FETCHED
      const metaData = Object.keys(data)[0]
      const ticker = data[metaData]['2. Symbol']

      // GET PRICE FROM USER
      const timeSeries = Object.keys(data)[1]
      const recentTime = Object.keys(data[timeSeries])[0]     

      // OPEN PRICE
      this.openPrice = Number(data[timeSeries][recentTime]['1. open']).toFixed(2)
      this.ticker = '$' + ticker

      // CLOSING PRICE MODIFICATION
      this.closePrice = Number(data[timeSeries][recentTime]['4. close']).toFixed(2)

      // HIGH PRICE HTML
      this.highPrice = Number(data[timeSeries][recentTime]['2. high']).toFixed(2)

      // LOW PRICE HTML
      this.lowPrice = Number(data[timeSeries][recentTime]['3. low']).toFixed(2)

      // TICKER VOLUME HTML
      this.volume = Math.floor(Number(data[timeSeries][recentTime]['5. volume']).toFixed(2))

      // LOWEST PRICE

      // let minimum = Object.values(data['Time Series (5min)']).map((data) => Number(data['3. low']))

      // let lowestPrice = Math.min(...minimum)

      // this.lowPrice = lowestPrice

      // remove error class 
      this.errorClass = false

      this.loadInfoContainer = true
      
    },
    // eslint-disable-next-line no-unused-vars
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

  /* ERROR CONTAINER */

  .error-container {
    text-align: center;
  }

  .error-container h1 {
    text-transform: uppercase;
    color: #03254E
  }

  #outline-error {
    border: 2px solid red;
  }
</style>