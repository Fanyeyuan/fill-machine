import ModbusRTU from 'modbus-serial'
const client = new ModbusRTU()

let readDataCallBack: (err: null|Error, data: any) => void
const baseAddr = 1000

function readDatas () {
  setInterval(() => {
    client.readHoldingRegisters(baseAddr, 29).then((data) => {
      readDataCallBack(null, data)
    }).catch(err => {
      readDataCallBack(err, null)
    }
    )
  }, 1000)
}

client.connectRTUBuffered('COM4', { baudRate: 115200 }, readDatas)
client.setID(1)
client.setTimeout(1000)

export enum CommandRegister{
  start = 1, // 启动
  reset = 2, // 复位
  cdqgqj = 11, // 穿袋气缸前进
  ydkzj = 12, // 移待控制进
  ydkzt = 13, // 移袋控制退
  gzkz = 14, // 灌装控制
  yjcqkz = 15, // 压紧裁切控制
  dbkz = 16, // 顶标控制
  tbkz = 17, // 贴标控制
  czkf = 18, // 抽真空阀
  tbxzj, // 贴标旋转进
  tbxzt, // 贴标旋转退
  jr, // 加热
  tzjr, // 停止加热
  br = 31, // 泵入
  bc, // 泵出
  ydxh = 41, // 移袋循环
  gzxh// 灌装循环
}

export enum Register{
  // 寄存器含义拼音简写
  dfgzl= 0, // 单份灌装量ml
  jhgzfs, // 计划罐装份数
  gzys_h, // 罐装用时-时
  gzys_m, // 罐装用时-分
  gzys_s, // 罐装用时-秒
  fksjwd, // 封口实际温度
  szfkwd, // 设置封口温度
  sjgzfs, // 实际灌装份数
  qgdzyssj, // 气缸动作延时时间
  qgdzbjsj, // 气缸动作报警时间
  gzsd, // 罐装速度
  gzljz, // 灌装量校准
  sfdb, // 是否打标：0否-1是
  ydqgjzt, // 移袋气缸进状态
  ydqgtzt, // 移袋气缸退状态
  cdqgzt, // 穿袋气缸状态
  gzqgzt, // 灌装气缸状态
  yjcjqgzt, // 压紧裁切气缸状态
  dbqgzt, // 顶标气缸状态
  tbqgzt, // 贴标气缸状态
  czkfzt, // 抽空真阀状态
  tbxzqgjzt, // 贴标旋转气缸进状态
  tbxzqgtzt, // 贴标旋转气缸退状态
  scbq, // 生成标签：0否-1是
  xtms, // 1-自动/2-手动 运行模式
  yxms, // 运行模式
  yxzbz, // 运行子步骤
  kzaj, // 控制按键
  xtyxzt// 系统运行状态
}

export enum SystemState{
  ready = 0, // 系统准备好
  cycle, // 自动循环中
  czkqgbhg, // 抽真空气缸不合格
  cdqgbdw, // 穿袋气缸不到位
  dbqgbdw, // 顶标气缸不到位
  gzqgbdw, // 罐装气缸不到位
  jtwfw, // 急停未复位
  tbqgbdw, // 贴标气缸不到位
  tbxzqgbdw, // 贴标旋转气缸不到位
  yjcqqgbdw, // 压紧裁切气缸不到位
  ydqgbdw, // 移袋气缸不到位
  ldqlbj, // 料袋缺料报警
  xtfhyw, // 系统返回原位
  qyd// 气压低
}

export function readData (call: typeof readDataCallBack) {
  readDataCallBack = call
}

export function writeParam (param: number[]) {
  return client.writeRegisters(baseAddr + Register.szfkwd, param)
}
export function writeVolume (volume: number) {
  return client.writeRegister(baseAddr + Register.dfgzl, volume)
}
export function writePlanedBags (num: number) {
  return client.writeRegister(baseAddr + Register.sjgzfs, num)
}

export function writeState (cmd: CommandRegister) {
  return client.writeRegister(1027, cmd)
}
