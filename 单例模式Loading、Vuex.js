/** 核心：闭包/单例
 *
 */
const Loadings = (function () {
  let instance
  return function () {
    // 确保单例
    if (!instance) {
      instance = document.createElement('div')
      instance.innerHTML = '加载中……'
      instance.id = 'loading'
      document.body.appendChild(instance)
    }
    return instance
  }
})()

// 测试用例
document.getElementById('startLoading').addEventListener('click', () => {
  new Loading()
})
