import * as db from '../index'
// import log from '@/app/common/log'

export default class COM {
  id?: number;
  path: string;
  baud?: number = 115200;
  bits?: number = 8;
  start?: number = 1;
  stop?: number = 0;
  verify?: string = 'none'; // 是否校验

  constructor (param: COM) {
    this.path = param.path
    param.baud && (this.baud = param.baud)
    param.bits && (this.bits = param.bits)
    param.start && (this.start = param.start)
    param.stop && (this.stop = param.stop)
    param.verify && (this.verify = param.verify)
  }

  static get (condition: { [key: string]: any }) {
    return db.get(db.tables.com, condition).then((value: any) => {
      return value as COM
    })
    // .catch(err => {
    //   log.error('COM.get',err.message)
    // })
  }

  static all () {
    return db.all(db.tables.com).then(value => {
      return value as COM[]
    })
    // .catch(err => {
    //   log.error('COM.all',err.message)
    // })
  }

  save () {
    return db.insert(db.tables.com, this).then(value => {
      return value as number
    })
    // .catch(err => {
    //   log.error('COM.save',err.message)
    // })
  }

  update (param: COM) {
    return db.update(db.tables.com, param, { id: this.id }).then(value => {
      return value as number
    })
    // .catch(err => {
    //   log.error('COM.update',err.message)
    // })
  }

  delete () {
    return db.del(db.tables.com, { id: this.id }).then(value => {
      return value as number
    })
    // .catch(err => {
    //   log.error('COM.delete',err.message)
    // })
  }
}
