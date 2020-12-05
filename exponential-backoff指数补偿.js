// 指数补偿 -- 应对不稳定的网络环境，如地铁、电梯等

const fetch = require('node-fetch')

// 核心原理：使用闭包记录请求次数、状态
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
            resolve(data)
            resolved = true
            console.log(t)
          }
        })

      setTimeout(() => {
        doFetch()
        t *= 2
      }, t * 100)
    }

    doFetch()
  })
}

request('https://www.baidu.com').then(data => {
  console.log(data)
})
