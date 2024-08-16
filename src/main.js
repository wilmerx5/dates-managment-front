import './assets/main.css'

import { createPinia } from 'pinia'
import { createApp } from 'vue'
import config from '../formkit.config'


import { defaultConfig, plugin } from '@formkit/vue'
import { useToast } from 'vue-toast-notification'
import "vue-toast-notification/dist/theme-sugar.css"
import App from './App.vue'
import router from './router'
const app = createApp(App)
const $toast = useToast({
    duration:5000,
    position:'top-right'
})

app.provide('toast',$toast)
app.use(createPinia())
app.use(router)

app.use(plugin,defaultConfig(config))

app.mount('#app')
