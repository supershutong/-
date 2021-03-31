function set(target, key, val) {
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    // 修改数组长度，避免数组越界
    target.length = Math.max(target.length, key)
    // 利用数组splice方法触发响应式
    target.splice(key, 1, val)
    return val
  }
  // target为对象，key不在Object.prototype上，直接赋值
  if (key in target && !(key in Object.prototype)) {
    target[key] = val
    return val
  }
  // 以上均不成立，即开始给target创建一个全新属性
  /** 获取Observer实例；
   *  __ob__是vue对数据观测时增加的不可枚举属性，包括value、dep、vmCount;
   */
  const ob = target.__ob__
  // 若无__ob__属性，则target对象不是响应式数据，直接赋值
  if (!ob) {
    target[key] = val
    return val
  }
  // 进行响应式处理
  defineReactive(ob.value, key, val)
  ob.dep.notify() // 通知所有观测了data数据的watcher，触发视图更新；
  return val
}
