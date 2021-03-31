function commit(_type, _payload, _options) {
  const { type, payload, options } = unifyObjectStyle(_type, _payload, _options)
  const mutation = { type, payload }
  const entry = this._mutations[type]

  if (!entry) {
    console.error(`[vuex] unknown mutation type: ${type}`)
    return
  }

  // 专用修改state方法，其他修改state方法均为非法修改（_commiting标志未修改）
  this._withCommit(() => {
    entry.forEach((handler) => handler(payload))
  })
  // 订阅者函数遍历执行，传入当前mutation对象和当前state
  this._subscribers.forEach((sub) => sub(mutation, this.state))

  if (options && options.silent) {
    console.warn(
      `[vuex] mutation type: ${type}. Silent option has been removed. Use the filter functionality in the vue-devtools`
    )
  }
}
