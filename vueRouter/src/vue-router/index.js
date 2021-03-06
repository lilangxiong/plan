/*
 * @Author: LiLangXiong680
 * @Date: 2021-03-06 20:43:41
 * @LastEditors: LiLangXiong680
 * @LastEditTime: 2021-03-06 21:06:58
 * @FilePath: /plan/vueRouter/src/vue-router/index.js
 */
let _Vue = null

export default class VueRouter {
  static install(Vue) {
    // 1. 判断当前插件是否已经安装
    if (VueRouter.install.installed) return
    VueRouter.install.installed = true
    // 2. 把Vue构造函数记录到全局变量
    _Vue = Vue
    // 3. 把创建Vue实例时候传入的router对象注入到Vue实例上
    // 混入
    _Vue.mixin({
      // 确保能拿到Vue实例
      beforeCreate() {
        // 只有实例才需要执行，组件不需要
        if (this.$options.router) {
          // 将VueRouter实例挂载在prototype上，所有子组件都可以拿到
          // 作用就体现在router-link中的this.$router.data.current，子组件实例也能获取$router
          _Vue.prototype.$router = this.$options.router
          this.$options.router.init()
        }
      },
    })
  }

  constructor(options) {
    this.options = options
    this.routerMap = {}
    // 响应式数据，实现current变更之后视图router-view自动更新
    this.data = _Vue.observable({
      current: '/'
    })
  }

  init() {
    this.createRouteMap()
    this.initComponents(_Vue)
    this.initEvent()
  }

  createRouteMap() {
    // 遍历所有的路由规则，把路由规则解析成键值对的形式，存储到routeMap中
    this.options.routes.forEach(route => {
      this.routerMap[route.path] = route.component
    })
  }

  initComponents(Vue) {
    const self = this

    // 注册router-link组件
    Vue.component('router-link', {
      props: {
        to: String
      },
      // 运行时编译的vue，直接返回render函数
      render(h) {
        return h('a', {
          attrs: {
            href: this.to
          },
          on: {
            click: this.clickHandler
          }
        }, [this.$slots.default])
      },
      methods: {
        clickHandler(e) {
          // 通过pushState修改导航栏的URL，但不会触发浏览器刷新
          history.pushState({}, '', this.to)
          // 修改vueRouter的响应数据current，自动触发视图更新
          this.$router.data.current = this.to
          // 阻止a链接的默认行为，不跳转
          e.preventDefault()
        }
      }
      // 完整版的vue，需要在vue.config.js中设置：runtimeCompiler: true，否则会报错：要求使用完整版本
      // template: '<a :href="to"><slot></slot></a>'
    })

    // 注册router-view组件
    Vue.component('router-view', {
      render(h) {
        // render函数内的this并非指向VueRouter，所以要使用self
        const component = self.routerMap[self.data.current]
        return h(component)
      }
    })
  }

  initEvent() {
    // 处理点击浏览器导航栏前进后退按钮时的当前视图变更
    window.addEventListener('popstate', () => {
      this.data.current = window.location.pathname
    })
  }
}
