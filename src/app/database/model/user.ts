import * as db from '../index'

export default class User {
  id?: number;
  username: string; // 用户名
  password: string; // 用户密码
  is_admin?: boolean; // 是否为管理员

  constructor (param: User) {
    this.username = param.username
    this.password = param.password
    param.is_admin ? (this.is_admin = param.is_admin) : (this.is_admin = false)
  }

  static get (condition: { [key: string]: any }) {
    return db.get(db.tables.user, condition).then((value: any) => {
      return value as User
    })
    // .catch(err => {
    //   param.error('param.get',err.message)
    // })
  }

  static all () {
    return db.all(db.tables.user).then(value => {
      return value as User[]
    })
    // .catch(err => {
    //   param.error('param.all',err.message)
    // })
  }

  save () {
    return db.insert(db.tables.user, this).then(value => {
      return value as number
    })
    // .catch(err => {
    //   param.error('param.save',err.message)
    // })
  }

  update (param: User) {
    return db.update(db.tables.user, param, { id: this.id }).then(value => {
      return value as number
    })
    // .catch(err => {
    //   param.error('param.update',err.message)
    // })
  }

  delete () {
    return db.del(db.tables.user, { id: this.id }).then(value => {
      return value as number
    })
    // .catch(err => {
    //   param.error('param.delete',err.message)
    // })
  }
}
