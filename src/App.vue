/* eslint-disable no-unused-vars */
<template>
  <div class="container">
    <!-- HEADER AREA -->
    <!-- <header-section /> -->
    <!-- INPUT CONTAINER -->
    <div class="input-container">
      <input placeholder="Enter Ticker" class="input-element" name="name" type="text" v-model="symbol" @keyup.enter="fetchApi" :id="errorClass">
      <button @click="fetchApi">Generate</button>
    </div>
    <!-- CONTENT LOADED IF THE FETCH IS SUCCESSFUL -->
    <div v-if="loadInfoContainer" class="info-container" :id='errorClass'>
      <data-section 
        :symbol="symbol"
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
      <h1>Please enter valid ticker</h1>
      <img :src="loadingImage" alt="" style="width: 15%">
    </div>
  </div>
</template>

<script>
// import HeaderSection from '@/components/Header-section.vue'
import DataSection from '@/components/Data-section.vue'

// GLOBAL VARIABLES
const APIKEY = 'LTSY55G9R1CJFQ11'

export default {
  name: 'app',
  components: {
    // HeaderSection,
    DataSection
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
      errorClass: false,
      loadingImage: require('../src/images/loading.gif')
    }
  }, 
  methods: {
    fetchApi () {
      const ticker = this.symbol.toUpperCase()
      fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${ticker}&interval=5min&apikey=${APIKEY}`)
        .then((res) => res.json())
        .then((data) => this.getData(data))
        .catch((err) => this.errorMessage(err))
    },
    getData(data) {
      // CLEAR INPUT FIELD
      this.symbol = ""
      console.log(DataTransferItemList)

      // SET CONTAINER TO SHOW WHEN THE API IS SUCCESSFULLY FETCHED
      const metaData = Object.keys(data)[0]
      const ticker = data[metaData]['2. Symbol']

      // GET PRICE FROM USER
      const timeSeries = Object.keys(data)[1]
      const recentTime = Object.keys(data[timeSeries])[99]

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

      // remove error class 
      this.errorClass = false

      this.loadInfoContainer = true
    },
    // eslint-disable-next-line no-unused-vars
    errorMessage(data) {
      console.log('This is an error try again')
      this.errorClass = 'outline-error'

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
    width: 900px;
    margin: 0 auto;
    
    background-color: #E7F0FF;
  }

  /* INPUT AREA */

  .input-container {
    padding-top: 4em;
    text-align: center;
    margin: 0 auto;
    height: 80px;
    transition: 0.2s ease;
  }

  .input-element {
    background: none;
    border: none;
    border-radius: 0;

    height: 28px;
    border-bottom: 1px solid #03254E;
  }

  .input-element::placeholder {
    color: #03254E;
    font-size: 1.2em;
    text-align: left;

    text-transform: uppercase;
  }

  .input-element:focus {
    border-radius: 0px;
    font-size: 1em;
    outline: none;
    color: #03254E;
    text-transform: uppercase;
  }

  input[type="text"] {
    font-size: 1em;
    color: #03254E;

    text-transform: uppercase;
  }

  /* BUTTON STYLES */

  button {
    margin: 0 auto;
    border: 1px solid #03254E;
    height: 2em;

    font-size: 1em;
    background-color: #03254E;
    color: #E7F0FF;
    cursor: pointer;
    vertical-align: baseline;
    transition: all 250ms;
  }

  button:focus {
    background-color: #1098f7;
    box-shadow: rgba(0, 0, 0, .06) 0 2px 4px;
    transform: translateY(0);
  }

  button:hover {
    transform: translateY(-1px);
  }

  button:hover, button:focus {
    background-color: #E7F0FF;
    box-shadow: rgba(0, 0, 0, 0.1) 0 4px 12px;
    color: #03254E;
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