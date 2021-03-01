/*
 * instanceof 判断左边的原型是否存在于右边的原型链中。
 * 实现思路：逐层往上查找原型，如果最终的原型为 null ，证明不存在原型链中，否则存在。
 */
function myinstanceof(left, right) {
  if (typeof left !== 'object' || left === null) return false // 基础类型直接返回false
  let proto = Object.getPrototypeOf(left) // 获取对象原型
  while (true) {
    if (proto === null) return false
    if (proto === right.prototype) return true
    proto = Object.getPrototypeOf(proto)
  }
}

let res = myinstanceof(['a'], Object)
console.log(res)
