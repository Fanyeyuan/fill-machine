import * as db from '../index'

export default class QRcode {
  id?: number;
  company: string; // 公司名称
  boar_code: string; // 公猪编号
  boar_varieties: string; // 公猪品种
  volume: number; // 精液容量
  create_time?: number; // 生成事件

  constructor (param: QRcode) {
    this.company = param.company
    this.boar_code = param.boar_code
    this.boar_varieties = param.boar_varieties
    this.volume = param.volume
    param.create_time ? (this.create_time = param.create_time) : (this.create_time = new Date().getTime())
  }

  static get (condition: { [key: string]: any }) {
    return db.get(db.tables.qrcode, condition).then((value: any) => {
      return value as QRcode
    })
    // .catch(err => {
    //   param.error('param.get',err.message)
    // })
  }

  static all () {
    return db.all(db.tables.qrcode).then(value => {
      return value as QRcode[]
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

  update (param: QRcode) {
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
