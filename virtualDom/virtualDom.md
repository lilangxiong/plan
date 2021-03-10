<!--
 * @Author: LiLangXiong680
 * @Date: 2021-03-07 17:41:47
 * @LastEditors: LiLangXiong680
 * @LastEditTime: 2021-03-09 21:19:56
 * @FilePath: /plan/virtualDom/virtualDom.md
-->
## 什么是 Virtual DOM

- **Virtual DOM(虚拟 DOM)**，是由普通的 JS 对象来描述 DOM 对象，因为不是真实的 DOM 对象，所以叫 Virtual DOM

- 真实 DOM 成员

- 可以使用 Virtual DOM 来描述真实 DOM，示例

```javascript
{
  sel: "div",
  data: {},
  children: undefined,
  text: "Hello Virtual DOM",
  elm: undefined,
  key: undefined
}
```

##  为什么使用 Virtual DOM

- 手动操作 DOM 比较麻烦，还需要考虑浏览器兼容性问题，虽然有 jQuery 等库简化 DOM 操作，
但是随着项目的复杂 DOM 操作复杂提升。

- 为了简化 DOM 的复杂操作于是出现了各种 MVVM 框架，MVVM 框架解决了视图和状态的同步问
  题。

- 为了简化视图的操作我们可以使用模板引擎，但是模板引擎没有解决跟踪状态变化的问题，于是
Virtual DOM 出现了。

- Virtual DOM 的好处是当状态改变时不需要立即更新 DOM，只需要创建一个虚拟树来描述
DOM， Virtual DOM 内部将弄清楚如何有效(diff)的更新 DOM。

- 参考 github 上 virtual-dom 的描述
  - 虚拟 DOM 可以维护程序的状态，跟踪上一次的状态
  - 通过比较前后两次状态的差异更新真实 DOM

## 虚拟 DOM 的作用

- 维护视图和状态的关系
- 复杂视图情况下提升渲染性能
- 跨平台
  - 浏览器平台渲染DOM
  - 服务器端渲染SSR(Nuxt.js/Next.js)
  - 原生应用(Weex/React/Native)
  - 小程序(mpvue/uni-app)


## Virtual DOM 库

