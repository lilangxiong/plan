## new 原理

```js
function create (ctr) {
    // 创建一个空对象
    let obj = new Object()
    // 获取构造函数
    let Con = [].shift.call(arguments)
    // 将对象（实例）的 __proto__ 和构造函数的 prototype 绑定
    obj.__proto__ = Con.prototype
    // 绑定this，以及参数
    let result = Con.apply(obj, arguments);
    // 确保返回的是对象
    return typeof result === 'object'? result : obj;
}
```