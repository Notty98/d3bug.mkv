import { createApp } from 'vue'
import App from './App.vue'

import { BootstrapVueNext } from 'bootstrap-vue-next'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css'

import router from './router'

const app = createApp(App)
app.use(BootstrapVueNext)
app.use(router)
app.mount('#app')
