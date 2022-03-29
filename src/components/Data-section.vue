<template>
  <div class="cell">
    <span class="description">Ticker: </span><span class="data">{{ ticker }}</span>
  </div>
  <div class="cell">
    <span class="description">Open: </span><span class="data">{{ openPrice }}</span>
  </div>
  <div class="cell">
    <span class="description">Close: </span><span class="data">{{ closePrice }}</span>
  </div>
  <div class="cell">
    <span class="description">High: </span><span class="data">{{ highPrice }}</span>
  </div>
  <div class="cell">
    <span class="description">Low: </span><span class="data">{{ lowPrice }}</span>
  </div>
  <div class="cell">
    <span class="description">Volume: </span><span class="data">{{ volume }}</span>
  </div>
</template>

<script>


export default {
  name: 'Data-section',
  props: ['openPrice', 'closePrice', 'ticker', 'volume', 'highPrice', 'lowPrice']
}
</script>

<style>

  .info-container {
    display: grid;
    grid-template-rows: 1fr 1fr;
    grid-template-columns: repeat(3, 1fr);
    row-gap: 1em;
    text-align: center;
    width: 500px;
    margin: 0 auto 2em auto;
    padding: 1.5em;

    background-color: #03254E;
    color: white;
  }

  /* STYLES FOR THE OUTPUT */

  .description {
    font-family: 'Nunito', sans-serif;

    font-size: 1em;
    font-style: italic;
  }

  .data {
    font-weight: 700;
    font-size: 1.5em;
  }
</style>