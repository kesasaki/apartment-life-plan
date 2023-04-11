import { createApp } from 'vue'
import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import App from './App.vue'

const router = createRouter({
  history: window.location.search ? createWebHashHistory() : createWebHistory(),
  routes: [
    {
      path: '/',
      component: App
    }
  ]
})

createApp(App).use(router).mount('#app')
