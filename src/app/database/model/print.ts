import * as db from '../index'

export interface PrintParam{
  id?: number;
  type: 'QRCode' | 'Record'; // 打印机所属类型 QRCode 二维码打印 Record 报表打印
  dev_name: string; // 打印机名称
}

export default class Print {
  id?: number;
  type: 'QRCode' | 'Record'; // 打印机所属类型 QRCode 二维码打印 Record 报表打印
  dev_name: string; // 打印机名称

  constructor (param: PrintParam) {
    this.type = param.type
    this.dev_name = param.dev_name
  }

  static get (condition: { [key: string]: any }) {
    return db.get(db.tables.print, condition).then((value: any) => {
      return value as PrintParam
    })
    // .catch(err => {
    //   param.error('param.get',err.message)
    // })
  }

  static all () {
    return db.all(db.tables.print).then(value => {
      return value as PrintParam[]
    })
    // .catch(err => {
    //   param.error('param.all',err.message)
    // })
  }

  static update (param: PrintParam, condition: {[key: string]: any}) {
    return db.update(db.tables.print, param, condition).then(value => {
      return value as number
    })
  }

  save () {
    return db.insert(db.tables.print, this).then(value => {
      return value as number
    })
    // .catch(err => {
    //   param.error('param.save',err.message)
    // })
  }

  update (param: Print) {
    return db.update(db.tables.print, param, { id: this.id }).then(value => {
      return value as number
    })
    // .catch(err => {
    //   param.error('param.update',err.message)
    // })
  }

  delete () {
    return db.del(db.tables.print, { id: this.id }).then(value => {
      return value as number
    })
    // .catch(err => {
    //   param.error('param.delete',err.message)
    // })
  }
}
