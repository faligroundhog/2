// 引入本次缓存操作模块
import {
    setItem,
    getItem,
    removeItem
} from "@/utils/storage.js"
export default {
    namespaced: true,
    state: {
        token: getItem('token') || "",
        userInfo: getItem('userInfo') || ""
    },
    mutations: {
        login(state, newV) {
            // 同步仓库
            state.token = newV.token
            state.userInfo = newV
            // 同步缓存
            setItem('token', newV.token)
            setItem('userInfo', newV)
        },
        outLogin(state) {
            // 同步仓库
            state.token = ""
            state.userInfo = ""
            // 同步缓存
            removeItem('token')
            removeItem('userInfo')
        }
    },
    actions: {

    }
}