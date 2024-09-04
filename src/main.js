import './assets/main.css'

import { defaultConfig, plugin } from '@formkit/vue'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import { VueFire, VueFireAuth } from 'vuefire'
import config from '../formkit.config'
import { firebaseApp } from './config/firebase'



import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(plugin,defaultConfig(config))

app.use(VueFire, {
    firebaseApp,
    modules: [VueFireAuth()],
  })
app.use(createPinia())
app.use(router)

app.mount('#app')
