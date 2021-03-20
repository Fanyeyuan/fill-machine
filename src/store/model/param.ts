// import Param from '@/app/database/model/param'
import { Commit } from 'vuex'
const state = {
  id!: 0,
  delay: 0, // 气缸动作延迟时间
  alarm: 0, // 气缸动作报警事件
  speed: 0, // 罐装速度
  temperature: 0, // 封口温度
  jar: 0 // 罐装量校准
}

const mutations = {
  saveParam (states: typeof state, params: typeof state) {
    states = params
  }
}

const getters = {}

const actions = {
  saveParam (context: { commit: Commit }, params: typeof state) {
    context.commit('saveParam', params)
  }
}

export default {
  namespaced: true, // namespaced为false的时候，state,mutations,actions全局可以调用，为true，生成作用域，引用时要声明模块名称
  state,
  mutations,
  actions,
  getters
}
