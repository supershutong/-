/* 浅拷贝：
  只能拷贝一层对象，如果有对象的嵌套，浅拷贝无能为力。
  潜在问题：假若拷贝的属性是引用类型，拷贝的就是内存地址，修改内容会互相影响。
*/
function shallowClone(target) {
  if (typeof target === 'object' && target !== null) {
    // 方法一，循环key
    let result = Array.isArray(target) ? [] : {}
    for (let k in target) {
      if (target.hasOwnProperty(k)) {
        // 是否是自身属性（非继承）
        result[k] = target[k]
      }
    }

    /* 方法二
      let result = Array.isArray(target) ? [] : {}
      Object.assign(result, target)
    */

    /* 方法三
      result = Array.isArray(target) ? [...target] : { ...target }
    */

    return result
  } else {
    return target // 基本类型，直接返回
  }
}

let target1 = true,
  target2 = '123',
  target3 = [1, 2, 3],
  target4 = { a: 1, b: ['test'], c: { d: 2 } }

console.log(shallowClone(target1))
console.log(shallowClone(target2))
console.log(shallowClone(target3))
console.log(shallowClone(target4))
