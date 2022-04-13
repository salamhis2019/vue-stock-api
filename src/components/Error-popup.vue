<template>
  <h1 class="default-text">Please enter valid ticker</h1>
  <img v-if="isLoading" :src="loadingImage" alt="" style="width: 15%">
</template>

<script>
export default {
  name: 'ErrorPopup',
  props: ['isLoading', 'loadingImage']
}
</script>

<style>
  /* ERROR CONTAINER */

  .default-text {
    padding-bottom: 1em;
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