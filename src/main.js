import { createApp } from 'vue'
import App from './App.vue'
import BaseCard from './components/UI/BaseCard.vue'
import { createPinia } from 'pinia'

const app = createApp(App)
const pinia = createPinia()

app.component('base-card', BaseCard)
app.use(pinia)
app.mount('#app')
