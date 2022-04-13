<template>
  <div class="container">
    <InputSection />
    <div class="error-container">
      <ErrorPopup />
    </div>
  </div>
  <p class="recent-text">Recently Viewed</p>
</template>

<script>
import InputSection from '@/components/Input-section.vue'
import ErrorPopup from '@/components/Error-popup.vue'

const APIKEY = 'LTSY55G9R1CJFQ11'

export default {
  name: 'CryptoSection',
  components: {
    InputSection,
    ErrorPopup
  },
  data () {
    return {
      cryptoInfo: {
        openPrice: '',
        closePrice: '',
        highPrice: '',
        lowPrice: '',
        volume: '',
        ticker: '',
      },
      // DATA FOR UI ELEMENTS LOADING
      loadInfoContainer: false,
      isLoading: false,
      errorClass: false,
      loadingImage: require('../images/loading.gif'),
      // DATA RELATED TO RECENTLY VIEWED SECTION IN UI
      recentlyViewed: [],
    }
  },
  methods: {
    async fetchCrypto() {
      this.isLoading = true
      const data = await fetch(`https://www.alphavantage.co/query?function=CRYPTO_INTRADAY&symbol=ETH&market=USD&interval=5min&apikey=${APIKEY}`).then(res => res.json())
      console.log(data)
    }
  }
}
</script>

<style>

/* ERROR CONTAINER STYLES */
.error-container {
  text-align: center;
}
</style>