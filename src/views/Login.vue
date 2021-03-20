<template>
  <div @keypress.enter="login">
    <div>
      账号
      <el-input placeholder="请输入账号" clearable v-model.lazy="username"></el-input>
    </div>
    <div>
      密码
      <el-input placeholder="密码" clearable show-password v-model.lazy="password"></el-input>
    </div>
    <div>
      <el-button @click="login">登陆</el-button>
    </div>
  </div>
</template>

<script lang="ts">
import User from '@/app/database/model/user'
import { Component, Vue } from 'vue-property-decorator'

import { namespace } from 'vuex-class'
const userModule = namespace('user')

@Component
export default class Login extends Vue {
  @userModule.Action('saveInfo') saveInfo!: (params: any) => void
  private username = ''
  private password = ''

  private login () {
    User.get({ username: this.username }).then(value => {
      if (!!value && value.password === this.password) {
        this.saveInfo(value)
        this.$message.success('登陆成功')
        this.$router.push('/')
      } else {
        this.$message.error('密码或账号错误，请重新输入')
      }
    }).catch(console.log)
  }
}
</script>

<style lang="scss" scoped>

</style>
