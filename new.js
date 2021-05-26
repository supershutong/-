// 1、一个继承自 Foo.prototype 的新对象被创建。
// 2、使用指定的参数调用构造函数 Foo，并将 this 绑定到新创建的对象。
//      new Foo 等同于 new Foo()，也就是没有指定参数列表，Foo 不带任何参数调用的情况。
// 3、由构造函数返回的对象就是 new 表达式的结果。如果构造函数没有显式返回一个对象，则使用步骤1创建的对象。
// 4、一般情况下，构造函数不返回值，但是用户可以选择主动返回对象，来覆盖正常的对象创建步骤
function myNew(ctor) {
  if (typeof ctor !== 'function') {
    throw new TypeError("new operator's first param must be function")
  }
  let args = Array.prototype.slice.call(arguments, 1)
  // 1、创建空对象 {}
  let obj = {}
  // 2、把该对象的__proto__指向构造函数的原型对象prototype上
  obj.__proto__ = Object.create(ctor.prototype)
  // 3、将构造函数的this指向新创建的对象
  let res = ctor.apply(obj, args)
  let isObject = typeof res === 'object' && res !== null
  let isFunction = typeof res === 'function'
  // 4、返回新创建的对象
  return isObject || isFunction ? res : obj
}

function Car(make, model, year) {
  this.make = make
  this.model = model
  this.year = year
}

var car1 = myNew1(Car, 'Eagle', 'Talon TSi', 1993)
console.log('car1: ', car1)
