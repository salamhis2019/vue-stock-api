<template>
  <div class="container">
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
  </div>
  <p class="recent-text">Recently Viewed</p>
  <div class="recently-viewed">
    <div 
      class="recent-container"
      v-for="(recent,i) in recentlyViewedItems"
      :key="recent.id"
    >
      <div class="recent-header">
        <p class="recently-viewed-ticker">{{ recent.ticker }}</p>
        <i class="material-icons" @click="deleteRecent(i)">close</i>
      </div>
      <div class="recent-info-container">
        <p>Open: {{ recent.open }}</p>
        <p>Close: {{ recent.close }}</p>
      </div>
    </div>
  </div>
</template>

<script>

import InputSection from '@/components/Input-section.vue'
import DataSection from '@/components/Data-section.vue'

const APIKEY = 'LTSY55G9R1CJFQ11'

export default {
  name: 'CryptoSection',
  components: {
    InputSection,
    DataSection
  },
  data () {
    return {
      apiData: '',
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
    recentlyViewedItems() {
      return [...this.recentlyViewed].reverse().slice(0,3)
    }
  },
  methods: {
    async fetchApi (userInputSymbol) {

      this.isLoading = true
      this.stockLoadingError = false

      const ticker = userInputSymbol.toUpperCase()
      const data = await fetch(`https://www.alphavantage.co/query?function=CRYPTO_INTRADAY&symbol=${ticker}&market=USD&interval=5min&apikey=${APIKEY}`)
      .then((data) => data.json())
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
      const metaData = Object.keys(data)[0]
      const timeSeries = Object.keys(data)[1]
      const recentTime = Object.keys(data[timeSeries])[0]

      this.cryptoInfo.ticker = '$' + data[metaData]['2. Digital Currency Code']

      this.cryptoInfo.openPrice = Number(data[timeSeries][recentTime]['1. open']).toFixed(2)

      this.cryptoInfo.closePrice = Number(data[timeSeries][recentTime]['4. close'])

      // GET THE HIGHEST PRICE
      const max = Object.values(data[timeSeries]).map((values) => values['2. high'])
      const highestPrice = Math.max(...max)
      this.cryptoInfo.highPrice = highestPrice

      // GET THE LOWEST PRICE
      const min = Object.values(data[timeSeries]).map((values) => values['3. low'])
      const minPrice = Math.min(...min)
      this.cryptoInfo.lowPrice = minPrice

      // CALCULATE VOLUME FOR THE DAY 
      const volumes = Object.values(data[timeSeries]).map((values) => values['5. volume'])

      const totalVolume = volumes.reduce((acc, volume) => { return acc + volume},0)

      this.cryptoInfo.volume = totalVolume

      // PUSH RECENTS TO UI AND ADDING RECENLTY VIEWED AREA
      const recentData = {
        id: new Date().valueOf(),
        ticker: this.cryptoInfo.ticker,
        open: this.cryptoInfo.openPrice,
        close: this.cryptoInfo.closePrice
      }
      
      if (this.recentlyViewed.length < 3) {
        this.recentlyViewed.push(recentData)
      }

      if (this.recentlyViewed.length === 3) {
        this.recentlyViewed.pop()
        this.recentlyViewed.push(recentData)
      }

    },
    errorMessage(data) {
      console.error('This is an error try again "' + data + '"')

      this.ticker = ""
      this.stockLoadingError = true
    },
    deleteRecent(i) {
      this.recentlyViewed.slice(i, 1)
    },
  },
}
</script>

<style scoped>
  
  /* CONTAINER STYLES */

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
    color: #E7F0FF;
    text-align: center;

    font-size: 1.5em;
    font-weight: 600;
  }
  
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
    background: radial-gradient(circle, #1097f7 0%, #03254E 97%);
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
    font-size: 2em;
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