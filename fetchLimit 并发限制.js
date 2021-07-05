/**
 * 实现一个批量请求函数fetchLimit(urls, limit)
 * 要求如下：
    1、最大并发数 limit
    2、每当有一个请求返回，就留下一个空位，可以增加新的请求
    3、所有请求完成后，按照 urls 顺序输出结果
*/
function fetchLimit(target = [], limit) {
  let urls = [...target] // 记录剩余url
  let result = new Map() // 记录url-response映射，并保证输出列表与输入一致

  function run() {
    if (!urls.length) return // 递归退出条件
    const url = urls.shift()
    return fetchData(url).then(res => {
      result.set(url, res)
      return run() // 递归
    })
  }

  const promiseList = Array(Math.min(limit, target.length)) // 请求数小于limit时无需创建多余promise
    .fill(Promise.resolve()) // 不能进一步简写为 .fill(run())，因为填入的应该是不同promise实例
    .map(promise => promise.then(run))

  return Promise.all(promiseList).then(() => target.map(url => result.get(url)))
}

// fetchData 模拟异步请求，返回成功提示
let fetchData = url =>
  new Promise(resolve =>
    setTimeout(resolve, Math.random() * 500, url + ' 的响应')
  )

// 测试用例
let urls = Array(10)
  .fill('https://www.baidu.com') // 待请求地址
  .map((item, i) => (item += i))
fetchLimit(urls, 2)
  .then(res => {
    console.log(res)
  })
  .catch(err => {
    console.error(err)
  })
