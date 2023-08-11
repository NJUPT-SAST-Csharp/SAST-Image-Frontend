import 'element-plus/theme-chalk/dark/css-vars.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { i18n } from './locales/i18n'

import App from './App.vue'
import router from './router'
import axios from 'axios'

axios.defaults.baseURL = ''
const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(i18n)

app.mount('#app')
