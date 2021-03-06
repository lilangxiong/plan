<!--
 * @Author: LiLangXiong680
 * @Date: 2021-02-28 14:01:33
 * @LastEditors: LiLangXiong680
 * @LastEditTime: 2021-03-01 21:25:21
 * @FilePath: /plan/promise/promise.md
-->
# 手写Promise


## 最基本的实现 - 不考虑异步

1. Promise 就是一个类，在执行这个类的时候 需要传递一个执行器进去，执行器立即执行。
2. Promise 有三种状态，分别为：成功 fulfilled 失败 rejected 等待 pending
    pending ---> fulfilled
    pending ---> rejected
    一旦状态确定就不可更改
3. resolve、reject函数是用来改变状态的
    resolve ---> fulfilled
    reject ---> rejected
4. then 方法内部做的事情就判断状态，如果状态是成功，调用成功的回调函数，如果状态是失败，调用失败的回调函数。
5. then 成功回调又一个参数，表示成功后的值，then 失败回调有一个参数，表示失败后的原因。


```javascript
// 使用
const MyPromise = require('./MyPromise');

const promise = new MyPromise((resolve, reject) => {
  resolve('成功');
  // reject('失败');
});

promise.then(value => {}, reason => {});

```

```javascript
// MyPromise.js
// 最基本的实现 - 不考虑异步

const FULFILLED = 'fulfilled'; // 成功
const REJECTED = 'rejected'; // 失败
const PENDING = 'pending'; // 等待

class MyPromise {
  // 传入执行器
  constructor(executor) {
    executor(this.resolve, this.reject);
  }

  // promise状态
  status = PENDING;
  // 成功之后的值
  value = undefined;
  // 失败之后的值
  reason = undefined;

  resolve = value => {
    // 如果状态不是等待，阻止程序继续执行
    if (this.status !== PENDING) return;
    // 保存成功之后的值
    this.value = value;
    // 修改状态
    this.status = FULFILLED;
  }

  reject = reason => {
     // 如果状态不是等待，阻止程序继续执行
    if (this.status !== PENDING) return;
    // 保存失败之后的原因
    this.reason = reason;
    // 修改状态
    this.status = REJECTED;
  }

  then = (successCallback, failCallback) => {
    // 判断状态，执行相应的回调
    if (this.status === FULFILLED) {
      successCallback(this.value);
    } else if (this.status === REJECTED) {
      failCallback(this.reason);
    }
  }
}

```

## 考虑异步情况

6. then方法判断是否等待状态，等待的时候保存成功回调、失败回调。


```javascript
// 使用
const MyPromise = require('./MyPromise');

const promise = new MyPromise((resolve, reject) => {
  // 模拟异步
  setTimeout(() => {
    resolve('成功');
  }, 2000);
  // reject('失败');
});

promise.then(value => {
  console.log(value);
}, reason => {
  console.log(reason);
});

```

```javascript
// MyPromise.js
// 考虑异步

const FULFILLED = 'fulfilled'; // 成功
const REJECTED = 'rejected'; // 失败
const PENDING = 'pending'; // 等待

class MyPromise {
  // 传入执行器
  constructor(executor) {
    executor(this.resolve, this.reject);
  }
  
  // promise状态
  status = PENDING;
  // 成功之后的值
  value = undefined;
  // 失败之后的值
  reason = undefined;
  // 成功回调
  successCallback = undefined;
  // 失败回调
  failCallback = undefined;

  resolve = value => {
    // 如果状态不是等待，阻止程序继续执行
    if (this.status !== PENDING) return;
    // 保存成功之后的值
    this.value = value;
    // 修改状态
    this.status = FULFILLED;
    // 如果成功回调存在，立即调用
    if (this.successCallback) this.successCallback(value);
  }

  reject = reason => {
     // 如果状态不是等待，阻止程序继续执行
    if (this.status !== PENDING) return;
    // 保存失败之后的原因
    this.reason = reason;
    // 修改状态
    this.status = REJECTED;
    // 如果失败回调存在，立即回调
    if (this.failCallback) this.failCallback(reason);
  }

  then = (successCallback, failCallback) => {
    // 判断状态，执行相应的回调
    if (this.status === FULFILLED) {
      successCallback(this.value);
    } else if (this.status === REJECTED) {
      failCallback(this.reason);
    } else {
      // 判断是否等待状态
      // 存储回调函数
      this.successCallback = successCallback；
      this.failCallback = failCallback;
    }
  }
}

```

## then有多个回调处理函数

7. then方法判断是否等待状态，等待的时候保存成功回调、失败回调的方式改为数组。

8. resolve、reject方法中遍历执行所有成功回调、失败回调。

```javascript
// 使用
const MyPromise = require('./MyPromise');

const promise = new MyPromise((resolve, reject) => {
  // 模拟异步
  setTimeout(() => {
    resolve('成功');
  }, 2000);
  // reject('失败');
});

promise.then(value => {
  console.log(value);
}, reason => {
  console.log(reason);
});

promise.then(value => {
  console.log(value);
}, reason => {
  console.log(reason);
});

```


```javascript
// MyPromise.js

const FULFILLED = 'fulfilled'; // 成功
const REJECTED = 'rejected'; // 失败
const PENDING = 'pending'; // 等待

class MyPromise {
  // 传入执行器
  constructor(executor) {
    executor(this.resolve, this.reject);
  }
  
  // promise状态
  status = PENDING;
  // 成功之后的值
  value = undefined;
  // 失败之后的值
  reason = undefined;
  // 成功回调
  // successCallback = undefined;
  successCallback = [];
  // 失败回调
  // failCallback = undefined;
  failCallback = [];

  resolve = value => {
    // 如果状态不是等待，阻止程序继续执行
    if (this.status !== PENDING) return;
    // 保存成功之后的值
    this.value = value;
    // 修改状态
    this.status = FULFILLED;
    // 如果成功回调存在，立即调用
    // if (this.successCallback) this.successCallback(value);
    while (this.successCallback.length) {
      this.successCallback.unShift()(value);
    }
  }

  reject = reason => {
     // 如果状态不是等待，阻止程序继续执行
    if (this.status !== PENDING) return;
    // 保存失败之后的原因
    this.reason = reason;
    // 修改状态
    this.status = REJECTED;
    // 如果失败回调存在，立即回调
    // if (this.failCallback) this.failCallback(reason);
    while (this.failCallback.length) {
      this.failCallback.unShift()(reason);
    }
  }

  
  then = (successCallback, failCallback) => {
    // 判断状态，执行相应的回调
    if (this.status === FULFILLED) {
      successCallback(this.value);
    } else if (this.status === REJECTED) {
      failCallback(this.reason);
    } else {
      // 判断是否等待状态
      // 存储回调函数
      // this.successCallback = successCallback；
      this.successCallback.push(successCallback);
      // this.failCallback = failCallback;
      this.failCallback.push(failCallback);
    }
  }
}

```

