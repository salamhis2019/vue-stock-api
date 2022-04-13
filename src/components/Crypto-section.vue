<template>
  <h1>Crypto</h1>
  <button @click="fetchCrypto">Button</button>
</template>

<script>
const APIKEY = 'LTSY55G9R1CJFQ11'

export default {
  name: 'CryptoSection',
  methods: {
    async fetchCrypto() {
      this.isLoading = true
      const data = await fetch(`https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=BTC&to_currency=USD&apikey=${APIKEY}`).then(res => res.json())
      console.log(data)
    }
  }
}
</script>