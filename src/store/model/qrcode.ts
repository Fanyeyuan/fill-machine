import { Commit } from 'vuex'
import { QRCodeParam } from '@/app/database/model/qrcode'
const state = {
  model: [{
    id!: 1,
    company: '', // 公司名称
    boar_code: '', // 公猪编号
    boar_varieties: '', // 公猪品种
    volume: 0, // 精液容量
    create_time!: 0, // 生成时间
    effective: 0, // 有效 时间
    qrcode: ' ',
    choiced: false,
    plan_quantity: 0,
    is_mark: false
  }]
}

const mutations = {
  saveQRcode (states: typeof state, param: QRCodeParam) {
    const index = states.model.findIndex(model => model.id === param.id)

    if (1 + index) {
      for (const key in param) {
        if (Object.prototype.hasOwnProperty.call(param, key)) {
          states.model[index][key] = param[key]
        }
      }
    } else {
      states.model.push(param as any)
    }
    states.model.forEach(mo => {
      if (mo.id === param.id) {
        mo.choiced = true
      } else {
        mo.choiced = false
      }
    })
  },
  saveVolume (states: typeof state, param: number) {
    let model = states.model.find((model: QRCodeParam) => model.choiced)
    model = model || states.model[0]
    model.volume = param
  },
  savePlaned (states: typeof state, param: number) {
    let model = states.model.find((model: QRCodeParam) => model.choiced)
    model = model || states.model[0]
    model.plan_quantity = param
  },
  saveMarked (states: typeof state, param: boolean) {
    let model = states.model.find((model: QRCodeParam) => model.choiced)
    model = model || states.model[0]
    model.is_mark = param
  }
}

const getters = {
  getModel (states: typeof state) {
    // return states.model[states.used]
    const model = states.model.find((model: QRCodeParam) => model.choiced)
    return model || states.model[0]
  },
  getVolume (states: typeof state) {
    const model = states.model.find((model: QRCodeParam) => model.choiced)
    return model ? model.volume : 0
  },
  getPlaned (states: typeof state, param: number) {
    const model = states.model.find((model: QRCodeParam) => model.choiced)
    return model ? model.plan_quantity : 0
  },
  getMarked (states: typeof state, param: boolean) {
    const model = states.model.find((model: QRCodeParam) => model.choiced)
    return model ? model.is_mark : false
  }
}

const actions = {
  saveQRcode (context: { commit: Commit }, params: QRCodeParam) {
    context.commit('saveQRcode', params)
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

export default {
  namespaced: true, // namespaced为false的时候，state,mutations,actions全局可以调用，为true，生成作用域，引用时要声明模块名称
  state,
  mutations,
  actions,
  getters
}
