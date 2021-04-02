/*
 * @Author: LiLangXiong680
 * @Date: 2021-03-30 22:10:03
 * @LastEditors: LiLangXiong680
 * @LastEditTime: 2021-04-01 13:37:12
 * @FilePath: /nuxt/vue-ssr/src/entry-server.js
 */
import { createApp } from './app'

// renderToString的第一个参数就是context
export default async context => {
  // 因为有可能会是异步路由钩子函数或组件，所以我们将返回一个 Promise，
  // 以便服务器能够等待所有的内容在渲染前，
  // 就已经准备就绪。
  const { app, router, store } = createApp()

  const meta = app.$meta()

  // 设置服务器端 router 的位置
  router.push(context.url)

  context.meta = meta

  // router.onReady(() => {
  //   const matchedComponents = router.getMatchedComponents()
  //   // 匹配不到的路由，执行 reject 函数，并返回 404
  //   if (!matchedComponents.length) {
  //     return reject({ code: 404 })
  //   }

  //   // Promise 应该 resolve 应用程序实例，以便它可以渲染
  //   resolve(app)
  // }, reject)

  // 等到 router 将可能的异步组件和钩子函数解析完
  await new Promise(router.onReady.bind(router)) // bind解决this指向问题

  context.rendered = () => {
    // 在应用渲染完成以后，服务端 Vuex 容器中已经填充了状态数据
    // 这里手动的把容器中的状态数据放到 context 上下文中
    // Renderer 在渲染页面模板的时候会把 state 序列化为字符串串内联到页面中 // window.__INITIAL_STATE__ = store.state


    // Renderer 会把 context.state 数据对象内联到页面模板中
    // 最终发送给客户端的页面中会包含一段脚本：window.__INITIAL_STATE__ = context.state
    // 客户端就要把页面中的 window.__INITIAL_STATE__ 拿出来填充到客户端 store 容器中
    context.state = store.state
  }

  return app
}