## then方法的链式调用

9. then方法返回新的Promise实例。

10. 将上一个then方法的成功回调函数执行后的返回结果，作为参数传递到下一个then方法的成功回调。

```javascript
// 使用
const MyPromise = require('./MyPromise');

const promise = new MyPromise((resolve, reject) => {
  resolve('成功');
  // reject('失败');
});

promise
  .then(value => {
    console.log(value);
    return '传递的成功'
  })
  .then(value => {
    console.log(value);
  });

```


```javascript
// MyPromise.js
// 返回值只考虑普通值

const FULFILLED = 'fulfilled'; // 成功
const REJECTED = 'rejected'; // 失败
const PENDING = 'pending'; // 等待

class MyPromise {
  // 传入执行器
  constructor(executor) {
    executor(this.resolve, this.reject);
  }
  
  // promise状态
  status = PENDING;
  // 成功之后的值
  value = undefined;
  // 失败之后的值
  reason = undefined;
  // 成功回调
  // successCallback = undefined;
  successCallback = [];
  // 失败回调
  // failCallback = undefined;
  failCallback = [];

  resolve = value => {
    // 如果状态不是等待，阻止程序继续执行
    if (this.status !== PENDING) return;
    // 保存成功之后的值
    this.value = value;
    // 修改状态
    this.status = FULFILLED;
    // 如果成功回调存在，立即调用
    // if (this.successCallback) this.successCallback(value);
    while (this.successCallback.length) {
      // this.successCallback.unShift()(value);
      this.successCallback.unShift()();
    }
  }

  reject = reason => {
     // 如果状态不是等待，阻止程序继续执行
    if (this.status !== PENDING) return;
    // 保存失败之后的原因
    this.reason = reason;
    // 修改状态
    this.status = REJECTED;
    // 如果失败回调存在，立即回调
    // if (this.failCallback) this.failCallback(reason);
    while (this.failCallback.length) {
      // this.failCallback.unShift()(reason);
      this.failCallback.unShift()();
    }
  }

  then = (successCallback, failCallback) => {
    const nextPromise = new MyPromise((resolve, reject) => {
      // 原来代码逻辑是需要立即执行的，Promise的执行器也是立即执行的，所以放在此处
      // 判断状态，执行相应的回调
      if (this.status === FULFILLED) {
        // successCallback(this.value);
        let rst = successCallback(this.value);
        // 将值传递给下一个then方法的成功回调函数
        resolve(rst);
      } else if (this.status === REJECTED) {
        // failCallback(this.reason);
        let rst = failCallback(this.reason);
        // 将值传递给下一个then方法的失败回调函数
        reject(rst);
      } else {
        // 判断是否等待状态
        // 存储回调函数
        // this.successCallback = successCallback；
        // this.successCallback.push(successCallback);
        this.successCallback.push(() => {
          let rst = successCallback(this.value);
          resolve(rst);
        });
        // this.failCallback = failCallback;
        // this.failCallback.push(failCallback);
        this.failCallback.push(() => {
          let rst = failCallback(this.reason);
          reject(rst);
        });
      }
    });
    return nextPromise;
  }
}

```

11. 需要充分考虑成功回调是普通值，还是另一个Promise。

```javascript
// 使用
const MyPromise = require('./MyPromise');

const promise = new MyPromise((resolve, reject) => {
  resolve('成功');
  // reject('失败');
});

function otherPromise() {
  new MyPromise((resolve, reject) => {
    resolve('otherPromise-成功');
  });
}

promise
  .then(value => {
    console.log(value);
    return otherPromise(); // 结果返回一个promise
  })
  .then(value => {
    console.log(value);
  });

```

```javascript
// MyPromise.js

const FULFILLED = 'fulfilled'; // 成功
const REJECTED = 'rejected'; // 失败
const PENDING = 'pending'; // 等待

function parseRst(rst, resolve, reject) {
  /*
    * 判断rst是普通值还是promise实例
    * 如果是普通值，直接resolve
    * 如果是promise实例，还需要进一步判断是fulfilled、rejected，最后
    * 决定是调用resolve，还是reject
  */
  if (rst instanceOf MyPromise) { // Promise实例
    rst.then(resolve, reject); // 等价于 rst.then(value => resolve(value), reason => reject(reason));
  } else { // 普通值
    resolve(rst)
  }
}

class MyPromise {
  // 传入执行器
  constructor(executor) {
    executor(this.resolve, this.reject);
  }
  
  // promise状态
  status = PENDING;
  // 成功之后的值
  value = undefined;
  // 失败之后的值
  reason = undefined;
  // 成功回调
  // successCallback = undefined;
  successCallback = [];
  // 失败回调
  // failCallback = undefined;
  failCallback = [];

  resolve = value => {
    // 如果状态不是等待，阻止程序继续执行
    if (this.status !== PENDING) return;
    // 保存成功之后的值
    this.value = value;
    // 修改状态
    this.status = FULFILLED;
    // 如果成功回调存在，立即调用
    // if (this.successCallback) this.successCallback(value);
    while (this.successCallback.length) {
      // this.successCallback.unShift()(value);
      this.successCallback.unShift()();
    }
  }

  reject = reason => {
     // 如果状态不是等待，阻止程序继续执行
    if (this.status !== PENDING) return;
    // 保存失败之后的原因
    this.reason = reason;
    // 修改状态
    this.status = REJECTED;
    // 如果失败回调存在，立即回调
    // if (this.failCallback) this.failCallback(reason);
    while (this.failCallback.length) {
      // this.failCallback.unShift()(reason);
      this.failCallback.unShift()();
    }
  }

  then = (successCallback, failCallback) => {
    const nextPromise = new MyPromise((resolve, reject) => {
      // 原来代码逻辑是需要立即执行的，Promise的执行器也是立即执行的，所以放在此处
      // 判断状态，执行相应的回调
      if (this.status === FULFILLED) {
        // successCallback(this.value);
        let rst = successCallback(this.value);
        // 将值传递给下一个then方法的成功回调函数
        // resolve(rst);
        parseRst(rst, resolve, reject);
      } else if (this.status === REJECTED) {
        // failCallback(this.reason);
        let rst = failCallback(this.reason);
        // 将值传递给下一个then方法的失败回调函数
        // reject(rst);
        parseRst(rst, resolve, reject);
      } else {
        // 判断是否等待状态
        // 存储回调函数
        // this.successCallback = successCallback；
        // this.successCallback.push(successCallback);
        this.successCallback.push(() => {
          let rst = successCallback(this.value);
          // resolve(rst);
          parseRst(rst, resolve, reject);
        });
        // this.failCallback = failCallback;
        // this.failCallback.push(failCallback);
        this.failCallback.push(() => {
          let rst = failCallback(this.reason);
          // reject(rst);
          parseRst(rst, resolve, reject);
        });
      }
    });
    return nextPromise;
  }
}
```


