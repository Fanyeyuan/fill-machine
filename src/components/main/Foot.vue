<template>
  <div class="footer">
    <div class="left">版权所有</div>
    <div class="right">
      <span @click="changeChinese">中文</span>|<span @click="changeEnglish">ENGLISH</span>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Foot extends Vue {
  private changeChinese () {
    if (this.$i18n.locale !== 'zh') { this.$i18n.locale = 'zh' }
  }

  private changeEnglish () {
    if (this.$i18n.locale !== 'en') { this.$i18n.locale = 'en' }
  }
}
</script>

<style lang="scss" scoped>
.footer{
  position: fixed;
  bottom: 0;
  left: 0;
  border-top: 1px solid yellow;
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
