/*
 * @Author: LiLangXiong680
 * @Date: 2021-04-01 13:13:25
 * @LastEditors: LiLangXiong680
 * @LastEditTime: 2021-04-01 13:19:02
 * @FilePath: /nuxt/vue-ssr/src/router/index.js
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/pages/Home'

Vue.use(VueRouter)

// 避免数据交叉污染
export const createRouter = () => {
  const router = new VueRouter({
    mode: 'history', // 兼容前后端，同构方式只能使用history
    routes: [
      {
        path: '/',
        name: 'home',
        component: Home
      },
      {
        path: '/about',
        name: 'about',
        component: () => import('@/pages/About') // 异步懒加载
      },

      {
        path: '/posts',
        name: 'posts',
        component: () => import('@/pages/Posts') // 异步懒加载
      },
      {
        path: '*',
        name: 'error404',
        component: () => import('@/pages/404') // 异步懒加载
      }
    ]
  })

  return router
}