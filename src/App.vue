<template>
  <div id="app">
    <div id="content">
      <div class="header" v-if="!isLoginPage">
        <heads></heads>
        <navs></navs>
      </div>
      <router-view />
      <foot class="foot"></foot>
    </div>
    <preview v-show="false" :param="getModel" ref="preview"></preview>
  </div>
</template>

<script lang="ts">
import { Component, Ref, Vue, Watch } from 'vue-property-decorator'
import fs from 'fs'
import path from 'path'
import foot from '@/components/main/Foot.vue'
import heads from '@/components/main/Head.vue'
import navs from '@/components/main/Nav.vue'
import Preview from '@/components/qrcode/Preview.vue'
import * as modbus from '@/app/modbus'

import { namespace } from 'vuex-class'

import Param from '@/app/database/model/param'
import QRcode, { QRCodeParam } from '@/app/database/model/qrcode'
import Print from '@/app/database/model/print'
const paramModule = namespace('param')
const qrcodeModule = namespace('qrcode')
const printModule = namespace('print')
const realModule = namespace('real')

@Component({
  components: {
    Preview,
    foot,
    heads,
    navs
  }
})
export default class App extends Vue {
  @realModule.Action saveSensor!: (params: any) => void;
  @realModule.Action saveStatus!: (params: any) => void;
  @paramModule.Action saveParam!: (params: any) => void;
  @qrcodeModule.Getter getModel!: QRCodeParam;
  @qrcodeModule.Action saveQRcode!: (params: any) => void;
  @printModule.Getter getQRCode!: { isValid: true; name: string };
  @printModule.Action('saveQRCode') saveQRPrint!: (params: any) => void;
  @printModule.Action('saveRecord') saveRecordPrint!: (params: any) => void;

  @Ref('preview') readonly preview!: Preview;

  private isLoginPage = false;
  private videoSrc = '';
  private readonly localSrc = path.join(__static, "./video/logo.mp4"); // eslint-disable-line
  private isStart = process.env.NODE_ENV === 'production';
  created () {
    let timehander: any = setTimeout(() => {
      this.isStart = true
      const video = document.getElementById('video')
      const app = document.getElementById('app')
      video && video.remove()
      app && (app.style.display = 'block')
      clearTimeout(timehander)
      timehander = null
    }, 4000)
  }

  mounted () {
    modbus.readData((err, data) => {
      if (err) console.log(err.message)
      else {
        const sensor = {
          fksjwd: data[5], // 封口实际温度
          sjgzfs: data[7], // 实际罐装份数
          xtyxzt: data[28], // 系统运行状态
          yxzbz: data[26] // 运行子步骤  0 手动模式，其他自动模式
        }
        const status = {
          dabiao: !!data[23], // 打标

          cdqgqj: !!data[15], // 穿袋气缸前进
          ydqgj: !!data[13], // 移袋气缸进
          yjcqqg: !!data[17], // 压紧裁切气缸
          gzqg: !!data[16], // 罐装气缸
          ydqgt: !!data[14], // 移袋气缸退
          tbxzgj: !!data[21], // 贴标旋转缸进
          tbxzgt: !!data[22], // 贴标旋转缸退
          tbqg: !!data[19], // 贴标气缸
          dbqg: !!data[18], // 顶标气缸
          czkf: !!data[20], // 抽真空阀

          fkwk: !!data[5], // 封口温控
          rdbkz: !!data[5] // 蠕动泵控制
        }

        if (sensor.yxzbz && status.dabiao) {
          this.preview.print(this.getQRCode.name)
        }

        this.saveSensor(sensor)
        this.saveStatus(status)
      }
    })
    this.updateParam()
    this.updateQRcode()
    this.updatePrint()
  }

  async updateParam () {
    try {
      const param = await Param.all()

      if (param.length) {
        this.saveParam(param[0])
      }
    } catch (e) {}
  }

  async updateQRcode () {
    try {
      const qrs = await QRcode.all()

      if (qrs.length) {
        qrs.forEach((qr) => this.saveQRcode(qr))
      }
    } catch (e) {}
  }

  async updatePrint () {
    try {
      const qrs = await Print.all()

      if (qrs.length) {
        qrs.forEach((qr) => {
          if (qr.type === 'QRCode') {
            this.saveQRPrint({ name: qr.dev_name, isValid: true })
          } else if (qr.type === 'Record') {
            this.saveRecordPrint({ name: qr.dev_name, isValid: true })
          }
        })
      }
    } catch (e) {}
  }

  @Watch('$route.path', { immediate: true })
  private getRouteChange () {
    if (this.$route.path === '/login') {
      this.isLoginPage = true
    } else {
      this.isLoginPage = false
    }
  }
}
</script>
<style lang="scss" scoped>
#app {
  height: 100%;
  background: white;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  // -webkit-font-smoothing: antialiased;
  // -moz-osx-font-smoothing: grayscale;
  user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  -khtml-user-select: none;

  #content {
    width: 100%;
    height: 100%;
    .foot {
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
    }
  }
}
</style>
