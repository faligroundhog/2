// 1.引入基础模块
// import vue from "vue"

// 2.定义filter
const toFx = (price, num) => {
    return price.toFixed(num)
}

const hidPhone = (phone) => {
    return phone.substr(0, 3) + '****' + phone.substr(7)
}

// 3.组装数据格式方便耨器全局注册
const autoFilters = {
    toFx,
    hidPhone
}


export default (vue) => {
    // 4.循环注册全局过滤器
    for (let key in autoFilters) {
        vue.filter(key, autoFilters[key])
    }
}