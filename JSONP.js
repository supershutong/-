// JSONP：常见的跨域手段，利用 <script> 标签没有跨域限制的漏洞，来达到与第三方通讯的目的。

function jsonp(url, params, callbackName) {
  const generateURL = () => {
    let queryString = ''
    for (const key in params) {
      if (Object.hasOwnProperty.call(params, key)) {
        queryString += `${key}=${params[key]}&`
      }
    }
    return `${url}?${queryString}callback=${callbackName}`
  }

  return new Promise((resolve, reject) => {
    let el = document.createElement('script')
    el.src = generateURL()
    document.body.appendChild(el)
    // 服务器返回字符串 `${callbackName}(${服务器的数据})`，浏览器解析即可执行。
    window[callbackName] = data => {
      resolve(data) // 浏览器解析服务器返回数据
      document.body.removeChild(el) // 清除插入的dom
    }
  })
}
