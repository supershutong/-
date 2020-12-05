// 1.实现链式调用 .then().then().then()
// 2.实现异步等待 pending状态的异步事件要记录下来
const [PENDING, FULLFILLED, REJECTED] = [1, 2, 3]

class Promise {
  constructor(excutor) {
    this.state = PENDING
    this.fullfills = []

    const resolver = value => {
      this.value = value
      this.state = FULLFILLED

      // 处理记录的pending状态函数
      for (let [onFullfill, resolve] of this.fullfills) {
        const x = onFullfill(this.value)
        resolve(x)
      }
    }

    const rejector = error => {}

    excutor(resolver, rejector)
  }

  then(onFullfill) {
    // then要返回一个新的promise
    return new Promise((resolve, reject) => {
      switch (this.state) {
        case PENDING:
          // pending状态函数要记录下来
          this.fullfills.push([onFullfill, resolve])
          break
        case FULLFILLED:
          const x = onFullfill(this.value)
          resolve(x)
          break
      }
    })
  }
}

new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(100)
  }, 1000)
})
  .then(data => {
    console.log(data)
    return 'abc'
  })
  .then(data => {
    console.log(data)
  })
