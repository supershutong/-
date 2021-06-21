/* 深拷贝：为对象创建一个副本，两者的引用地址不同。

  JSON.parse(JSON.stringify());
  乞丐版已经能覆盖大多数的应用场景，但它存在几个问题：

  1、无法解决 循环引用。
  2、无法拷贝特殊的对象，比如 函数、RegExp、Date、Set、Map 等。
 */

// Map 强引用，需要手动清除属性才能释放内存。
// WeakMap 弱引用，随时可能被垃圾回收，使内存及时释放，是解决循环引用的不二之选。
function deepClone(obj, map = new WeakMap()) {
  if (!obj instanceof Object) return obj // 基本类型
  if (obj instanceof RegExp) return new RegExp(obj.source, obj.flags)
  if (obj instanceof Date) return new Date(obj)

  if (map.get(obj)) return map.get(obj) // map解决循环引用

  if (obj instanceof Function) {
    return function () {
      return obj.apply(this, [...arguments])
    }
  }

  const res = new obj.constructor() // 挂载原型链，数组/普通对象/Set/Map处理
  obj instanceof Object && map.set(obj, res) // 此处判断不能少

  if (obj instanceof Set) {
    obj.forEach(item => {
      res.add(deepClone(item, map))
    })
  }
  if (obj instanceof Map) {
    obj.forEach((item, key) => {
      res.set(deepClone(key, map), deepClone(item, map))
    })
  }
  Object.keys(obj).forEach(key => {
    if (obj[key] instanceof Object) {
      res[key] = deepClone(obj[key], map)
    } else {
      res[key] = obj[key]
    }
  })

  return res
}

function deepClone(obj, map = new WeakMap()) {
  if (typeof obj !== 'object' || obj === null) return obj
}

// 测试用例
const map = new Map()
map.set({ a: 1 }, '1')
const source = {
  name: 'Jack',
  meta: {
    age: 12,
    birth: new Date('1997-10-10'),
    ary: [1, 2, { a: 1 }],
    say() {
      console.log('Hello')
    },
    map
  }
}
source.source = source // 循环引用测试
const newObj = deepClone(source)
console.log(newObj.meta.ary[2] === source.meta.ary[2]) // false
console.log(newObj.meta.birth === source.meta.birth) // false
console.log(newObj)
