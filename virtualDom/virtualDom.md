<!--
 * @Author: LiLangXiong680
 * @Date: 2021-03-07 17:41:47
 * @LastEditors: LiLangXiong680
 * @LastEditTime: 2021-03-07 17:51:47
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
