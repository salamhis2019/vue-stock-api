<template>
  <img v-if="isLoading" :src="loadingImage" class="loading-image" alt="">
</template>

<script>
export default {
  name: 'LoadingIndicator',
  props: ['isLoading', 'dataSectionStyle'],
  data () {
    return {
      loadingImage: require('../images/loading.gif')
    }
  },
  watch: {
    changeImage() {
      if (this.dataSectionStyle === 'crypto-container') {
        this.loadingImage = 'require(\'.../images/loading.gif\')'
      } else {
        this.loadingImage = 'require(\'.../images/stocks.gif\')'
      }
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