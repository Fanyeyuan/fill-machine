import * as db from '../index'
// import log from '@/app/common/log'

export interface WorkerParam{
  id?: number;
  username: string; /// 用户名
  jar_code: string; // 罐装编号
  boar_code: string; // 公猪编号
  boar_varieties: string; // 公猪品种
  volume: number; // 精液容量
  plan_quantity: number; // 计划罐装数量
  actual_quantity: number; // 实际光装数量
  create_time?: number; // 开始时间
  end_time?: number; // 结束时间
  status?: 0 | 1 | 2; // 工作状态  0 start 1 success 2 error
  message?: string; // 工作信息 status == 0 | 1 可以无， 2 需要记录异常原因
}

export default class Worker {
  id?: number;
  username: string; /// 用户名
  jar_code: string; // 罐装编号
  boar_code: string; // 公猪编号
  boar_varieties: string; // 公猪品种
  volume: number; // 精液容量
  plan_quantity: number; // 计划罐装数量
  actual_quantity: number; // 实际光装数量
  create_time?: number; // 开始时间
  end_time?: number; // 结束时间
  status?: 0 | 1 | 2; // 工作状态  0 start 1 success 2 error
  message?: string; // 工作信息 status == 0 | 1 可以无， 2 需要记录异常原因

  constructor (param: WorkerParam) {
    this.username = param.username
    this.jar_code = param.jar_code
    this.boar_code = param.boar_code
    this.boar_varieties = param.boar_varieties
    this.volume = param.volume
    this.plan_quantity = param.plan_quantity
    this.actual_quantity = param.actual_quantity
    param.create_time ? (this.create_time = param.create_time) : (this.create_time = new Date().getTime())
    param.end_time ? (this.end_time = param.end_time) : (this.end_time = new Date().getTime())
    param.status ? (this.status = param.status) : (this.status = 0)
    param.message ? (this.message = param.message) : (this.message = '')
  }

  static get (condition: { [key: string]: any }) {
    return db.get(db.tables.worker, condition).then((value: any) => {
      return value as WorkerParam
    })
    // .catch(err => {
    //   log.error('COM.get',err.message)
    // })
  }

  static all () {
    return db.all(db.tables.worker).then(value => {
      return value as WorkerParam[]
    })
    // .catch(err => {
    //   log.error('COM.all',err.message)
    // })
  }

  save () {
    return db.insert(db.tables.worker, this).then(value => {
      this.id = value
      return value as number
    })
    // .catch(err => {
    //   log.error('COM.save',err.message)
    // })
  }

  static update (id: number, param: { [key: string]: any }) {
    return db.update(db.tables.worker, param, { id }).then(value => {
      return value as number
    })
    // .catch(err => {
    //   log.error('COM.update',err.message)
    // })
  }

  update (param: { [key: string]: any }) {
    return db.update(db.tables.worker, param, { id: this.id }).then(value => {
      return value as number
    })
    // .catch(err => {
    //   log.error('COM.update',err.message)
    // })
  }

  delete () {
    return db.del(db.tables.worker, { id: this.id }).then(value => {
      return value as number
    })
    // .catch(err => {
    //   log.error('COM.delete',err.message)
    // })
  }
}
