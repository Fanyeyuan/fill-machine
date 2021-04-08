const remote = require('electron').remote
const fs = remote.require('fs')

export default class CSV {
  objsArray: any[]
  decoderLogPath: string
  title: Record<string, any>
  constructor (path: string, title: Record<string, any>, objsArr: any[]) {
    this.objsArray = objsArr // 存储数据数组
    this.decoderLogPath = path // .csv路径
    this.title = title // json数据

    this._InitDecoderLogFeild(this.title) // 初始化方法
  }

  WriteDecoderLog () {
    // 遍历存储数据数组所有对象
    this.objsArray.forEach(element => {
      const array = []
      for (const item in element) {
        array.push(element[item])
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

  _InitDecoderLogFeild (title: Record<string, any>) {
    const array = []

    // 遍历头名称数组对象
    Object.keys(title).forEach(item => {
      array.push(title[item])
    })

    array.push('\r\n')
    this._WriteDecoderBuffer(array.join(','))
  }
}
