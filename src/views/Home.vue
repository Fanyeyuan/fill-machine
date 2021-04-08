<template>
  <div class="home">
    <el-row class="containor" :gutter="25">
      <el-col :span="10">
        <block class="work" :title="$t('local.home.work')">
          <div
            class="content"
            :class="{ alarm: systemStatus > 1 }"
            v-t="{ path: 'local.home.status.' + systemStatus }"
          ></div>
        </block>
      </el-col>
      <el-col :span="14">
        <el-row>
          <el-col :span="12">
            <block class="ceil" :title="$t('local.home.dfgzl')">
              <div class="ml">
                <el-input-number
                  class="content"
                  :controls="false"
                  :disabled="isRuning"
                  v-model.lazy="ivolume"
                  @blur="writeVolume"
                ></el-input-number>
                mL
              </div>
            </block>
          </el-col>
          <el-col :span="12">
            <block class="ceil" :title="$t('local.home.gzys')">
              <div class="ml">
                <div class="content gzys">
                  {{ fillingTime | filterFillingTime }}
                </div>
              </div>
            </block>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <block class="ceil" :title="$t('local.home.jhgzfs')">
              <div class="ml">
                <el-input-number
                  class="content num"
                  :controls="false"
                  :disabled="isRuning"
                  v-model.lazy="planedNum"
                  @blur="writePlanedNum"
                ></el-input-number>
                <span v-t="{ path: 'local.home.fenshu' }"></span>
              </div>
            </block>
          </el-col>
          <el-col :span="12">
            <block class="ceil" :title="$t('local.home.sjgzfs')">
              <div class="ml shiji">
                <div class="content">
                  {{ actualQuantity }}
                  <span v-t="{ path: 'local.home.fenshu' }"></span>
                </div>
                <checkboxs
                  class="checkboxs"
                  :value="clear"
                  :disabled="isRuning"
                  @change="clearClick()"
                  ckStyle="checked"
                  unStyle="unchecked"
                  :label="$t('local.home.clear')"
                ></checkboxs>
              </div>
            </block>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <block class="ceil" :title="$t('local.home.dabiao')">
              <div class="dabiao">
                <checkboxs
                  :value="isMark"
                  :disabled="isRuning"
                  @change="dabiaoClick(true)"
                  ckStyle="checked"
                  unStyle="unchecked"
                  :label="$t('local.home.confirm')"
                ></checkboxs>
                <checkboxs
                  :value="!isMark"
                  :disabled="isRuning"
                  @change="dabiaoClick(false)"
                  ckStyle="checked"
                  unStyle="unchecked"
                  :label="$t('local.home.cancel')"
                ></checkboxs>
              </div>
            </block>
          </el-col>
          <el-col :span="12">
            <block class="ceil" :title="$t('local.home.fksjwd')">
              <div class="ml fksjwd">
                <div class="content gzys">{{ sensor.fksjwd }}℃</div>
              </div>
            </block>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <div class="option">
      <el-popconfirm
        :confirm-button-text="$tc('local.home.continue')"
        :cancel-button-text="$tc('local.home.restart')"
        cancel-button-type="danger"
        @confirm="actionContinue"
        @cancel="actionRefilling"
        hide-icon
        class="left"
      >
        <div slot="reference">
          <el-button
            @click="start"
            class="iconfont icon-kaishi"
            :disabled="isRuning"
            :class="{ disable: isRuning }"
            v-t="{ path: 'local.home.start' }"
          ></el-button>
        </div>
      </el-popconfirm>
      <el-button
        @click="reset"
        :disabled="isRuning"
        class="iconfont icon-Target right"
        :class="{ disable: isRuning }"
        v-t="{ path: 'local.home.stop' }"
      ></el-button>
    </div>
  </div>
</template>

<script lang="ts">
import Block from '@/components/common/Blocks.vue'
import Checkboxs from '@/components/common/Checkbox.vue'
import moment from 'moment'
import { Component, Prop, ModelSync, Vue, Watch } from 'vue-property-decorator'

import Worker, { WorkerParam } from '@/app/database/model/worker'
import { QRCodeParam } from '@/app/database/model/qrcode'
import * as modbus from '@/app/modbus'
import { namespace } from 'vuex-class'
import real from '@/store/model/real'
import work from '@/store/model/work'
const realModule = namespace('real')
const qrcodeModule = namespace('qrcode')
const workModule = namespace('work')
const userModule = namespace('user')

