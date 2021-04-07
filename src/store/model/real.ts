import { Commit } from 'vuex'
const state = {
  sensor: {
    fksjwd: 0, // 封口实际温度
    sjgzfs: 0, // 实际罐装份数
    xtyxzt: 0, // 系统运行状态
    yxzbz: 0 // 运行子步骤  0 手动模式，其他自动模式
  },
  status: {
    dabiao: false, // 打标

    cdqgqj: false, // 穿袋气缸前进
    ydqgj: false, // 移袋气缸进
    yjcqqg: false, // 压紧裁切气缸
    gzqg: false, // 罐装气缸
    ydqgt: false, // 移袋气缸退
    tbxzgj: false, // 贴标旋转缸进
    tbxzgt: false, // 贴标旋转缸退
    tbqg: false, // 贴标气缸
    dbqg: false, // 顶标气缸
    czkf: false, // 抽真空阀

    fkwk: false, // 封口温控
    rdbkz: false// 蠕动泵控制
  }
}

const mutations = {
  saveSensor (states: typeof state, params: typeof state.sensor) {
    states.sensor.fksjwd = params.fksjwd
    states.sensor.sjgzfs = params.sjgzfs
    states.sensor.xtyxzt = params.xtyxzt
    states.sensor.yxzbz = params.yxzbz
  },
  saveStatus (states: typeof state, params: typeof state.status) {
    for (const key in params) {
      if (Object.prototype.hasOwnProperty.call(params, key)) {
        states.status[key] = params[key]
      }
    }
  }
}

const getters = {
  getSensor (states: typeof state) {
    return states.sensor
  },
  getStatus (states: typeof state) {
    return states.status
  }
}

const actions = {
  saveSensor (context: { commit: Commit }, params: typeof state.sensor) {
    context.commit('saveSensor', params)
  },
  saveStatus (context: { commit: Commit }, params: typeof state.status) {
    context.commit('saveStatus', params)
  }
}

export default {
  namespaced: true, // namespaced为false的时候，state,mutations,actions全局可以调用，为true，生成作用域，引用时要声明模块名称
  state,
  mutations,
  actions,
  getters
}
