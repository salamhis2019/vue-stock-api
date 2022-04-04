<template>
  <div class="input-container">
    <input placeholder="Enter Ticker" class="input-element" name="name" type="text" v-model="symbol" @keyup.enter="$emit('fetch')" :id="errorClass">
    <button @click="fetchApi">Generate</button>
  </div>
</template>

<script>

const APIKEY = 'LTSY55G9R1CJFQ11'

export default {
  name: "InputContainer",
  data() {
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
      // loadingImage: require('../src/images/loading.gif')
    }
  },
  methods: {
    fetchApi () {
      this.isLoading = true
      const ticker = this.symbol.toUpperCase()
      fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${ticker}&interval=5min&apikey=${APIKEY}`)
        .then((res) => res.json())
        .then((data) => this.getData(data))
        .then(() => (this.isLoading = false))
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
    },
    updateInfo () {
      this.$emit('updateInfo', this.fetchApi())
    }
  }
}
</script>

<style>
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
</style>