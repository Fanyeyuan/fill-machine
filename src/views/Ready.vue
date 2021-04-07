<template>
  <div class="ready">
    <el-row :gutter="15">
      <el-col :span="15">
        <block class="ydjc" iclass="tagTitle">
          <div slot="title" v-t="{ path: 'local.ready.qgydjc' }"></div>
          <div class="qgqj">
            <switcher
              :disabled="isRuning"
              :label="$t('local.ready.cdqgqj')"
              :status="status.cdqgqj"
              directive="left"
              @change="sendcmd('cdqgqj')"
            ></switcher>
          </div>
          <div class="action">
            <div>
              <switcher
                :disabled="isRuning"
                :label="$t('local.ready.ydqgj')"
                @change="sendcmd('ydqgj')"
                :status="status.ydqgj"
              ></switcher>
            </div>
            <div>
              <switcher
                :disabled="isRuning"
                :label="$t('local.ready.yjcqqg')"
                @change="sendcmd('yjcqqg')"
                :status="status.yjcqqg"
              ></switcher>
            </div>
            <div>
              <switcher
                :disabled="isRuning"
                :label="$t('local.ready.gzqg')"
                @change="sendcmd('gzqg')"
                :status="status.gzqg"
              ></switcher>
            </div>
            <div>
              <switcher
                :disabled="isRuning"
                :label="$t('local.ready.ydqgt')"
                @change="sendcmd('ydqgt')"
                :status="status.ydqgt"
              ></switcher>
            </div>
            <div>
              <switcher
                :disabled="isRuning"
                :label="$t('local.ready.tbxzgj')"
                @change="sendcmd('tbxzgj')"
                :status="status.tbxzgj"
              ></switcher>
            </div>
            <div>
              <switcher
                :disabled="isRuning"
                :label="$t('local.ready.tbxzgt')"
                @change="sendcmd('tbxzgt')"
                :status="status.tbxzgt"
              ></switcher>
            </div>
            <div>
              <switcher
                :disabled="isRuning"
                :label="$t('local.ready.tbqg')"
                @change="sendcmd('tbqg')"
                :status="status.tbqg"
              ></switcher>
            </div>
            <div>
              <switcher
                :disabled="isRuning"
                :label="$t('local.ready.dbqg')"
                @change="sendcmd('dbqg')"
                :status="status.dbqg"
              ></switcher>
            </div>
            <div>
              <switcher
                :disabled="isRuning"
                :label="$t('local.ready.czkf')"
                @change="sendcmd('czkf')"
                :status="status.czkf"
              ></switcher>
            </div>
          </div>
        </block>
      </el-col>
      <el-col :span="9">
        <block class="fkwk" iclass="tagTitle">
          <div slot="title" v-t="{ path: 'local.ready.fkwk' }"></div>
          <div class="content">
            <div class="param">
              <div class="temp" v-t="{ path: 'local.ready.sswd' }"></div>
              <div class="number">{{ sensor.fksjwd }}℃</div>
            </div>
            <div class="bord"></div>
            <div class="anniu">
              <el-button
                :disabled="isRuning"
                @click="sendcmd('jr')"
                v-t="{ path: 'local.ready.jr' }"
              ></el-button>
              <el-button
                :disabled="isRuning"
                @click="sendcmd('tz')"
                v-t="{ path: 'local.ready.tz' }"
              ></el-button>
            </div>
          </div>
        </block>
        <block class="rdbkz" iclass="tagTitle">
          <div slot="title" v-t="{ path: 'local.ready.rdbkz' }"></div>
          <div class="content">
            <div class="param">
              <div class="temp" v-t="{ path: 'local.ready.gzl' }"></div>
              <div class="number">{{ volume }}mL</div>
            </div>
            <div class="bord"></div>
            <div class="anniu">
              <el-button
                :disabled="isRuning"
                @click="sendcmd('bc')"
                v-t="{ path: 'local.ready.bc' }"
              ></el-button>
              <el-button
                :disabled="isRuning"
                @click="sendcmd('br')"
                v-t="{ path: 'local.ready.br' }"
              ></el-button>
            </div>
          </div>
        </block>
      </el-col>
    </el-row>
    <div class="button">
      <el-button
        :disabled="isRuning"
        @click="sendcmd('ydxh')"
        v-t="{ path: 'local.ready.ydxh' }"
      ></el-button>
      <el-button
        :disabled="isRuning"
        @click="sendcmd('gzxh')"
        v-t="{ path: 'local.ready.gzxh' }"
      ></el-button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Block from '@/components/common/Blocks.vue'
