function dispatch(_type, _payload) {
  // 配置参数适配处理
  const { type, payload } = unifyObjectStyle(_type, _payload)

  // 当前entry下所有action处理函数集合
  const entry = this._actions[type]
  if (!entry) {
    console.error(`[vuex] unknown action type: ${type}`)
    return
  }

  return entry.length > 1
    ? Promise.all(entry.map((handler) => handler(payload)))
    : entry[0](payload)
}
