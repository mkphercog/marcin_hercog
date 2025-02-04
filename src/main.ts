import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { router } from './routes'
import App from './App.vue'
import './firebase/firebase'
import BaseLoader from 'vue-loading-overlay'

import 'vue-loading-overlay/dist/css/index.css'
import './assets/styles/global.scss'

const app = createApp(App)
const pinia = createPinia()

app.use(router)
app.use(pinia)
app.component('BaseLoader', BaseLoader)

app.mount('#app')