import Switcher from '@/components/ready/Switcher.vue'

import * as modbus from '@/app/modbus'
import { namespace } from 'vuex-class'
import real from '@/store/model/real'
const realModule = namespace('real')
const qrcodeModule = namespace('qrcode')

@Component({
  components: {
    Block,
    Switcher
  }
})
export default class Ready extends Vue {
  @realModule.State status!: typeof real.state.status;
  @realModule.State sensor!: typeof real.state.sensor;
  @qrcodeModule.Getter('getVolume') volume!: number;

  private sendcmd (cmd: string) {
    console.log(modbus.CommandRegister[cmd], cmd)

    modbus
      .writeState(modbus.CommandRegister[cmd])
      .then(() => {
        this.$message.success('success')
      })
      .catch((e) => this.$message.error(e.message))
  }

  get isRuning () {
    return !!this.sensor.yxzbz
  }
}
</script>

<style lang="scss" scoped>
.ready {
  padding: 15px 57px 22px 53px;

  .ydjc {
    width: 426px;
    height: 367px;
    background: #dddfe6;
    border-radius: 5px;
    .qgqj {
      width: 396px;
      height: 57px;
      margin: 5px auto;
      border: 0;
      border-bottom: 2px solid #d69528;
      > div {
        width: 258px;
        height: 50px;
        box-sizing: border-box;
        margin: auto;
        padding-top: 6px;
        border: 1px solid #fedb75;
      }
    }
    .action {
      width: 412px;
      height: 261px;
      border: 1px solid #ffffff;
      opacity: 0.95;
      background: #eeeff3;
      border-radius: 5px;
      margin: 5px;
      display: flex;
      flex-wrap: wrap;
      > div {
        width: 130px;
        height: 75px;
        margin: 2px 2px;
        border: 1px solid #fedb75;
      }
    }
  }
  .fkwk,
  .rdbkz {
    width: 244px;
    height: 174px;
    background: #eeeff3;
    border-radius: 5px;
    .content {
      padding: 5px;
      .param {
        width: 233px;
        height: 48px;
        border: 1px solid #fedb75;
        padding-top: 4px;
        > div {
          display: inline-block;
        }
        .temp {
          font-size: 18px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: #000000;
          margin: 0 21px 0 11px;
        }
        .number {
          width: 118px;
          height: 40px;
          border: 2px solid #ffffff;
          opacity: 0.51;
          border-radius: 10px;
          text-align: center;
          line-height: 40px;
        }
      }
      .bord {
        border: 1px solid #d69528;
        margin: 13px 0 14px 0;
      }
      .anniu {
        overflow: hidden;
        padding: 0 2px;
        > button {
          // width: 190px !important;
          // height: 55px !important;
          background: #eeeff3 !important;
          border: 1px solid #ffffff;
          border-radius: 5px;
          font-size: 20px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          // line-height: 11px;
          &:first-child {
            float: left;
            color: #bd5413;
          }
          &:last-child {
            float: right;
            color: #114087;
          }
        }
        .disable {
          background: linear-gradient(
            255deg,
            #c2c2c2,
            #7d7c7c,
            #c2c2c2
          ) !important;
          box-shadow: 0px 0px 0px 0px rgba(76, 76, 79, 0.32) !important;
        }
      }
    }
  }
  .button {
    overflow: hidden;
    padding: 14px 2px;
    > button {
      width: 190px !important;
      height: 55px !important;
      background: #fedb75 !important;
      box-shadow: 0px 0px 0px 0px rgba(76, 76, 79, 0.32);
      border-radius: 14px !important;

      font-size: 20px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: #000000;
      // line-height: 11px;
      &:first-child {
        float: left;
      }
      &:last-child {
        float: right;
      }
    }
    .disable {
      background: linear-gradient(255deg, #c2c2c2, #7d7c7c, #c2c2c2) !important;
      box-shadow: 0px 0px 0px 0px rgba(76, 76, 79, 0.32) !important;
    }
  }
}
</style>
<style lang="scss">
.ready {
  .ydjc {
    .tagTitle {
      padding-left: 50px;
      background: url("~@/assets/image/base64/图层 18.png") no-repeat 8px 3px;
    }
  }
  .fkwk {
    margin-bottom: 19px;
    .tagTitle {
      padding-left: 50px;
      height: 16px;
      background: url("~@/assets/image/base64/图层 19.png") no-repeat 8px 3px;
    }
  }
  .rdbkz {
    .tagTitle {
      padding-left: 50px;
      background: url("~@/assets/image/base64/图层 20.png") no-repeat 8px 3px;
    }
  }
}
</style>
