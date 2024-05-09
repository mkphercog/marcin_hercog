import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import './firebase/firebase'
import BaseLoader from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/css/index.css'

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.component('BaseLoader', BaseLoader)

app.mount('#app')
