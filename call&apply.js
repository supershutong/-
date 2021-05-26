/* 实现思路：利用谁调用函数，函数的 this 就指向谁这一特点来实现。
  call和 apply的区别在于，call接受的是多个参数列表，而apply接受的是一个参数数组。
*/

Function.prototype.mycall = function () {
  if (typeof this !== 'function') throw 'caller must be a function'
  let context =
    arguments[0] || (typeof window === 'undefined' ? global : window)
  let args = [...arguments].flat().slice(1) // call 也可以接受多个参数，此时需要 flat 展平
  // console.log(args)
  context._fn = this
  let res = context._fn(...args)
  Reflect.deleteProperty(context, '_fn')
  return res
}

Function.prototype.myapply = function () {
  if (typeof this !== 'function') throw 'caller must be a function'
  let self = arguments[0] || (typeof window === 'undefined' ? global : window)
  let args = arguments[1]
  self._fn = this
  let res = self._fn(...args)
  Reflect.deleteProperty(self, '_fn')
  return res
}

let arr1 = [1, 2, 3]
let arr2 = [4, 5, 6]

let max = Math.max.mycall(arr1)
console.log(max) // 3

Array.prototype.push.myapply(arr1, arr2)
console.log(arr1) // [1, 2, 3, 4, 5, 6]
