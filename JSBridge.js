;(function () {
  var id = 0,
    callbacks = {},
    registerFuncs = {}
  // 判断环境，获取不同的 nativeBridge
  const nativeBridge =
    navigator.userAgent.indexOf('Apple') > -1
      ? window.nativeBridge
      : window.webkit.messageHandlers.nativeBridge

  window.JSBridge = {
    // 唤起 Native 调用
    invoke: function (bridgeName, callback, data) {
      var thisId = id++ // 获取唯一 id
      callbacks[thisId] = callback // 存储 Callback
      nativeBridge.postMessage({
        bridgeName,
        data: data || {},
        callbackId: thisId // 传到 Native 端
      })
    },
    // Native功能回调
    receiveMessage: function (msg) {
      var bridgeName = msg.bridgeName,
        data = msg.data || {},
        callbackId = msg.callbackId, // Native 将 callbackId 原封不动传回
        responstId = msg.responstId
      // 具体逻辑
      // bridgeName 和 callbackId 不会同时存在
      if (callbackId) {
        if (callbacks[callbackId]) {
          // 找到相应句柄
          callbacks[callbackId](msg.data) // 执行调用
        }
      } else if (bridgeName) {
        if (registerFuncs[bridgeName]) {
          // 通过 bridgeName 找到句柄
          var ret = {},
            flag = false
          registerFuncs[bridgeName].forEach(callback => {
            callback(data, function (r) {
              flag = true
              ret = Object.assign(ret, r)
            })
          })
          if (flag) {
            nativeBridge.postMessage({
              // 回调 Native
              responstId,
              ret
            })
          }
        }
      }
    },
    register: function (bridgeName, callback) {
      if (!registerFuncs[bridgeName]) {
        registerFuncs[bridgeName] = []
      }
      registerFuncs[bridgeName].push(callback) // 存储回调
    }
  }
})()
