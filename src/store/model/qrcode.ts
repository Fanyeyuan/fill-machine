import { Commit } from 'vuex'
const state = {
  used: 0 | 1,
  model: [{
    id!: 0,
    company: '', // 公司名称
    boar_code: '', // 公猪编号
    boar_varieties: '', // 公猪品种
    volume: 0, // 精液容量
    create_time!: 0 // 生成事件
  }]
}

const mutations = {
  saveQRcode (states: typeof state, param: typeof state) {
    states = param
  }
}

const getters = {
  getModel (states: typeof state) {
    return states.model[states.used]
  }
}

const actions = {
  saveQRcode (context: { commit: Commit }, params: typeof state.model) {
    context.commit('saveQRcode', params)
  }
}

export default {
  namespaced: true, // namespaced为false的时候，state,mutations,actions全局可以调用，为true，生成作用域，引用时要声明模块名称
  state,
  mutations,
  actions,
  getters
}