## 禁止promise的循环调用

12. 禁止在then成功回调函数中返回promise自身。

```javascript
// 循环引用，会报错
let promise = new Promise((resolve, reject) => {
  resolve('成功');
});

let p1 = promise.then(value => {
  console.log(value);
  return p1; // 循环引用，会报错
});
```



```javascript
// 使用
const MyPromise = require('./MyPromise');

const promise = new MyPromise((resolve, reject) => {
  resolve('成功');
  // reject('失败');
});

function otherPromise() {
  new MyPromise((resolve, reject) => {
    resolve('otherPromise-成功');
  });
}

let p1 = promise.then(value => {
    console.log(value);
    return p1; // 返回自己
  });

p1.then(value => {
    console.log(value);
  }).catch(reason => {
    console.log(reason.message);
  });

```

```javascript
// MyPromise.js

const FULFILLED = 'fulfilled'; // 成功
const REJECTED = 'rejected'; // 失败
const PENDING = 'pending'; // 等待

function parseRst(rst, nextPromise, resolve, reject) {
  /*
    * 判断rst是普通值还是promise实例
    * 如果是普通值，直接resolve
    * 如果是promise实例，还需要进一步判断是fulfilled、rejected，最后
    * 决定是调用resolve，还是reject
  */
  // 循环引用就报错
  if (rst === nextPromise) {
    return reject(new TypeError('Chaining cycle detected for promise #<Promise>'));
  }
  if (rst instanceOf MyPromise) { // Promise实例
    rst.then(resolve, reject); // 等价于 rst.then(value => resolve(value), reason => reject(reason));
  } else { // 普通值
    resolve(rst)
  }
}

class MyPromise {
  // 传入执行器
  constructor(executor) {
    executor(this.resolve, this.reject);
  }
  
  // promise状态
  status = PENDING;
  // 成功之后的值
  value = undefined;
  // 失败之后的值
  reason = undefined;
  // 成功回调
  // successCallback = undefined;
  successCallback = [];
  // 失败回调
  // failCallback = undefined;
  failCallback = [];

  resolve = value => {
    // 如果状态不是等待，阻止程序继续执行
    if (this.status !== PENDING) return;
    // 保存成功之后的值
    this.value = value;
    // 修改状态
    this.status = FULFILLED;
    // 如果成功回调存在，立即调用
    // if (this.successCallback) this.successCallback(value);
    while (this.successCallback.length) {
      this.successCallback.unShift()(value);
    }
  }

  reject = reason => {
     // 如果状态不是等待，阻止程序继续执行
    if (this.status !== PENDING) return;
    // 保存失败之后的原因
    this.reason = reason;
    // 修改状态
    this.status = REJECTED;
    // 如果失败回调存在，立即回调
    // if (this.failCallback) this.failCallback(reason);
    while (this.failCallback.length) {
      this.failCallback.unShift()(reason);
    }
  }

  then = (successCallback, failCallback) => {
     const nextPromise = new MyPromise((resolve, reject) => {
      // 原来代码逻辑是需要立即执行的，Promise的执行器也是立即执行的，所以放在此处
      // 判断状态，执行相应的回调
      if (this.status === FULFILLED) {
        setTimeout(() => {
          // successCallback(this.value);
          let rst = successCallback(this.value);
          // 将值传递给下一个then方法的成功回调函数
          // resolve(rst);
          parseRst(rst, nextPromise, resolve, reject);
        }, 0);   
      } else if (this.status === REJECTED) {
        setTimeout(() => {
          // failCallback(this.reason);
          let rst = failCallback(this.reason);
          // 将值传递给下一个then方法的失败回调函数
          // reject(rst);
          parseRst(rst, nextPromise, resolve, reject);
        }, 0);
      } else {
        // 判断是否等待状态
        // 存储回调函数
        // this.successCallback = successCallback；
        // this.successCallback.push(successCallback);
        this.successCallback.push(() => {
          setTimeout(() => {
            let rst = successCallback(this.value);
            // resolve(rst);
            parseRst(rst, nextPromise, resolve, reject);
          }, 0);
        });
        // this.failCallback = failCallback;
        // this.failCallback.push(failCallback);
        this.failCallback.push(() => {
          setTimeout(() => {
            let rst = failCallback(this.reason);
            // reject(rst);
            // parseRst(rst, resolve, reject);
            parseRst(rst, nextPromise, resolve, reject);
          }, 0);
        });
      }
    });
    return nextPromise;
  }
}
```

## 增加错误处理

13. 捕获执行器的错误。

14. 捕获then方法中的回调函数的错误。


```javascript
// 使用
const MyPromise = require('./MyPromise');

const promise = new MyPromise((resolve, reject) => {
  throw new Error('executor error'); // 13
  resolve('成功');
  // reject('失败');
});

let p1 = promise.then(value => {
    // throw new Error('then error'); // 14
    console.log(value);
  }, reason => {
    console.log(reason.message); // 执行器的错误会在这里
  })
  // .then(value => { // 14
  //   console.log(value);
  // }, reason => {
  //   console.log('then的错误会被传到这里');
  //   console.log(reason.message); // then的错误会被传到这里
  // })

```

