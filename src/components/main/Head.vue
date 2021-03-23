<template>
  <div>
    <div class="header">
      <div class="left">
        <span class="time">{{getCurrentTime}}</span>
        <span class="machine">GB1000Pro 全自动精液灌装机</span>
      </div>
      <div class="right">
        <span class="user">
          <i class="el-icon-user-solid"></i>
          <span>ID: 0001</span>
        </span>
        <span class="logout" @click="logout">
          <i class="el-icon-switch-button"></i>
          <span v-t="{path:'local.main.logout'}"></span>
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import moment from 'moment'
import { namespace } from 'vuex-class'
const userModule = namespace('user')

  @Component
export default class Head extends Vue {
  @userModule.Action('saveInfo') saveInfo!: (params: any) => void
  private get getCurrentTime () {
    return moment().format('YYYY-MM-DD HH:mm:SS')
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
    }).then(() => {
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
    }).catch(() => {
      this.$message({
        type: 'info',
        message: cancel
      })
    })
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
      height: 20px;
      font-size: 20px;
      font-weight: 400;
    }
  }

  div.right {
    float: right;
    color: #BD5413;
    > span{
      cursor: pointer;
      padding: 9px;
      width: 102px;
      height: 27px;
      border: 1px solid #EEEEEE;
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
