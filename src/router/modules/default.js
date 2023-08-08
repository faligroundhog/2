// 引入页面路由组件
import Layout from '@/layout'

// 定义项目基础请求路由规则
export default [{
    path: "/",
    name:"index",
    component: Layout,
    redirect: "/home",
    children:[
        {
            path:'/home',
            component:()=>import('../../views/home/index.vue'),
        }
    ]
}, {
    path: "/login",
    component: () => import("@/views/login/index.vue")
}, {
    path: "*",
    component: () => import("@/views/404/index.vue")
}]