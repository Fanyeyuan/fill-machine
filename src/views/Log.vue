<template>
  <div class="log">
    <div class="content">
      <div class="header" v-t="{ path: 'local.log.recode' }"></div>
      <div class="table">
        <el-table
          :data="getOptionLog"
          :max-height="330"
          border
          stripe
          style="width: 100%"
        >
          <el-table-column prop="id" :label="$t('local.log.index')" :width="60">
          </el-table-column>
          <el-table-column prop="jar_code" :label="$t('local.log.jar_code')">
          </el-table-column>
          <el-table-column prop="boar_code" :label="$t('local.log.boar_code')">
          </el-table-column>
          <el-table-column
            prop="boar_varieties"
            :label="$t('local.log.boar_varieties')"
            :width="90"
          >
          </el-table-column>
          <el-table-column prop="volume" :label="$t('local.log.volume')">
          </el-table-column>
          <el-table-column
            prop="plan_quantity"
            :label="$t('local.log.plan_quantity')"
            :width="110"
          >
          </el-table-column>
          <el-table-column
            prop="actual_quantity"
            :label="$t('local.log.actual_quantity')"
            :width="110"
          >
          </el-table-column>
          <el-table-column :label="$t('local.log.time')">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{
                (scope.row.end_time - scope.row.create_time) | filterFillingTime
              }}</span>
            </template></el-table-column
          >
        </el-table>
      </div>
      <el-pagination
        class="pagination"
        background
        layout="slot, prev, pager, next"
        :current-page.sync="currentPage"
        :total="getOptionTotal"
        :pager-count="5"
        :prev-text="$t('local.log.prev')"
        :next-text="$t('local.log.next')"
      >
        <slot>
          <el-button
            class="btn-prev"
            :disabled="currentPage === 1"
            @click="currentPage = 1"
            v-t="{ path: 'local.log.home' }"
          ></el-button>
        </slot>
      </el-pagination>
    </div>
    <div class="recode">
      <el-button
        @click="RecodePrint"
        v-t="{ path: 'local.log.print' }"
      ></el-button>
      <el-button
        @click="ExportData"
        v-t="{ path: 'local.log.export' }"
      ></el-button>
    </div>
    <printDialog
      :dialog-visible="dialogVisible"
      @cancel="handlePrintDialogCancel"
      @select-print="printSelectAfter"
    />
    <webview
      v-show="false"
      class="m23"
      ref="printWebview"
      :src="fullPath"
      nodeintegration
    />
  </div>
</template>

<script lang="ts">
import path from 'path'
import { remote, WebviewTag } from 'electron'
import { Component, Ref, Vue } from 'vue-property-decorator'
import Worker, { WorkerParam } from '@/app/database/model/worker'
import PrintDialog from '@/components/common/PrintDialog.vue'
import moment from 'moment'
import CSV from '@/app/common/csv'
const { dialog, getCurrentWindow } = remote

@Component({
  components: {
    PrintDialog
  },
  filters: {
    filterFillingTime (ms: number) {
      return Math.ceil(ms / 60000)
    }
  }
})
export default class Log extends Vue {
  @Ref('printWebview') readonly webview!: WebviewTag;
  private fullPath = path.join(__static, "printRecord.html"); // eslint-disable-line
  private optionLog: WorkerParam[] = [];
  private currentPage = 1;
  private dialogVisible = false;
  private printDeviceName = '';

  async mounted () {
    const work = await Worker.all()
    this.optionLog = work.filter((value) => value.status && value.status > 0)
    // console.log(this.optionLog);
  }

  private RecodePrint () {
    this.dialogVisible = true
  }

  handlePrintDialogCancel () {
    this.$emit('cancel')
    this.dialogVisible = false
  }

  printSelectAfter (val: any) {
    this.dialogVisible = false
    // this.$electronStore.set('printForm', val.name)
    this.printDeviceName = val.name
    console.log(this.printDeviceName)

    this.printRender(this.printDeviceName)
  }

  printRender (printer: string) {
    this.webview.addEventListener('ipc-message', (event) => {
      if (event.channel === 'webview-print-do') {
        console.log(printer)

        this.webview.print({
          silent: true,
          landscape: true,
          header: 'cs',
          printBackground: true,
          deviceName: printer
        })
      }
    })
    this.webview
      .send('webview-print-render', {
        printName: printer,
        header: this.$tc('local.log.recode'),
        title: this.title,
        content: this.optionLog
      })
      .then(console.log)
  }

  private readonly title = {
    id: this.$t('local.log.index'),
    username: this.$t('local.log.username'),
    jar_code: this.$t('local.log.jar_code'),
    boar_code: this.$t('local.log.boar_code'),
    boar_varieties: this.$t('local.log.boar_varieties'),
    volume: this.$t('local.log.volume'),
    plan_quantity: this.$t('local.log.plan_quantity'),
    actual_quantity: this.$t('local.log.actual_quantity'),
    create_time: this.$t('local.log.create_time'),
    end_time: this.$t('local.log.end_time'),
    status: this.$t('local.log.status'),
    message: this.$t('local.log.message')
  };

  ExportData () {
    const filename = moment().format('YYYYMMDD HHmmss')
    const filters = [
      {
        name: 'csv',
        extensions: ['csv'] // 文件后缀名类型， 如md
      }
    ]

    dialog
      .showSaveDialog(getCurrentWindow(), {
        filters,
        defaultPath: filename
      })
      .then((choice) => {
        if (!choice.canceled) {
          if (choice.filePath) {
            const csv = new CSV(choice.filePath, this.title, this.optionLog)
            csv.WriteDecoderLog()
          }
        }
      })
  }

  get getOptionLog () {
    const start = 10 * (this.currentPage - 1)
    return this.optionLog.slice(start, start + 10)
  }

  get getOptionTotal () {
    return this.optionLog.length
  }
}
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
      font-weight: bold;
      color: #000000;
      margin-bottom: 3px;
    }
    .table {
      height: 310px;
      margin-bottom: 5px;
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

  .recode {
    overflow: hidden;
    padding: 14px 2px;
    > button {
      width: 190px !important;
      height: 55px !important;
      background: #fedb75 !important;
      box-shadow: 0px 0px 0px 0px rgba(76, 76, 79, 0.32);
      border-radius: 14px !important;

      font-size: 20px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: #000000;
      // line-height: 11px;
      &:first-child {
        float: left;
      }
      &:last-child {
        float: right;
      }
    }
    .disable {
      background: linear-gradient(255deg, #c2c2c2, #7d7c7c, #c2c2c2) !important;
      box-shadow: 0px 0px 0px 0px rgba(76, 76, 79, 0.32) !important;
    }
  }
}
</style>

<style lang="scss">
.log {
  .content {
    .table {
      .el-table {
        height: 100%;
        border: 1px solid black;
        background-color: inherit !important;
        tr,
        th {
          background-color: inherit !important;
          color: black;
        }
        td {
          padding: 1px 0 !important;
        }
        tr,
        th,
        td {
          border-color: black;
          text-align: center;
          div {
            padding: 0;
          }
        }
      }
    }
    .pagination {
      text-align: center;
      button {
        padding: 0 11px;
      }
      button,
      li {
        // background: #ffffff !important;
        // padding: 0 11px;
        border: 2px solid #d69528 !important;
        border-radius: 10px;
        :not(.disabled).active {
          color: #409eff;
        }
      }
    }
  }
}
</style>