```javascript
// MyPromise.js

const FULFILLED = 'fulfilled'; // 成功
const REJECTED = 'rejected'; // 失败
const PENDING = 'pending'; // 等待

function parseRst(rst, nextPromise, resolve, reject) {
  /*
    * 判断rst是普通值还是promise实例
    * 如果是普通值，直接resolve
    * 如果是promise实例，还需要进一步判断是fulfilled、rejected，最后
    * 决定是调用resolve，还是reject
  */
  // 循环引用就报错
  if (rst === nextPromise) {
    return reject(new TypeError('Chaining cycle detected for promise #<Promise>'));
  }
  if (rst instanceOf MyPromise) { // Promise实例
    rst.then(resolve, reject); // 等价于 rst.then(value => resolve(value), reason => reject(reason));
  } else { // 普通值
    resolve(rst)
  }
}

class MyPromise {
  // 传入执行器
  constructor(executor) {
    // 捕捉执行器的错误
    try{
      executor(this.resolve, this.reject);
    } catch(err) {
      this.reject(err);
    }
  }
  
  // promise状态
  status = PENDING;
  // 成功之后的值
  value = undefined;
  // 失败之后的值
  reason = undefined;
  // 成功回调
  // successCallback = undefined;
  successCallback = [];
  // 失败回调
  // failCallback = undefined;
  failCallback = [];

  resolve = value => {
    // 如果状态不是等待，阻止程序继续执行
    if (this.status !== PENDING) return;
    // 保存成功之后的值
    this.value = value;
    // 修改状态
    this.status = FULFILLED;
    // 如果成功回调存在，立即调用
    // if (this.successCallback) this.successCallback(value);
    while (this.successCallback.length) {
      this.successCallback.unShift()(value);
    }
  }

  reject = reason => {
     // 如果状态不是等待，阻止程序继续执行
    if (this.status !== PENDING) return;
    // 保存失败之后的原因
    this.reason = reason;
    // 修改状态
    this.status = REJECTED;
    // 如果失败回调存在，立即回调
    // if (this.failCallback) this.failCallback(reason);
    while (this.failCallback.length) {
      this.failCallback.unShift()(reason);
    }
  }

  then = (successCallback, failCallback) => {
    const nextPromise = new MyPromise((resolve, reject) => {
      // 原来代码逻辑是需要立即执行的，Promise的执行器也是立即执行的，所以放在此处
      // 判断状态，执行相应的回调
      if (this.status === FULFILLED) {
        setTimeout(() => {
          try {
            // successCallback(this.value);
            let rst = successCallback(this.value);
            // 将值传递给下一个then方法的成功回调函数
            // resolve(rst);
            parseRst(rst, nextPromise, resolve, reject);
          } catch(err) {
            reject(err);
          }
        }, 0);   
      } else if (this.status === REJECTED) {
        setTimeout(() => {
          try {
            // failCallback(this.reason);
            let rst = failCallback(this.reason);
            // 将值传递给下一个then方法的失败回调函数
            // reject(rst);
            parseRst(rst, nextPromise, resolve, reject);            
          } catch(err) {
            reject(err);
          }
        }, 0);
      } else {
        // 判断是否等待状态
        // 存储回调函数
        // this.successCallback = successCallback；
        // this.successCallback.push(successCallback);
        this.successCallback.push(() => {
          setTimeout(() => {
            try {
              let rst = successCallback(this.value);
              // resolve(rst);
              parseRst(rst, nextPromise, resolve, reject);
            } catch(err) {
              reject(err);
            }
          }, 0);
        });
        // this.failCallback = failCallback;
        // this.failCallback.push(failCallback);
        this.failCallback.push(() => {
          setTimeout(() => {
            try {
              let rst = failCallback(this.reason);
              // reject(rst);
              // parseRst(rst, resolve, reject);
              parseRst(rst, nextPromise, resolve, reject);
            } catch(err) {
              reject(err);
            }
          }, 0);
        });
      }
    });
    return nextPromise;
  }
}
```

## then方法参数改成可选参数


15. then方法的回调函数可省略，resolve的值会一直传递到有回调函数的then。


```javascript
// 使用
const MyPromise = require('./MyPromise');

const promise = new MyPromise((resolve, reject) => {
  resolve('成功');
});

let p1 = promise.then()
  .then()
  .then(value => console.log(value););
```

```javascript
// MyPromise.js

const FULFILLED = 'fulfilled'; // 成功
const REJECTED = 'rejected'; // 失败
const PENDING = 'pending'; // 等待

function parseRst(rst, nextPromise, resolve, reject) {
  /*
    * 判断rst是普通值还是promise实例
    * 如果是普通值，直接resolve
    * 如果是promise实例，还需要进一步判断是fulfilled、rejected，最后
    * 决定是调用resolve，还是reject
  */
  // 循环引用就报错
  if (rst === nextPromise) {
    return reject(new TypeError('Chaining cycle detected for promise #<Promise>'));
  }
  if (rst instanceOf MyPromise) { // Promise实例
    rst.then(resolve, reject); // 等价于 rst.then(value => resolve(value), reason => reject(reason));
  } else { // 普通值
    resolve(rst)
  }
}

class MyPromise {
  // 传入执行器
  constructor(executor) {
    // 捕捉执行器的错误
    try{
      executor(this.resolve, this.reject);
    } catch(err) {
      this.reject(err);
    }
  }
  
  // promise状态
  status = PENDING;
  // 成功之后的值
  value = undefined;
  // 失败之后的值
  reason = undefined;
  // 成功回调
  // successCallback = undefined;
  successCallback = [];
  // 失败回调
  // failCallback = undefined;
  failCallback = [];

  resolve = value => {
    // 如果状态不是等待，阻止程序继续执行
    if (this.status !== PENDING) return;
    // 保存成功之后的值
    this.value = value;
    // 修改状态
    this.status = FULFILLED;
    // 如果成功回调存在，立即调用
    // if (this.successCallback) this.successCallback(value);
    while (this.successCallback.length) {
      this.successCallback.unShift()(value);
    }
  }

  reject = reason => {
     // 如果状态不是等待，阻止程序继续执行
    if (this.status !== PENDING) return;
    // 保存失败之后的原因
    this.reason = reason;
    // 修改状态
    this.status = REJECTED;
    // 如果失败回调存在，立即回调
    // if (this.failCallback) this.failCallback(reason);
    while (this.failCallback.length) {
      this.failCallback.unShift()(reason);
    }
  }

  then = (successCallback, failCallback) => {
    // 参数可选
    successCallback = successCallback ? successCallback : value => value;
    failCallback = failCallback ? failCallback : reason => { throw reason; };
    const nextPromise = new MyPromise((resolve, reject) => {
      // 原来代码逻辑是需要立即执行的，Promise的执行器也是立即执行的，所以放在此处
      // 判断状态，执行相应的回调
      if (this.status === FULFILLED) {
        setTimeout(() => {
          try {
            // successCallback(this.value);
            let rst = successCallback(this.value);
            // 将值传递给下一个then方法的成功回调函数
            // resolve(rst);
            parseRst(rst, nextPromise, resolve, reject);
          } catch(err) {
            reject(err);
          }
        }, 0);   
      } else if (this.status === REJECTED) {
        setTimeout(() => {
          try {
            // failCallback(this.reason);
            let rst = failCallback(this.reason);
            // 将值传递给下一个then方法的失败回调函数
            // reject(rst);
            parseRst(rst, nextPromise, resolve, reject);            
          } catch(err) {
            reject(err);
          }
        }, 0);
      } else {
        // 判断是否等待状态
        // 存储回调函数
        // this.successCallback = successCallback；
        // this.successCallback.push(successCallback);
        this.successCallback.push(() => {
          setTimeout(() => {
            try {
              let rst = successCallback(this.value);
              // resolve(rst);
              parseRst(rst, nextPromise, resolve, reject);
            } catch(err) {
              reject(err);
            }
          }, 0);
        });
        // this.failCallback = failCallback;
        // this.failCallback.push(failCallback);
        this.failCallback.push(() => {
          setTimeout(() => {
            try {
              let rst = failCallback(this.reason);
              // reject(rst);
              // parseRst(rst, resolve, reject);
              parseRst(rst, nextPromise, resolve, reject);
            } catch(err) {
              reject(err);
            }
          }, 0);
        });
      }
    });
    return nextPromise;
  }
}
```

