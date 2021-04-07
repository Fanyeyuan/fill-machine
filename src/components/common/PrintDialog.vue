<template>
  <div v-if="printList">
    <el-dialog
      width="350px"
      :visible="dialogVisible"
      :append-to-body="true"
      :show-close="false"
      :title="$t('local.log.printDialog.title')"
    >
      <el-table
        :data="printList"
        highlight-current-row
        border
        @current-change="handleCurrentChange"
      >
        <el-table-column :label="$t('local.log.printDialog.label')">
          <template slot-scope="scope">
            {{ scope.row.name }}
            <el-tag
              v-if="scope.row.name == defaultPrint"
              type="primary"
              disable-transitions
              v-t="{ path: 'local.log.printDialog.default' }"
            ></el-tag>
          </template>
        </el-table-column>
        <div slot="empty" v-t="{ path: 'local.log.printDialog.empty' }"></div>
      </el-table>
      <div class="buttonStyle">
        <el-button
          @click="$emit('cancel')"
          v-t="{ path: 'local.log.printDialog.cancel' }"
        ></el-button>
        <el-button
          type="primary"
          @click="selectPrint"
          v-t="{ path: 'local.log.printDialog.confirm' }"
        ></el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { ipcRenderer } from 'electron'

@Component
export default class PrintDialog extends Vue {
  @Prop({ type: Boolean, default: false }) private dialogVisible!: boolean;
  @Prop({ type: String, default: '' }) defaultPrint!: string;
  private rowData!: [];
  private printList: any[] = [];

  @Watch('dialogVisible', { immediate: true })
  getPrintListHandle (dialogVisible: boolean) {
    if (!dialogVisible) {
      return
    }

    // 改用ipc异步方式获取列表，解决打印列数量多的时候导致卡死的问题
    ipcRenderer.send('getPrinterList')
    ipcRenderer.once('getPrinterList', (event, data) => {
      // 过滤可用打印机
      this.printList = data.filter((element: any) => element.status === 0)
    })
    // let data = this.webview.getPrinters();
  }

  handleCurrentChange (row: []) {
    this.rowData = row
  }

  // 取消
  cancel () {
    this.dialogVisible = false
  }

  selectPrint () {
    if (this.rowData) {
      this.$emit('select-print', this.rowData)
    } else {
      this.$message({
        message: this.$tc('local.log.printDialog.noChoice'),
        type: 'warning'
      })
    }
  }
}
</script>

<style lang='scss' scoped>
.buttonStyle {
  text-align: right;
  margin-top: 20px;
}
</style>
