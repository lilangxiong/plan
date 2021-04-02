import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _1c323b39 = () => interopDefault(import('../pages/404.vue' /* webpackChunkName: "pages/404" */))
const _46e3a664 = () => interopDefault(import('../pages/about.vue' /* webpackChunkName: "pages/about" */))
const _0c83dacc = () => interopDefault(import('../pages/user.vue' /* webpackChunkName: "pages/user" */))
const _49b4bd9d = () => interopDefault(import('../pages/user/index.vue' /* webpackChunkName: "pages/user/index" */))
const _29fce2d8 = () => interopDefault(import('../pages/user/about.vue' /* webpackChunkName: "pages/user/about" */))
const _f8c0f976 = () => interopDefault(import('../pages/user/_id.vue' /* webpackChunkName: "pages/user/_id" */))
const _0773f0da = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/abc/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/404",
    component: _1c323b39,
    name: "404"
  }, {
    path: "/about",
    component: _46e3a664,
    name: "about"
  }, {
    path: "/user",
    component: _0c83dacc,
    children: [{
      path: "",
      component: _49b4bd9d,
      name: "user"
    }, {
      path: "about",
      component: _29fce2d8,
      name: "user-about"
    }, {
      path: ":id",
      component: _f8c0f976,
      name: "user-id"
    }]
  }, {
    path: "/",
    component: _0773f0da,
    name: "index"
  }, {
    path: "/hello",
    component: _1c323b39,
    name: "hello"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config.app && config.app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