## Promise.all

16. Promise.all会按照传入的顺序，返回结果，如果有一个结果是rejected，Promise.all就会rejected，只有所有都fulfilled，Promise.all才会fulfilled。

```javascript
const MyPromise = require('./myPromise');

function p1() {
  return new MyPromise((resolve, reject) => {
    setTimeout(() => {
        resolve('p1');
      }, 2000); 
  });
}

function p2() {
  return new MyPromise((resolve, reject) => {
    resolve('p2');
  });
}

MyPromise.all(['a', p1(), p2(), 'b']).then(rst => {
  console.log(rst); // [ 'a', 'p1', 'p2', 'b' ]
});

```

```javascript
// MyPromise.js

const FULFILLED = 'fulfilled'; // 成功
const REJECTED = 'rejected'; // 失败
const PENDING = 'pending'; // 等待

function parseRst(rst, nextPromise, resolve, reject) {
  /*
    * 判断rst是普通值还是promise实例
    * 如果是普通值，直接resolve
    * 如果是promise实例，还需要进一步判断是fulfilled、rejected，最后
    * 决定是调用resolve，还是reject
  */
  // 循环引用就报错
  if (rst === nextPromise) {
    return reject(new TypeError('Chaining cycle detected for promise #<Promise>'));
  }
  if (rst instanceOf MyPromise) { // Promise实例
    rst.then(resolve, reject); // 等价于 rst.then(value => resolve(value), reason => reject(reason));
  } else { // 普通值
    resolve(rst)
  }
}

class MyPromise {
  // 传入执行器
  constructor(executor) {
    // 捕捉执行器的错误
    try{
      executor(this.resolve, this.reject);
    } catch(err) {
      this.reject(err);
    }
  }
  
  // promise状态
  status = PENDING;
  // 成功之后的值
  value = undefined;
  // 失败之后的值
  reason = undefined;
  // 成功回调
  // successCallback = undefined;
  successCallback = [];
  // 失败回调
  // failCallback = undefined;
  failCallback = [];

  static all(array) => {
    let result = [];
    let index = 0; // 用于解决for循环中有异步的情况
    return new MyPromise((resolve, reject) => {
      const target = array[i];
      const addData = function(key, value) {
        index++;
        result[key] = value;
        // 等待所有所有promise/普通值都执行之后才resolve
        if (index === array.length) resolve(result);
      }
      for (let i = 0, len = array.length; i < len; i++) {
        if (target instanceOf MyPromise) {
          // promise
          target.then(value => add(i, value), reason => reject(reason));
        } else {
          // 普通值
          addData(i, target);
        }
      }
    });
    // 有异步时，for循环走完之后，result内可能没有值。
    // resolve(result);
  }

  resolve = value => {
    // 如果状态不是等待，阻止程序继续执行
    if (this.status !== PENDING) return;
    // 保存成功之后的值
    this.value = value;
    // 修改状态
    this.status = FULFILLED;
    // 如果成功回调存在，立即调用
    // if (this.successCallback) this.successCallback(value);
    while (this.successCallback.length) {
      this.successCallback.unShift()(value);
    }
  }

  reject = reason => {
     // 如果状态不是等待，阻止程序继续执行
    if (this.status !== PENDING) return;
    // 保存失败之后的原因
    this.reason = reason;
    // 修改状态
    this.status = REJECTED;
    // 如果失败回调存在，立即回调
    // if (this.failCallback) this.failCallback(reason);
    while (this.failCallback.length) {
      this.failCallback.unShift()(reason);
    }
  }

  then = (successCallback, failCallback) => {
    // 参数可选
    successCallback = successCallback ? successCallback : value => value;
    failCallback = failCallback ? failCallback : reason => { throw reason; };
    const nextPromise = new MyPromise((resolve, reject) => {
      // 原来代码逻辑是需要立即执行的，Promise的执行器也是立即执行的，所以放在此处
      // 判断状态，执行相应的回调
      if (this.status === FULFILLED) {
        setTimeout(() => {
          try {
            // successCallback(this.value);
            let rst = successCallback(this.value);
            // 将值传递给下一个then方法的成功回调函数
            // resolve(rst);
            parseRst(rst, nextPromise, resolve, reject);
          } catch(err) {
            reject(err);
          }
        }, 0);   
      } else if (this.status === REJECTED) {
        setTimeout(() => {
          try {
            // failCallback(this.reason);
            let rst = failCallback(this.reason);
            // 将值传递给下一个then方法的失败回调函数
            // reject(rst);
            parseRst(rst, nextPromise, resolve, reject);            
          } catch(err) {
            reject(err);
          }
        }, 0);
      } else {
        // 判断是否等待状态
        // 存储回调函数
        // this.successCallback = successCallback；
        // this.successCallback.push(successCallback);
        this.successCallback.push(() => {
          setTimeout(() => {
            try {
              let rst = successCallback(this.value);
              // resolve(rst);
              parseRst(rst, nextPromise, resolve, reject);
            } catch(err) {
              reject(err);
            }
          }, 0);
        });
        // this.failCallback = failCallback;
        // this.failCallback.push(failCallback);
        this.failCallback.push(() => {
          setTimeout(() => {
            try {
              let rst = failCallback(this.reason);
              // reject(rst);
              // parseRst(rst, resolve, reject);
              parseRst(rst, nextPromise, resolve, reject);
            } catch(err) {
              reject(err);
            }
          }, 0);
        });
      }
    });
    return nextPromise;
  }
}
```

