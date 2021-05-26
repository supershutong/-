/* bind 有如下特性：
  1、可以指定this
  2、返回一个函数
  3、可以传入参数
  4、柯里化
*/
Function.prototype.mybind = function () {
  if (typeof this !== 'function') throw `${this} must be a function`
  let context = arguments[0] || globalThis
  let args = [...arguments].slice(1) // 3、可传入参数
  let self = this
  let fn = function (...fnArgs) {
    self.apply(this instanceof self ? this : context, args.concat(fnArgs)) // 1、可以指定this；4、柯里化参数拼接
  }
  fn.prototype = Object.create(self.prototype) // bind返回函数可new，原型指向新的与self相同的原型连
  return fn // 2、返回函数
}

// 测试用例
var value = 2
var foo = {
  value: 1
}
function bar(name, age) {
  this.habit = 'shopping'
  console.log(this.value)
  console.log(name)
  console.log(age)
}
bar.prototype.friend = 'kevin'

var bindFoo = bar.mybind(foo, 'Jack') // mybind
var obj = new bindFoo(20) // 返回正确
// undefined
// Jack
// 20

obj.habit // 返回正确
// shopping

obj.friend // 返回正确
// kevin

obj.__proto__.friend = 'Kitty' // 修改原型

console.log(bar.prototype.friend) // 返回错误，这里被修改了
// Kitty
