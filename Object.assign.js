/** Object.assign() 方法用于将所有可枚举属性的值从一个或多个源对象分配到目标对象。它将返回目标对象。
 *  @example Object.assign(target, ...sources)
 */
Object.assign1 = function (target, ...sources) {
  if (target == null)
    throw new TypeError('Cannot convert undefined or null to object ')
  let res = Object(target)
  sources.forEach(obj => {
    if (obj !== null) {
      for (let key in obj) {
        res[key] = obj[key]
      }
    }
  })
  return res
}

var a = { b: 1, c: 2 }
var aa = Object.assign1(a, { b: 11, d: 33 }, { d: 444 })
console.log(aa) // { b: 11, c: 2, d: 444 }