@Component({
  components: {
    Block,
    Checkboxs
  },
  filters: {
    filterFillingTime (time: number) {
      return moment(time - 8 * 3600 * 1000).format('HH:mm:ss')
    }
  }
})
export default class Home extends Vue {
  @qrcodeModule.Getter getVolume!: number;
  @qrcodeModule.Action saveVolume!: (vol: number) => void;
  @qrcodeModule.Getter getPlaned!: number;
  @qrcodeModule.Action savePlaned!: (num: number) => void;
  @qrcodeModule.Getter getMarked!: boolean;
  @qrcodeModule.Action saveMarked!: (state: boolean) => void;
  @qrcodeModule.Getter getModel!: QRCodeParam;

  @workModule.State('id') workId!: number;
  @workModule.State create_time!: number;
  @workModule.State actual_quantity!: number;
  @workModule.State hasAbnormal!: boolean;
  @workModule.Action saveWork!: (param: typeof work.state) => void;
  @workModule.Action saveHasAbnormal!: (param: boolean) => void;

  @userModule.State username!: string;

  @realModule.State sensor!: typeof real.state.sensor;

  private fillingTime = 0;

  clear = false;
  dabiaoClick (state: boolean) {
    modbus
      .writeMarked(state)
      .then(() => {
        this.saveMarked(state)
        this.$message.success('success')
      })
      .catch((e) => this.$message.error(e.message))
  }

  writeVolume () {
    modbus
      .writeVolume(this.getVolume)
      .then(() => {
        this.$message.success('success')
      })
      .catch((e) => this.$message.error(e.message))
  }

  writePlanedNum () {
    modbus
      .writePlanedBags(this.getPlaned)
      .then(() => {
        this.$message.success('success')
      })
      .catch((e) => this.$message.error(e.message))
  }

  get isMark () {
    return this.getMarked || false
  }

  get systemStatus () {
    return this.sensor.xtyxzt
  }

  get actualQuantity () {
    return this.sensor.sjgzfs
  }

  get isRuning () {
    return !!this.sensor.yxzbz
  }

  get ivolume () {
    return this.getVolume
  }

  set ivolume (volume) {
    this.saveVolume(volume)
  }

  get planedNum () {
    return this.getPlaned
  }

  set planedNum (num) {
    this.savePlaned(num)
  }

  clearClick () {
    this.clear = !this.clear
  }

  private runTimerHandler: null | NodeJS.Timeout = null;
  start (e: Event) {
    if (!this.hasAbnormal) {
      !this.sensor.yxzbz &&
        modbus
          .writeState(modbus.CommandRegister.start)
          .then(() => {
            this.fillingTime = 0
            this.actionStart()
          })
          .catch((e) => this.$message.error(e.message))
      e.stopPropagation()
    }
  }

  actionStart () {
    const work = {
      username: this.username,
      jar_code: '',
      boar_code: this.getModel.boar_code,
      boar_varieties: this.getModel.boar_varieties,
      volume: this.getModel.volume,
      plan_quantity: this.getModel.plan_quantity,
      actual_quantity: this.sensor.sjgzfs,
      create_time: new Date().getTime()
    }
    const dbWork = new Worker(work)
    console.log('开始运行')

    dbWork.save().then((id) => {
      this.saveWork({
        ...work,
        isMark: this.isMark,
        hasAbnormal: false,
        id
      })
    })
  }

  actionContinue () {
    !this.sensor.yxzbz &&
      modbus
        .writeState(modbus.CommandRegister.jxgz)
        .catch((e) => this.$message.error(e.message))
  }

  actionRefilling () {
    !this.sensor.yxzbz &&
      modbus
        .writeState(modbus.CommandRegister.cxgz)
        .then(() => {
          this.fillingTime = 0
          this.actionStart()
        })
        .catch((e) => this.$message.error(e.message))
  }

  reset () {
    modbus
      .writeState(modbus.CommandRegister.reset)
      .then(() => {
        this.fillingTime = 0
      })
      .catch((e) => this.$message.error(e.message))
  }

