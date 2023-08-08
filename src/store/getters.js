// 读取各个模块中的state
export default {
    token: state => state.user.token,
    userInfo: state => state.user.userInfo,
    mainColor:state=>state.theme.mainColor
}