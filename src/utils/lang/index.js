import Vue from 'vue';
import VueI18n from 'vue-i18n'
import enLocale from 'element-ui/lib/locale/lang/en'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'
import autoZh from "./zh";
import autoEn from "./en"


Vue.use(VueI18n)


// 获取语言模块实例 设置默认语言 合拼内置和自定义语言模板文件内容
const i18n = new VueI18n({
    locale: 'zh',//设置默认语言 中文
    messages: {//将自定义语言包对照表和内置语言对照表配置好
        'zh': { ...autoZh, ...zhLocale },
        'en': { ...autoEn, ...enLocale }
    }
})
// 导出实例
export default i18n