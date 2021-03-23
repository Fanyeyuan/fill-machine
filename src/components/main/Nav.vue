<template>
  <div>
    <div id="nav">
      <router-link class="ceil" v-t="{path:'local.nav.home'}" to="/"></router-link>
      <router-link class="ceil" v-t="{path:'local.nav.ready'}" to="/ready"></router-link>
      <router-link class="ceil" v-t="{path:'local.nav.qrcode'}" to="/qrcode"></router-link>
      <router-link class="ceil" v-t="{path:'local.nav.setting'}" to="/setting"></router-link>
      <router-link class="ceil" v-t="{path:'local.nav.log'}" to="/log"></router-link>
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
  height: 48px;
  border-top: 1px solid #BD5413;
  border-bottom: 1px solid #BD5413;
  text-align: center;

  .ceil{
    width: 142px;
    height: 49px;
    margin: 0 2px;
    font-size: 18px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    // background-color: yellow;
    color: #051921;
    border-radius: 5px;
    line-height: 48px;
    display: inline-block;
    // background-image: linear-gradient(to top, #cf5a0f, #fff9a9);
    text-decoration: none;
    background: url("~@/assets/image/base64/navback.png") no-repeat center;
    background-size: cover;

    &.router-link-exact-active {
      position: relative;
      &::after{
      content: "";
      width: 69px;
      height: 5px;
      background: #fff;
      border-radius: 3px;
      position: absolute;
      bottom: 3px;
      left: 37px;
    }
    }
  }
}
</style>
