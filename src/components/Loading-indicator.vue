<template>
  <h1 class="default-stock-text">Please enter valid ticker</h1>
  <img v-if="isLoading" :src="loadingImage" alt="" style="width: 15%">
</template>

<script>
export default {
  name: 'ErrorPopup',
  props: ['isLoading', 'loadingImage']
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

  #outline-error {
    border: 2px solid red;
  }
</style>