Vue.extend = function (extendOptions) {
  extendOptions = extendOptions || {}
  //this为Vue构造函数
  const Super = this
  const name = extendOptions.name || Super.options.name
  //用于暴露到外面去的构造函数
  const Sub = function VueComponent(options) {
    this._init(options)
  }
  //继承Vue的原型
  Sub.prototype = Object.create(Super.prototype)
  //上一步的操作将其constructor修改了，这里 将constructor指向自己
  Sub.prototype.constructor = Sub
  //合并options项
  Sub.options = mergeOptions(Super.options, extendOptions)
  Sub['super'] = Super
  if (Sub.options.props) {
    initProps(Sub)
  }
  if (Sub.options.computed) {
    initComputed(Sub)
  }
  //给构造函数挂载属性
  Sub.extend = Super.extend
  Sub.mixin = Super.mixin
  Sub.use = Super.use

  // create asset registers, so extended classes
  // can have their private assets too.
  ASSET_TYPES.forEach(function (type) {
    Sub[type] = Super[type]
  })
  // enable recursive self-lookup
  if (name) {
    Sub.options.components[name] = Sub
  }
  //返回该构造函数
  return Sub
}
