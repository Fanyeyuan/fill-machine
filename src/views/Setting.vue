<template>
  <div class="setting">
    <el-row :gutter="20">
      <el-col :span="12">
        <div class="param">
          <div>
            <div class="label" v-t="{ path: 'local.setting.qgdzycsj' }"></div>
            <div class="in">
              <el-input class="input"></el-input>
              <div class="unit">S</div>
            </div>
          </div>
          <div>
            <div class="label" v-t="{ path: 'local.setting.qgdzbjsj' }"></div>
            <div class="in">
              <el-input class="input"></el-input>
              <div class="unit">S</div>
            </div>
          </div>
          <div>
            <div class="label" v-t="{ path: 'local.setting.gzsd' }"></div>
            <div class="in">
              <el-input class="input"></el-input>
              <div class="unit">R/S</div>
            </div>
          </div>
          <div>
            <div class="label" v-t="{ path: 'local.setting.fkwd' }"></div>
            <div class="in">
              <el-input class="input"></el-input>
              <div class="unit">℃</div>
            </div>
          </div>
          <div>
            <div class="label" v-t="{ path: 'local.setting.gzljz' }"></div>
            <div class="in">
              <el-input class="input"></el-input>
              <div class="unit"></div>
            </div>
          </div>
          <div>
            <div class="label" v-t="{ path: 'local.setting.glink' }"></div>
            <div class="in">
              <el-input class="input"></el-input>
              <div class="unit"></div>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="reseve"></div>
      </el-col>
    </el-row>
    <div class="save">
      <el-button
        class="iconfont icon-baocun"
        v-t="{ path: 'local.setting.save' }"
      ></el-button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Setting extends Vue {}
</script>

<style lang="scss" scoped>
.setting {
  padding: 15px 57px 22px 53px;
  .param {
    border-radius: 5px;
    padding: 12px 9px;
    background: #dddfe6;
    > div {
      // display: flex;
      // justify-content: space-between;
      margin-bottom: 14px;
      line-height: 38px;
      padding: 2px;
      .label {
        width: 162px;
        display: inline-block;
        vertical-align: bottom;
        font-size: 20px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        margin-right: 10px;
        color: #000000;
      }
      .in {
        display: inline-block;
        // justify-content: space-around;
        // width: 160px;
        border-bottom: 1px solid #d69528;

        .input {
          display: inline-block;
          width: 100px;
          height: 40px;
        }
        .unit {
          width: 40px;
          text-align: center;
          display: inline-block;
        }
      }
    }
  }
  .reseve {
    height: 378px;
    background: #dddfe6;
    margin-bottom: 27px;
  }

  .save {
    width: 100%;
    button {
      display: block;
      margin-left: auto;
      width: 190px !important;
      height: 55px !important;
      background: #fedb75 !important;
      box-shadow: 0px 0px 0px 0px rgba(76, 76, 79, 0.32);
      border-radius: 14px !important;

      font-size: 20px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: #000;
      line-height: 40px;
      padding: 0;
      // &:first-child {
      //   float: left;
      // }
      // &:last-child {
      //   float: right;
      // }
    }
    .disable {
      background: linear-gradient(255deg, #c2c2c2, #7d7c7c, #c2c2c2) !important;
      box-shadow: 0px 0px 0px 0px rgba(76, 76, 79, 0.32) !important;
    }
    .iconfont {
      &::before {
        font-size: 20px;
        margin-right: 20px;
      }
    }
  }
}
</style>

<style lang="scss">
div.setting {
  div.param {
    div.in {
      .input {
        input {
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
  }
}
</style>
