<template>
  <div class="input-container">
    <input placeholder="Enter Ticker" class="input-element" name="name" type="text" v-model="symbol" @keyup.enter="fetchData" :id="errorClass">
    <button @click="fetchData">Generate</button>
  </div>
</template>

<script>

export default {
  name: "InputSection",
  props: ['symbolInput'],
  methods: {
    fetchData() {
      this.$emit('fetchApi', this.symbolInput)
    }
  }
}

</script>

<style>
/* INPUT AREA */

  .input-container {
    padding-top: 4em;
    text-align: center;
    margin: 0 auto;
    height: 80px;
    transition: 0.2s ease;
  }

  .input-element {
    background: none;
    border: none;
    border-radius: 0; 

    height: 28px;
    border-bottom: 1px solid #03254E;
  }

  .input-element::placeholder {
    color: #03254E;
    font-size: 1.2em;
    text-align: left;

    text-transform: uppercase;
  }

  .input-element:focus {
    border-radius: 0px;
    font-size: 1em;
    outline: none;
    color: #03254E;
    text-transform: uppercase;
  }

  input[type="text"] {
    font-size: 1em;
    color: #03254E;

    text-transform: uppercase;
  }

  /* BUTTON STYLES */

  button {
    margin: 0 auto;
    border: 1px solid #03254E;
    height: 2em;

    font-size: 1em;
    background-color: #03254E;
    color: #E7F0FF;
    cursor: pointer;
    vertical-align: baseline;
    transition: all 250ms;
  }

  button:focus {
    background-color: #1098f7;
    box-shadow: rgba(0, 0, 0, .06) 0 2px 4px;
    transform: translateY(0);
  }

  button:hover {
    transform: translateY(-1px);
  }

  button:hover, button:focus {
    background-color: #E7F0FF;
    box-shadow: rgba(0, 0, 0, 0.1) 0 4px 12px;
    color: #03254E;
  }
</style>