## Promise.resolve

17. Promise.resolve需要返回一个promise对象，在resolve静态方法中需要对传入的值判断，普通值需要使用promise包裹之后返回，promise对象则直接调用resolve方法。

```javascript
const MyPromise = require('./myPromise');

function p1() {
  return new MyPromise((resolve, reject) => {
    setTimeout(() => {
        resolve('p1');
      }, 2000); 
  });
}

MyPromise.resolve(p1()).then(value => {
  console.log(value); // 'p1'
});

MyPromise.resolve('成功').then(value => {
  console.log(value); // '成功'
});

```

```javascript
// MyPromise.js

const FULFILLED = 'fulfilled'; // 成功
const REJECTED = 'rejected'; // 失败
const PENDING = 'pending'; // 等待

function parseRst(rst, nextPromise, resolve, reject) {
  /*
    * 判断rst是普通值还是promise实例
    * 如果是普通值，直接resolve
    * 如果是promise实例，还需要进一步判断是fulfilled、rejected，最后
    * 决定是调用resolve，还是reject
  */
  // 循环引用就报错
  if (rst === nextPromise) {
    return reject(new TypeError('Chaining cycle detected for promise #<Promise>'));
  }
  if (rst instanceOf MyPromise) { // Promise实例
    rst.then(resolve, reject); // 等价于 rst.then(value => resolve(value), reason => reject(reason));
  } else { // 普通值
    resolve(rst)
  }
}

class MyPromise {
  // 传入执行器
  constructor(executor) {
    // 捕捉执行器的错误
    try{
      executor(this.resolve, this.reject);
    } catch(err) {
      this.reject(err);
    }
  }
  
  // promise状态
  status = PENDING;
  // 成功之后的值
  value = undefined;
  // 失败之后的值
  reason = undefined;
  // 成功回调
  // successCallback = undefined;
  successCallback = [];
  // 失败回调
  // failCallback = undefined;
  failCallback = [];

  static all(array) => {
    let result = [];
    let index = 0; // 用于解决for循环中有异步的情况
    return new MyPromise((resolve, reject) => {
      const target = array[i];
      const addData = function(key, value) {
        index++;
        result[key] = value;
        // 等待所有所有promise/普通值都执行之后才resolve
        if (index === array.length) resolve(result);
      }
      for (let i = 0, len = array.length; i < len; i++) {
        if (target instanceOf MyPromise) {
          // promise
          target.then(value => add(i, value), reason => reject(reason));
        } else {
          // 普通值
          addData(i, target);
        }
      }
    });
    // 有异步时，for循环走完之后，result内可能没有值。
    // resolve(result);
  }

  static resolve(value) {
    // promise
    if (value instanceOf MyPromise) return value;
    // 普通值
    return new MyPromise(resolve => resolve(value););
  }

  resolve = value => {
    // 如果状态不是等待，阻止程序继续执行
    if (this.status !== PENDING) return;
    // 保存成功之后的值
    this.value = value;
    // 修改状态
    this.status = FULFILLED;
    // 如果成功回调存在，立即调用
    // if (this.successCallback) this.successCallback(value);
    while (this.successCallback.length) {
      this.successCallback.unShift()(value);
    }
  }

  reject = reason => {
     // 如果状态不是等待，阻止程序继续执行
    if (this.status !== PENDING) return;
    // 保存失败之后的原因
    this.reason = reason;
    // 修改状态
    this.status = REJECTED;
    // 如果失败回调存在，立即回调
    // if (this.failCallback) this.failCallback(reason);
    while (this.failCallback.length) {
      this.failCallback.unShift()(reason);
    }
  }

  then = (successCallback, failCallback) => {
    // 参数可选
    successCallback = successCallback ? successCallback : value => value;
    failCallback = failCallback ? failCallback : reason => { throw reason; };
    const nextPromise = new MyPromise((resolve, reject) => {
      // 原来代码逻辑是需要立即执行的，Promise的执行器也是立即执行的，所以放在此处
      // 判断状态，执行相应的回调
      if (this.status === FULFILLED) {
        setTimeout(() => {
          try {
            // successCallback(this.value);
            let rst = successCallback(this.value);
            // 将值传递给下一个then方法的成功回调函数
            // resolve(rst);
            parseRst(rst, nextPromise, resolve, reject);
          } catch(err) {
            reject(err);
          }
        }, 0);   
      } else if (this.status === REJECTED) {
        setTimeout(() => {
          try {
            // failCallback(this.reason);
            let rst = failCallback(this.reason);
            // 将值传递给下一个then方法的失败回调函数
            // reject(rst);
            parseRst(rst, nextPromise, resolve, reject);            
          } catch(err) {
            reject(err);
          }
        }, 0);
      } else {
        // 判断是否等待状态
        // 存储回调函数
        // this.successCallback = successCallback；
        // this.successCallback.push(successCallback);
        this.successCallback.push(() => {
          setTimeout(() => {
            try {
              let rst = successCallback(this.value);
              // resolve(rst);
              parseRst(rst, nextPromise, resolve, reject);
            } catch(err) {
              reject(err);
            }
          }, 0);
        });
        // this.failCallback = failCallback;
        // this.failCallback.push(failCallback);
        this.failCallback.push(() => {
          setTimeout(() => {
            try {
              let rst = failCallback(this.reason);
              // reject(rst);
              // parseRst(rst, resolve, reject);
              parseRst(rst, nextPromise, resolve, reject);
            } catch(err) {
              reject(err);
            }
          }, 0);
        });
      }
    });
    return nextPromise;
  }
}
```


