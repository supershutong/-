/**
 * 实现 a == 1 && a == 2 && a == 3 为true
 */

// 方法一：Reflect.defineProperty
let i = 1
Reflect.defineProperty(globalThis, 'a', {
  get() {
    return i++
  }
})

// console.log(a === 1 && a === 2 && a === 3)

// 方法二：利用ASCII编码
// const a = 1 // 字符a
// const a‍ = 2 // 字符a·
// const a‍‍ = 3 // 字符a··
// console.log(a === 1 && a‍ === 2 && a‍‍ === 3) // true

// 方法三：valueOf隐式类型转换
// let a = (function () {
//   let i = 1
//   return {
//     valueOf: function () {
//       return i++
//     }
//   }
// })()
// console.log(a == 1 && a == 2 && a == 3) // 不能用===
