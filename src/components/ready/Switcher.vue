<template>
  <div>
    <div
      class="switch"
      :class="{ left: getdirective, up: !getdirective, disabled: disabled }"
      @click="change"
    >
      <div class="label">{{ label }}</div>
      <div class="logo" :class="{ on: status, off: !status }"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from 'vue-property-decorator'

@Component
export default class Switcher extends Vue {
  @Prop({ type: Boolean, required: true }) status!: boolean;
  @Prop({ type: String, required: true }) label!: string;
  @Prop({ type: Boolean, default: false }) disabled!: boolean;
  @Prop({ type: String, default: 'up' }) directive!: string;

  private get getdirective () {
    return this.directive === 'left'
  }

  change () {
    this.disabled || this.$emit('change', !this.status)
  }
}
</script>

<style lang="scss" scoped>
.switch {
  cursor: pointer;
  text-align: center;
  .label {
    font-size: 16px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #000000;
    text-align: center;
  }
  .logo {
    width: 95px;
    height: 37px;
  }
  .on {
    background: url("~@/assets/image/base64/ON.png") no-repeat center;
  }
  .off {
    background: url("~@/assets/image/base64/OFF.png") no-repeat center;
  }
}
.disabled {
  cursor: not-allowed;
}
.up {
  .label {
    margin: 4px auto;
  }
  .logo {
    margin: 7px auto;
  }
}
.left {
  > div {
    display: inline-block;
    vertical-align: middle;
  }
  .label {
    margin-right: 20px;
  }
}
</style>
