<template>
  <header>
    <h1>{{ title }}</h1>
    <img class="logo" src="@/images/candlestick.png" alt="">
  </header>
</template>

<script>

export default {
  name: 'Header-section',
  data () {
    return {
      title: 'Stock Market API'
    }
  }
}
</script>

<style>
  header {
    display: flex;
    align-items: center;
    justify-content: space-around;

    color: white;
    background-color: #1098f7;

    border-bottom: 2px solid #E7F0FF;
    text-shadow: 1px 1px 1px black;
  }

  header h1 {
    font-size: 3.5em;
    font-style: italic;

    color: #E7F0FF
  }
</style>

