<template>
  <div v-if="loadInfoContainer && !isLoading && !stockLoadingError" :class="dataSectionStyle">
    <div  class="cell">
      <span class="description">Ticker: </span>
      <h1 class="ticker">{{ fetchedInfo.ticker }}</h1>
    </div>
    <div class="cell2">
      <span class="description">Open: </span><span class="data">{{ fetchedInfo.openPrice }}</span>
      <span class="description">Close: </span><span class="data">{{ fetchedInfo.closePrice }}</span>
      <span class="description">High: </span><span class="data">{{ fetchedInfo.highPrice }}</span>
      <span class="description">Low: </span><span class="data">{{ fetchedInfo.lowPrice }}</span>
      <span class="description">Volume: </span><span class="data">{{ fetchedInfo.volume }}</span>
    </div>
  </div>
  <!-- LOADING INDICATOR -->
  <div v-if="isLoading">
    <LoadingIndicator 
      :isLoading="isLoading"
  />
  </div>
    <!-- ERROR MESSAGE -->
  <ErrorMessage v-if="stockLoadingError">Please enter valid ticker</ErrorMessage>
</template>

<script>
import LoadingIndicator from '@/components/Loading-indicator.vue'
import ErrorMessage from '@/components/Error-message.vue'

export default {
  
  name: 'StockData',
  props: ['fetchedInfo', 'stockLoadingError', 'isLoading', 'loadInfoContainer', 'dataSectionStyle'],
  components: {
    LoadingIndicator,
    ErrorMessage
  },
}
</script>

<style>
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

  /* STYLES FOR THE OUTPUT */
  .description {
    text-align: left;
    font-family: 'Nunito', sans-serif;

    font-size: 1.3em;
    font-style: italic;
    margin: auto;
  }

  .ticker {
    font-weight: 300;
    font-size: 3em;
    font-family: 'Oxygen', sans-serif;    
    margin: 0;
  }

  .data {
    font-size: 1.5em;
    font-family: 'Oxygen', sans-serif;
    text-align: left;
  }

  .cell {
    width: 40%;
    text-align: left;

    padding: 0 1em
  }

  .cell2 {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: (3 1fr);
    max-height: 200px;

    vertical-align: middle;
    text-align: left;
  }
</style>