<template>
  <div id="app">
    <video v-if="!isStart" id="video" width="800" height="600" autoplay>
      <source src="/video/logo.mp4" type="video/mp4">
      您的浏览器不支持Video标签。
    </video>
    <div id="content" v-if="isStart">
      <div class="header" v-if="!isLoginPage">
        <heads></heads>
        <navs></navs>
      </div>
      <router-view/>
      <foot class="foot"></foot>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import foot from '@/components/main/Foot.vue'
import heads from '@/components/main/Head.vue'
import navs from '@/components/main/Nav.vue'

  @Component({
    components: {
      foot, heads, navs
    }
  })
export default class App extends Vue {
  private isLoginPage = false;
  private isStart = process.env.NODE_ENV !== 'production';
  created () {
    console.log(this.isLoginPage, this.isStart)

    let timehander: any = setTimeout(() => {
      this.isStart = true
      clearTimeout(timehander)
      timehander = null
    }, 4500)
  }

  @Watch('$route.path', { immediate: true })
  private getRouteChange () {
    if (this.$route.path === '/login') {
      this.isLoginPage = true
    } else {
      this.isLoginPage = false
    }
  }
}
</script>
<style lang="scss" scoped>
#app {
  width: 100%;
  height: 100vh;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  // -webkit-font-smoothing: antialiased;
  // -moz-osx-font-smoothing: grayscale;

  #content{
    width: 100%;
    height: 100%;
    .header{
    }
    .foot{
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
    }
  }
}
</style>
