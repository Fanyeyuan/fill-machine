<template>
  <div class="qrcode">
    <el-row :gutter="20">
      <el-col :span="12">
        <block class="newTage" iclass="tagTitle">
          <div slot="title" v-t="{ path: 'local.qrcode.newTag.title' }"></div>
          <div>
            <el-form
              :model="ruleForm"
              :rules="rules"
              ref="ruleForm"
              label-width="100px"
            >
              <el-form-item
                :label="$t('local.qrcode.newTag.company')"
                prop="company"
              >
                <el-input
                  class="content"
                  clearable
                  v-model="ruleForm.company"
                ></el-input>
              </el-form-item>
              <el-form-item
                :label="$t('local.qrcode.newTag.code')"
                prop="boar_code"
              >
                <el-input
                  class="content"
                  type="textarea"
                  :autosize="{ minRows: 2, maxRows: 2 }"
                  clearable
                  resize="none"
                  v-model="ruleForm.boar_code"
                ></el-input>
              </el-form-item>
              <el-form-item
                :label="$t('local.qrcode.newTag.breed')"
                prop="boar_varieties"
              >
                <el-input
                  class="content"
                  clearable
                  v-model="ruleForm.boar_varieties"
                ></el-input>
              </el-form-item>
              <el-form-item
                :label="$t('local.qrcode.newTag.created')"
                prop="create_time"
              >
                <el-date-picker
                  type="datetime"
                  class="content"
                  :placeholder="$tc('local.qrcode.newTag.note.created')"
                  v-model="ruleForm.create_time"
                  value-format="timestamp"
                  style="width: 100%"
                ></el-date-picker>
              </el-form-item>
              <el-form-item
                :label="$t('local.qrcode.newTag.effective')"
                prop="effective"
              >
                <el-date-picker
                  type="datetime"
                  class="content"
                  value-format="timestamp"
                  :placeholder="$tc('local.qrcode.newTag.note.effective')"
                  v-model="ruleForm.effective"
                  style="width: 100%"
                ></el-date-picker>
              </el-form-item>
              <el-form-item
                :label="$t('local.qrcode.newTag.qrcode')"
                prop="qrcode"
              >
                <el-input
                  class="content"
                  clearable
                  type="textarea"
                  :autosize="{ minRows: 3, maxRows: 3 }"
                  maxlength="150"
                  show-word-limit
                  resize="none"
                  v-model="ruleForm.qrcode"
                ></el-input>
              </el-form-item>
              <!-- <el-form-item> -->
              <!-- </el-form-item> -->
            </el-form>
            <div class="option">
              <!-- <el-button type="primary" @click="test">打印</el-button> -->
              <el-button
                type="primary"
                @click="submitForm('ruleForm')"
                v-t="{ path: 'local.qrcode.newTag.preview' }"
              ></el-button>
              <el-button
                @click="save('ruleForm')"
                v-t="{ path: 'local.qrcode.newTag.save' }"
              ></el-button>
            </div>
          </div>
        </block>
      </el-col>
      <el-col :span="12">
        <block class="device" iclass="tagTitle">
          <div slot="title" v-t="{ path: 'local.qrcode.device.title' }"></div>
          <div class="content">
            <div>
              <div
                class="label"
                v-t="{ path: 'local.qrcode.device.temp' }"
              ></div>
              <div class="status">{{ getSensor.fksjwd }}℃</div>
              <el-button
                v-t="{ path: 'local.qrcode.device.right' }"
              ></el-button>
            </div>
            <div>
              <div
                class="label"
                v-t="{ path: 'local.qrcode.device.print' }"
              ></div>
              <el-tooltip
                class="item"
                effect="dark"
                :content="getQRCode.name"
                placement="top-start"
              >
                <div class="status">{{ getQRCode.name }}</div>
              </el-tooltip>
              <el-button
                @click="searchPrinter"
                v-t="{ path: 'local.qrcode.device.search' }"
              ></el-button>
            </div>
          </div>
        </block>

        <block class="module" iclass="tagTitle">
          <div slot="title" v-t="{ path: 'local.qrcode.module.title' }"></div>
          <div class="content">
            <div :class="{ active: getChoiceTemplates === 1 }">
              <div class="label">{{ $t("local.qrcode.module.temp") }}1</div>
              <el-button
                @click="changeTemplate(1)"
                v-t="{ path: 'local.qrcode.module.edit' }"
              ></el-button>
            </div>
            <div :class="{ active: getChoiceTemplates === 2 }">
              <div class="label">{{ $t("local.qrcode.module.temp") }}2</div>
              <el-button
                @click="changeTemplate(2)"
                v-t="{ path: 'local.qrcode.module.edit' }"
              ></el-button>
            </div>
          </div>
        </block>
      </el-col>
    </el-row>

    <el-dialog
      custom-class="QRdialog"
      :visible.sync="centerDialogVisible"
      width="328px"
      :show-close="false"
      center
    >
      <preview :param="ruleForm" @preview-close="ePreviewClose"></preview>
    </el-dialog>

    <preview v-show="false" :param="ruleForm" ref="preview"></preview>
    <printDialog
      :dialog-visible="printerDialogVisible"
      @cancel="handlePrintDialogCancel"
      @select-print="printSelectAfter"
    />
  </div>
