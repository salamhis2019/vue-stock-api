<template>
  <div class="wrapper">
    <img v-if="isLoading" :src="loadingImage" alt="" style="width: 15%">
  </div>
</template>

<script>

export default {
  name: 'LoadingImage',
  props: ['isLoading'], 
  data () {
    return {
      loadingImage: require('../images/loading.gif'),
    }
  }
}
</script>

<style scoped>
  .wrapper {
    display: grid;
    place-items: center;
  }
</style>