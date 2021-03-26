<template>
  <div class="qrcode">
    <el-row :gutter="20">
      <el-col :span="12">
        <block class="newTage">
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
                  :autosize="{ maxRows: 2 }"
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
                  v-model="ruleForm.create_time"
                  style="width: 100%"
                ></el-date-picker>
              </el-form-item>
              <el-form-item
                :label="$t('local.qrcode.newTag.effective')"
                prop="effective"
              >
                <el-date-picker
                  type="datetime"
                  placeholder="选择日期"
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
                  :autosize="{ minRows: 2, maxRows: 4 }"
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
              <el-button
                type="primary"
                @click="submitForm('ruleForm')"
                v-t="{ path: 'local.qrcode.newTag.preview' }"
              ></el-button>
              <el-button
                @click="resetForm('ruleForm')"
                v-t="{ path: 'local.qrcode.newTag.save' }"
              ></el-button>
            </div>
          </div>
        </block>
      </el-col>
      <el-col :span="12">
        <block class="device">
          <div slot="title" v-t="{ path: 'local.qrcode.device.title' }"></div>
          <div class="content">
            <div>
              <div
                class="label"
                v-t="{ path: 'local.qrcode.device.temp' }"
              ></div>
              <div class="status"></div>
              <div
                class="button"
                v-t="{ path: 'local.qrcode.device.right' }"
              ></div>
            </div>
            <div>
              <div
                class="label"
                v-t="{ path: 'local.qrcode.device.print' }"
              ></div>
              <div class="status"></div>
              <div
                class="button"
                v-t="{ path: 'local.qrcode.device.search' }"
              ></div>
            </div>
          </div>
        </block>

        <block class="module">
          <div slot="title" v-t="{ path: 'local.qrcode.module.title' }"></div>
          <div class="content">
            <div>
              <div class="label" v-t="{ path: 'local.qrcode.module.temp' }">
                1
              </div>
              <el-button v-t="{ path: 'local.qrcode.module.edit' }"></el-button>
            </div>
            <div>
              <div class="label" v-t="{ path: 'local.qrcode.module.temp' }">
                2
              </div>
              <el-button v-t="{ path: 'local.qrcode.module.edit' }"></el-button>
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
      <preview :param="param" @preview-close="ePreviewClose"></preview>
    </el-dialog>

    <preview
      v-show="false"
      :param="param"
      ref="preview"
      @preview-close="ePreviewClose"
    ></preview>
    <!-- <el-button @click="test">打印</el-button> -->
  </div>
</template>

<script lang="ts">
import { Component, Ref, Vue } from 'vue-property-decorator'

import Block from '@/components/common/Blocks.vue'
import Preview from '@/components/qrcode/Preview.vue'
import { Form } from 'node_modules/element-ui/types'

@Component({
  components: {
    Preview,
    Block
  }
})
export default class QRcode extends Vue {
  private ruleForm = {
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
  private param = {
    company: '沙雕1号', // 公司名称
    boar_code: 'AAAAA,BBBBB,CCCCC,DDDDD,EEEEE', // 公猪编号
    boar_varieties: '长白山1号', // 公猪品种
    volume: 60, // 精液容量
    create_time: 1616724248331, // 生成时间
    specification: 1619402648000, // 有效 时间
    qrcode: '沙雕123 一群大傻吊'
  };

  test () {
    this.preview.print()
  }

  submitForm (formName: string) {
    (this.$refs[formName] as Form).validate((valid: boolean) => {
      // if (valid) {
      //   alert("submit!");
      // } else {
      //   console.log("error submit!!");
      //   return false;
      // }
    })
  }

  resetForm (formName: string) {
    (this.$refs[formName] as Form).resetFields()
  }

  ePreviewClose () {
    this.centerDialogVisible = false
  }
}
</script>

<style lang="scss">
.qrcode {
  padding: 20px 57px 22px 53px;

  .newTage {
    .el-form-item {
      border-bottom: 1px solid #d69528;
    }
    .content {
      width: 191px;
      height: 32px;
      border: 1px solid #ffffff;
      background: #eeeff3;
      opacity: 0.95;
      border-radius: 5px;
      margin-right: 17px;
      // padding: 0 8px;

      font-size: 16px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: #6f7074;
      line-height: 32px;

      input {
        height: 32px;
        padding: 0 8px !important;
        background: #ffffff;
        opacity: 0.5;
        border-radius: 5px;
        border: 0;
        &::-webkit-input-placeholder {
          font-size: 16px;
          font-family: Microsoft YaHei;
          font-weight: 300;
          color: #585956 !important;
          line-height: 32px;
        }
      }
    }
    .option {
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
