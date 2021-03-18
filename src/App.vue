<template>
  <div id="app">
    <heads v-if="!isLoginPage"></heads>
    <navs></navs>
    <router-view/>
    <foot v-if="!isLoginPage"></foot>
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
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

*{
  padding: 0;
  margin: 0;
}
</style>
