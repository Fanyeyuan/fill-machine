<template>
  <div class="log">
    <div class="content">
      <div class="header" v-t="{ path: 'local.log.recode' }"></div>
      <div class="table">
        <el-table
          :data="optionLog"
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
                scope.row.end_time - scope.row.create_time
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
        :total="1000"
        :pager-count="5"
        :prev-text="$t('local.log.prev')"
        :next-text="$t('local.log.next')"
        @current-change="changePage"
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
        class="disable"
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
import { remote } from 'electron'
import { Component, Vue } from 'vue-property-decorator'
import { WokerParam } from '@/app/database/model/woker'
import PrintDialog from '@/components/common/PrintDialog.vue'
import moment from 'moment'
import CSV from '@/app/common/csv'
const { dialog, getCurrentWindow } = remote

@Component({
  components: {
    PrintDialog
  }
})
export default class Log extends Vue {
  private fullPath = path.join(__static, "printRecord.html"); // eslint-disable-line
  private optionLog: WokerParam[] = [];
  private currentPage = 1;
  private dialogVisible = false;
  private printDeviceName = '';

  mounted () {
    this.optionLog = new Array(10).fill(0).map((value, index) => {
      return {
        id: index + 1,
        username: '',
        jar_code: 'a' + index,
        boar_code: 'b' + index,
        boar_varieties: 'c' + index,
        volume: 100,
        plan_quantity: 1000,
        actual_quantity: 100,
        create_time: 0,
        end_time: 100,
        status: 1,
        message: '0'
      }
    })
    // console.log(this.optionLog);
  }

  changePage () {
    this.optionLog = new Array(10).fill(0).map((value, index) => {
      return {
        id: index + 1,
        username: '',
        jar_code: 'afdsrfewrdsfdsdasadse' + this.currentPage * 29032,
        boar_code: 'adawqedasdadxzcsadfasdd' + this.currentPage,
        boar_varieties: 'd' + this.currentPage,
        volume: 100 + this.currentPage,
        plan_quantity: 1000 + this.currentPage,
        actual_quantity: 100 + this.currentPage,
        create_time: 0,
        end_time: 100,
        status: 1,
        message: '0'
      }
    })
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

    // this.printRender()
  }

  private readonly title = {
    id: '序号',
    username: '用户名',
    jar_code: '灌装编号',
    boar_code: '公猪编号',
    boar_varieties: '品名品系',
    volume: '灌装量',
    plan_quantity: '疾患灌装量',
    actual_quantity: '实际灌装量',
    create_time: '开始时间',
    end_time: '结束时间',
    status: '状态',
    message: '原因'
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
            const csv = new CSV(
              choice.filePath,
              JSON.stringify(this.title),
              this.optionLog
            )
            csv.WriteDecoderLog(1)
          }
        }
      })
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
