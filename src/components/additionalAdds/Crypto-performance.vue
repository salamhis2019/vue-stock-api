<template>
  <div class="stock-performance-container">
    <div class="daily-performance">
      <i v-if="$store.state.cryptoInfo.stockPerformance === 'gained'" class="material-icons arrow-up">trending_up</i>
      <i v-else class="material-icons arrow-down">trending_down</i>          
      <div class="performance">
        <p class="percent-change">{{ $store.state.cryptoInfo.percentChange }}</p>
        <p class="price-change">{{ $store.state.cryptoInfo.priceChange }}</p>
      </div>            
    </div>
  </div>
</template>

<script>
export default {
  name: 'CryptoPerformace',
}
</script>

<style scoped>
.arrow-down, .arrow-up {
    padding: 0 0.3em;
    font-size: 45px;
  }

.arrow-up {
  color: greenyellow
}

.arrow-down {
  color: red;
}

.daily-performance {
  display: flex;
  align-items: center
}

.percent-change, .price-change {
  font-family: 'Nunito', sans-serif;
  font-size: 1.2em;
  font-weight: 600;
}

/* LOADING CONTAINER */
.loading-container {
  text-align: center;
}
</style>