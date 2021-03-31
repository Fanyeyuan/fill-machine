export default {
  nav: {
    home: '功能首页',
    ready: '罐装准备',
    qrcode: '打标贴标',
    setting: '参数设置',
    log: '操作日志'
  },
  main: {
    logout: '退出登陆',
    copyright: '版权所有：武汉天楚吉因宝生物科技有限公司',
    changeInfo: {
      title: '修改信息',
      username: '账号',
      password: '密码',
      repeat: '再次确认密码',
      confirm: '确认修改',
      usernameNull: '请输入账号',
      passwordNull: '请输入密码',
      repeatError: '两次输入的密码不一致，请重新输入',
      systemError: '系统错误，请重新登陆',
      success: '密码修改成功'
    },
    remind: {
      logoutConfirmInfo: '是否退出登陆?',
      info: '提示',
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      success: '退出登陆成功',
      cancel: '取消操作'
    }
  },
  home: {
    start: '启动',
    stop: '复位',
    clear: '清空',
    confirm: '确定',
    cancel: '取消',

    work: '工作信息显示',
    dfgzl: '单份罐装量',
    jhgzfs: '计划罐装份数',
    fenshu: '份',
    gzys: '罐装用时',
    sjgzfs: '实际罐装份数',
    fksjwd: '封口实际温度',
    dabiao: '打标'
  },
  ready: {
    qgydjc: '气缸运动监测',
    cdqgqj: '穿袋气缸前进',
    ydqgj: '移袋气缸进',
    yjcqqg: '压紧裁切气缸',
    gzqg: '灌装气缸',
    ydqgt: '移袋气缸退',
    tbxzgj: '贴标旋转缸进',
    tbxzgt: '贴标旋转缸退',
    tbqg: '贴标气缸',
    dbqg: '顶标气缸',
    czkf: '抽真空阀',

    fkwk: '封口温控',
    sswd: '实时温度',
    jr: '加热',
    tz: '停止',

    rdbkz: '蠕动泵控制',
    gzl: '灌装量',
    br: '泵入',
    bc: '泵出',

    ydxh: '移袋循环',
    gzxh: '灌装循环'
  },
  qrcode: {
    newTag: {
      title: '设置新标签',
      company: '生产单位',
      code: '公猪编号',
      breed: '品种品系',
      created: '生产日期',
      effective: '有效日期',
      qrcode: '二维码内容',
      preview: '预览',
      save: '保存',

      note: {
        company: '请输入生产单位名称',
        boar_code: '请输入公猪编号',
        boar_varieties: '请输入公猪品种品系',
        created: '请选择生产日期',
        effective: '请选择有效日期',
        qrcode: '请输入二维码内容',
        qrcodeLength: '长度在 2 到 150 个字符'
      }

    },
    device: {
      title: '设备状态',
      temp: '封口温度',
      print: '打印设备',
      right: '正常',
      search: '搜索'
    },
    module: {
      title: '设备状态',
      temp: '标签模板',
      edit: '编辑'
    },
    preview: {
      title: '预览标签',
      code: '公猪编号',
      breed: '品种品系',
      created: '生产日期',
      effective: '有效日期',
      specification: '规格密度'
    }
  },
  login: {
    username: '登录账户',
    password: '登录密码',
    login: '登   录',
    exit: '退出登录',
    success: '登陆成功',
    fail: '密码或账号错误，请重新输入'
  },
  setting: {
    save: '保存',
    qgdzycsj: '气缸动作延迟时间',
    qgdzbjsj: '气缸动作报警时间',
    gzsd: '灌  装  速  度  ',
    fkwd: '封  口  温  度  ',
    gzljz: '灌 装 量 校 准  ',
    glink: 'G-Link 二维码'
  },
  log: {
    recode: '工作数据记录',
    index: '序号',
    jar_code: '灌装编号',
    boar_code: '公猪编号',
    boar_varieties: '品种品系',
    volume: '单份体积',
    plan_quantity: '计划灌装分量',
    actual_quantity: '实际灌装分量',
    time: '灌装时长',
    prev: '上一页',
    next: '下一页',
    home: '首页',
    export: '数据导出',
    print: '报表打印',

    printDialog: {
      title: '打印机设置',
      label: '打印机名称',
      default: '默认',
      empty: '暂无可用打印机',
      confirm: '确认',
      cancel: '取消',
      noChoice: '您还没有选择打印机'
    }
  },
  common: {
  }
}
