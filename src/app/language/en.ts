export default {
  nav: {
    home: 'Home',
    ready: 'Prepare',
    qrcode: 'Mark',
    setting: 'Setting',
    log: 'Log'
  },
  main: {
    logout: 'logout',
    copyright: 'Copyright：武汉天楚吉因宝生物科技有限公司',
    changeInfo: {
      title: 'Modify information',
      username: 'username',
      password: 'password',
      repeat: 're-password',
      confirm: 'confirm',
      usernameNull: 'username',
      passwordNull: 'password',
      repeatError: 're-password',
      systemError: 'system error! please re-login',
      success: 'success'
    },
    remind: {
      logoutConfirmInfo: 'are you want to logout?',
      info: 'note',
      confirmButtonText: 'confirm',
      cancelButtonText: 'cancel',
      success: 'success',
      cancel: 'cancel'
    }
  },
  home: {
    start: 'Start',
    stop: 'Reset',
    clear: 'wipe',
    confirm: 'confirm',
    cancel: 'cancel',

    work: 'work information',
    dfgzl: 'volume per time',
    jhgzfs: ' planned number',
    fenshu: '',
    gzys: 'filling time',
    sjgzfs: 'actual number',
    fksjwd: 'temperature',
    dabiao: 'marking',
    continue: 'continue',
    restart: 'restart',
    status: {
      0: 'Ready',
      1: 'Cycling',
      2: 'Labeling cylinder air pressure alarm',
      3: 'Threading bag cylinder abnormal movement alarm',
      4: 'Top mark cylinder abnormal movement alarm',
      5: 'Filling cylinder abnormal movement alarm',
      6: 'Emergency stop not reset',
      7: 'Labeling cylinder abnormal movement alarm',
      8: 'Label rotary cylinder abnormal movement alarm',
      9: 'Tighten&Cutting cylinder abnormal movement alarm',
      10: 'Moving bag cylinder abnormal movement alarm',
      11: 'Alarm for lack of material bag',
      12: 'System back in place',
      13: 'low-pressure'
    }
  },
  ready: {
    qgydjc: 'Cylinder monitoring',
    cdqgqj: 'Punctured',
    ydqgj: 'Moved bag in',
    yjcqqg: 'Tightened/Cut',
    gzqg: 'Filling',
    ydqgt: 'Moved bag out',
    tbxzgj: 'Marked in',
    tbxzgt: 'Marked out',
    tbqg: 'Marked',
    dbqg: 'Topmark',
    czkf: 'Vacuum valve',

    fkwk: 'Sealing temp',
    sswd: 'real-time',
    jr: 'Heat',
    tz: 'Stop',

    rdbkz: 'Peristaltic pump',
    gzl: 'volume',
    br: 'In',
    bc: 'Out',

    ydxh: 'Moving bags',
    gzxh: 'Filling cycle'
  },
  qrcode: {
    newTag: {
      title: 'New Tag',
      company: 'Manufacturer',
      code: 'BoarCode',
      breed: 'Breed',
      created: 'MFG',
      effective: 'Exp',
      qrcode: 'QRCode',
      preview: 'Preview',
      save: 'Save&Enable',

      note: {
        company: 'please input manufacturer',
        boar_code: 'please input boar code',
        boar_varieties: 'please input breed and strain',
        created: 'please input MFG',
        effective: 'please input Exp',
        qrcode: 'please input QRcode content',
        qrcodeLength: 'The length is between 2 and 150 characters'
      }

    },
    device: {
      title: 'Equipment Status',
      temp: 'sealing',
      print: 'printer',
      right: 'normal',
      search: 'search'
    },
    module: {
      title: 'Tagged Templates',
      temp: 'tagged templates',
      edit: 'edit'
    },
    preview: {
      title: 'Preview',
      code: 'Boar',
      breed: 'Breed',
      created: 'MFG',
      effective: 'Exp',
      specification: 'Specifict'
    }
  },
  login: {
    username: 'login username',
    password: 'login password',
    login: 'Login',
    exit: 'Logout',
    success: 'Wellcome',
    fail: 'Incorrect username or password',
    quitInfo: 'The app will quit, continue?'
  },
  setting: {
    save: 'Save',
    qgdzycsj: 'Delay time',
    qgdzbjsj: 'Alarm time',
    gzsd: 'Filling speed',
    fkwd: 'Temperature',
    gzljz: 'Fill calibration',
    glink: 'G-Link QRcode',
    upSuccess: 'Update success',
    upFail: 'Update fail:',
    saveSuccess: 'Save ok',
    saveFail: 'Save error:'
  },
  log: {
    recode: 'Work Recording',
    index: 'index',
    username: 'username',
    jar_code: 'Filling num',
    boar_code: 'Boar num',
    boar_varieties: 'Strain/Breed',
    volume: 'Volume',
    plan_quantity: 'Planned num',
    actual_quantity: 'Actual num',
    time: 'Used time',
    create_time: 'Create time',
    end_time: 'End time',
    status: 'Status',
    message: 'Remark',
    prev: 'Prev',
    next: 'Next',
    home: 'First',
    export: 'Export',
    print: 'Print',

    printDialog: {
      title: 'Printer Setting',
      label: 'Printer Name',
      default: 'Default',
      empty: 'No printer available',
      confirm: 'confirm',
      cancel: 'cancel',
      noChoice: 'Please choice printer'
    }
  }
}
