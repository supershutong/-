/**
 * js继承方式
 * 如:原型链继承、构造函数继承、组合继承、寄生组合继承、ES6继承。
 */
/**
 * 1、原型链继承
 * 缺点：父类的引用类型（对象、数组）会被所有实例共享。其中一个子类修改会导致其他子类值改变。
 */
function Parent() {
  this.name = 'jack'
}
Parent.prototype.getName = function () {
  return this.name
}
function Child() {}
Child.prototype = new Parent()
var child = new Child()
child.getName() // 'jack'

/**
 * 2、构造函数继承（修改父类this）
 * 优点：解决了原型链中引用类型共享问题，同时可向构造函数传参（call传参）
 * 缺点：所有方法都定义在构造函数中，每次都需要重新创建
 */
function Parent() {
  this.name = ['jack']
}
function Child() {
  Parent.call(this)
}
var child = new Child()
child.name.push('mary')
var child2 = new Child() // child2.name === ['jack']

/**
 *  3、组合继承（原型链 + 构造函数）
 * 优点：解决了构造函数引用类型问题，同时避免了方法会被多次创建的问题
 * 缺点：父类构造函数被调用了两次，同时子类实例、原型链均有name属性
 */
function Parent() {
  this.name = 'jack'
}
Parent.prototype.getName = function () {
  return this.name
}
function Child() {
  Parent.call(this)
  this.topic = 'fe'
}
Child.prototype = new Parent()
// 需要重新设置子类的constructor。因 Child.prototype = new Parent()相当于子类的原型对象完全被覆盖
Child.prototype.constructor = Child

/**
 * 4、寄生组合继承 -- 推荐
 * 优点：解决了组合继承构造函数调用两次、引用类型共享、原型对象上存在多余属性问题
 */
function Parent() {
  this.name = 'jack'
}
Parent.prototype.getName = function () {
  return this.name
}
function Child() {
  Parent.call(this)
  this.topic = 'fe'
}
Child.prototype = new Parent()
// 核心：复制父类的原型对象挂载给子类
function iinherit(child, parent) {
  var prototype = Object.create(parent.prototype)
  prototype.constructor = child
  child.prototype = prototype
}

/**
 * 5、ES6继承
 * class + extends
 */
class Parent {
  constructor() {
    this.name = 'jack'
  }
  getName() {
    return this.name
  }
}
class Child extends Parent {
  constructor() {
    super() // 核心
    this.topic = 'fe'
  }
}
const child = new Child()
child.getName() // 'jack'
