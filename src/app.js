import Vue from 'vue'
import App from './App.vue'
import { createStore } from './store'
import { createRouter } from './router'
import { sync } from 'vuex-router-sync'
// 导出一个工厂函数，用于创建新的
// 应用程序、router 和 store 实例
export function createApp (ssrContext) {
  const store = createStore()
  const router = createRouter()

  sync(store, router)
  const app = new Vue({
    router,
    store,
    ssrContext,
    render: h => h(App)
  })
  return { app, router, store }
}
