<template>
  <div class="cell">
    <span class="description">Ticker: </span>
    <h1 class="ticker">{{ displayTicker }}</h1>
  </div>
  <div class="cell2">
    <span class="description">Open: </span><span class="data">{{ fetchedInfo.openPrice }}</span>
    <span class="description">Close: </span><span class="data">{{ fetchedInfo.closePrice }}</span>
    <span class="description">High: </span><span class="data">{{ fetchedInfo.highPrice }}</span>
    <span class="description">Low: </span><span class="data">{{ fetchedInfo.lowPrice }}</span>
    <span class="description">Volume: </span><span class="data">{{ fetchedInfo.volume }}</span>
  </div>
</template>

<script>

export default {
  name: 'StockData',
  props: ['fetchedInfo', 'apiMethodInfo'],
  computed: {
    displayTicker: function() {
      const metaData = Object.keys(this.apiMethodInfo)[0]
      return '$' + Object.values(this.apiMethodInfo[metaData])[1]
    }
  }
}
</script>

<style>

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