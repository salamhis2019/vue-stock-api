<template>
  <div v-if="loadInfoContainer && !isLoading && !stockLoadingError" :class="dataSectionStyle">
    <!-- LEFT SIDE OF INFO CONTAINER WHERE THE TICKER AND GENERAL INFO IS -->
    <div class="cell">
      <span class="description">Ticker: </span>
      <h1 class="ticker">{{ displayTicker }}</h1>
    </div>
    <!-- RIGHT SIDE OF THE DATA CONTAINER WHERE ALL THE INFO IS FOUND ON THE SEARCH -->
    <div class="cell2">
      <span class="description">Open:</span>
      <span class="data">{{ fetchedInfo.openPrice }}</span>
      <span class="description">Close:</span>
      <span class="data">{{ fetchedInfo.closePrice }}</span>
      <span class="description">High:</span>
      <span class="data">{{ fetchedInfo.highPrice }}</span>
      <span class="description">Low: </span>
      <span class="data">{{ fetchedInfo.lowPrice }}</span>
      <span class="description">Volume:</span>
      <span class="data">{{ fetchedInfo.volume }}</span>
    </div>
  </div>
  <!-- LOADING INDICATOR -->
  <div class="loading-container">
    <div v-if="isLoading">
      <LoadingIndicator 
        :isLoading="isLoading"
        :dataSectionStyle="dataSectionStyle"
      />
    </div>
    <ErrorMessage v-if="stockLoadingError">
      <i class="material-icons" style="font-size:36px">error</i>
      Please Enter Valid Ticker
    </ErrorMessage>
  </div>
    

</template>

<script>

import LoadingIndicator from '@/components/Loading-indicator.vue'
import ErrorMessage from '@/components/Error-message.vue'

export default {
  name: 'StockData',
  components: {
    LoadingIndicator,
    ErrorMessage
  },
  props: ['fetchedInfo', 'apiMethodInfo', 'stockLoadingError', 'isLoading', 'loadInfoContainer', 'dataSectionStyle'],
  computed: {
    displayTicker: function() {
      const metaData = Object.keys(this.apiMethodInfo)[0]
      return '$' + Object.values(this.apiMethodInfo[metaData])[1]
    }
  }
}
</script>

<style scoped>
  /* DATA CONTAINER STYLES */
  .stock-container, .crypto-container {
    box-sizing: border-box;
    display: grid;
    grid-template-columns: 1fr 0.7fr;
    border-bottom-right-radius: 25px;
    row-gap: 1em;
    height: 200px;
    max-width: 900px;

    margin: 2em auto;
    padding: 1em;
    color: #E7F0FF;
  }

  .crypto-container {
    background: linear-gradient(to left, #0002308b, #00380500), url('../images/crypto-gradient.png');
    background-size: cover;
    background-position: bottom;
  }

  .stock-container {
    background: linear-gradient(to left, #0030048b, #00380500), url('../images/stock-gradient.png');
    background-size: cover;
    background-position: bottom;
  }

  /* STYLES FOR THE OUTPUT */

  .description {
    text-align: left;
    font-family: 'Nunito', sans-serif;
    width: 100%;
    font-size: 1.4em;
    font-style: italic;
    margin: auto;
  }

  .ticker {
    font-weight: 500;
    font-size: 4em;
    font-family: 'Oxygen', sans-serif;    
    margin: 0;
  }

  .data {
    font-size: 1.5em;
    font-family: 'Oxygen', sans-serif;
    text-align: left;
  }

  .cell {
    margin-top: 1em;
    width: 40%;
    text-align: left;

    padding: 0 1em
  }

  .cell2 {
    display: grid;
    grid-template-columns: 0.8fr 1fr;
    width: 375px;
    max-height: 200px;

    vertical-align: middle;
  }
  
  /* LOADING CONTAINER */
  .loading-container {
    text-align: center;
  }
</style>