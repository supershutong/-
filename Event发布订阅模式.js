class EventEmitter {
  constructor() {
    // 事件通道调度中心
    this._events = {}
  }
  // 注册绑定事件
  $on(event, handler) {
    this._events[event] = this._events[event] || []
    this._events[event].push(handler)
  }
  // 解绑事件
  $off(event, handler) {
    this._events[event] = this._events[event]?.filter(fn => fn !== handler)
  }
  // 触发事件
  $emit(event, ...args) {
    this._events[event]?.forEach(fn => {
      fn(...args)
    })
  }
  // 注册一次性事件
  $once(event, handler) {
    const newHandler = (...args) => {
      this.$off(event, newHandler)
      handler.call(this, ...args)
    }
    this.$on(event, newHandler)
  }
}

// 测试用例
let a = new EventEmitter()
function aa(x) {
  console.log(x)
}
a.$once('test', data => {
  console.log('1', data)
})
a.$once('test', aa)

a.$emit('test', 111)
a.$off('test', aa)
a.$emit('test', 222)
