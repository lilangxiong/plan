## 强类型与弱类型

## 静态类型与动态类型

## javascript类型系统特征

## 弱类型的问题

1. 异常需要等到运行时才能发现

```javascript
const obj = {}

setTimeout(() => {
  obj.foo()
}, 1000000)
```

2. 函数功能可能发生改变

```javascript
function sum (a, b) {
  return a + b
}

console.log(sum(100, 100)) // 200
console.log(sum(100, '100')) // 100100
```

3. 对象索引器的错误用法

```javascript
const obj = {}

obj[true] = 100 // 属性名会自动转换为字符串

console.log(obj['true'])
```

## 强类型的优势

1. 强类型代码错误更早暴露

2. 强类型代码更智能，编码更准确

```javascript
// 编辑器会根据类型给出提示
function render (element) {
  element.className = 'container'
  element.innerHtml = 'hello world'
}
```

3. 重构更可靠

```javascript
const util = {
  aaa: () => {
    console.log('util func')
  }
}
```

4. 减少了代码层面的不必要的类型判断

```javascript
// 强类型不需要以下判断
function sum (a, b) {
  if (typeof a !== 'number' || typeof b !== 'number') {
    throw new TypeError('arguments must be a number')
  }

  return a + b
}
```