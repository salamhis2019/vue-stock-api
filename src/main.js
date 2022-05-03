import { createApp } from 'vue'
import { createStore } from 'vuex'
import App from './App.vue'
import BaseCard from './components/UI/BaseCard.vue'
import FooterArea from './components/UI/Footer-area.vue'

const store = createStore({
  state () {
    return {
      stockInfo: {
        openPrice: '',
        closePrice: '',
        highPrice: '',
        lowPrice: '',
        volume: '',
        ticker: '',
        rawTicker: null,
        stockPerformance: null,
        percentChange: null,
        priceChange: null
      },
      cryptoInfo: {
        openPrice: '',
        closePrice: '',
        highPrice: '',
        lowPrice: '',
        volume: '',
        ticker: '',
        rawTicker: '',
        stockPerformance: null,
        percentChange: null,
        priceChange: null
      }
    }
  }
})

const app = createApp(App)

app.use(store)

app.component('base-card', BaseCard)
app.component('footer-area', FooterArea)
app.mount('#app')
