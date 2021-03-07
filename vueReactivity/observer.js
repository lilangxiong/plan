class Observer {
  constructor(data) {
    this.walk(data)
  }

  walk(data) {
    // 判断data是否是对象
    if (!data || typeof data !== 'object') return
    // 遍历data属性，转为响应式
    Object.keys(data).forEach(key => {
      this.defineReactive(data, key, data[key])
    })
  }

  defineReactive(obj, key, val) {
    const self = this
    // 负责收集依赖，并发送通知
    const dep = new Dep()
    Object.defineProperty(obj, key, {
      enumerable: true,
      configurable: true,
      get() {
        // 收集依赖
        Dep.target && dep.addSubs(Dep.target)
        return val // 此处不能使用obj[key]，否则会引起死循环：vm.msg --> 触发vm.msg的get --> data[msg] --> 触发this.$data.msg的get --> data[msg] --> 触发this.$data.msg的get ......
      },
      set(newValue) {
        if (newValue === val) return
        val = newValue
        self.walk(newValue)
        // 发送通知
        dep.notify()
      }
    })
  }
}