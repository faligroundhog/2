import { getItem, setItem } from '@/utils/storage'
import { MAIN_COLOR, DEFAULT_COLOR } from '@/utils/theme/index.js'
export default {
    namespaced: true,
    state: {
        mainColor: getItem(MAIN_COLOR) || DEFAULT_COLOR,//主题色
    },
    mutations: {
        setMainColor(state,val){
            state.mainColor=val
            setItem(MAIN_COLOR,val)
        }
    },
    actions: {}
}