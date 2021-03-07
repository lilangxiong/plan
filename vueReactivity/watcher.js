class Watcher {
  constructor(vm, key, cb) {
    this.vm = vm
    // data中的属性名称
    this.key = key
    // 回调函数负责更新视图
    this.cb = cb
    // 以下有严格的执行顺序

    // 把watcher对象挂载到Dep类的静态属性target
    Dep.target = this
    // 触发get方法，在get方法中会嗲用addSubs
    this.oldValue = vm[key]
    // 防止重复收集
    Dep.target = null
  }

  // 当数据更新的时候更新视图
  update() {
    let newValue = this.vm[this.key]
    if (this.oldValue === newValue) return
    this.cb(newValue)
  }
}