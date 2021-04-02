/*
 * @Author: LiLangXiong680
 * @Date: 2021-03-30 12:43:02
 * @LastEditors: LiLangXiong680
 * @LastEditTime: 2021-03-30 13:19:24
 * @FilePath: /nuxtjs-demo/nuxt.config.js
 */
module.exports = {
  router: {
    base: '/abc',
    //路由配置表
    extendRoutes(routes, resolve) {
      routes.push({
        name: 'hello',
        path: '/hello',
        component: resolve(__dirname, 'pages/404.vue')
      })
    }
  }
}