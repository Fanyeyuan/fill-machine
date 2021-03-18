<template>
  <div>
    <div id="nav">
      <router-link to="/">{{ $t('local.nav.home')}}</router-link> |
      <router-link to="/ready">{{ $t('local.nav.ready')}}</router-link> |
      <router-link to="/qrcode">{{ $t('local.nav.qrcode')}}</router-link> |
      <router-link to="/setting">{{ $t('local.nav.setting')}}</router-link> |
      <router-link to="/log">{{ $t('local.nav.log')}}</router-link>
      <router-link to="/login">登陆</router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

  @Component
export default class Nav extends Vue {

}
</script>

<style lang="scss" scoped>
#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
