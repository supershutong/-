/**
 * 实现一个批量请求函数fetchLimit(urls, maxNum)
 * 要求如下：
    1、最大并发数 maxNum
    2、每当有一个请求返回，就留下一个空位，可以增加新的请求
    3、所有请求完成后，结果按照 urls 里面的顺序依次打出
*/
function fetchLimit(urls = [], maxNum) {
  let len = urls.length
  let result = new Array(len).fill(false)
  let count = 0
  return new Promise((resolve, reject) => {
    // 保证请求数在maxNum范围内
    while (count < maxNum) {
      next()
    }
    function next() {
      let current = count++
      // 边界处理，跳出条件
      if (current >= len) {
        !result.includes(false) && resolve(result)
        return
      }
      let url = urls[current]
      fetch(url).finally(res => {
        result[current] = res
        // 还有未完成任务，继续递归
        if (current < len) {
          next()
        }
      })
    }
  })
}
// 测试用例
let target = 'https://www.baidu.com'
let urls = Array(100).fill(target)
fetchLimit(urls, 5).then(res => {
  console.log(res)
})
