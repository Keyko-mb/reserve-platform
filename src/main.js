import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.bundle.js'
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap'
import './api.js'
import { createPinia } from 'pinia'
import { createYmaps } from 'vue-yandex-maps'

const app = createApp(App)
const pinia = createPinia()

app.use(createYmaps({
  apikey: '6a88ab03-d7d3-4fbd-b663-73ee21e91f95',
  version: 'v3',
}));
app.use(pinia)
app.use(router)

app.mount('#app')
