function resolve(promise, x) {
  if (x === promise) {
    return reject(promise, new TypeError("can't be the same"))
  }
  if (isPromise(x)) {
    if (x.state === 'pending') {
      return x.then(() => {
        resolve(promise, x.value)
      }, () => {
        reject(promise, x.value)
      })
    }
    if (x.state === 'fulfilled') {
      return fulfill(promise, x.value)
    }
    if (x.state === 'rejected') {
      return reject(promise, x.value)
    }
  } else if (isObject(x) || isFunction(x)) {
    let then;
    try {
      then = x.then;
    } catch (e) {
      return reject(promise, e)
    }
    if (isFunction(then)) { // then方法的函数只能调用一次
      let isCalled = false
      try {  // 此处：1、用于对es6标准出现前社区实现的各种版本promise兼容
        then.call(x, function resolvePromise(y) {
          if (isCalled) {  // 确保onReslove和onRejected方法只被调用一次
            return
          }
          isCalled = true
          resolve(promise, y)
        }, function rejectPromise(z) {
          if (isCalled) {
            return
          }
          isCalled = true
          reject(promise, z)
        })
      } catch (e) {
        if (!isCalled) {
          return reject(promise, e)
        }
      }
    } else {
      return fulfill(promise, x)
    }
  } else {
    return fulfill(promise, x)
  }
}