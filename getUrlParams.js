// 解析URL获取 key对应的参数
function getURLparams(url, key) {
  let params = {}
  url.replace(/[?&]+([^=]+)=([^&]*)/gi, function (m, key, value) {
    params[key] = value
  })
  return params[key]
}

// 测试用例
getURLparams(
  'https://www.baidu.com/items?itemName=a.a1&num=123&bool=true',
  'num'
)
