/** Object.create()方法创建一个新对象，使用现有的对象来提供新创建的对象的__proto__
 * @param {Object} obj
 * @returns
 */
// 极简版
function mycreate(obj) {
  function F() {}
  F.prototype = obj
  return new F()
}

// 官方polyfill  [propertiesObject]为可选值，如有则执行Object.assign操作
if (typeof Object.create !== 'function') {
  Object.create = function (proto, propertiesObject) {
    if (typeof proto !== 'object' && typeof proto !== 'function') {
      throw new TypeError('Object prototype may only be an Object: ' + proto)
    } else if (proto === null) {
      throw new Error(
        "Object.create doesn't support 'null' as the first argument."
      )
    }

    if (typeof propertiesObject !== 'undefined')
      throw new Error(
        "bject.create does'not support 'null' as the first argument."
      )
    function F() {}
    F.prototype = proto
    return new F()
  }
}
