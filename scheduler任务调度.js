class Scheduler {
  constructor(limit) {
    this.limit = limit // 任务调度器允许并行的最大个数
    this.count = 0
    this.list = [] // 待执行决议
  }

  async add(fn) {
    if (typeof fn !== 'function') {
      throw new Error('paramter must be a function')
    }
    if (this.count >= this.limit) {
      await new Promise(resolve => {
        this.list.push(resolve)
      })
    }
    this.count++
    const result = await fn()
    if (this.list.length > 0) {
      this.list.shift()() // 此处用两个括号执行resolve
    }
    this.count--
    return result
  }
}

let scheduler = new Scheduler(2)
let task = function (n, time) {
  return () => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(n)
      }, time)
    })
  }
}

scheduler.add(task(1, 2000)).then(res => console.log(res))
scheduler.add(task(2, 1000)).then(res => console.log(res))
scheduler.add(task(3, 1500)).then(res => console.log(res))
scheduler.add(task(4, 1000)).then(res => console.log(res))
scheduler.add(task(5, 3000)).then(res => console.log(res))
