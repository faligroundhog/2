import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "../src/assets/css/reset.css";
import element from "./utils/element/index"
import iconPicker from 'vue-fontawesome-elementui-icon-picker';
import filterPlg from "./filter/index.js"
import directivePlg from "./directive/index.js"
import * as serve from './serve/api'
import i18n from './utils/lang';
import '../src/utils/permission';
import 'animate.css';
import "@/assets/css/transition.css"
Vue.config.productionTip = false
Vue.prototype.$Bus = new Vue()
Vue.prototype.$serve = serve
Vue.use(iconPicker);
Vue.use(filterPlg)
Vue.use(directivePlg)
Vue.use(element)
new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
