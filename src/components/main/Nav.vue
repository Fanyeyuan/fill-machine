<template>
  <div>
    <div id="nav">
        <span ></span>
      <router-link v-t="{path:'local.nav.home'}" to="/"></router-link> |
      <router-link v-t="{path:'local.nav.ready'}" to="/ready"></router-link> |
      <router-link v-t="{path:'local.nav.qrcode'}" to="/qrcode"></router-link> |
      <router-link v-t="{path:'local.nav.setting'}" to="/setting"></router-link> |
      <router-link v-t="{path:'local.nav.log'}" to="/log"></router-link>
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
  padding-top: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
