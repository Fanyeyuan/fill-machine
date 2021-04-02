<template>
  <div class="in">
    <div class="login" @keypress.enter="login">
      <div class="input">
        <el-input
          class="username"
          :placeholder="$t('local.login.username')"
          clearable
          v-model.lazy="username"
        ></el-input>
        <el-input
          class="password"
          :placeholder="$t('local.login.password')"
          clearable
          show-password
          v-model.lazy="password"
        ></el-input>
      </div>
      <el-button
        class="button"
        @click="login"
        v-t="{ path: 'local.login.login' }"
      ></el-button>
    </div>
    <div class="exit" @click="quit">
      <i class="el-icon-switch-button"></i
      ><span v-t="{ path: 'local.login.exit' }"></span>
    </div>
  </div>
</template>

<script lang="ts">
import { remote, ipcRenderer } from 'electron'
import User from '@/app/database/model/user'
import { Component, Vue } from 'vue-property-decorator'

import { namespace } from 'vuex-class'
const userModule = namespace('user')

@Component
export default class Login extends Vue {
  @userModule.Action('saveInfo') saveInfo!: (params: any) => void;
  private username = '';
  private password = '';

  private login () {
    User.get({ username: this.username })
      .then((value) => {
        if (!!value && value.password === this.password) {
          this.saveInfo(value)
          this.$message.success(this.$tc('local.login.success'))
          this.$router.push('/')
        } else {
          this.$message.error(this.$tc('local.login.fail'))
        }
      })
      .catch(console.log)
  }

  private quit () {
    this.$confirm(this.$tc('local.login.quitInfo'), {
      type: 'warning'
    })
      .then(() => {
        ipcRenderer.send('self-quit-app')
      })
      .catch()
  }
}
</script>

<style lang="scss" scoped>
.in {
  height: 100%;
  background: url("~@/assets/image/login.jpg") no-repeat center;
  background-size: cover;
  position: relative;

  .login {
    width: 255px;
    height: 178px;
    // border: 1px solid #002E73;
    border-radius: 10px;
    background-color: #fff0c4;

    position: absolute;
    top: 152px;
    left: 479px;

    .input {
      opacity: 0.53;
      padding: 35px 14px;
      .username {
        margin-bottom: 31px;
      }
    }
    .button {
      width: 255px;
      height: 42px;
      background: linear-gradient(0deg, #aa4f12, #f86633);
      border-radius: 10px;
      margin-top: 18px;
      font-size: 18px;
      font-family: Microsoft YaHei;
      font-weight: 300;
      color: #ffffff;
    }
  }

  .exit {
    position: absolute;
    top: 323px;
    left: 56px;
    cursor: pointer;
    i {
      width: 30px;
      height: 26px;
      text-align: center;
      line-height: 26px;
      font-size: 24px;
      font-weight: bold;
      color: #e09728;
      background-color: #fafcfe;
      margin-right: 8px;
    }
    span {
      height: 20px;
      font-size: 20px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: #f6f6f6;
      line-height: 20px;
    }
  }
}
</style>

<style lang="scss">
.in {
  .login {
    .input {
      input {
        padding: 0;
        border: 0 !important;
        border-radius: 0;
        border-bottom: 1px solid #585956 !important;
        background-color: transparent !important;
        &::-webkit-input-placeholder {
          font-size: 16px;
          font-family: Microsoft YaHei;
          font-weight: 300;
          color: #585956 !important;
          line-height: 40px;
        }
      }
    }
  }
}
</style>
