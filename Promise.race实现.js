Promise.race = function (iterator) {
  let arr = Array.from(iterator)
  return new Promise((resolve, reject) => {
    for (let p of arr) {
      Promise.resolve(p)
        .then(data => {
          resolve(data)
        })
        .catch(e => {
          reject(e)
        })
    }
  })
}

// 测试用例
var p1 = new Promise(resolve => {
  resolve(1)
})
var p2 = new Promise(resolve => {
  setTimeout(resolve, 2000, '22') // setTimeout第三个参数作为毁掉函数入参
})
var p3 = 3

Promise.race([p1, p2, p3]).then(
  data => {
    console.log(data)
  },
  err => {
    console.log(err)
  }
)