- [Snabbdom](https://github.com/snabbdom/snabbdom)
  - Vue 2.x 内部使用的 Virtual DOM 就是改造的
  - Snabbdom 大约 200 SLOC(single line of code)
  - 通过模块可扩展
  - 源码使用 TypeScript 开发
  - 最快的 Virtual DOM 之一

- [virtual-dom](https://github.com/Matt-Esch/virtual-dom)

## 案例演示

- [jQuery-demo](https://codesandbox.io/s/jq-demo-5i7qp)

- [snabbdom-demo](https://codesandbox.io/s/snabbdom-demo-4hbyb)

## Snabbdom

- 文档地址
  - https://github.com/snabbdom/snabbdom
  - 中文翻译

- 安装 Snabbdom

```javascript
yarn add snabbdom
```

## 导入 Snabbdom

- Snabbdom 的官网 demo 中导入使用的是 commonjs 模块化语法，我们使用更流行的 ES6 模块
化的语法 import

- 关于模块化的语法请参考阮一峰老师的 [Module 的语法](http://es6.ruanyifeng.com/#docs/module)


```javascript
import { init } from 'snabbdom/build/package/init'

import { h } from 'snabbdom/build/package/h'

import { thunk } from 'snabbdom/build/package/thunk'
```

 
- Snabbdom 的核心仅提供最基本的功能，只导出了三个函数 init()、h()、thunk()
  - init() 是一个高阶函数，返回 patch()
  - h() 返回虚拟节点 VNode，这个函数我们在使用 Vue.js 的时候见过
  ```javascript
  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app')
  ```
  - thunk() 是一种优化策略，可以在处理不可变数据时使用

- 基本使用
```javascript
import { init, h, thunk } from 'snabbdom'
// 使用 init() 函数创建 patch()
// init() 的参数是数组，将来可以传入模块，处理属性/样式/事件等 
let patch = init([])
// 使用 h() 函数创建 vnode 
let vnode = h('div.cls', [
  h('h1', 'Hello Snabbdom'),
  h('p', '这是段落') 
])
const app = document.querySelector('#app') 
// 把 vnode 渲染到空的 DOM 元素(替换)
// 会返回新的 vnode
let oldVnode = patch(app, vnode)
setTimeout(() => {
  vnode = h('div.cls', [
    h('h1', 'Hello World'),
    h('p', '这是段落') 
  ])
  // 把老的视图更新到新的状态
  oldVnode = patch(oldVnode, vnode)
  // 卸载 DOM，文档中 patch(oldVnode, null) 有误 
  // h('!') 是创建注释
  patch(oldVnode, h('!'))
}, 2000)
```

## Snabbdom 模块

Snabbdom 的核心库并不能处理元素的属性/样式/事件等，如果需要处理的话，可以使用模块。

### 常用模块

- attributes
  - 设置 DOM 元素的属性，使用 setAttribute ()
  - 处理布尔类型的属性
- props
  - 和 attributes 模块相似，设置 DOM 元素的属性 element[attr] = value
  - 不处理布尔类型的属性
- class
  - 切换类样式
  - 注意:给元素设置类样式是通过 sel 选择器 
- dataset
  - 设置 data-* 的自定义属性
- eventlisteners
  - 注册和移除事件
- style
  - 设置行内样式，支持动画
  - delayed/remove/destroy

### 模块使用步骤

- 导入需要的模块
- init() 中注册模块
- 使用 h() 函数创建 VNode 的时候，可以把第二个参数设置为对象，其他参数往后移

示例：

```javascript
import { init } from 'snabbdom/build/package/init'
import { h } from 'snabbdom/build/package/h'

// 导入需要的模块
import style from 'snabbdom/build/package/modules/style'
import eventlisteners from 'snabbdom/build/package/modules/eventlisteners' 
// 使用 init() 函数创建 patch()
// init() 的参数是数组，将来可以传入模块，处理属性/样式/事件等
let patch = init([
  // 注册模块 
  style, 
  eventlisteners
])


// 使用 h() 函数创建 vnode 
let vnode = h('div.cls', {
  // 设置 DOM 元素的行内样式
  style: { color: '#DEDEDE', backgroundColor: '#181A1B' }, // 注册事件
  on: { click: clickHandler }
 }, [
  h('h1', 'Hello Snabbdom'), 
  h('p', '这是段落')
])

function clickHandler () {
  // 此处的 this 指向对应的 vnode 
  console.log(this.elm.innerHTML)
}

```

## Snabbdom 源码解析

### Snabbdom 的核心

- init() 设置模块，创建 patch()
- 使用 h() 函数创建 JavaScript 对象(VNode)描述真实 DOM 
- patch() 比较新旧两个 VNode
- 把变化的内容更新到真实 DOM 树上

### Snabbdom 源码

- 源码地址:
  - https://github.com/snabbdom/snabbdom

- src 目录结构

```
│ h.ts                  h() 函数，用来创建 VNode

│ hooks.ts              所有钩子函数的定义

│ htmldomapi.ts         对 DOM API 的包装

│ is.ts                 判断数组和原始值的函数

│ jsx-global.d.ts       jsx 的类型声明文件

│ jsx.ts                处理 jsx

│ snabbdom.bundle.ts    入口，已经注册了模块

│ snabbdom.ts           初始化，返回 init/h/thunk

│ thunk.ts              优化处理，对复杂视图不可变值得优化

│ tovnode.ts            DOM 转换成 VNode

│ vnode.ts              虚拟节点定义

│

├─helpers

│      attachto.ts      定义了 vnode.ts 中 AttachData 的数据结构

│

└─modules               所有模块定义
      attributes.ts
      class.ts
      dataset.ts
      eventlisteners.ts
      hero.ts           example中使用到的自定义钩子
      module.ts         定义了模块中用到的钩子函数 props.ts
      style.ts
```

## h函数

### h函数介绍

- 作用： 创建VNode对象

- Vue中的h函数

```javascript
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
```

- h函数最早见于hyperscript，使用javascript创建超文本

### 函数重载

- 概念
  - 参数个数或类型不同的函数
  - JavaScript 中没有重载的概念
  - TypeScript 中有重载，不过重载的实现还是通过代码调整参数

- 示例
```javascript
function add (a, b) {
  console.log(a + b)
}
function add (a, b, c) {
  console.log(a + b + c)
}
add(1, 2)
add(1, 2, 3)
```

### 源码

```typescript
import { vnode, VNode, VNodeData } from './vnode'
import * as is from './is'

export type VNodes = VNode[]
export type VNodeChildElement = VNode | string | number | undefined | null
export type ArrayOrElement<T> = T | T[]
export type VNodeChildren = ArrayOrElement<VNodeChildElement>


// h 函数的重载
export function h(sel: string): VNode;
export function h(sel: string, data: VNodeData | null): VNode; export function h(sel: string, children: VNodeChildren): VNode; export function h(sel: string, data: VNodeData | null, children: VNodeChildren): VNode;

function addNS (data: any, children: VNodes | undefined, sel: string | undefined): void {
  data.ns = 'http://www.w3.org/2000/svg'
  if (sel !== 'foreignObject' && children !== undefined) {
    for (let i = 0; i < children.length; ++i) {
      const childData = children[i].data
      if (childData !== undefined) {
        addNS(childData, (children[i] as VNode).children as VNodes, children[i].sel)
      }
    }
  }
}

export function h (sel: string): VNode
export function h (sel: string, data: VNodeData | null): VNode
export function h (sel: string, children: VNodeChildren): VNode
export function h (sel: string, data: VNodeData | null, children: VNodeChildren): VNode
export function h (sel: any, b?: any, c?: any): VNode {
  var data: VNodeData = {}
  var children: any
  var text: any
  var i: number
  // 处理参数，实现重载的机制
  // 处理三个参数的情况：sel、data、children/text
  if (c !== undefined) {
    // b是一个VNode
    if (b !== null) {
      data = b
    }
    if (is.array(c)) {
      children = c
    } 
    // 如果 c 是字符串或者数字
    else if (is.primitive(c)) {
      text = c
    } 
    // 如果 c 是 VNode
    else if (c && c.sel) {
      children = [c]
    }
  } 
  // 处理两个参数的情况
  else if (b !== undefined && b !== null) {
    // 如果 b 是数组
    if (is.array(b)) {
      children = b
    } 
    // 如果 b 是字符串或者数字
    else if (is.primitive(b)) {
      text = b
    } 
    // 如果 b 是 VNode
    else if (b && b.sel) {
      children = [b]
    } 
    else { data = b }
  }
  if (children !== undefined) {
    // 处理 children 中的原始值(string/number)
    for (i = 0; i < children.length; ++i) {
      // 如果 child 是 string/number，创建文本节点
      if (is.primitive(children[i])) children[i] = vnode(undefined, undefined, undefined, children[i], undefined)
    }
  }
  if (
    sel[0] === 's' && sel[1] === 'v' && sel[2] === 'g' &&
    (sel.length === 3 || sel[3] === '.' || sel[3] === '#')
  ) {
    // 如果是 svg，添加命名空间
    addNS(data, children, sel)
  }
  // 返回 VNode
  return vnode(sel, data, children, text, undefined)
};
```

## VNode

- 一个 VNode 就是一个虚拟节点用来描述一个 DOM 元素，如果这个 VNode 有 children 就是 Virtual DOM

```javascript
export interface VNode {
  sel: string | undefined
  data: VNodeData | undefined
  children: Array<VNode | string> | undefined
  elm: Node | undefined
  text: string | undefined
  key: Key | undefined
}

export function vnode (
  sel: string | undefined,
  data: any | undefined,
  children: Array<VNode | string> | undefined,
  text: string | undefined,
  elm: Element | Text | undefined
  ): VNode {
  const key = data === undefined ? undefined : data.key
  return { sel, data, children, text, elm, key }
}
```

## init

**功能:** init(modules, domApi)，返回 patch() 函数(高阶函数)

- 为什么要使用高阶函数?
  
  因为 patch() 函数再外部会调用多次，每次调用依赖一些参数，比如: modules/domApi/cbs，通过高阶函数让 init() 内部形成闭包，返回的 patch() 可以访问到 modules/domApi/cbs，而不需要重新创建。
  
- init() 在返回 patch() 之前，首先初始化了domApi，然后收集了所有模块中的钩子函数存储到 cbs 对象中。


```javascript
export function init (modules: Array<Partial<Module>>, domApi?: DOMAPI) {
  let i: number
  let j: number
  const cbs: ModuleHooks = {
    create: [],
    update: [],
    remove: [],
    destroy: [],
    pre: [],
    post: []
  }

  // 初始化 domApi，这也是虚拟dom能实现跨平台的原因，即domApi默认使用浏览器domApi，并可由用户自定义
  const api: DOMAPI = domApi !== undefined ? domApi : htmlDomApi

  // 把传入的所有模块的钩子方法，统一存储到 cbs 对象中
  // 最终构建的 cbs 对象的形式 cbs = [ create: [fn1, fn2], update: [], ...]
  for (i = 0; i < hooks.length; ++i) {
    // cbs['create'] = []
    cbs[hooks[i]] = []
    for (j = 0; j < modules.length; ++j) {
      // const hook = modules[0]['create']
      const hook = modules[j][hooks[i]]
      if (hook !== undefined) {
        (cbs[hooks[i]] as any[]).push(hook)
      }
    }
  }

  return function patch (oldVnode: VNode | Element, vnode: VNode): VNode {}
}
```

## patch过程

**patch(oldVnode, newVnode)**

- 打补丁，把新节点中变化的内容渲染到真实 DOM，最后返回新节点作为下一次处理的旧节点
- 对比新旧 VNode 是否相同节点(节点的 key 和 sel 相同) 
- 如果不是相同节点，删除之前的内容，重新渲染
- 如果是相同节点，再判断新的 VNode 是否有 text，如果有并且和 oldVnode 的 text 不同，直接更 新文本内容
- 如果新的 VNode 有 children，判断子节点是否有变化，判断子节点的过程使用的就是 diff 算法 diff 过程只进行同层级比较
