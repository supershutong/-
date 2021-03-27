/** 方法一：IntersectionObserver
 * 优点：实现了监听scroll，判断是否在视口中，节流三大功能；
 * 缺点：兼容性
 */
function observer(targets) {
  return new IntersectionObserver(targets => {
    for (let i = 0, len = targets.length; i < len; i++) {
      let img = targets[i]
      // 该属性判断是否在视口中，返回 boolean 值
      if (img.isIntersecting) {
        const imgElement = img.target
        imgElement.src = imgElement.getAttribute('data-src') // 资源地址存储在自定义属性data-src
        observer(targets).unobserve(imgElement) // 解除观察
      }
    }
  })
}

// 测试用例
let imgs = document.getElementsByTagName('img')
Array.from(imgs).map(item => observer(imgs).observe(item))

/** 方法二：getBoundingClientRect().top
 * 可以直接判断图片是否出现在了当前视口
 * */
function lazyLoad() {
  let viewHeight = document.documentElement.clientHeight //视口高度
  //滚动条卷去的高度
  let scrollTop = document.documentElement.scrollTop || document.body.scrollTop
  for (let i = count; i < imgs.length; i++) {
    // 元素现在已经出现在视口中
    if (imgs[i].offsetTop < scrollTop + viewHeight) {
      if (imgs[i].getAttribute('src') !== 'default.jpg') continue
      imgs[i].src = imgs[i].getAttribute('data-src')
      count++
    }
  }
}
// 测试用例
let imgs = document.getElementsByTagName('img')
let count = 0
lazyLoad() // 首次加载
// 通过监听 scroll 事件来判断图片是否到达视口，别忘了防抖节流
window.addEventListener('scroll', throttle(lazyLoad, 160))
