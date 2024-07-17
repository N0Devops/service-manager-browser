import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import "@/assets/css/global.css";
import "@/assets/css/tailwind.css";

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { zhCn } from "element-plus/es/locale/index";
import { createPinia } from "pinia";

function boot() {
  const pinia = createPinia()
  const app = createApp(App)
  app.use(ElementPlus, {
    size: "small",
    locale: zhCn,
  })
  app.use(pinia)
  app.use(router)
  app.mount('#app')
}

boot()
