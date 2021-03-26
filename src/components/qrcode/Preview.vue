<template>
  <div>
    <div class="title">
      <div class="message" v-t="{ path: 'local.qrcode.preview.title' }"></div>
      <div class="close" @click="previewClose"></div>
    </div>
    <div ref="preview" class="preview">
      <div class="table">
        <div class="company">{{ param.company }}</div>
        <div class="content">
          <div class="left">
            <div class="message">
              <span>{{ $t("local.qrcode.preview.code") }}:</span>
              <span>{{ param.boar_code }}</span>
            </div>
            <div class="message">
              <span>{{ $t("local.qrcode.preview.breed") }}:</span>
              <span>{{ param.boar_varieties }}</span>
            </div>
            <div class="message">
              <span>{{ $t("local.qrcode.preview.created") }}:</span>
              <span>{{ param.create_time | formateTime }}</span>
            </div>
            <div class="message">
              <span>{{ $t("local.qrcode.preview.effective") }}:</span>
              <span>{{ param.specification | formateTime }}</span>
            </div>
            <div class="message">
              <span>{{ $t("local.qrcode.preview.specification") }}:</span>
              <span>{{ param.volume }}mL</span>
            </div>
          </div>
          <div class="right">
            <img :src="src" class="qrcode" />
          </div>
        </div>
      </div>
    </div>

    <webview
      v-show="false"
      class="m23"
      ref="printWebview"
      :src="fullPath"
      nodeintegration
    />
  </div>
</template>

<script lang="ts">
import path from 'path'
import { WebviewTag } from 'electron'
import { Component, Emit, Prop, Ref, Vue } from 'vue-property-decorator'
import QRCode from 'qrcode'
import moment from 'moment'

import { QRCodeParam } from '@/app/database/model/qrcode'

@Component({
  filters: {
    formateTime (time: number) {
      return moment(time).format('YYYY-MM-DD HH:mm:ss')
    }
  }
})
export default class Preview extends Vue {
  private src = '';
  private priviewHtml = '';
  @Ref('preview') readonly preview!: HTMLDivElement;
  @Ref('printWebview') readonly webview!: WebviewTag;
  @Prop({
    type: Object,
    required: true,
    validator: (obj: QRCodeParam) => {
      if (!obj.company) return false
      if (!obj.boar_code) return false
      if (!obj.boar_varieties) return false
      if (!obj.volume) return false
      if (!obj.create_time) return false
      if (!obj.specification) return false
      if (!obj.qrcode) return false
      return true
    }
  })
  readonly param!: QRCodeParam;
  private fullPath = path.join(__static, "print.html"); // eslint-disable-line

  mounted () {
    QRCode.toDataURL(this.param.qrcode)
      .then((url: string) => {
        this.src = url
        this.$nextTick().then(() => {
          this.priviewHtml = this.preview.innerHTML
        })
      })
      .catch((err: string) => {
        console.log(err)
      })
  }

  @Emit('previewClose')
  previewClose () {
    return false
  }

  print () {
    this.webview.addEventListener('ipc-message', (event) => {
      if (event.channel === 'webview-print-do') {
        this.webview.print({
          silent: true,
          dpi: {
            horizontal: 203,
            vertical: 203
          },
          printBackground: true,
          deviceName: 'ZDesigner GX420d'
        })
      }
    })
    console.log(this.preview.innerHTML)

    this.webview.send('webview-print-render', {
      printName: 'ZDesigner GX420d',
      html: this.preview.innerHTML
    })
  }
}
</script>

<style lang="scss" scoped>
.title {
  width: 240px;
  height: 59px;
  background: #e8e9f1;
  border-radius: 10px;
  overflow: hidden;
  padding: 0 13px;

  .message {
    float: left;
    font-size: 17px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #000000;
    line-height: 60px;
  }
  .close {
    cursor: pointer;
    float: right;
    margin: 8px 0;
    width: 43px;
    height: 43px;
    background: url("~@/assets/image/base64/取消.png") no-repeat center;
  }
}

.preview {
  margin-top: 21px;
  width: 263px;
  height: 153px;
  border: 1px solid #000000;
  border-radius: 10px;
  padding: 3px 0 0 2px;
  .m23 {
    margin: 2px 3px;
  }
  .table {
    width: 259px;
    height: 145px;
    border: 1px solid #000000;
    .company {
      height: 16px;
      font-family: Microsoft YaHei;
      font-weight: bold;
      color: #000000;
      font-size: 12px;
      line-height: 16px;
      text-align: center;
      padding: 1px;
      border-bottom: 1px solid #000000;
    }
    .content {
      overflow: hidden;
      .left {
        float: left;
        border-right: 1px solid #000;
        .message {
          width: 166px;
          height: 25px;
          // line-height: 20px;
          // padding: 2px 6px;
          border-bottom: 1px solid #000000;
          &:last-of-type {
            border: 0;
          }

          span {
            display: inline-block;
            box-sizing: border-box;
            &:first-of-type {
              width: 64px;
              font-size: 12px;
              line-height: 25px;
              font-weight: bold;
              padding: 2px 6px;
            }
            &:last-of-type {
              width: 102px;
              vertical-align: middle;
              font-size: 10px;
            }
          }
        }
      }
      .right {
        float: right;
        .qrcode {
          margin: 17px 0;
          width: 92px;
          height: 92px;
          background-color: black;
        }
      }
    }
  }
}
</style>

<style lang="scss">
</style>
