/** Promise.all实现思路：
 * 1、遍历入参数组，用 Promise.resolve包装成 promise对象
 * 2、返回 promise数组对象
 * 3、核心是决议时机，即计数器count和入参数组length相同
 * 4、入参为可迭代对象，未必是数组，所以要使用Array.from转换为数组
 */
Promise.all = function (iterator = []) {
  let arr = Array.from(iterator) // A+规范的参数是可迭代对象，未必是Array
  let count = 0,
    len = arr.length
  let result = []
  return new Promise((resolve, reject) => {
    for (let i in arr) {
      arr[i]
        .then(data => {
          result[i] = data
          count++
          if (count === len) {
            resolve(result)
          }
        })
        .catch(e => {
          reject(e)
        })
    }
  })
}
