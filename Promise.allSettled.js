Promise.allSettled = function (iterator) {
  let arr = Array.from(iterator)
  let len = arr.length,
    result = []
  return new Promise(resolve => {
    for (let i in arr) {
      Promise.resolve(arr[i])
        .then(
          data => {
            result[i] = { status: 'fullfilled', value: data }
          },
          reason => {
            result[i] = { status: 'rejected', value: reason }
          }
        )
        .finally(() => {
          if (!--len) {
            resolve(result)
          }
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
var p3 = new Promise((resolve, reject) => {
  reject(3)
})

Promise.allSettled([p1, p2, p3]).then(
  data => {
    console.log(data)
  },
  reason => {
    console.log(reason)
  }
)
