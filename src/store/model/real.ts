import { Commit } from 'vuex'
const state = {
  sensor: {
    fksjwd: 0, // 封口实际温度
    sjgzfs: 0// 实际罐装份数
  },
  status: {
    dabiao: false, // 打标

    cdqgqj: false, // 穿袋气缸前进
    cdqgj: false, // 穿袋气缸进
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

const mutations: any = {
  saveHasNewVersion (states: any, params: boolean) {
    states.version.hasNewVersion = params
  }
}

const getters: any = {
  getHasNewVersion (states: any) {
    return states.version.hasNewVersion
  }
}

const actions: any = {
  saveHasNewVersion (context: { commit: Commit }, params: boolean) {
    context.commit('saveHasNewVersion', params)
  }
}

export default {
  namespaced: true, // namespaced为false的时候，state,mutations,actions全局可以调用，为true，生成作用域，引用时要声明模块名称
  state,
  mutations,
  actions,
  getters
}
