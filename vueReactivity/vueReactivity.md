
## 准备工作

- 数据驱动
- 响应式的核心原理
- 发布订阅模式和观察者模式

## 数据驱动
- 数据响应式、双向绑定、数据驱动
  - 数据响应式
    - 数据模型仅仅是普通的 JavaScript 对象，而当我们修改数据时，视图会进行更新，避免了繁琐的 DOM 操作，提高开发效率
  - 双向绑定
    - 数据改变，视图改变;视图改变，数据也随之改变
    - 我们可以使用 v-model 在表单元素上创建双向数据绑定
  - 数据驱动是 Vue 最独特的特性之一
    - 开发过程中仅需要关注数据本身，不需要关心数据是如何渲染到视图

## 数据响应式的核心原理

### Vue 2.x

- [Vue 2.x深入响应式原理](https://cn.vuejs.org/v2/guide/reactivity.html)

- [MDN - Object.defineProperty]()

- 由于defineProperty无法降级，浏览器兼容 IE8 以上(不兼容 IE8)。

```html
<!DOCTYPE html>
<html lang="cn">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>defineProperty</title>
  </head>
  <body>
    <div id="app">msg</div>

    <script>
      // 模拟 Vue 中的 data 选项 
      let data = {
          msg: 'hello'
      }
      // 模拟 Vue 的实例
      let vm = {}

      // 数据劫持:当访问或者设置 vm 中的成员的时候，做一些干预操作
      Object.defineProperty(vm, 'msg', {
        // 可枚举(可遍历)
        enumerable: true,
        // 可配置(可以使用 delete 删除，可以通过 defineProperty 重新定义) 
        configurable: true,
        // 当获取值的时候执行
        get () {
            console.log('get: ', data.msg)
            return data.msg
        },
        // 当设置值的时候执行
        set (newValue) {
          console.log('set: ', newValue)
          if (newValue === data.msg) {
            return
          }
          data.msg = newValue
          // 数据更改，更新 DOM 的值
          document.querySelector('#app').textContent = data.msg
        }
      })
      // 测试
      vm.msg = 'Hello World'
      console.log(vm.msg)
    </script>
  </body>
</html>
```

### Vue 3.x

- [MDN - Proxy]()

- 直接监听对象，而非属性。

- ES6 中新增，IE 不支持，性能由浏览器优化。

```html
<!DOCTYPE html>
<html lang="cn">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>defineProperty</title>
  </head>
  <body>
    <script>
      // 模拟 Vue 中的 data 选项
      let data = {
        msg: 'hello',
        count: 0 
      }
      // 模拟 Vue 实例
      // 直接劫持整个对象，无需遍历对象。性能也优于defineProperty。
      let vm = new Proxy(data, {
        // 当访问 vm 的成员会执行
        get (target, key) {
            console.log('get, key: ', key, target[key])
            return target[key]
        },
        // 当设置 vm 的成员会执行
        set (target, key, newValue) {
          console.log('set, key: ', key,newValue)
          if (target[key] === newValue) {
            return
          }
          target[key] = newValue
          document.querySelector('#app').textContent = target[key]
        } 
      })
      // 测试
      vm.msg = 'Hello World'
      console.log(vm.msg)
    </script>
  </body>
</html>
```

## 发布订阅模式和观察者模式

### 发布/订阅模式

- 发布/订阅模式

  - 订阅者

  - 发布者

  - 信号中心

  > 我们假定，存在一个"信号中心"，某个任务执行完成，就向信号中心"发布"(publish)一个信号，其他任务可以向信号中心"订阅"(subscribe)这个信号，从而知道什么时候自己可以开始执行。这就叫做"发布/订阅模式"(publish-subscribe pattern)。

- [Vue 的自定义事件](https://cn.vuejs.org/v2/guide/migration.html#dispatch-和-broadcast-替换)

```javascript
let vm = new Vue()

vm.$on('dataChange', () => {
  console.log('dataChange')
})

vm.$on('dataChange', () => {
  console.log('dataChange1')
})

vm.$emit('dataChange')
```

- 兄弟组件通信过程

```javascript
// eventBus.js
// 事件中心
let eventHub = new Vue()

// ComponentA.vue
// 发布者
addTodo: function () {
  // 发布消息(事件)
  eventHub.$emit('add-todo', { text: 'todo text' })
}

// ComponentB.vue
// 订阅者
created: function () {
  // 订阅消息(事件)
  eventHub.$on('add-todo', (data) => {
    console.log('text: ', data.text)
  })
}
```

- 模拟 Vue 自定义事件的实现

```javascript
class EventEmitter {
  constructor() {
    this.subs = Object.create(null) // {}，不需要Object的原型，可以提升性能
  }

  $on(eventType, handler) {
    this.subs[eventType] = this.subs[eventType] || []
    this.subs[eventType].push(handler)
  }

  $emit(eventType, data) {
    if (this.subs[eventType]) {
      this.subs[eventType].forEach(handler => handler(data))
    }
  }
}
```