## Promise.finally

18. 不管Promise的状态是fulfilled，还是rejected，Promise.finally都会执行，并且Promise.finally需要返回promise对象，需要将前一个promise对象的结果值，传递给新的promise对象（类似then的作用）。

19. Promise.finally的回调函数可能返回普通值、promise对象。如果是promise对象，需要等待该promise对象状态变为fulfilled或者rejected之后，才执行新promise对象的then的回调。

```javascript
const MyPromise = require('./myPromise');

function p1() {
  return new MyPromise((resolve, reject) => {
    setTimeout(() => {
      resolve('p1 成功');
    }, 2000);
}

function p2() {
  return new MyPromise((resolve, reject) => {
    resolve('p2 成功');
    // reject('p2 失败');
}

p2().finally(() => {
  console.log('p1 finally');
  return p1(); // 返回的是promise对象，后面的then方法不会立即执行，会等待p1状态确定之后执行。
}).then(value => {
  console.log(value); // 'p2 成功'
}, reason => {
  console.log(reason); // 'p2 失败'
});

```

```javascript
// MyPromise.js

const FULFILLED = 'fulfilled'; // 成功
const REJECTED = 'rejected'; // 失败
const PENDING = 'pending'; // 等待

function parseRst(rst, nextPromise, resolve, reject) {
  /*
    * 判断rst是普通值还是promise实例
    * 如果是普通值，直接resolve
    * 如果是promise实例，还需要进一步判断是fulfilled、rejected，最后
    * 决定是调用resolve，还是reject
  */
  // 循环引用就报错
  if (rst === nextPromise) {
    return reject(new TypeError('Chaining cycle detected for promise #<Promise>'));
  }
  if (rst instanceOf MyPromise) { // Promise实例
    rst.then(resolve, reject); // 等价于 rst.then(value => resolve(value), reason => reject(reason));
  } else { // 普通值
    resolve(rst)
  }
}

class MyPromise {
  // 传入执行器
  constructor(executor) {
    // 捕捉执行器的错误
    try{
      executor(this.resolve, this.reject);
    } catch(err) {
      this.reject(err);
    }
  }
  
  // promise状态
  status = PENDING;
  // 成功之后的值
  value = undefined;
  // 失败之后的值
  reason = undefined;
  // 成功回调
  // successCallback = undefined;
  successCallback = [];
  // 失败回调
  // failCallback = undefined;
  failCallback = [];

  static all(array) => {
    let result = [];
    let index = 0; // 用于解决for循环中有异步的情况
    return new MyPromise((resolve, reject) => {
      const target = array[i];
      const addData = function(key, value) {
        index++;
        result[key] = value;
        // 等待所有所有promise/普通值都执行之后才resolve
        if (index === array.length) resolve(result);
      }
      for (let i = 0, len = array.length; i < len; i++) {
        if (target instanceOf MyPromise) {
          // promise
          target.then(value => add(i, value), reason => reject(reason));
        } else {
          // 普通值
          addData(i, target);
        }
      }
    });
    // 有异步时，for循环走完之后，result内可能没有值。
    // resolve(result);
  }

  static resolve(value) {
    // promise
    if (value instanceOf MyPromise) return value;
    // 普通值
    return new MyPromise(resolve => resolve(value););
  }

  resolve = value => {
    // 如果状态不是等待，阻止程序继续执行
    if (this.status !== PENDING) return;
    // 保存成功之后的值
    this.value = value;
    // 修改状态
    this.status = FULFILLED;
    // 如果成功回调存在，立即调用
    // if (this.successCallback) this.successCallback(value);
    while (this.successCallback.length) {
      this.successCallback.unShift()(value);
    }
  }

  reject = reason => {
     // 如果状态不是等待，阻止程序继续执行
    if (this.status !== PENDING) return;
    // 保存失败之后的原因
    this.reason = reason;
    // 修改状态
    this.status = REJECTED;
    // 如果失败回调存在，立即回调
    // if (this.failCallback) this.failCallback(reason);
    while (this.failCallback.length) {
      this.failCallback.unShift()(reason);
    }
  }

  then = (successCallback, failCallback) => {
    // 参数可选
    successCallback = successCallback ? successCallback : value => value;
    failCallback = failCallback ? failCallback : reason => { throw reason; };
    const nextPromise = new MyPromise((resolve, reject) => {
      // 原来代码逻辑是需要立即执行的，Promise的执行器也是立即执行的，所以放在此处
      // 判断状态，执行相应的回调
      if (this.status === FULFILLED) {
        setTimeout(() => {
          try {
            // successCallback(this.value);
            let rst = successCallback(this.value);
            // 将值传递给下一个then方法的成功回调函数
            // resolve(rst);
            parseRst(rst, nextPromise, resolve, reject);
          } catch(err) {
            reject(err);
          }
        }, 0);   
      } else if (this.status === REJECTED) {
        setTimeout(() => {
          try {
            // failCallback(this.reason);
            let rst = failCallback(this.reason);
            // 将值传递给下一个then方法的失败回调函数
            // reject(rst);
            parseRst(rst, nextPromise, resolve, reject);            
          } catch(err) {
            reject(err);
          }
        }, 0);
      } else {
        // 判断是否等待状态
        // 存储回调函数
        // this.successCallback = successCallback；
        // this.successCallback.push(successCallback);
        this.successCallback.push(() => {
          setTimeout(() => {
            try {
              let rst = successCallback(this.value);
              // resolve(rst);
              parseRst(rst, nextPromise, resolve, reject);
            } catch(err) {
              reject(err);
            }
          }, 0);
        });
        // this.failCallback = failCallback;
        // this.failCallback.push(failCallback);
        this.failCallback.push(() => {
          setTimeout(() => {
            try {
              let rst = failCallback(this.reason);
              // reject(rst);
              // parseRst(rst, resolve, reject);
              parseRst(rst, nextPromise, resolve, reject);
            } catch(err) {
              reject(err);
            }
          }, 0);
        });
      }
    });
    return nextPromise;
  }

  finally(callback) {
    // 通过then获取到状态，返回promise对象（then可以链式调用）
    return this.then(value => {
      // callback(value);
      // return value; // 将结果传递给下一个then，不考虑callback会返回promise
      return MyPromise.resolve(callback).then(() => resolve(value)); // 考虑callback里面可能返回promise的情况，不管是普通值，还是promise都包裹成promise
    }, reason => {
      // callback(reason);
      // throw reason; // 将结果传递给下一个then，不考虑callback会返回promise
      return MyPromise.reject(callback).then(() => throw reason); // 考虑callback里面可能返回promise的情况
    });
  }
}
```

