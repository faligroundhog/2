const color = {
    inserted: (el, binding) => {
        console.log(binding);
        el.style.backgroundColor = binding.value
    },
    updated: (el, binding) => {
        el.style.backgroundColor = binding.value
    }
}



// 3.组装数据格式方便耨器全局注册
const autoDirective = {
    color
}


export default (vue) => {
    // 4.循环注册全局过滤器
    for (let key in autoDirective) {
        vue.directive(key, autoDirective[key])
    }
}