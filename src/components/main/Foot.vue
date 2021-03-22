<template>
  <div>
    <div class="footer">
      <div class="left" v-t="{path:'local.main.copyright'}"></div>
      <div class="right">
        <span @click="changeChinese">中文</span> |
        <span @click="changeEnglish">ENGLISH</span>
      </div>
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
  padding: 0 57px;
  height: 32px;
  text-align: center;
  overflow: hidden;
  border-top: 1px solid #BD5413;

  .left{
    float: left;
    font-size: 16px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #000000;
    line-height: 32px;
  }
  .right{
    float: right;
    padding: 4px 0;
    span{
      display: inline-block;
      cursor: pointer;
      width: 70px;
      height: 24px;
      border: 1px solid #FFFFFF;
      padding: 0 8px;
      opacity: 0.48;
      border-radius: 10px;

      font-size: 16px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: #FFFFFF;
      line-height: 24px;

      &:first-of-type{
        background: #D69628;
      }
      &:last-of-type{
        font-style: italic;
        background: #787878;
      }
    }
  }
}
</style>
