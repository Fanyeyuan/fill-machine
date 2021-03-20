import { Commit } from 'vuex'

const state = {
  QRCode: {
    isValid: false, // 打印机是否有效
    name: '' // 打印机名称
  },
  Record: {
    isValid: false,
    name: ''
  }
}

const mutations = {
  saveQRCode (states: typeof state, params: typeof state.QRCode) {
    states.QRCode = params
  },
  saveRecord (states: typeof state, params: typeof state.QRCode) {
    states.QRCode = params
  }
}

const getters = {
  getQRCode (states: typeof state) {
    return states.QRCode
  },
  getRecord (states: typeof state) {
    return states.QRCode
  }
}

const actions = {
  saveQRCode (context: { commit: Commit }, params: typeof state.QRCode) {
    context.commit('saveQRCode', params)
  },
  saveRecord (context: { commit: Commit }, params: typeof state.Record) {
    context.commit('saveRecord', params)
  }
}

export default {
  namespaced: true, // namespaced为false的时候，state,mutations,actions全局可以调用，为true，生成作用域，引用时要声明模块名称
  state,
  mutations,
  actions,
  getters
}
