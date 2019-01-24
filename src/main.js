// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// 自己引入的东西
import 'babel-polyfill'

import ElementUI from 'element-ui'
import '@/theme/index.css'

import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import '@/assets/css/weixin.less'
import '@/assets/css/init.css'

import VueI18n from 'vue-i18n'
import ElementLangEn from 'element-ui/lib/locale/lang/en'
import ElementLangCn from 'element-ui/lib/locale/lang/zh-CN'
import locales from './locales'

import axios from 'axios'
import VueAxios from 'vue-axios'

import { token, roles } from '@/utils'
// 结束
Vue.use(ElementUI)
Vue.use(MintUI)

Vue.use(VueAxios, axios)

Vue.config.productionTip = false

// axios 配置
// const loadingOptions = {
//   fullscreen: true
// }
// let loadingService = {}
let request = 0
axios.interceptors.request.use(function (config) {
  if (request === 0) {
    // loadingService = Loading.service(loadingOptions)
    request++
  }
  const myToken = token.get() || ''
  if (myToken !== '') {
    config.headers.AuthToken = myToken
  }
  return config
}, function (err) {
  return Promise.reject(err)
})

axios.interceptors.response.use(function (response) {
  let myToken = ''
  request--
  if (!response.data.Token) {
    myToken = response.data.data ? response.data.data.Token : ''
  } else {
    myToken = response.data ? response.data.Token : ''
  }
  // if (request === 0) setTimeout(() => { loadingService.close() }, 500)
  if (myToken !== undefined && myToken !== '' && myToken !== null) {
    token.set(myToken)
  } else {
    router.push({name: 'Login'})
  }
  return response
}, function (error) {
  /* if (error.response.status === 403) {
    router.push({ name: 'ErrorMessageT' })
  } else if (error.response.status === 404) {
    router.push({ name: 'ErrorMessageF' })
  } */
  return Promise.reject(error)
})

// 双语设置
Vue.use(VueI18n)

const messages = {
  en: {
    message: locales.en,
    ...ElementLangEn
  },
  zh: {
    message: locales.cn,
    ...ElementLangCn
  }
}

const i18n = new VueI18n({
  locale: 'en',
  messages
})

Vue.directive('role', {
  bind: function (el, binding, vnode) {
    if (roles.check(binding.value)) {
      el.style.display = 'none'
    }
  }
})

Vue.use(ElementUI, {
  i18n: (key, value) => i18n.t(key, value)
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  i18n,
  components: { App },
  template: '<App/>'
})
