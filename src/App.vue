<template>
  <div class="hero-container">
    <div class="tabs">
      <button class="stocks-button" @click="chooseComponent('StockSection')">Stocks</button>
      <button class="crypto-button" @click="chooseComponent('CryptoSection')">Crypto</button>
    </div>
    <keep-alive>
      <component :is="component"></component>
    </keep-alive>
    <img 
      v-if="component === 'StockSection'" class="crypto-logo" 
      src="../src/images/stocks-logo.png" 
      alt=""
    >
    <img 
      v-else 
      class="crypto-logo" 
      src="../src/images/crypto-logo.png" 
      alt=""
    >
  </div>
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
      component: 'StockSection',
    }
  },
  computed: {},
  methods: {
    chooseComponent(cmp) {
      this.component = cmp
      if (this.component !== 'StockSection') {
        document.body.classList.add('crypto-background')
      } else {
        document.body.classList.remove('crypto-background')
      }
    }
  }
}
</script>

<style>
  /* GLOBAL STYLES */
  * {
    font-family: 'Nunito', sans-serif;
  }
  
  .crypto-background {
    background: linear-gradient(to bottom, #1097f728, #03254ef1), url('./images/background.webp');
    background-size: cover;
    background-position: center;
    background-attachment: fixed;
  }

  body {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;

    background: linear-gradient(to bottom, #10f72328, #034e20f1), url('./images/Stock-background.jpg');
    background-size: cover;
    background-position: center;
    background-attachment: fixed;
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

  .stocks-button:focus {
    background-color: green;
    color: #E7F0FF;
  }

  .crypto-button {
    border-left: 1px solid #03254E;
  }

  .crypto-button:active {
    background-color: #03254E;
    color: #E7F0FF;
  }

  .stocks-logo, .crypto-logo {
    position: absolute;
    width: 125px;
    bottom: 50px;
    right: 70px;
  }
</style>