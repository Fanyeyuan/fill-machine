<template>
  <div>
    <div class="header">
      <div class="left">
        <span class="time">{{ currentTime | formateTime }}</span>
        <span class="machine"></span>
      </div>
      <div class="right">
        <span class="user" @click="ChangePassword">
          <i class="el-icon-user-solid"></i>
          <span>ID: 0001</span>
        </span>
        <span class="logout" @click="logout">
          <i class="el-icon-switch-button"></i>
          <span v-t="{ path: 'local.main.logout' }"></span>
        </span>
      </div>
    </div>

    <el-dialog
      custom-class="dialog"
      :visible.sync="centerDialogVisible"
      width="328px"
      :show-close="false"
      center
    >
      <div>
        <div class="title">
          <div
            class="message"
            v-t="{ path: 'local.main.changeInfo.title' }"
          ></div>
          <div class="close" @click="centerDialogVisible = false"></div>
        </div>
        <div class="input">
          <el-input
            class="username"
            :placeholder="$t('local.main.changeInfo.username')"
            clearable
            v-model.lazy="inputUsername"
          ></el-input>
          <el-input
            class="password"
            :placeholder="$t('local.main.changeInfo.password')"
            clearable
            show-password
            v-model.lazy="inputPassword"
          ></el-input>
          <el-input
            class="username"
            :placeholder="$t('local.main.changeInfo.repeat')"
            clearable
            show-password
            v-model.lazy="inputRepeatPassword"
          ></el-input>
        </div>
        <el-button
          class="confirm"
          v-t="{ path: 'local.main.changeInfo.title' }"
          @click="confirmChange"
        ></el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import User from '@/app/database/model/user'
import { Component, Vue } from 'vue-property-decorator'
import moment from 'moment'
import { namespace } from 'vuex-class'
const userModule = namespace('user')

@Component({
  filters: {
    formateTime: function (time: Date) {
      return moment(time).format('YYYY-MM-DD HH:mm:ss')
    }
  }
})
export default class Head extends Vue {
  private centerDialogVisible = false;
  private currentTime = new Date();
  private timerHandler?: NodeJS.Timeout;
  private inputUsername = '';
  private inputPassword = '';
  private inputRepeatPassword = '';
  @userModule.State('id') id!: number;
  @userModule.State('username') username!: string;
  @userModule.State('password') password!: string;
  @userModule.Action('saveInfo') saveInfo!: (params: any) => void;

  private ChangePassword () {
    this.centerDialogVisible = true
    this.inputUsername = this.username
    this.inputPassword = this.password
  }

  private logout () {
    const info = this.$tc('local.main.remind.logoutConfirmInfo')
    const remind = this.$tc('local.main.remind.info')
    const confirmButtonText = this.$tc('local.main.remind.confirmButtonText')
    const cancelButtonText = this.$tc('local.main.remind.cancelButtonText')
    const succuss = this.$tc('local.main.remind.success')
    const cancel = this.$tc('local.main.remind.cancel')

    this.$confirm(info, remind, {
      confirmButtonText,
      cancelButtonText,
      type: 'warning'
    })
      .then(() => {
        this.saveInfo({
          username: '',
          password: '',
          is_admin: false
        })
        this.$router.push('/login')
        this.$message({
          type: 'success',
          message: succuss
        })
      })
      .catch(() => {
        this.$message({
          type: 'info',
          message: cancel
        })
      })
  }

  private confirmChange () {
    if (!this.inputUsername) {
      this.$message.error(this.$tc('local.main.changeInfo.usernameNull'))
    } else if (!this.inputPassword || !this.inputRepeatPassword) {
      this.$message.error(this.$tc('local.main.changeInfo.passwordNull'))
    } else if (this.inputPassword !== this.inputRepeatPassword) {
      this.$message.error(this.$tc('local.main.changeInfo.repeatError'))
    } else {
      new User({
        id: this.id,
        username: this.inputUsername,
        password: this.inputPassword
      })
        .update({
          username: this.inputUsername,
          password: this.inputPassword
        })
        .then((value) => {
          if (!value) {
            this.$message.success(this.$tc('local.main.changeInfo.success'))
            this.$router.push('/login')
          } else {
            this.$message.success(
              this.$tc('local.main.changeInfo.systemError')
            )
          }
        })
        .catch((err) => {
          this.$message.error(err.message)
        })
    }
  }

  mounted () {
    this.timerHandler && clearInterval(this.timerHandler)
    this.timerHandler = setInterval(() => {
      this.currentTime = new Date()
    }, 1000)
  }

  beforeUnmount () {
    this.timerHandler && clearInterval(this.timerHandler)
  }
}
</script>

<style lang="scss" scoped>
div.header {
  height: 31px;
  text-align: center;
  overflow: hidden;
  padding: 0 35px;
  line-height: 32px;

  div.left {
    height: 31px;
    float: left;
    span.time {
      width: 147px;
      font-size: 12px;
      font-family: "Microsoft YaHei";
      font-weight: 400;
      padding-right: 16px;
    }

    span.machine {
      width: 217px;
      height: 100%;
      display: inline-block;
      vertical-align: middle;
      padding-top: 5px;
      // font-size: 20px;
      // font-weight: 400;
      background: url("~@/assets/image/base64/GB1000Pro.png") no-repeat center;
      background-size: contain;
    }
  }

  div.right {
    float: right;
    color: #bd5413;
    > span {
      cursor: pointer;
      padding: 9px;
      width: 102px;
      height: 27px;
      border: 1px solid #eeeeee;
      opacity: 0.53;
      border-radius: 15px;
    }
    span.user {
      margin-right: 17px;
      i.el-icon-user-solid {
        margin-right: 8px;
      }

      span {
        font-size: 16px;
        font-family: "Microsoft YaHei";
        font-weight: 400;
        line-height: 7px;
      }
    }

    span.logout {
      i {
        margin-right: 8px;
        background-color: #bd5413;
        color: white;
        border-radius: 2px;
      }

      span {
        font-size: 16px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        line-height: 7px;
      }
    }
  }
}
</style>

<style lang="scss">
.dialog {
  background: #ffffff;
  border: 1px solid #d5721b;
  border-radius: 10px !important;
  // .el-dialog__body{
  //   padding: 15px 17px 19px 12px !important;
  // }
  .el-dialog__header {
    padding: 0 !important;
  }
  .title {
    width: 250px;
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
      width: 42px;
      height: 42px;
      background: url("~@/assets/image/base64/取消.png") no-repeat center;
    }
  }
  .input {
    opacity: 0.53;
    .username,
    .password,
    .repeat {
      margin-top: 31px;
    }

    input {
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
  .confirm {
    width: 255px;
    height: 42px;
    background: linear-gradient(0deg, #aa4f12, #f86633);
    border-radius: 10px;
    margin: 18px 0 0 10px;
    font-size: 18px;
    font-family: Microsoft YaHei;
    font-weight: 300;
    color: #ffffff;
  }
}
</style>
