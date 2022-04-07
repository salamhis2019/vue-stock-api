<template>
  <div class="cell">
    <span class="description">Ticker: </span>
    <h1 class="ticker">{{ stockInfo.ticker }}</h1>
  </div>
  <div class="cell2">
    <span class="description">Open: </span><span class="data">{{ stockInfo.openPrice }}</span>
    <span class="description">Close: </span><span class="data">{{ stockInfo.closePrice }}</span>
    <span class="description">High: </span><span class="data">{{ stockInfo.highPrice }}</span>
    <span class="description">Low: </span><span class="data">{{ stockInfo.lowPrice }}</span>
    <span class="description">Volume: </span><span class="data">{{ stockInfo.volume }}</span>
  </div>
</template>

<script>


export default {
  name: 'DataSection',
  props: ['stockInfo']
}
</script>

<style>
  .info-container {
    box-sizing: border-box;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    row-gap: 1em;
    height: 200px;
    max-width: 900px;

    margin: 2em auto;
    padding: 1em;

    background: linear-gradient(to left, #1098f7, #03254E);
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