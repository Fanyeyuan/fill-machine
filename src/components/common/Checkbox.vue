<template>
  <div>
    <div
      class="checkbox"
      @click="checkboxClick"
      :class="{ disabled: disabled }"
    >
      <div class="icon" :class="[checked ? ckStyle : unStyle]">
        <!-- <i :class="[checked ? checkedIcon : uncheckIcon]"></i> -->
        <!-- <i class="icon-checked"></i> -->
      </div>
      <div
        class="label"
        :class="{ active: checked, lan: $i18n.locale === 'en' }"
      >
        {{ label }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, ModelSync, Vue } from 'vue-property-decorator'

@Component
export default class Checkbox extends Vue {
  @Prop({ type: String }) image!: string;
  @Prop({ default: '1', type: String }) label!: string;
  @Prop({ default: 'icon-checked', type: String }) checkedIcon!: string;
  @Prop({ default: 'icon-unchecked', type: String }) uncheckIcon!: string;
  @Prop({ type: String }) ckStyle!: string;
  @Prop({ type: String }) unStyle!: string;
  @Prop({ type: Boolean, default: false }) disabled!: boolean;
  @ModelSync('value', 'change', { required: true, type: Boolean })
  checked!: boolean;

  checkboxClick () {
    !this.disabled && (this.checked = !this.checked)
  }
}
</script>

<style lang="scss" scoped>
.checkbox {
  height: 38px;
  cursor: pointer;
  border: 1px solid #ffffff;
  opacity: 0.7;
  border-radius: 5px;
  line-height: 38px;
  > div {
    display: inline-block;
    padding-right: 5px;
  }
  .icon {
    width: 20px;
    height: 20px;
    margin: 0 5px;
  }
  .label {
    font-size: 20px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #808080;
    line-height: 11px;
  }
  .active {
    color: #bd5413;
  }
  .lan {
    font-size: 12px;
    padding: 0;
  }
}
.disabled {
  cursor: not-allowed;
}
</style>
