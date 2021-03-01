function myNew(ctor) {
  if (typeof ctor !== 'function') {
    throw "new operator's first param must be a function"
  }
  let args = Array.prototype.slice.call(arguments, 1)
  // 1、创建空对象 {}
  let obj = {}
  // 2、把该对象的__proto__指向构造函数的原型对象prototype上
  obj.__proto__ = ctor.prototype
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
