import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// 引入业务仓库模块
import tags from "./modules/tags.js"
import theme from "./modules/theme.js"
import user from "./modules/user.js"

// 引入服务各个模块state的getters
import getters from "./getters.js"

export default new Vuex.Store({
  getters,
  modules: {
    tags,
    theme,
    user
  }
})