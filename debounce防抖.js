// 防抖：触发指定时间后执行，期间再次触发则重新计时。
// 核心：清空计时器
function debounce(func, delay) {
  let timer = null
  return function (...args) {
    if (timer) clearTimeout(timer) // 核心
    timer = setTimeout(() => {
      func(...args)
    }, delay)
  }
}
// 测试用例：
debounce(fetchData, 500) // 返回一个包装后的防抖函数使用
