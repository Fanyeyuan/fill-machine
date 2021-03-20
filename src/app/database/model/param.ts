import * as db from '../index'

export default class Param {
  id?: number;
  delay: number; // 气缸动作延迟时间
  alarm: number; // 气缸动作报警事件
  speed: number; // 罐装速度
  temperature: number; // 封口温度
  jar: number; // 罐装量校准

  constructor (param: Param) {
    this.delay = param.delay
    this.alarm = param.alarm
    this.speed = param.speed
    this.temperature = param.temperature
    this.jar = param.jar
  }

  static get (condition: { [key: string]: any }) {
    return db.get(db.tables.param, condition).then((value: any) => {
      return value as Param
    })
    // .catch(err => {
    //   param.error('param.get',err.message)
    // })
  }

  static all () {
    return db.all(db.tables.param).then(value => {
      return value as Param[]
    })
    // .catch(err => {
    //   param.error('param.all',err.message)
    // })
  }

  save () {
    return db.insert(db.tables.param, this).then(value => {
      return value as number
    })
    // .catch(err => {
    //   param.error('param.save',err.message)
    // })
  }

  update (param: Param) {
    return db.update(db.tables.param, param, { id: this.id }).then(value => {
      return value as number
    })
    // .catch(err => {
    //   param.error('param.update',err.message)
    // })
  }

  delete () {
    return db.del(db.tables.param, { id: this.id }).then(value => {
      return value as number
    })
    // .catch(err => {
    //   param.error('param.delete',err.message)
    // })
  }
}
