/*
 * @Author: LiLangXiong680
 * @Date: 2021-03-30 22:03:45
 * @LastEditors: LiLangXiong680
 * @LastEditTime: 2021-04-01 13:21:51
 * @FilePath: /nuxt/vue-ssr/src/app.js
 */
// 通用

import Vue from 'vue'
import VueMeta from 'vue-meta'
import App from './App.vue'
import { createRouter } from './router/index.js'
import { createStore } from './store/index.js'

Vue.use(VueMeta)

Vue.mixin({
  metaInfo: {
    titleTemplate: '%s - SSR'
  }
})

// 导出一个工厂函数，用于创建新的
// 应用程序、router 和 store 实例
// 使用函数返回，是确保每个实例都是独立的，不会交叉污染
export function createApp() {
  const router = createRouter() // 创建路由对象
  const store = createStore() // 创建数据仓库
  const app = new Vue({
    router, // 把路由挂载到Vue根实例中
    store, // 把store挂载到Vue根实例中
    render: h => h(App) // 根实例简单的渲染应用程序组件。
  })
  return { app, router, store }
}