  @Watch('sensor.yxzbz', { immediate: true })
  private runControl (newValue: number, oldValue: number) {
    if (this.runTimerHandler && newValue === 0) {
      console.log('运行结束')

      clearInterval(this.runTimerHandler)
      this.fillingTime = 0
      Worker.update(this.workId, { end_time: new Date().getTime(), status: 1 })
    } else {
      console.log('运行状态切换')

      this.runTimerHandler = setInterval(() => {
        this.fillingTime = moment().diff(this.create_time)
      }, 1000)
    }
  }

  @Watch('sensor.xtyxzt', { immediate: true })
  private runStatus (newValue: number) {
    if (this.runTimerHandler && newValue > 1) {
      console.log('运行异常', this.$tc('local.home.status.' + newValue))

      clearInterval(this.runTimerHandler)
      this.saveHasAbnormal(true)
      Worker.update(this.workId, {
        end_time: new Date().getTime(),
        status: 2,
        message: this.$tc('local.home.status.' + newValue)
      })
    }
  }

  private beforeDestory () {
    this.runTimerHandler && clearInterval(this.runTimerHandler)
  }
}
</script>

<style lang="scss">
.home {
  padding: 20px 57px 22px 53px;
  // .containor{
  //   margin-bottom: 28px;
  // }
  .work {
    width: 283px;
    height: 367px;
    .content {
      width: 270px;
      height: 319px;
      border: 1px solid #ffffff;
      background: #eeeff3;
      opacity: 0.95;
      border-radius: 5px;
      margin: 6px;
      padding: 0 0 0 8px;
      box-sizing: border-box;
      font-size: 20px;
      font-family: Microsoft YaHei;
      font-weight: bold;
      line-height: 64px;
    }
    .alarm {
      color: #db2121;
    }
  }

  .ceil {
    width: 184px;
    height: 109px;
    border-radius: 5px;
    margin: 0 20px 20px 0;
    .ml {
      border-bottom: 2px solid #d5721b;
      margin: 20px 12px 23px 8px;
      .content {
        width: 81px;
        height: 38px;
        border: 1px solid #ffffff;
        background: #eeeff3;
        opacity: 0.95;
        border-radius: 5px;
        margin-right: 17px;
        // padding: 0 8px;

        font-size: 20px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #000000;
        line-height: 38px;

        input {
          height: 38px;
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
            line-height: 40px;
          }
        }
      }

      .num {
        width: 101px;
      }
      .gzys {
        width: 100%;
        background: #c0c2c8;
        border: 0;
        // opacity: 0.13;
        font-size: 21px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #000000;
        line-height: 38px;
        text-align: center;
      }
    }
    .shiji {
      border: 0;
      margin-top: 0;
      margin-bottom: 0;
      > div:first-child {
        width: 100% !important;
        background: #c0c2c8 !important;
        // opacity: 0.13;
        height: 29px !important;
        line-height: 29px !important;
        text-align: center;
        margin-bottom: 5px;
      }
      .checkboxs {
        width: 81px;
        margin: 0;
        margin-left: 80px;
      }
    }
    .fksjwd {
      border: 0;
    }
    .dabiao {
      border: 0;
      > div {
        width: 81px;
        display: inline-block;
        margin: 15px 5px;
      }
    }
    .checked {
      width: 18px;
      height: 18px;

      background: url("~@/assets/image/base64/checked.png") no-repeat center;
      // background-size: cover;
    }
    .unchecked {
      width: 18px;
      height: 18px;
      background: url("~@/assets/image/base64/unchecked.png") no-repeat center;
      // background-size: cover;
    }
  }

  .option {
    overflow: hidden;

    button {
      width: 190px !important;
      height: 55px !important;
      background-color: #fedb75;
      background-repeat: no-repeat;
      // background: #fedb75 no-repeat !important;
      box-shadow: 0px 0px 0px 0px rgba(76, 76, 79, 0.32);
      border-radius: 14px !important;

      font-size: 25px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: #000000;
      line-height: 30px;
      text-align: center;
    }
    .left {
      // background-image: url("~@/assets/image/base64/图层 16.png");
      float: left;
    }
    .right {
      // background-image: url("~@/assets/image/base64/图层 15.png");
      float: right;
    }
    .disable {
      background: linear-gradient(255deg, #c2c2c2, #7d7c7c, #c2c2c2) no-repeat !important;
      box-shadow: 0px 0px 0px 0px rgba(76, 76, 79, 0.32) !important;
    }
    .iconfont {
      &::before {
        font-size: 30px;
        margin-right: 20px;
      }
    }
  }
}
</style>
