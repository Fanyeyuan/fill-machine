import { Commit } from 'vuex'
import Worker from '@/app/database/model/woker'

const state = {
  username: '',
  jar_code: '',
  boar_code: '',
  boar_varieties: '',
  volume: 0,
  plan_quantity: 0,
  actual_quantity: 0
}

const mutations = {
  saveWeather (states: typeof state, params: typeof state) {
    states = params
  }
}

const actions = {
  saveWeather (context: { commit: Commit }, params: typeof state) {
    context.commit('saveWeather', params)
  }
}

const getters = {}

export default {
  namespaced: true, // namespaced为false的时候，state,mutations,actions全局可以调用，为true，生成作用域，引用时要声明模块名称
  state,
  mutations,
  actions,
  getters
}
