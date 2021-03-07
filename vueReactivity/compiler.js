class Compiler {
  constructor(vm) {
    this.el = vm.$el
    this.vm = vm
    // 编译模版
    this.compiler(this.el)
  }

  // 编译模版
  compiler(el) {
    const childNodes = el.childNodes
    Array.from(childNodes).forEach(node => {
      if (this.isTextNode(node)) {
        // 处理文本节点
        this.compilerText(node)
      } else if (this.isElementNode(node)) {
        // 处理元素节点
        this.compilerElement(node)
      }

      // 判断node节点是否有子节点，如果有，递归处理
      if (node.childNodes && node.childNodes.length) this.compiler(node)
    })
  }

  update(node, key, attrName) {
    let updateFn = this[`${attrName}Updater`]
    updateFn && updateFn.call(this, node, this.vm[key], key)
  }

  // 处理 v-text 指令
  textUpdater(node, value, key) {
    // 首次渲染时更新视图
    node.textContent = value

    // 创建watcher对象，当数据再次改变时更新视图
    new Watcher(this.vm, key, (newValue) => {
      node.textContent = newValue
    })
  }

  // 处理 v-model 指令
  modelUpdater(node, value, key) {
    // 首次渲染时更新视图
    node.value = value

    // 创建watcher对象，当数据再次改变时更新视图
    new Watcher(this.vm, key, (newValue) => {
      node.value = newValue
    })

    // 双向数据绑定
    node.addEventListener('input', () => {
      this.vm[key] = node.value
    })
  }

  // 编译元素节点，处理指令
  compilerElement(node) {
    // 遍历所有的属性节点
    Array.from(node.attributes).forEach(attr => {
      // 判断是否是指令
      let attrName = attr.name
      if (this.isDirective(attrName)) {
        // v-text ---> text，使用策略模式
        attrName = attrName.substr(2)
        let key = attr.value
        this.update(node, key, attrName)
      }
    })
  }

  // 编译文本节点，处理差值表达式{{ msg }}
  compilerText(node) {
    let reg = /\{\{(.+?)\}\}/
    let value = node.textContent
    if (reg.test(value)) {
      let key = RegExp.$1.trim()
      // 首次渲染时更新视图
      node.textContent = value.replace(reg, this.vm[key])

      // 创建watcher对象，当数据再次改变时更新视图
      new Watcher(this.vm, key, (newValue) => {
        node.textContent = newValue
      })
    }
  }

  // 判断原属属性是否是指令
  isDirective(attrName) {
    return attrName.startsWith('v-')
  }

  // 判断节点是否是文本节点
  isTextNode(node) {
    return node.nodeType === 3
  }

  // 判断节点是否是元素节点
  isElementNode(node) {
    return node.nodeType === 1
  }
}