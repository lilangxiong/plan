/*
 * @Author: LiLangXiong680
 * @Date: 2021-03-07 18:00:03
 * @LastEditors: LiLangXiong680
 * @LastEditTime: 2021-03-10 22:06:57
 * @FilePath: /plan/virtualDom/snabbdom-demo/src/01-basicusage.js
 */
import { init } from 'snabbdom/build/package/init'
import { h } from 'snabbdom/build/package/h'

const patch = init([])

// 第一个参数：标签+选择器
// 第二个参数：如果是字符串就是标签中的文本内容
// let vnode = h('div#container.cls', 'Hello World')
let vnode = h('div#container.cls', {
  hook: {
    init(vnode) {
      console.log(vnode.elm)
    },
    create(emptyNode, vnode) {
      console.log(vnode.elm)
    }
  }
}, 'Hello World')
let app = document.querySelector('#app')
// 第一个参数：旧的VNode，可以是DOM元素
// 第二个参数：新的VNode
// 返回新的VNode
let oldVnode = patch(app, vnode)

vnode = h('div#container.xxx', 'Hello World2')
patch(oldVnode, vnode)