/*
 * @Author: LiLangXiong680
 * @Date: 2021-03-07 18:00:03
 * @LastEditors: LiLangXiong680
 * @LastEditTime: 2021-03-14 09:19:04
 * @FilePath: /plan/virtualDom/snabbdom-demo/src/05-basicusage.js
 */
import { init } from 'snabbdom/build/package/init'
import { h } from 'snabbdom/build/package/h'
import { attributesModule } from 'snabbdom/build/package/modules/attributes'
import { eventListenersModule } from 'snabbdom/build/package/modules/eventListeners'


const patch = init([attributesModule, eventListenersModule])
const data = [1, 2, 3, 4]
let oldVnode = null

function view(data) {
  let arr = []
  data.forEach(item => {
    // 不设置key
    // arr.push(h('li', [h('input', { attrs: { type: 'checkbox' } }), h('span', item)]))
    // 设置key
    arr.push(h('li', { key: item }, [h('input', { attrs: { type: 'checkbox' } }), h('span', item)]))
  })
  let vnode = h('div', [h('button', {
    on: {
      click: function () {
        data.unshift(100)
        vnode = view(data)
        oldVnode = patch(oldVnode, vnode)
      }
    }
  }, '按钮'), h('ul', arr)])

  return vnode
}

let app = document.querySelector('#app')
oldVnode = patch(app, view(data))