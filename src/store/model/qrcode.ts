import { Commit } from 'vuex'
import { QRCodeParam } from '@/app/database/model/qrcode'
const state = {
  model: [{
    id!: 0,
    company: '', // 公司名称
    boar_code: '', // 公猪编号
    boar_varieties: '', // 公猪品种
    volume: 0, // 精液容量
    create_time!: 0, // 生成时间
    specification: 0, // 有效 时间
    qrcode: '',
    choiced: false
  }]
}

const mutations = {
  saveQRcode (states: typeof state, param: QRCodeParam) {
    const index = states.model.findIndex(model => model.id === param.id)
    if (1 + index) {
      states.model[index] = param as any
    } else {
      states.model.push(param as any)
    }
  }
}

const getters = {
  getModel (states: typeof state) {
    // return states.model[states.used]
    return states.model.find((model: QRCodeParam) => model.choiced)
  }
}

const actions = {
  saveQRcode (context: { commit: Commit }, params: QRCodeParam) {
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