## catch

```javascript
const MyPromise = require('./myPromise');

function p1() {
  return new MyPromise((resolve, reject) => {
    reject('失败');
}

p1()
  .then(value => console.log(value))
  .catch(reason => console.log(reason));

```

```javascript
// MyPromise.js

const FULFILLED = 'fulfilled'; // 成功
const REJECTED = 'rejected'; // 失败
const PENDING = 'pending'; // 等待

function parseRst(rst, nextPromise, resolve, reject) {
  /*
    * 判断rst是普通值还是promise实例
    * 如果是普通值，直接resolve
    * 如果是promise实例，还需要进一步判断是fulfilled、rejected，最后
    * 决定是调用resolve，还是reject
  */
  // 循环引用就报错
  if (rst === nextPromise) {
    return reject(new TypeError('Chaining cycle detected for promise #<Promise>'));
  }
  if (rst instanceOf MyPromise) { // Promise实例
    rst.then(resolve, reject); // 等价于 rst.then(value => resolve(value), reason => reject(reason));
  } else { // 普通值
    resolve(rst)
  }
}

class MyPromise {
  // 传入执行器
  constructor(executor) {
    // 捕捉执行器的错误
    try{
      executor(this.resolve, this.reject);
    } catch(err) {
      this.reject(err);
    }
  }
  
  // promise状态
  status = PENDING;
  // 成功之后的值
  value = undefined;
  // 失败之后的值
  reason = undefined;
  // 成功回调
  // successCallback = undefined;
  successCallback = [];
  // 失败回调
  // failCallback = undefined;
  failCallback = [];

  static all(array) => {
    let result = [];
    let index = 0; // 用于解决for循环中有异步的情况
    return new MyPromise((resolve, reject) => {
      const target = array[i];
      const addData = function(key, value) {
        index++;
        result[key] = value;
        // 等待所有所有promise/普通值都执行之后才resolve
        if (index === array.length) resolve(result);
      }
      for (let i = 0, len = array.length; i < len; i++) {
        if (target instanceOf MyPromise) {
          // promise
          target.then(value => add(i, value), reason => reject(reason));
        } else {
          // 普通值
          addData(i, target);
        }
      }
    });
    // 有异步时，for循环走完之后，result内可能没有值。
    // resolve(result);
  }

  static resolve(value) {
    // promise
    if (value instanceOf MyPromise) return value;
    // 普通值
    return new MyPromise(resolve => resolve(value););
  }

  resolve = value => {
    // 如果状态不是等待，阻止程序继续执行
    if (this.status !== PENDING) return;
    // 保存成功之后的值
    this.value = value;
    // 修改状态
    this.status = FULFILLED;
    // 如果成功回调存在，立即调用
    // if (this.successCallback) this.successCallback(value);
    while (this.successCallback.length) {
      this.successCallback.unShift()(value);
    }
  }

  reject = reason => {
     // 如果状态不是等待，阻止程序继续执行
    if (this.status !== PENDING) return;
    // 保存失败之后的原因
    this.reason = reason;
    // 修改状态
    this.status = REJECTED;
    // 如果失败回调存在，立即回调
    // if (this.failCallback) this.failCallback(reason);
    while (this.failCallback.length) {
      this.failCallback.unShift()(reason);
    }
  }

  then = (successCallback, failCallback) => {
    // 参数可选
    successCallback = successCallback ? successCallback : value => value;
    failCallback = failCallback ? failCallback : reason => { throw reason; };
    const nextPromise = new MyPromise((resolve, reject) => {
      // 原来代码逻辑是需要立即执行的，Promise的执行器也是立即执行的，所以放在此处
      // 判断状态，执行相应的回调
      if (this.status === FULFILLED) {
        setTimeout(() => {
          try {
            // successCallback(this.value);
            let rst = successCallback(this.value);
            // 将值传递给下一个then方法的成功回调函数
            // resolve(rst);
            parseRst(rst, nextPromise, resolve, reject);
          } catch(err) {
            reject(err);
          }
        }, 0);   
      } else if (this.status === REJECTED) {
        setTimeout(() => {
          try {
            // failCallback(this.reason);
            let rst = failCallback(this.reason);
            // 将值传递给下一个then方法的失败回调函数
            // reject(rst);
            parseRst(rst, nextPromise, resolve, reject);            
          } catch(err) {
            reject(err);
          }
        }, 0);
      } else {
        // 判断是否等待状态
        // 存储回调函数
        // this.successCallback = successCallback；
        // this.successCallback.push(successCallback);
        this.successCallback.push(() => {
          setTimeout(() => {
            try {
              let rst = successCallback(this.value);
              // resolve(rst);
              parseRst(rst, nextPromise, resolve, reject);
            } catch(err) {
              reject(err);
            }
          }, 0);
        });
        // this.failCallback = failCallback;
        // this.failCallback.push(failCallback);
        this.failCallback.push(() => {
          setTimeout(() => {
            try {
              let rst = failCallback(this.reason);
              // reject(rst);
              // parseRst(rst, resolve, reject);
              parseRst(rst, nextPromise, resolve, reject);
            } catch(err) {
              reject(err);
            }
          }, 0);
        });
      }
    });
    return nextPromise;
  }

  catch(failCallback) {
    return this.then(undefined, failCallback);
  }

  finally(callback) {
    // 通过then获取到状态，返回promise对象（then可以链式调用）
    return this.then(value => {
      // callback(value);
      // return value; // 将结果传递给下一个then，不考虑callback会返回promise
      return MyPromise.resolve(callback).then(() => resolve(value)); // 考虑callback里面可能返回promise的情况，不管是普通值，还是promise都包裹成promise
    }, reason => {
      // callback(reason);
      // throw reason; // 将结果传递给下一个then，不考虑callback会返回promise
      return MyPromise.reject(callback).then(() => throw reason); // 考虑callback里面可能返回promise的情况
    });
  }
}
```