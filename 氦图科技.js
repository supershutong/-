// Hiretual 全栈工程师 - javascript 笔试题 30分钟
// 1.下列两个函数中的this分别绑定在什么对象上？分别属于四种调用模式(Method, Function, Constructor, Apply)中的哪一种？
var Quo = function (str) {
  this.status = str
} // Function
Quo.prototype.get_status = function () {
  return this.status
} // Constructor

// 2.以下是javascript中一个臭名昭著的问题，请问该段代码的输出是什么？为什么？怎么样修正它？
var funcs = []
for (var i = 0; i < 3; i++) {
  // let's create 3 functions
  funcs[i] = function () {
    let arg = i
    return function () {
      // and store them in funcs
      console.log('My value: ' + arg) // each should log its value.
    }
  }.call(null, i)
}
for (var j = 0; j < 3; j++) {
  funcs[j]() // and now let's run each one to see
}
// My value: 3 输出三次；
// 原因：function中打印的 i 在函数调用的运行时环境确定，此时 i已经完成循环，值为3；
// 修改方法: 闭包；如上图

// 3.如果现在String对象上没有charAt这个函数，请使用slice函数写一个
// 注：
str.charAt(index)
// str.slice(beginSlice[, endSlice])

/*
 String原型链挂载charAt1方法
*/
String.prototype.charAt1 = function (index) {
  return this.slice(index, index + 1)
}
console.log('abc'.charAt1(2))

// 4.请写出能够满足下列结果的科里化(Curry)函数
Function.prototype.curry = function () {
  let self = this
  let args = Array.prototype.slice.call(arguments)
  return function () {
    let newArgs = args.concat(Array.prototype.slice.call(arguments))
    return self.apply(this, newArgs)
  }
}
function add(x, y) {
  return x + y
}
var add1 = add.curry(1)
console.log(add1(6)) // 输出7

// 5.请解释下列汉诺塔的代码，是如何将其分解为子问题并用递归解决的？
var hanoi = function (disc, src, aux, dst) {
  if (disc > 0) {
    hanoi(disc - 1, src, dst, aux)
    console.log('Move disc' + disc + ' from ' + src + ' to ' + dst)
    hanoi(disc - 1, aux, src, dst)
  }
}
hanoi(3, 'Src', 'Aux', 'Dst')
// 注1.变量名解释：src --> source(起源、起点), aux-->auxiliary(辅助的), dst-->destination(目的地)
// 注2.汉诺塔（港台：河内塔）是根据一个传说形成的数学问题：
//     有三根杆子A，B，C。A杆上有N个(N>1)穿孔圆盘，盘的尺寸由下到上依次变小。要求按下列规则将所有圆盘移至C杆：
//         a. 每次只能移动一个圆盘；
//         b. 大盘不能叠在小盘上面。
// 提示：可将圆盘临时置于B杆，也可将从A杆移出的圆盘重新移回A杆，但都必须遵循上述两条规则。应该如何移动才能全部移动至C杆

// 解释：每次把起点移动一个盘到目的地，再从起点移动一个盘到辅助，然后把目的地的盘也移动到辅助杆；再把起点的盘移动到目的地，再从起点移动一个盘到辅助，然后把目的地的盘也移动到辅助杆；循环往复此操作即可。
