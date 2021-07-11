/** 头条笔试
 * JS实现一个带并发限制的异步调度器Scheduler，保证同时运行的任务最多有两个。
 * 1、如果超出最大并发数则放入待决议列表，计数+1；
 * 2、await本次任务放入微任务队列并保存结果；
 * 3、对队头任务进行决议，计数-1；
 * 4、返回结果。
 */
class Scheduler {
  constructor(limit) {
    this.limit = limit // 任务调度器允许并行的最大个数
    this.runningCount = 0
    this.list = [] // 待执行决议
  }

  async add(fn) {
    if (typeof fn !== 'function') {
      throw new TypeError('param must be a function')
    }
    if (this.runningCount >= this.limit) {
      await new Promise(resolve => {
        this.list.push(resolve)
      })
    }
    this.runningCount++
    const result = await fn()
    if (this.list.length) {
      this.list.shift()() // 此处用两个括号执行resolve
    }
    this.runningCount--
    return result
  }
}

let scheduler = new Scheduler(2)
const timeout = time =>
  new Promise(resolve => {
    setTimeout(resolve, time)
  })
const addTask = (time, order) => {
  scheduler
    .add(() => timeout(time))
    .then(() => {
      console.log(order)
    })
}

addTask(1000, 1)
addTask(500, 2)
addTask(300, 3)
addTask(400, 4)
// output: 2 3 1 4
// 开始时，1、2任务进入队列
// 500ms输出 2，任务3入队
// 800ms输出 3，任务4入队
// 1000ms输出 1
// 1200ms输出 4