</template>

<script lang="ts">
import { Component, Ref, Vue } from 'vue-property-decorator'

import Block from '@/components/common/Blocks.vue'
import Preview from '@/components/qrcode/Preview.vue'
import PrintDialog from '@/components/common/PrintDialog.vue'
import { Form } from 'node_modules/element-ui/types'

import { namespace } from 'vuex-class'
import qrcode, { QRCodeParam } from '@/app/database/model/qrcode'
import print from '@/app/database/model/print'
import prints from '@/store/model/print'
import real from '@/store/model/real'
const qrcodeModule = namespace('qrcode')
const printModule = namespace('print')
const realModule = namespace('real')
const workModule = namespace('work')

@Component({
  components: {
    Preview,
    Block,
    PrintDialog
  }
})
export default class QRcode extends Vue {
  @workModule.State volume!: number;
  @qrcodeModule.Action saveQRcode!: (params: QRCodeParam) => void;
  @qrcodeModule.Getter getModel!: QRCodeParam;
  @qrcodeModule.State model!: QRCodeParam[];
  @printModule.Getter getQRCode!: typeof prints.state.QRCode;
  @printModule.Action('saveQRCode') saveQRPrint!: (
    code: typeof prints.state.QRCode
  ) => void;

  @realModule.Getter getSensor!: typeof real.state.sensor;

  // 打印机选择区域
  private printerDialogVisible = false;
  searchPrinter () {
    this.printerDialogVisible = true
  }

  handlePrintDialogCancel () {
    this.printerDialogVisible = false
  }

  printSelectAfter (val: { name: string }) {
    this.printerDialogVisible = false
    this.saveQRPrint({ name: val.name, isValid: true })
    print.update({ type: 'QRCode', dev_name: val.name }, { type: 'QRCode' })
  }

  // 新建表格打印区域
  private ruleForm: QRCodeParam = {
    company: '沙雕1号', // 公司名称
    boar_code: 'AAAAA,BBBBB,CCCCC,DDDDD,EEEEE', // 公猪编号
    boar_varieties: '长白山1号', // 公猪品种
    create_time: 1616724248331, // 生成时间
    effective: 1619402648000, // 有效 时间
    qrcode: '沙雕123 一群大傻吊',
    volume: 60 // 精液容量
  };

  private rules = {
    company: [
      {
        required: true,
        message: this.$tc('local.qrcode.newTag.note.company'),
        trigger: 'blur'
      }
    ],
    boar_code: [
      {
        required: true,
        message: this.$tc('local.qrcode.newTag.note.boar_code'),
        trigger: 'blur'
      }
    ],
    boar_varieties: [
      {
        required: true,
        message: this.$tc('local.qrcode.newTag.note.boar_varieties'),
        trigger: 'blur'
      }
    ],
    create_time: [
      {
        type: 'date',
        required: true,
        message: this.$tc('local.qrcode.newTag.note.created'),
        trigger: 'change'
      }
    ],
    effective: [
      {
        type: 'date',
        required: true,
        message: this.$tc('local.qrcode.newTag.note.effective'),
        trigger: 'change'
      }
    ],
    qrcode: [
      {
        required: true,
        message: this.$tc('local.qrcode.newTag.note.qrcode'),
        trigger: 'blur'
      },
      {
        min: 2,
        max: 150,
        message: this.$tc('local.qrcode.newTag.note.qrcodeLength'),
        trigger: 'blur'
      }
    ]
  };

  @Ref('preview') readonly preview!: Preview;
  private centerDialogVisible = false;

  test () {
    this.preview.print(this.getQRCode.name)
  }

  save (formName: string) {
    (this.$refs[formName] as Form).validate(async (valid: boolean) => {
      if (valid) {
        this.saveQRcode(this.ruleForm)
        console.log(this.ruleForm, this.getModel)
        qrcode
          .updateQr(this.ruleForm)
          .then((val) => {
            this.$message.success('success')
          })
          .catch((e) => {
            this.$message.error(e.message)
          })
      } else {
        console.log('error submit!!')
        return false
      }
    })
  }

