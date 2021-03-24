<template>
  <div class="home">
    <el-row class="containor" :gutter="25">
      <el-col :span="10">
        <block class="work" :title="$t('local.home.work')">
          <div class="content">
            料袋缺料
            尽快更换！
          </div>
        </block>
      </el-col>
      <el-col :span="14">
        <el-row>
          <el-col :span="12">
            <block class="ceil" :title="$t('local.home.dfgzl')">
              <div class="ml">
                <el-input class="content"></el-input>
                mL
              </div>
            </block>
          </el-col>
          <el-col :span="12">
            <block class="ceil" :title="$t('local.home.gzys')">
              <div class="ml">
                <div class="content gzys">
                  00:00:00
                </div>
              </div>
            </block>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <block class="ceil" :title="$t('local.home.jhgzfs')">
              <div class="ml">
                <el-input class="content num"></el-input>
                <span v-t="{path:'local.home.fenshu'}"></span>
              </div>
            </block>
          </el-col>
          <el-col :span="12">
            <block class="ceil" :title="$t('local.home.sjgzfs')">
              <div class="ml shiji">
                <div class="content">
                  1560
                  <span v-t="{path:'local.home.fenshu'}"></span>
                </div>
                <checkboxs class="checkboxs" :value="clear" @change="clearClick()" ckStyle="checked" unStyle="unchecked" label="清空"></checkboxs>
              </div>
            </block>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <block class="ceil" :title="$t('local.home.dabiao')">
              <div class="dabiao">
                <checkboxs :value="checked" @change="dabiaoClick(true)" ckStyle="checked" unStyle="unchecked" label="确定"></checkboxs>
                <checkboxs :value="!checked" @change="dabiaoClick(false)" ckStyle="checked" unStyle="unchecked" label="取消"></checkboxs>
              </div>
            </block>
          </el-col>
          <el-col :span="12">
            <block class="ceil" :title="$t('local.home.fksjwd')">
              <div class="ml fksjwd">
                <div class="content gzys">
                  192℃
                </div>
              </div>
            </block>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <div class="option">
      <el-button icon="el-icon-edit">{{$t('local.home.start')}}</el-button>
      <el-button icon="el-icon-edit">{{$t('local.home.stop')}}</el-button>
    </div>
  </div>
</template>

<script lang="ts">
import Block from '@/components/common/Blocks.vue'
import Checkboxs from '@/components/common/Checkbox.vue'

import { Component, Prop, ModelSync, Vue } from 'vue-property-decorator'

@Component({
  components: {
    Block,
    Checkboxs
  }
})
export default class Home extends Vue {
  checked = true;
  clear = false;
  dabiaoClick (state: boolean) {
    this.checked = state
  }

  clearClick () {
    this.clear = !this.clear
  }
}
</script>

<style lang="scss">
.home{
  padding: 20px 57px 22px 53px;
  // .containor{
  //   margin-bottom: 28px;
  // }
  .work{
    width: 283px;
    height: 367px;
    .content{
      width: 270px;
      height: 319px;
      border: 1px solid #FFFFFF;
      background: #eeeff3;
      opacity: 0.95;
      border-radius: 5px;
      margin: 6px;
      padding: 0 0 0 8px;
      box-sizing: border-box;
      font-size: 20px;
      font-family: Microsoft YaHei;
      font-weight: bold;
      color: #DB2121;
      line-height: 64px;
    }
  }

  .ceil {
    width: 184px;
    height: 109px;
    border-radius: 5px;
    margin: 0 20px 20px 0;
    .ml {
      border-bottom: 2px solid #D5721B;
      margin: 20px 12px 23px 8px;
      .content{
        width: 81px;
        height: 38px;
        border: 1px solid #FFFFFF;
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

        input{
          height: 38px;
          padding: 0 8px !important;
          background: #FFFFFF;
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

      .num{
        width: 101px;
      }
      .gzys{
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
    .shiji{
      border: 0;
      margin-top: 0;
      margin-bottom: 0;
      >div:first-child{
        width: 100% !important;
        background: #c0c2c8 !important;
        // opacity: 0.13;
        height: 29px !important;
        line-height: 29px !important;
        text-align: center;
        margin-bottom: 5px;
      }
      .checkboxs{
        width: 81px;
        margin: 0;
        margin-left: 80px;
      }
    }
    .fksjwd{
      border:0;
    }
    .dabiao{
      border:0;
      >div{
        width: 81px;
        display: inline-block;
        margin: 15px 5px;
      }
    }
    .checked{
      width: 18px;
      height: 18px;

      background: url('~@/assets/image/base64/checked.png') no-repeat center;
      // background-size: cover;
    }
    .unchecked{
      width: 18px;
      height: 18px;
      background: url('~@/assets/image/base64/unchecked.png') no-repeat center;
      // background-size: cover;
    }
  }

  .option{
    overflow: hidden;
    >button{
      width: 190px !important;
      height: 55px !important;
      background: #FEDB75 !important;
      box-shadow: 0px 0px 0px 0px rgba(76, 76, 79, 0.32);
      border-radius: 14px !important;

      font-size: 25px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: #000000;
      padding-left: 27px;
      // line-height: 11px;
      &:first-child{
        float: left;
      }
      &:last-child{
        float: right;
      }
    }
  }
}
</style>
