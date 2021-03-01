/**
 * 并发处理和时间窗口
 * 多个资源并发请求 -- Promise.all
 * 基于时间窗口过滤重复请求
 */

const fetch = require('node-fetch')

function hash(...args) {
  return args.join(',')
}

function window_it(fn, time = 50) {
  // 窗口函数表
  let w = {}
  let flag = false

  return (...args) => {
    return new Promise(resolve => {
      if (!w[hash(args)]) {
        w[hash(args)] = {
          func: fn,
          args,
          resolvers: []
        }
      }

      if (!flag) {
        flag = true
        setTimeout(() => {
          // 调用函数
          Object.keys(w).forEach(key => {
            const { func, args, resolvers } = w[key] // 解析相同参数的请求
            console.log('run once ----')
            func(...args) // 请求只执行一次
              .then(res => res.text())
              .then(text => {
                // 不同请求的回调函数要依次执行
                resolvers.forEach(r => {
                  console.log('result anywhere ----')
                  r(text)
                })
                // 调用之后清空时间窗口
                flag = false
                w = {}
              })
          })
        }, time)
      }

      w[hash(args)].resolvers.push(resolve)
    })
  }
}

const request = window_it(fetch, 2000)

request('http://baidu.com')
request('http://baidu.com')
request('http://baidu.com')
request('http://baidu.com')
request('http://baidu.com')
request('http://zhihu.com')
