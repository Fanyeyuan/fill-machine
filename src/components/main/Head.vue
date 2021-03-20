<template>
  <div class="header">
    <div class="left">
      <span>{{getCurrentTime}}</span>
      <span>GB1000Pro 全自动精液灌装机</span>
    </div>
    <div class="right">
      <span>
        <i class="el-icon-user-solid"></i>
        <span>ID: 0001</span>
      </span>
      <span @click="logout">
        <i class="el-icon-circle-close"></i>
        <span v-t="{path:'local.main.loginOut'}"></span>
      </span>
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
.header{
  position: fixed;
  top: 0;
  left: 0;
  border-bottom: 1px solid yellow;
  width: 100%;
  text-align: center;
  overflow: hidden;

  .left{
    float: left;
  }
  .right{
    float: right;
  }
}
</style>
