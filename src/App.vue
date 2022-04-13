<template>
  <div class="tabs">
    <button class="stocks-button" @click="component = 'StockSection'">Stocks</button>
    <button class="crypto-button" @click="component = 'CryptoSection'">Crypto</button>
  </div>
  <component :is="component"></component>
</template>

<script>
import StockSection from '@/components/Stock-section.vue'
import CryptoSection from '@/components/Crypto-section.vue'

export default {
  name: 'app',
  components: {
    // eslint-disable-next-line vue/no-unused-components
    StockSection,
    CryptoSection
  },
  data () {
    return {
      component: StockSection
    }
  },
  computed: {},
  methods: {
    chooseComponent(cmp) {
      this.component = cmp
      console.log(this.component)
    }
  }
}
</script>

<style>

  /* GLOBAL STYLES */
  * {
    font-family: 'Nunito', sans-serif;
  }

  body {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;

    background: linear-gradient(to bottom, #1097f728, #03254ef1), url('./images/background.webp');
    background-size: cover;
    background-position: center;
  }

  /* NAV AREA */

  .tabs {
    width: 500px;
    margin: 0 auto 2.5em auto;

    text-align: center;
  }

  .stocks-button, .crypto-button {
    height: 2em;
    width: 175px;

    background-color: #E7F0FF;
    color: #03254E;
    font-size: 1.2em;
    font-family: 'Nunito', sans-serif;

    border: none;
    cursor: pointer;
    transition: 0.2s ease
  }

  .stocks-button:hover, .crypto-button:hover {
    background-color: #ececec;
  }

  .stocks-button {
    border-right: 1px solid #03254E;
  }

  .crypto-button {
    border-left: 1px solid #03254E;
  }
</style>