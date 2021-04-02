/*
 * @Author: LiLangXiong680
 * @Date: 2021-03-30 22:09:14
 * @LastEditors: LiLangXiong680
 * @LastEditTime: 2021-03-30 22:13:10
 * @FilePath: /nuxt/vue-ssr/src/entry-client.js
 */

import { createApp } from './app'

// 客户端特定引导逻辑……

const { app, router, store } = createApp()

if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__)
}

router.onReady(() => {
  // 这里假定 App.vue 模板中根元素具有 `id="app"`
  app.$mount('#app')
})
