import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:5000'
const app = createApp(App)

app.use(ElementPlus)

app.mount('#app')
