<template>
  <div class="stock-performance-container">
    <div class="daily-performance">
      <i v-if="fetchedInfo.stockPerformance === 'gained'" class="material-icons arrow-up">trending_up</i>
      <i v-else class="material-icons arrow-down">trending_down</i>          
      <div class="performance">
        <p class="percent-change">{{ fetchedInfo.percentChange }}</p>
        <p class="price-change">{{ fetchedInfo.priceChange }}</p>
      </div>            
    </div>
  </div>
</template>

<script>
export default {
  name: 'StockPerformance'
}
</script>

<style scoped>
  
</style>