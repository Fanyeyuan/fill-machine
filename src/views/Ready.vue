<template>
  <div>
    <el-row :gutter="50">
      <el-col :span="16">
        <block>
          <slot name="title">
            <p v-t="{path:'local.ready.qgydjc'}"></p>
          </slot>
        </block>
      </el-col>
      <el-col :span="8">
        <block>
          <slot name="title">
            <p v-t="{path:'local.ready.fkwk'}"></p>
          </slot>
        </block>
        <block>
          <slot name="title">
            <p v-t="{path:'local.ready.rdbkz'}"></p>
          </slot>
        </block>
      </el-col>
    </el-row>
    <el-row>
      <el-col class="button" :span="8">
        <el-button v-t="{path:'local.ready.ydxh'}"></el-button>
      </el-col>
      <el-col class="button" :span="8">
        <el-button v-t="{path:'local.ready.gzxh'}"></el-button>
      </el-col>
      <el-col class="button" :span="8">
        <el-button v-t="{path:'local.ready.sdtb'}"></el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Block from '@/components/common/Blocks.vue'

@Component({
  components: {
    Block
  }
})
export default class Ready extends Vue {

}
</script>

<style lang="scss" scoped>
.button{
  text-align: center
}
</style>
