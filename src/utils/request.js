import axios from "axios"
import store from '../store'
import router from '../router'
import {Message} from 'element-ui'

let baseURL = ""
if (process.env.NODE_ENV == "development") {
    baseURL = "http://localhost:3000" //本地服务（测试服务器==>本地 测试服务器==>远程）
    // baseURL = "https://api.aslegou.top" //本地服务（测试服务器==>本地 测试服务器==>远程）
} else {
    baseURL = "https://api.aslegou.top" //生产服务器
}
const http = axios.create({
    baseURL
})

// 4.设置请求拦截
http.interceptors.request.use((config) => {
    // 再此可以处理请求数据 header头 token
    store.getters.token && (config.headers.authorization=store.getters.token)
    // let userInfo= JSON.parse(localStorage.getItem('userInfo')) || ''
    // if(userInfo){
    //     let {token} = userInfo
        
    // }
    return config
}, () => { })
// 5.设置响应拦截
http.interceptors.response.use((res) => {
    if(res.data.code==200 && res.data.msg!='操作成功'){
        Message.success(res.data.msg)
    }else if(res.data.msg=='操作成功'){
        
    }else if(res.data.code==403){
        Message.warning(res.data.msg)
        store.commit('user/login',res.list)
        router.push("/");
    }else{
        Message.error(res.data.msg)
    }
    return res.data
}, () => { })

export default http