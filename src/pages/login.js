import Vue from 'vue'
import vuetify from '@/plugins/vuetify'
import App from './App.vue'

Vue.use(window.VueI18n)
Vue.config.productionTip = false

const i18n = new window.VueI18n({
    locale: 'zh-CN', // 定义默认语言为中文
    messages: {
        'zh-CN': require('../assets/languages/zh-CN.json'),
        en: require('../assets/languages/en.json')
    }
})

// i18n.locale = localStorage.getItem("locale");

new Vue({
    vuetify,
    i18n,
    render: h => h(App)
}).$mount('#app')
