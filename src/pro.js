import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import i18n from './utils/lang/index';

Vue.config.productionTip = false //关闭生产模式下的错误提示


// 按需使用element-ui
// import elementPlg from "@/utils/element/index.js"
// Vue.use(elementPlg)

// 引入基础重置样式
import "./assets/css/reset.css"

// 引入全局过滤器
import filterPlg from "./filter/index.js"
Vue.use(filterPlg)

// 引入api请求模块挂载到vue原型链
import * as serve from "./serve/api"
Vue.prototype.$serve = serve

// 引入登录和权限检测模块文件
import "./utils/permission.js"

import iconPicker from 'vue-fontawesome-elementui-icon-picker';
Vue.use(iconPicker);

// 引入动画样式
import "@/assets/css/transition.css"


// 创建中央事件监听容器 vue实例( $on $emit $once $off )
Vue.prototype.$BUS = new Vue()

new Vue({
  i18n,
  router,
  store,
  render: h => h(App)
}).$mount('#app')

// localhost:8080 ==>index.html(编译后的)
// npm run serve: index.html（编译前的）==>main.js(render)===>App.vue(router-view)===>router(index.js)===>path(component)