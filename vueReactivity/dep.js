class Dep {
  constructor() {
    this.subs = []
  }

  // 添加观察者
  addSubs(watcher) {
    if (watcher && watcher.update) {
      this.subs.push(watcher)
    }
  }

  // 调用观察者的update
  notify() {
    this.subs.forEach(watcher => watcher.update())
  }
}