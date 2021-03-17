<template>
  <div class="hello">
    {{ $t("message") }}
    <div id="code" class="printer" ref="code">
      test{{ num }}
      <img src="image/qrcode.png" />
      <div>这压根不好玩</div>
    </div>
    <img id="img" />
    <el-button type="primary" @click="start">开始发送</el-button>
    <webview
      id="printWebview"
      ref="printWebview"
      :src="fullPath"
      nodeintegration
    />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import modbus, { Modbus } from 'modbus'
import { WebviewTag } from 'electron'
import path from 'path'
import html2canvas from 'html2canvas'

import sq3 from 'sqlite3'
// 注意'\src\renderer\utils\MyDatabase.db'为我自己的路径，需切换成你自己使用的路径
const sqlite3 = sq3.verbose()
const db = new sqlite3.Database(':memory:')

db.serialize(function () {
  db.run('CREATE TABLE lorem (info TEXT)')

  const stmt = db.prepare('INSERT INTO lorem VALUES (?)')
  for (let i = 0; i < 10; i++) {
    stmt.run('Ipsum ' + i)
  }
  stmt.finalize()

  db.each(
    'SELECT rowid AS id, info FROM lorem',
    function (err: Error, row: any) {
      console.log(err.message, row.id + ': ' + row.info)
    }
  )
})

db.close()
@Component
export default class HelloWorld extends Vue {
  // com: Modbus = modbus("COM7", 115200, 2);
  timerHandle: NodeJS.Timeout | null = null;
  private num = 0;
  private fullPath = path.join(__static, "print.html"); // eslint-disable-line
  // private fullPath = 'http://localhost:8080/#about';
  private mounted () {
    const webview = this.$refs.printWebview as WebviewTag

    // const loadstart = () => {
    //   // indicator.innerText = 'loading...'
    //   this.$message('loading...')
    // }

    // const loadstop = () => {
    //   this.$message('loaded')
    // }

    // webview.addEventListener('did-start-loading', loadstart)
    // webview.addEventListener('did-stop-loading', loadstop)
    webview.addEventListener('ipc-message', (event) => {
      if (event.channel === 'webview-print-do') {
        console.log('ZDesigner GX420d')
        webview.print({
          silent: true,
          dpi: {
            horizontal: 203,
            vertical: 203
          },
          printBackground: true,
          deviceName: 'ZDesigner GX420d'
        })
      }
    })
  }

  private start () {
    if (this.$i18n.locale === 'zh') this.$i18n.locale = 'en'
    else this.$i18n.locale = 'zh'

    // 获取<webview>节点
    // const webview = (this.$refs.printWebview as WebviewTag)
    //   html2canvas(this.$refs.code as HTMLElement, {allowTaint: true,useCORS:true}).then((canvas:HTMLCanvasElement) => {
    //     // 发送信息到<webview>里的页面
    //     this.num++;
    //     console.log(webview);
    //     webview.send('webview-print-render', {
    //       printName: 'ZDesigner GX420d',
    //       html: canvas.toDataURL(),
    //       width: canvas.width,
    //       height: canvas.height,
    //     })
    //     let oImg = new Image();
    //     oImg.src = canvas.toDataURL();  // 导出图片
    //     document.getElementById('img')?.appendChild(oImg);  // 将生成的图片添加到body
    //   })
    const webview = this.$refs.printWebview as WebviewTag
    const code = this.$refs.code
    if (code) {
      console.log(code)
      html2canvas(code as HTMLElement, { useCORS: true }).then(function (
        canvas
      ) {
        // let oImg = new Image();
        // oImg.src = canvas.toDataURL();  // 导出图片
        // document.getElementById('img')?.appendChild(oImg);  // 将生成的图片添加到body
        const img = document.getElementById('img') as HTMLImageElement
        if (img) {
          img.width = canvas.width
          img.height = canvas.height
          img.src = canvas.toDataURL('image/jpeg', 1.0)
        }
        webview.send('webview-print-render', {
          printName: 'ZDesigner GX420d',
          html: canvas.toDataURL(),
          width: canvas.width,
          height: canvas.height
        })
      })
    }

    // this.timerHandle && clearInterval(this.timerHandle)
    // this.timerHandle = setInterval(()=>{
    //   this.com.read('c8', (err:Error|null, res:any) => {
    //     if(!!err) console.log(err.message);
    //     console.log(res);
    //   })
    //   this.com.read('hr', (err:Error|null, res:any) => {
    //     if(!!err) console.log(err.message);
    //     console.log(res);
    //   })
    // }, 5000)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.printer {
  font-weight: bold;
  padding-left: 250px;
  text-align: left;
}
</style>
