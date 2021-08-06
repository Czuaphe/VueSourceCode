
## 从$mount方法开始

```javascript
// core/instance/init.js
Vue.prototype._init = function (options?: Object) {
    // 初始化各种
    vm._self = vm
    initLifecycle(vm)
    initEvents(vm)
    initRender(vm)
    callHook(vm, 'beforeCreate')
    initInjections(vm) // resolve injections before data/props
    initState(vm) // <-- 之前主要看了这个函数，初始化了变量，计算属性
    initProvide(vm) // resolve provide after data/props
    callHook(vm, 'created')

    // 视图渲染
    if (vm.$options.el) {
      vm.$mount(vm.$options.el) // <-- 这次从这个$mount开始
    }
}
```

```javascript
// entites/web-runtime-with-compiler.js
const mount = Vue.prototype.$mount // 覆盖之前，单独保存一份
// 重写$mount方法
Vue.prototype.$mount = function ( el?: string | Element, hydrating?: boolean): Component {
  el = el && query(el)
  if (!options.render) { // 如果自定义render函数，就不取模板了
    let template = options.template
    // 处理模板template
    if (template) {
      if (typeof template === 'string') {
        if (template.charAt(0) === '#') {
          template = idToTemplate(template)
        }
      } else if (template.nodeType) {
        template = template.innerHTML
      } else {
        return this
      }
    } else if (el) {
      template = getOuterHTML(el)
    }
    // 得到渲染函数（重点：由template转换成渲染函数）
    if (template) {
      const { render, staticRenderFns } = compileToFunctions(template, {
        shouldDecodeNewlines,
        delimiters: options.delimiters
      }, this)
      options.render = render
      options.staticRenderFns = staticRenderFns
    }
  }
  // 运行没有覆盖的mount方法
  return mount.call(this, el, hydrating) 
}

```

那第一次定义 `Vue.prototype.$mount` 的地方在哪呢？

```javascript
// entites/web-runtime.js
import { patch } from 'web/runtime/patch'
import { mountComponent } from 'core/instance/lifecycle'
import { query } from 'web/util/index'
// install platform patch function
Vue.prototype.__patch__ = inBrowser ? patch : noop

// public mount method
Vue.prototype.$mount = function (
  el?: string | Element,
  hydrating?: boolean
): Component {
  el = el && inBrowser ? query(el) : undefined
  return mountComponent(this, el, hydrating)
}
```