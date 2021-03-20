<template>
  <div>
    <div class="block">
      <div class="title" v-if="title">{{title}}</div>
      <slot name="title"></slot>
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

  @Component
export default class Blocks extends Vue {
    @Prop({ type: String }) title?: string;
}
</script>

<style lang="scss" scoped>
.block{
  background-color: yellow;
  border: 1px solid rgb(82, 82, 9);
  border-radius: 5px;
  height: 100%;
  .title{
    padding: 10px;
  }
}
</style>
