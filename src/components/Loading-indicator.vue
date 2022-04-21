<template>
  <img v-if="isLoading" :src="changeLoadingImage" class="loading-image" alt="">
</template>

<script>
export default {
  name: 'LoadingIndicator',
  props: ['isLoading', 'dataSectionStyle'],
  computed: {
    changeLoadingImage: function () {
      return (this.dataSectionStyle === 'stock-container') ? '/img/stock.d8ce57d4.gif' : '/img/loading.c63c963e.gif'
    }
  }
}
</script>

<style scoped>
  /* ERROR CONTAINER */
  .default-stock-text {
    padding-bottom: 1em;
    color: #003805
  }   

  .error-container {
    text-align: center;
  }

  .error-container h1 {
    text-transform: uppercase;
    color: #03254E
  }

  .loading-image {
    width: 15%
  }
</style>