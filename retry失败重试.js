/** 题目描述：（字节）
 * 实现 Promise.retry，成功后 resolve 结果，
 * 失败后重试，尝试超过一定次数才真正的 reject。
 *
 */
Promise.retry = function (promiseFn, times = 3) {
  return new Promise(async (resolve, reject) => {
    while (times--) {
      try {
        let result = await promiseFn()
        resolve(result)
        console.log(`success: ${result}`)
        break
      } catch (err) {
        if (!times) reject(err)
        console.log(`fail: ${err}`)
      }
    }
  })
}

// 测试用例
function getPromise() {
  const n = Math.random()
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      n > 0.5 ? resolve(n) : reject(n)
    }, 1000)
  })
}

Promise.retry(getPromise)
