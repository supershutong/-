// 指数补偿 -- 应对不稳定的网络环境，如地铁、电梯等

const fetch = require('node-fetch')

/**
 * 标准方案
 * 核心原理：使用闭包记录请求次数、状态
 * @param {*} url
 * @returns Promise
 */
function request(url) {
  let resolved = false
  let t = 1

  return new Promise((resolve, reject) => {
    function doFetch() {
      if (resolved || t > 16) {
        return
      }

      fetch(url)
        .then(res => {
          return res.text()
        })
        .then(data => {
          // 进入此处说明 fetch 成功，可终止请求
          if (!resolved) {
            resolved = true
            resolve(data)
            console.log(t)
          }
        })

      setTimeout(() => {
        doFetch()
        t >> 2
      }, t * 100)
    }

    doFetch()
  })
}

request('https://www.baidu.com').then(data => {
  console.log(data)
})


/**
 * 方法二：使用 promise.race([])
 * 问题：race会一次性发出所有的请求，非最佳方案
 * @param {*} url
 */
function request2(url) {
  function wait(ms, fn) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(fn())
      }, ms)
    })
  }

  return Promise.race([
    fetch(url),
    wait(100, () => fetch(url)),
    wait(200, () => fetch(url)),
    wait(400, () => fetch(url)),
    wait(800, () => fetch(url)),
    wait(1600, () => fetch(url))
  ])
}

request2('https://www.baidu.com').then(data => {
  console.log(data)
})
