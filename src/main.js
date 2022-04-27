import { createApp } from 'vue'
import App from './App.vue'
import VueChartkick from 'vue-chartkick'
import 'chartkick/chart.js'
import BaseCard from './components/UI/BaseCard.vue'

const app = createApp(App)
app.use(VueChartkick)

app.component('base-card', BaseCard)

app.mount('#app')
