import Vue from 'vue'
import locale from 'element-ui/lib/locale';
import VueI18n from 'vue-i18n'
//import messages from './langs'

//自定义中英文包
import zh from './langs/zh'
import en from './langs/en'

//element 中英文包
import enLocale from 'element-ui/lib/locale/lang/en'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'
Vue.use(VueI18n)

const messages = {
    en: Object.assign(en, enLocale),
    zh: Object.assign(zh, zhLocale)
}
//从localStorage中拿到用户的语言选择，如果没有，那默认中文。
/*const i18n = new VueI18n({
    locale: localStorage.lang || 'zh',
    messages,
})*/
const i18n = new VueI18n({
    locale: localStorage.getItem('locale') || 'zh',
    messages
})
locale.i18n((key, value) => i18n.t(key, value)) //为了实现element插件的多语言切换
console.log('%c当前缓存语言是：'+(localStorage.getItem('locale')=='en'?'English':'中文')+'','color:#fff;background:green;padding:4px;border-radius:5px');
export default i18n