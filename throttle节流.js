// 节流：指定时间内只触发一次，多次触发不执行。
// 核心：开关锁
function throttle(func, delay) {
  let flag = true
  return function (...args) {
    if (!flag) return
    flag = false
    setTimeout(() => {
      func(...args)
      flag = true // 核心
    }, delay)
  }
}

// 测试用例
throttle(fn, 500)
