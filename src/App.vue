<template>
  <div class="hero-container">
    <div class="tabs">
      <button :class="stockButtonStyle" class="button stock-default" @click="chooseComponent('StockSection')">Stocks</button>
      <button :class="cryptoButtonStyle" class="button crypto-default" @click="chooseComponent('CryptoSection')">Crypto</button>
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
      stockButtonStyle: 'stocks-button',
      cryptoButtonStyle: null,
    }
  },
  computed: {},
  methods: {
    chooseComponent(cmp) {
      this.component = cmp
      if (this.component !== 'StockSection') {
        document.body.classList.add('crypto-background')
        this.stockButtonStyle = null
        this.cryptoButtonStyle = 'crypto-button'
      } else {
        document.body.classList.remove('crypto-background')
        this.stockButtonStyle = 'stocks-button'
        this.cryptoButtonStyle = null
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
    background: linear-gradient(to bottom, #080808, rgb(0, 20, 42));
    background-size: cover;
    background-position: center;
    background-attachment: fixed;
  }

  body {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;

    background: linear-gradient(to bottom, #080808, rgb(0, 20, 2));
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

  .button {
    height: 2.5em;
    width: 175px;
    margin: 0.5em;

    background-color: #004f6b47;
    color: #ffffffab;
    font-size: 1.2em;
    font-family: 'Nunito', sans-serif;

    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
    border: none;
    cursor: pointer;
    transition: 0.2s ease
  }

  .stocks-button {
    margin-right: 0.5em;
    border-bottom: 2px solid;
    border-image: linear-gradient(to right, #002F09, #52E24B) 1;   
  }

  .crypto-button:hover {
    background-color: #004f6b8f;
  }
  
  .stocks-button:hover {
    background-color: #006b248f;
  }

  .crypto-button {
    border-bottom: 2px solid;
    border-image: linear-gradient(to right, #03254E, #1097f7) 1; 
    border-bottom-right-radius: 10px;

    transition: 0.2s ease;
  }

  .crypto-button:active {
    background-color: #03254E;
    color: #E7F0FF;
  }

  .crypto-default:hover {
    border-bottom: 2px solid;
    border-image: linear-gradient(to right, #03254E, #1097f7) 1; 
  }

  .stock-default:hover {
    border-bottom: 2px solid;
    border-image: linear-gradient(to right, #002F09, #52E24B) 1;  
  }

  .stocks-logo, .crypto-logo {
    position: absolute;
    width: 125px;
    bottom: 50px;
    right: 70px;
  }
</style>