/**
 * js继承方式
 * 如:原型链继承、构造函数继承、组合继承、寄生组合继承（ES5推荐）、ES6继承。
 */
/**
 * 方法一、原型链继承
 * 缺点：1.父类的引用类型（对象、数组）会被所有实例共享。其中一个子类修改会导致其他子类值改变。
 *      2.无法向构造函数传参
 */
function Parent(colors = []) {
  this.colors = colors
}
Parent.prototype.getColors = function () {
  console.log(this.colors)
  return this.colors
}
function Child() {}
Child.prototype = new Parent() // 缺陷产生的根源，new操作之后原型链确定，引用类型地址不再变化。
Child.prototype.constructor = Child // 手动修改Son.prototype中的constructor为构造器

// 缺陷示例：child1和child2互相干扰
var child = new Child()
child.colors.push('blue')
child.getColors() // [ 'blue' ]

var child2 = new Child()
child2.colors.push('#f59')
child2.getColors() // [ 'blue', '#f59' ]，因为继承了同一个数组对象

/**
 * 方法二、构造函数继承（修改父类this）
 * 优点：解决了原型链中引用类型共享问题，同时可向构造函数传参（call传参）
 * 缺点：所有方法都定义在构造函数中，每次都需要重新创建
 */
function Parent(name, colors = []) {
  this.name = name
  this.colors = colors
}
function Child(name, colors) {
  Parent.call(this, name, colors) // 绑定原型this，传参。解决原型继承时引用类型复用问题。
}
const boy = new Child('jack', ['blue', 'black'])
const girl = new Child('lily', ['#f39'])

girl.colors.push('#f59')
console.log(boy.colors) // [ 'blue', 'black' ]
console.log(girl.colors) // [ '#f39', '#f59' ]

/**
 *  方法三、组合继承（原型链 + 构造函数）
 * 优点：解决了构造函数引用类型问题，同时避免了方法会被多次创建的问题
 * 缺点：父类构造函数被调用了两次，同时子类实例、原型链均有name属性
 */
function Parent(name, colors = []) {
  this.name = name
  this.colors = colors
}
Parent.prototype.getColors = function () {
  console.log(this.colors)
}
function Child(name, colors = []) {
  Parent.call(this, name, colors) // 首次调用
}
Child.prototype = new Parent() // 二次调用，且会导致子类型的实例和原型上都有一份父类型自身属性的副本，冗余。
// 需要重新设置子类的constructor。
// 因 Child.prototype = new Parent()相当于子类的原型对象完全被覆盖
Child.prototype.constructor = Child
const boy = new Child('jack', ['blue', 'black']) // 构造函数constructor为Child
const girl = new Child('lily', ['#f39'])

girl.colors.push('#f59')
console.log(boy.colors) // [ 'blue', 'black' ]
console.log(girl.colors) // [ '#f39', '#f59' ]

/**
 * 方法四、寄生组合继承 -- 推荐
 * 优点：解决了组合继承构造函数调用两次、引用类型共享、原型对象上存在多余属性问题
 */
function People(name) {
  this.name = name
  this.firends = ['jack', 'tom']
}
People.prototype.getName = function () {
  console.log(this.name)
}
function Child(name, age) {
  People.call(this, name)
  this.age = age
  // 子类公有方法
  this.getAge = function () {
    return this.age
  }
}
function inheritPrototype(subType, superType) {
  const prototype = Object.create(superType.prototype)
  prototype.constructor = subType // 此时prototype就会将__proto__属性指向superType的原型
  subType.prototype = prototype
}
inheritPrototype(Child, People)
const boy = new Child()
const girl = new Child()

boy.firends.push('lily')
console.log(girl.firends) // [ 'jack', 'tom' ]，两个子类互不影响

/**
 * 5、ES6继承
 * class + extends
 */
class Parent {
  constructor(name) {
    this.name = name
  }
  getName() {
    return this.name
  }
}
class Child extends Parent {
  constructor(name, age) {
    super(name) // 核心：子类必须调用父类super方法，super即父类的构造函数，用于新建父类的this对象，也就是引用父类的属性和方法
    this.age = age
  }
  sayAge() {
    const name = super.getName()
    console.log(`my name is ${name}, and my age is ${this.age}`)
  }
}
const child = new Child('jack', 12)
child.sayAge() // 'my name is jack, and my age is 12'
