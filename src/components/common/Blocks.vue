<template>
  <div>
    <div class="block">
      <div class="title">{{title}}</div>
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

  @Component
export default class Blocks extends Vue {
    @Prop({ type: String, required: true }) title?: string;
}
</script>

<style lang="scss" scoped>
.block{
  background-color: #dddfe6;
  border: 1px solid #E8C537;
  border-radius: 5px;
  height: 100%;
  .title{
    padding: 10px;
    font-size: 20px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #000000;
    line-height: 11px;
  }
}
</style>
