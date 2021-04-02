import * as db from '../index'

export interface QRCodeParam{
  id?: number;
  company: string; // 公司名称
  boar_code: string; // 公猪编号
  boar_varieties: string; // 公猪品种
  volume: number; // 精液容量
  create_time?: number; // 生成事件
  effective: number; // 有效 时间
  qrcode: string; // 二维码内容
  choiced?: boolean; // 是否被选中
}

export default class QRcode implements QRCodeParam {
  id?: number;
  company: string; // 公司名称
  boar_code: string; // 公猪编号
  boar_varieties: string; // 公猪品种
  volume: number; // 精液容量
  create_time?: number; // 生成事件
  effective: number; // 有效 时间
  qrcode: string; // 二维码内容
  choiced: boolean; // 是否被选中

  constructor (param: QRCodeParam) {
    param.id && (this.id = param.id)
    this.company = param.company
    this.boar_code = param.boar_code
    this.boar_varieties = param.boar_varieties
    this.volume = param.volume
    this.effective = param.effective
    this.qrcode = param.qrcode
    param.create_time ? (this.create_time = param.create_time) : (this.create_time = new Date().getTime())
    param.choiced ? (this.choiced = param.choiced) : (this.choiced = false)
  }

  static get (condition: { [key: string]: any }) {
    return db.get(db.tables.qrcode, condition).then((value: any) => {
      return value as QRCodeParam
    })
    // .catch(err => {
    //   param.error('param.get',err.message)
    // })
  }

  static all () {
    return db.all(db.tables.qrcode).then(value => {
      return value as QRCodeParam[]
    })
    // .catch(err => {
    //   param.error('param.all',err.message)
    // })
  }

  save () {
    return db.insert(db.tables.qrcode, this).then(value => {
      return value as number
    })
    // .catch(err => {
    //   param.error('param.save',err.message)
    // })
  }

  static async updateQr (param: QRCodeParam) {
    const values = await QRcode.all()
    const pro = values.map(val => {
      console.log(val.id, param.id)

      if (val.id !== param.id) {
        val.choiced = false
        return db.update(db.tables.qrcode, { choiced: false }, { id: val.id })
      } else {
        param.choiced = true
        return db.update(db.tables.qrcode, { ...param }, { id: param.id })
      }
    })
    return Promise.all(pro)
  }

  update (param: QRCodeParam) {
    return db.update(db.tables.qrcode, param, { id: this.id }).then(value => {
      return value as number
    })
    // .catch(err => {
    //   param.error('param.update',err.message)
    // })
  }

  delete () {
    return db.del(db.tables.qrcode, { id: this.id }).then(value => {
      return value as number
    })
    // .catch(err => {
    //   param.error('param.delete',err.message)
    // })
  }
}
