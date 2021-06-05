/* 柯里化curry ：
  定义：将函数与其参数的一个子集绑定起来后返回个新函数。
  好处：减少代码冗余，增加可读性，是一种简洁的实现函数委托的方式。
*/
function curry(fn) {
  const len = fn.length // Function.length:函数的形参个数

  return function curryFn(...outerArgs) {
    outerArgs = Array.prototype.slice.call(outerArgs)
    if (outerArgs.length >= len) {
      // 递归出口
      return fn.apply(null, outerArgs)
    } else {
      return function (...innerArgs) {
        innerArgs = Array.prototype.slice.call(innerArgs)
        return curryFn.apply(null, outerArgs.concat(innerArgs))
      }
    }
  }
}

// 测试用例
function multiFn(x, y, z) {
  return x * y * z
}

let multi = curry(multiFn)
let a1 = multi(2, 3, 4)
let a2 = multi(2)(3)(4)
let a3 = multi(2, 3)(4)
let a4 = multi(2)(3, 4) // 以上结果都是 3，柯里化将参数拆开自由绑定，结果不变。
let seniorMulti = multi(2) // seniorMulti 可以多次使用
let a5 = seniorMulti(3)(4) // 当我们觉得重复传递参数 2 总是冗余时，可以这样。
console.log(a1, a2, a3, a4, a5)
// console.log(a5)
