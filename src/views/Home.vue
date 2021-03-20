<template>
  <div class="home">
    <el-row :gutter="0">
      <el-col :span="10">
        <block class="work">
          <slot name="title">
            <p v-t="{path:'local.home.work'}"></p>
          </slot>
        </block>
      </el-col>
      <el-col :span="14">
        <el-row>
          <el-col :span="12">
            <block class="ceil">
              <slot name="title">
                <p v-t="{path:'local.home.dfgzl'}"></p>
              </slot>
            </block>
          </el-col>
          <el-col :span="12">
            <block class="ceil">
              <slot name="title">
                <p v-t="{path:'local.home.jhgzfs'}"></p>
              </slot>
            </block>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <block class="ceil">
              <slot name="title">
                <p v-t="{path:'local.home.sjgzfs'}"></p>
              </slot>
            </block>
          </el-col>
          <el-col :span="12">
            <block class="ceil">
              <slot name="title">
                <p v-t="{path:'local.home.fksjwd'}"></p>
              </slot>
            </block>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <block class="ceil">
              <slot name="title">
                <p v-t="{path:'local.home.dabiao'}"></p>
              </slot>
            </block>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <div class="option">
      <el-button>{{$t('local.home.start')}}</el-button>
      <el-button>{{$t('local.home.stop')}}</el-button>
    </div>
  </div>
</template>

<script>
import Block from '@/components/common/Blocks.vue'

export default {
  name: 'Home',
  components: {
    Block
  }
}
</script>

<style lang="scss" scoped>
.work{
  width: 100%;
  height: 400px;
}
</style>