  ePreviewClose () {
    this.centerDialogVisible = false
  }

  submitForm (formName: string) {
    (this.$refs[formName] as Form).validate(async (valid: boolean) => {
      if (valid) {
        this.centerDialogVisible = true
      } else {
        console.log('error submit!!')
        return false
      }
    })
  }

  // 标签模板区域
  get getChoiceTemplates () {
    return this.getModel.id
  }

  changeTemplate (num: number) {
    this.ruleForm = { ...this.model[num - 1] }
    this.ruleForm.volume = this.volume
    console.log(this.model)
  }

  mounted () {
    this.ruleForm = { ...this.getModel }
    this.ruleForm.volume = this.volume
  }
}
</script>

<style lang="scss">
.qrcode {
  padding: 15px 57px 22px 53px;

  .newTage {
    .tagTitle {
      padding-left: 50px;
      background: url("~@/assets/image/base64/图层 21.png") no-repeat 8px 3px;
    }
    .el-form {
      margin: 5px 4px 18px;
      background: #eeeff3;
      border-radius: 5px;
    }
    .el-form-item {
      border-bottom: 1px solid #d69528;
      margin: 0 6px 10px;
      .el-form-item__label {
        font-size: 14px;
        font-weight: bold;
      }
      .content {
        width: 210px !important;
        // height: 32px;
        border: 1px solid #ffffff;
        opacity: 0.95;
        border-radius: 5px;
        margin-right: 17px;
        // padding: 0 8px;

        font-size: 16px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #6f7074;
        line-height: 32px;

        input,
        textarea {
          height: 32px;
          // padding: 0 8px !important;
          background: #ffffff;
          opacity: 0.5;
          border-radius: 5px;
          border: 0;
          &::-webkit-input-placeholder {
            font-size: 16px;
            font-family: Microsoft YaHei;
            font-weight: 300;
            color: #6f7074 !important;
            line-height: 32px;
          }
        }
      }
    }
    .option {
      text-align: center;
      button {
        width: 112px !important;
        height: 40px !important;
        background: linear-gradient(0deg, #dd722a, #f86633) !important;

        font-size: 20px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #ffffff;
        line-height: 40px;
        padding: 0;
        // &:first-child {
        //   float: left;
        // }
        // &:last-child {
        //   float: right;
        // }
      }
    }
  }

  .device {
    width: 335px;
    height: 205px;
    border-radius: 5px;
    .tagTitle {
      padding-left: 40px;
      background: url("~@/assets/image/base64/图层 22.png") no-repeat 8px 4px;
    }
    .content {
      padding: 12px 9px;
      > div {
        display: flex;
        justify-content: space-around;
        margin: 25px 0;
        line-height: 38px;
        .label {
          width: 80px;
          font-size: 17px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: #000000;
        }
        .status {
          width: 150px;
          height: 38px;
          background: #c0c2c8;
          border-radius: 5px;
          font-size: 17px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: #000000;
          text-align: center;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        button {
          width: 79px !important;
          height: 38px !important;
          background: linear-gradient(0deg, #dd722a, #f86633) !important;

          font-size: 20px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: #ffffff;
          line-height: 40px;
          padding: 0;
          // &:first-child {
          //   float: left;
          // }
          // &:last-child {
          //   float: right;
          // }
        }
      }
    }
  }

  .module {
    width: 335px;
    height: 220px;
    border-radius: 5px;
    margin-top: 30px;
    .tagTitle {
      padding-left: 40px;
      background: url("~@/assets/image/base64/图层 23.png") no-repeat 8px 8px;
    }
    .content {
      padding: 0 9px;
      .active {
        background: burlywood;
      }
      > div {
        display: flex;
        justify-content: space-between;
        margin: 28px 0;
        padding: 7px;
        line-height: 38px;
        background: #eeeff3;
        border-radius: 5px;
        .label {
          font-size: 17px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: #000000;
        }
        button {
          width: 79px !important;
          height: 38px !important;
          background: linear-gradient(0deg, #dd722a, #f86633) !important;

          font-size: 20px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: #ffffff;
          line-height: 40px;
          padding: 0;
          // &:first-child {
          //   float: left;
          // }
          // &:last-child {
          //   float: right;
          // }
        }
      }
    }
  }

  .QRdialog {
    background: #ffffff;
    border: 1px solid #d5721b;
    border-radius: 10px !important;
    width: 299px !important;
    .el-dialog__body {
      padding: 11px 15px !important;
    }
    .el-dialog__header {
      padding: 0 !important;
    }
  }
}
</style>
