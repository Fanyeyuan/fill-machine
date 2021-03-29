<template>
  <div class="log">
    <div class="content">
      <div class="header">工作数据记录</div>
      <div class="table">
        <el-table :data="tableData" border stripe style="width: 100%">
          <el-table-column prop="date" label="序号" :width="50">
          </el-table-column>
          <el-table-column prop="name" label="罐装编号"> </el-table-column>
          <el-table-column prop="address" label="公猪编号"> </el-table-column>
          <el-table-column prop="address" label="品种品系"> </el-table-column>
          <el-table-column prop="address" label="单份体积"> </el-table-column>
          <el-table-column prop="address" label="计划灌装分量" :width="110">
          </el-table-column>
          <el-table-column prop="address" label="实际灌装分量" :width="110">
          </el-table-column>
          <el-table-column prop="address" label="灌装时长"> </el-table-column>
        </el-table>
      </div>
      <el-pagination
        class="pagination"
        background
        layout="prev, pager, next"
        :total="1000"
        prev-text="上一页"
        next-text="下一页"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Log extends Vue {}
</script>

<style lang="scss" scoped>
.log {
  padding: 15px 57px 22px 53px;

  .content {
    width: 691px;
    height: 368px;
    background: #dddfe6;
    border-radius: 5px;
    padding: 17px 6px 6px;
    .header {
      text-align: center;
      height: 22px;
      font-size: 20px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: #000000;
      margin-bottom: 3px;
    }
    .table {
      background-color: inherit !important;
      // width: 100%;
      // .el-table {
      //   background-color: inherit;
      // }
    }
    .pagination {
      text-align: center;
    }
  }
}
</style>

<style lang="scss">
.log {
  .content {
    .table {
      .el-table {
        border: 1px solid black;
        background-color: inherit !important;
        tr,
        th {
          background-color: inherit !important;
          border-color: black;
          color: black;
        }
      }
    }
  }
}
</style>
