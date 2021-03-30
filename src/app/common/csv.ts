const remote = require('electron').remote
const fs = remote.require('fs')

export default class CSV {
  objsArray: any[]
  decoderLogPath: string
  jsonPath: string
  constructor (path: string, jsonPath: string, objsArr: any[]) {
    this.objsArray = objsArr // 存储数据数组
    this.decoderLogPath = path // .csv路径
    this.jsonPath = jsonPath // json数据

    this._InitDecoderLogFeild(this.objsArray, this.jsonPath) // 初始化方法
  }

  WriteDecoderLog (dateTime: number) {
    // 遍历存储数据数组所有对象
    this.objsArray.forEach(element => {
      const array = []
      for (const item in element) {
        array.push(element[item])
        // console.log(item, element[item]);
      }
      // 关键一句，否则不会换行
      array.push('\r\n')

      // 写入Buffer
      this._WriteDecoderBuffer(array.join(','))
    })
  }

  _WriteDecoderBuffer (str: string) {
    fs.appendFile(this.decoderLogPath, str, function () {
      // console.log('追加内容完成');
    })
  }

  _InitDecoderLogFeild (objsArr: any[], jsonPath: string) {
    const array = []
    let jsonObj: any = null

    // 第一个字段为时间

    // array.push("时间");

    // 通过json文件，获取变量所对应头名称
    jsonObj = JSON.parse(jsonPath) // 读取的值

    // 遍历头名称数组对象
    Object.keys(jsonObj).forEach(item => {
      array.push(jsonObj[item])
    })

    array.push('\r\n')
    this._WriteDecoderBuffer(array.join(','))
  }
}
