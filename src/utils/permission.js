// 1.引入路由和仓库实例模块
import router from '../router'
import store from "../store"
import { Message } from 'element-ui'
import NProgress from 'nprogress'
import "nprogress/nprogress.css"
NProgress.configure({
    easing: 'ease', // 动画方式
    speed: 500, // 递增进度条的速度
    showSpinner: false, // 是否显示加载ico
    trickleSpeed: 200, // 自动递增间隔
    minimum: 0.3 // 初始化时的最小百分比
});
// 2.添加全局前置路由守卫
let { menus } = store.getters.userInfo
function fn(menus) {
    menus.forEach(item => {
        if (item.children && item.children.length > 0) {
            item.children.forEach(it => {
                router.addRoute('index', {
                    path: it.url.split('/')[1],
                    component: () => import(`../views/${it.url.split('/')[1]}/index.vue`),
                    meta: { title: [item.title, it.title] }
                })
            })
        }
    })
}
if (menus) {
    fn(menus)
}
router.beforeEach((to, from, next) => {
    // 1.检测是否登录
    NProgress.start()
    if (store.getters.token == "" && to.path != "/login") {
        next('/login')
        NProgress.done()
    } else if (store.getters.token && to.path == "/login") {
        next('/')
        NProgress.done()
    } else {
        next()
        if (from.path == "/login") {
            fn(menus)
        }
        let menus_url = store.getters.userInfo.menus_url || []
        menus_url = [...menus_url, , "/", "/home", "/login", "/404"]
        if (!menus_url.includes(to.path)) {
            next(false)
            Message.warning('非法访问')
            return
        }
    }


    // 2.检测是否有路由权限
    // 3.动态设置网站页签标题
    // 4.开始数据进度条动画
})

// 因为在se6模块化规范代码中默认开启了严格模式
// console.log(this)undefined

// 3.添加后置路由守卫
router.afterEach(() => { 
    NProgress.done()
})