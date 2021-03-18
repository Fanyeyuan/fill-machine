import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueI18n from 'vue-i18n'
import Element from 'element-ui'
import enLocale from 'element-ui/lib/locale/lang/en'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'

import zh from '@/app/language/zh'
import en from '@/app/language/en'

Vue.use(VueI18n)

const messages = {
  en: {
    local: en,
    ...enLocale
  },
  zh: {
    local: zh,
    ...zhLocale
  }
}
const i18n = new VueI18n({
  locale: 'zh', // set locale
  messages // set locale messages
})
Vue.use(Element, {
  i18n: (key: string, value: any): VueI18n.TranslateResult => i18n.t(key, value)
})

Vue.config.productionTip = false

new Vue({
  i18n,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
