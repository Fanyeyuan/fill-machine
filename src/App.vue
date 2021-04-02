<template>
  <div id="app">
    <video v-if="!isStart" id="video" width="800" height="600" autoplay>
      <source :src="videoSrc" type="video/mp4" />
      您的浏览器不支持Video标签。
    </video>
    <div id="content" v-if="isStart">
      <div class="header" v-if="!isLoginPage">
        <heads></heads>
        <navs></navs>
      </div>
      <router-view />
      <foot class="foot"></foot>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import fs from 'fs'
import path from 'path'
import foot from '@/components/main/Foot.vue'
import heads from '@/components/main/Head.vue'
import navs from '@/components/main/Nav.vue'
import * as modbus from '@/app/modbus'

import { namespace } from 'vuex-class'

import Param from '@/app/database/model/param'
import QRcode from '@/app/database/model/qrcode'
import Print from '@/app/database/model/print'
const paramModule = namespace('param')
const qrcodeModule = namespace('qrcode')
const printModule = namespace('print')

@Component({
  components: {
    foot,
    heads,
    navs
  }
})
export default class App extends Vue {
  @paramModule.Action saveParam!: (params: any) => void;
  @qrcodeModule.Action saveQRcode!: (params: any) => void;
  @printModule.Action('saveQRCode') saveQRPrint!: (params: any) => void;
  @printModule.Action('saveRecord') saveRecordPrint!: (params: any) => void;

  private isLoginPage = false;
  private videoSrc = '';
  private readonly localSrc = path.join(__static, "./video/logo.mp4"); // eslint-disable-line
  private isStart = process.env.NODE_ENV !== 'production';
  created () {
    console.log(this.isLoginPage, this.isStart)

    let timehander: any = setTimeout(() => {
      this.isStart = true
      clearTimeout(timehander)
      timehander = null
    }, 4500)
  }

  mounted () {
    const buf = fs.readFileSync(this.localSrc) // 读取文件，并将缓存区进行转换
    const uint8Buffer = Uint8Array.from(buf)
    const bolb = new Blob([uint8Buffer]) // 转为一个新的Blob文件流
    this.videoSrc = window.URL.createObjectURL(bolb) // 转换为url地址并直接给到audio
    modbus.readData((err, data) => {
      console.log(err, data)
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
  width: 100%;
  height: 100vh;
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
