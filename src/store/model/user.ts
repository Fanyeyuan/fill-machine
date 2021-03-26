import { Commit } from 'vuex'
const state = {
  id: 0,
  username: '',
  password: '',
  is_admin: false
}

const mutations = {
  saveInfo (states: typeof state, params: typeof state) {
    states.id = params.id || 0
    states.username = params.username
    states.password = params.password
    states.is_admin = params.is_admin
  }
}

const getters = {
  getLogined (states: typeof state) {
    return states.username.length
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
