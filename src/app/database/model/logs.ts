import * as db from '../index'

export default class Log {
  id?: number;
  type: string; // 日志类型  info event
  sub_type: string; // 子类型  info:[操作信息] event [报警类型]
  create_time?: number; // 生成时间
  message?: string; // 记录信息

  constructor (param: Log) {
    this.type = param.type
    this.sub_type = param.sub_type
    param.create_time ? (this.create_time = param.create_time) : (this.create_time = new Date().getTime())
    param.message && (this.message = param.message)
  }

  static get (condition: { [key: string]: any }) {
    return db.get(db.tables.logs, condition).then((value: any) => {
      return value as Log
    })
    // .catch(err => {
    //   log.error('Log.get',err.message)
    // })
  }

  static all () {
    return db.all(db.tables.logs).then(value => {
      return value as Log[]
    })
    // .catch(err => {
    //   log.error('Log.all',err.message)
    // })
  }

  save () {
    return db.insert(db.tables.logs, this).then(value => {
      return value as number
    })
    // .catch(err => {
    //   log.error('Log.save',err.message)
    // })
  }

  update (param: Log) {
    return db.update(db.tables.logs, param, { id: this.id }).then(value => {
      return value as number
    })
    // .catch(err => {
    //   log.error('Log.update',err.message)
    // })
  }

  delete () {
    return db.del(db.tables.logs, { id: this.id }).then(value => {
      return value as number
    })
    // .catch(err => {
    //   log.error('Log.delete',err.message)
    // })
  }
}
