import Vue from 'vue'
import VueRouter from 'vue-router'
import defaultRouter from "./modules/default.js"

Vue.use(VueRouter)

//获取原型对象上的push函数
const originalPush = VueRouter.prototype.push
//修改原型对象中的push方法
VueRouter.prototype.push = function push(location) {
  // 调用原来的push函数，并捕获异常
  return originalPush.call(this, location).catch(err => err)
}





const routes = [...defaultRouter]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  // 获取缓存中的用户信息
  let userInfo = localStorage.getItem('userInfo') || "";
  if (userInfo == "" && to.path != "/login") {
    next("/login")
  } else {
    next();
  }
})

export default router
