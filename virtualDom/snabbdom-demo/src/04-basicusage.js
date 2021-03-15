/*
 * @Author: LiLangXiong680
 * @Date: 2021-03-07 18:00:03
 * @LastEditors: LiLangXiong680
 * @LastEditTime: 2021-03-14 08:52:44
 * @FilePath: /plan/virtualDom/snabbdom-demo/src/04-basicusage.js
 */
import { init } from 'snabbdom/build/package/init'
import { h } from 'snabbdom/build/package/h'

const patch = init([])

// 第一个参数：标签+选择器
// 第二个参数：如果是字符串就是标签中的文本内容
// let vnode = h('div#container.cls', 'Hello World')
let vnode = h('ul', [
  h('li', { key: 'a' }, '首页'),
  h('li', { key: 'b' }, '视频'),
  h('li', { key: 'c' }, '微博')
])
let app = document.querySelector('#app')
// 第一个参数：旧的VNode，可以是DOM元素
// 第二个参数：新的VNode
// 返回新的VNode
let oldVnode = patch(app, vnode)

// updateChildren过程
vnode = h('ul', [
  h('li', { key: 'a' }, '首页'),
  h('li', { key: 'c' }, '微博'),
  h('li', { key: 'b' }, '视频')
])
patch(oldVnode, vnode)