import { Commit } from 'vuex'
const state = {
  type: '',
  message: ''
}

const mutations = {
  saveInfo (states: any, params: typeof state) {
    states.type = params.type
    states.message = params.message
  }
}

const getters = {
  getMessage (states: any) {
    return states.message
  }
}

const actions = {
  saveInfo (context: { commit: Commit }, params: typeof state) {
    context.commit('saveInfo', params)
  }
}

export default {
  namespaced: true, // namespaced为false的时候，state,mutations,actions全局可以调用，为true，生成作用域，引用时要声明模块名称
  state,
  mutations,
  actions,
  getters
}
