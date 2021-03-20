import Vue from 'vue'
import Vuex from 'vuex'

import qrcode from './model/qrcode'
import info from './model/info'
import param from './model/param'
import print from './model/print'
import real from './model/real'
import work from './model/work'
import user from './model/user'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    qrcode, info, param, print, real, work, user
  }
})
