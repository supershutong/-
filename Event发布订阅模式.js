class EventEmitter {
  constructor() {
    // 事件通道调度中心
    this._events = {}
  }
  // 注册绑定事件
  $on(event, handler) {
    ;(this._events[event] = this._events[event] || []).push(handler)
  }
  // 解绑事件
  $off(event, handler) {
    this._events[event]?.filter(fn => fn !== handler)
  }
  // 触发事件
  $emit(event, ...args) {
    this._events[event]?.forEach(fn => {
      fn(...args)
    })
  }
  // 注册一次性事件
  $once(event, handler) {
    function newHandler(...args) {
      handler(...args)
      this.$off(event, newHandler)
    }
    this.$on(event, newHandler)
  }
}
