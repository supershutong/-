/* Vue.use() 一般用来注册插件。
  如Vue.use(vueRouter)、Vue.user(Vuex)。
  常常通过这种方式将 Vue传到插件内部，在插件内部将 Vue 构造函数添加原型属性。
  经常跟 Vue.extend() 搭配着使用。
 */
Vue.use = function (plugin) {
  // installedPlugins表示应注册的插件
  let installedPlugins = this._installedPlugins || (this._installedPlugins = [])
  if (installedPlugins.indexOf(plugin) > -1) {
    return this
  }
  let args = Array.prototype.slice.call(arguments, 1)
  args.unshift(this)

  //如果传入的插件有install属性，且其是一个函数
  if (typeof plugin.install === 'function') {
    plugin.install.apply(plugin, args)
  } else if (typeof plugin === 'function') {
    plugin.apply(null, args)
  }
  //将此插件添加到插件列表中
  installedPlugins.push(plugin)
  return this
}

// 插件示例
import ConfirmModal from './ShowModal.vue'
function confirmModal(component, props, Vue) {
  const constructor = Vue.extend(component) // 配合Vue.extend()
  const instance = new constructor({
    propsData: props
  })
  instance.$mount()
  document.body.appendChild(instance.$el)
  instance.visible = true
  return instance
}
export default {
  install(Vue) {
    // 插件挂载
    Vue.prototype.$ShowModal = props => {
      return confirmModal(ConfirmModal, props, Vue)
    }
  }
}

// main.js 全局注册插件
import ShowModal from '@/plugins/ShowModal'
Vue.use(ShowModal)

// 全局调用
this.$ShowModal({
  title: '是否保存数据',
  content: '您是否要保存卡片布局数据?',
  ok: () => {},
  cancel: () => {
    //todo
  }
})
