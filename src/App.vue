<template>
  <div id="app">
    <div class="header" v-if="!isLoginPage">
      <heads></heads>
      <navs></navs>
    </div>
    <router-view/>
    <foot class="foot"></foot>
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
    @Watch('$route.path')
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

  .header{
  }
  .foot{
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
  }
}
</style>
