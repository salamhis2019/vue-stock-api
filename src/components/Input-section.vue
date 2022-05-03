<template>
  <div class="input-container">
    <!-- INPUT AREA TO GENERATE -->
    <div :class="currentInputStyling">
      <input 
      placeholder="Enter Ticker" 
      :class="currentStyling" 
      name="name" 
      type="text" 
      v-model="symbol"
      @keyup.enter="fetchData"
      > 
      <i :class="currentButtonStyle" @click="fetchData">keyboard_arrow_right</i>
    </div>
  </div>
</template>


<script>


export default {
  name: "InputSection",
  props: ['dataSectionStyle'],
  data () {
    return {
      symbol: ''
    }
  },
  computed: {
    currentInputStyling: function () {
      return (this.dataSectionStyle === 'stock-container') ? 'input-and-button' : 'input-and-button-crypto'
    },
    currentStyling: function () {
      return (this.dataSectionStyle === 'stock-container') ? 'stock-input' : 'crypto-input'      
    },

    currentButtonStyle: function () {
      return (this.dataSectionStyle === 'stock-container') ? 'material-icons stock-arrow' : 'material-icons crypto-arrow'
    },
  },
  methods: {
    fetchData() {
      this.$emit('fetchApi', this.symbol)
    }
  }
}

</script>

<style scoped>
/* INPUT AREA STYLES */
  .input-container {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    margin: 0 auto;
    height: 100%;

    transition: 0.2s ease;
  }

  .input-and-button, .input-and-button-crypto {
    height: 75px;
    min-width: 350px;
    display: flex;
    justify-content: space-evenly;
    align-items: center;

    border-bottom-width: 3px;
    border-bottom-style: solid;
    background: #004f6b47;
    border-radius: 5px; 
  }

  .input-and-button-crypto {
    border-image: linear-gradient(to right, #03254E, #1097f7) 1; 
  }

  .input-and-button {
    border-image: linear-gradient(to right, #002F09, #52E24B) 1;    
  }

  .stock-input, .crypto-input {
    background: none;
    outline: none;
    border: none;
  }

  .stock-input::placeholder,
  .crypto-input::placeholder {
    color: #ffffff8f;
    text-align: left;
    text-transform: capitalize;
  }

  .input-and-button:focus {
    border: 2px solid white;
  }

  .stock-input[type="text"], .crypto-input[type="text"] {
    font-size: 1.5em;
    color: #E7F0FF;
    text-transform: uppercase;
  }

  /* BUTTON STYLES */

  .stock-arrow, .crypto-arrow {
    font-size: 2.5em;
    border-radius: 50%;
    color: #e7f0ffa0;

    cursor: pointer;
    transition: 0.3s ease;
  }

  .stock-arrow:hover {
    transform: translateX(4px);
    color: #E7F0FF;
    background: radial-gradient(circle, #52E24B, #002F09 95%);
  }

  .crypto-arrow:hover {
    transform: translateX(4px);
    color: #E7F0FF;
    background: radial-gradient(circle, #1097f7, #03254E 95%);
  }

  .stock-arrow:active,
  .crypto-arrow:active {
    transform: translateX(-3px);
  }
</style>