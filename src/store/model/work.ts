import { Commit } from 'vuex'
import Worker from '@/app/database/model/woker'

const state = {
  username: '',
  jar_code: '',
  boar_code: '',
  boar_varieties: '',
  volume: 0,
  plan_quantity: 0,
  actual_quantity: 0,
  isMark: false,
  create_time: 0
}

const mutations = {
  saveWork (states: typeof state, params: typeof state) {
    for (const key in params) {
      if (Object.prototype.hasOwnProperty.call(params, key)) {
        states[key] = params[key]
      }
    }
  },
  saveVolume (states: typeof state, param: number) {
    states.volume = param
  },
  savePlaned (states: typeof state, param: number) {
    states.plan_quantity = param
  },
  saveMarked (states: typeof state, param: boolean) {
    states.isMark = param
  }
}

const actions = {
  saveWork (context: { commit: Commit }, params: typeof state) {
    context.commit('saveWork', params)
  },
  saveVolume (context: { commit: Commit }, params: number) {
    context.commit('saveVolume', params)
  },
  savePlaned (context: { commit: Commit }, params: number) {
    context.commit('savePlaned', params)
  },
  saveMarked (context: { commit: Commit }, params: boolean) {
    context.commit('saveMarked', params)
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
