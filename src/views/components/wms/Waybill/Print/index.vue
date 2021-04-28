<template>
  <div id="container">
    <el-row :gutter="12">
      <el-col :offset="8" :span="8">
        <el-card shadow="always">
          <div slot="header" class="clearfix">
            <span>简单实例</span>
          </div>
          <div>
            <el-form label-width="80px">
              <el-form-item label="菜名">
                <el-input v-model="formData.name"></el-input>
              </el-form-item>
              <el-form-item label="条形码">
                <el-input v-model="formData.code"></el-input>
              </el-form-item>
              <el-form-item label="页数">
                <el-input-number v-model="formData.number" :max="10" :min="1" controls-position="right">
                </el-input-number>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="print">生成打印文件</el-button>
              </el-form-item>
            </el-form>
          </div>

        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import PrintTemplate from 'print-template'

export default {
  name: 'Print',
  props: {
    value: {
      type: Object,
    },
    option: {
      type: Object,
    },
  },
  data() {
    return {
      template: null,
      formData: {
        number: 1,
        name: '泡菜肉丝',
        code: 'KY-WB-637D5F0ABD6331AB9BCBB5E91877F7A',
        qrcodeUrl: 'https://element.eleme.cn/'
      }
    }
  },
  created() {
  },
  mounted() {
    getPrintData();
    this.initPrintTemplate()
  },
  methods: {
    getPrintData(){

    },
    initPrintTemplate() {
      this.template = new PrintTemplate()
      this.template.push(
        {
          name: 'printTemplate',
          // size: [ 76, 130 ],
          size: [ 210, 148 ],
          fixed: [
            { type: 'line', x: 2, y: 2, length: 206 },//上边
            { type: 'line', x: 2, y: 16, length: 206 },//上边
            { type: 'line', x: 2, y: 146, length: 206 },//下边
            { type: 'image', x: 4, y: 4 ,width: 25, height: 7.5, default: 'http://localhost:1024/gzkaiyu56.jpeg' },//下边
            { type: 'line', x: 208, y: 2, orientation: 'p', length: 144 },//左边
            { type: 'line', x: 2, y: 2, orientation: 'p', length: 144 },//右边

            { type: 'text', x: 4, y: 18, fontSize: 2, default: '始发站' },
            { type: 'text', x: 53.5, y: 18, fontSize: 2, default: '到达站' },
            { type: 'text', x: 105, y: 18, fontSize: 2, default: '中转地' },
            { type: 'text', x: 156.5, y: 18, fontSize: 2, default: '客户单号' },
            { type: 'line', x: 51.5, y: 16, orientation: 'p', length: 6 },
            { type: 'line', x: 154.5, y: 16, orientation: 'p', length: 6 },
            { type: 'line', x: 103, y: 16, orientation: 'p', length: 6 },
            { type: 'line', x: 2, y: 22, length: 206 },

            { type: 'text', x: 4, y: 24, fontSize: 2, default: '发货公司名称' },
            { type: 'text', x: 53.5, y: 24, fontSize: 2, default: '发货联系人' },
            { type: 'text', x: 105, y: 24, fontSize: 2, default: '发货手机号' },
            { type: 'text', x: 156.5, y: 24, fontSize: 2, default: '发货人座机' },
            { type: 'line', x: 51.5, y: 22, orientation: 'p', length: 6 },
            { type: 'line', x: 154.5, y: 22, orientation: 'p', length: 6 },
            { type: 'line', x: 103, y: 22, orientation: 'p', length: 6 },
            { type: 'line', x: 2, y: 28, length: 206 },

            { type: 'text', x: 4, y: 30, fontSize: 2, default: '收货公司名称' },
            { type: 'text', x: 53.5, y: 30, fontSize: 2, default: '收货联系人' },
            { type: 'text', x: 105, y: 30, fontSize: 2, default: '收货手机号' },
            { type: 'text', x: 156.5, y: 30, fontSize: 2, default: '收货人座机' },
            { type: 'line', x: 51.5, y: 28, orientation: 'p', length: 6 },
            { type: 'line', x: 154.5, y: 28, orientation: 'p', length: 6 },
            { type: 'line', x: 103, y: 28, orientation: 'p', length: 6 },
            { type: 'line', x: 2, y: 34, length: 206 },

            { type: 'text', x: 4, y: 36, fontSize: 2, default: '行政区' },
            { type: 'text', x: 105, y: 36, fontSize: 2, default: '收货详细地址' },
            { type: 'line', x: 103, y: 34, orientation: 'p', length: 6 },
            { type: 'line', x: 2, y: 40, length: 206 },

            { type: 'text', x: 4, y: 42, fontSize: 2, default: '运输方式' },
            { type: 'text', x: 53.5, y: 42, fontSize: 2, default: '交接方式' },
            { type: 'text', x: 105, y: 42, fontSize: 2, default: '付款方式' },
            { type: 'text', x: 156.5, y: 42, fontSize: 2, default: '是否开发票' },
            { type: 'line', x: 51.5, y: 40, orientation: 'p', length: 6 },
            { type: 'line', x: 154.5, y: 40, orientation: 'p', length: 6 },
            { type: 'line', x: 103, y: 40, orientation: 'p', length: 6 },
            { type: 'line', x: 2, y: 46, length: 206 },

            { type: 'text', x: 4, y: 48, fontSize: 2, default: '货物清单' },
            { type: 'line', x: 152, y: 52, orientation: 'p', length: 76 },
            { type: 'line', x: 4, y: 52, orientation: 'p', length: 76 },
            { type: 'line', x: 4, y: 52, length: 148 },
            { type: 'line', x: 4, y: 128, length: 148 },

            { type: 'line', x: 4, y: 58, length: 148 },//+6
            ...this.pushList(),
            // { type: 'line', x: 4, y: 64, length: 148 },
            { type: 'text', x: 6, y: 54, fontSize: 2, default: '序号' },
            { type: 'line', x: 22.5, y: 52, orientation: 'p', length: 76 },
            { type: 'text', x: 24.5, y: 54, fontSize: 2, default: '品名' },
            { type: 'line', x: 40.5, y: 52, orientation: 'p', length: 76 },
            { type: 'text', x: 42.5, y: 54, fontSize: 2, default: '包装方式' },
            { type: 'line', x: 59, y: 52, orientation: 'p', length: 76 },
            { type: 'text', x: 61, y: 54, fontSize: 2, default: '件数' },
            { type: 'line', x: 77.5, y: 52, orientation: 'p', length: 76 },
            { type: 'text', x: 79.5, y: 54, fontSize: 2, default: '计价方式' },
            { type: 'line', x: 96, y: 52, orientation: 'p', length: 76 },
            { type: 'text', x: 98.5, y: 54, fontSize: 2, default: '计价值' },
            { type: 'line', x: 114.5, y: 52, orientation: 'p', length: 76 },
            { type: 'text', x: 116.5, y: 54, fontSize: 2, default: '计量数' },
            { type: 'line', x: 133, y: 52, orientation: 'p', length: 76 },
            { type: 'text', x: 135, y: 54, fontSize: 2, default: '基础运费' },

            { type: 'text', x: 156.5, y: 48, fontSize: 2, default: '增值服务' },
            { type: 'line', x: 154.5, y: 46, orientation: 'p', length: 84 },
            { type: 'line', x: 154.5, y: 84, length: 53.5 },

            { type: 'text', x: 157, y: 94.5, orientation: 'p', fontSize: 6, default: '扫码查看' },
            { type: 'line', x: 165, y: 94.5, orientation: 'p', length: 31 },
            { type: 'line', x: 196, y: 94.5, orientation: 'p', length: 31 },
            { type: 'line', x: 165, y: 94.5, length: 31 },
            { type: 'line', x: 165, y: 125.5, length: 31 },

            { type: 'line', x: 2, y: 130, length: 206 },
            { type: 'line', x: 2, y: 136, length: 152.5 },


            { type: 'line', x: 51.5, y: 136, orientation: 'p', length: 10 },
            { type: 'line', x: 103, y: 136, orientation: 'p', length: 10 },
            { type: 'text', x: 4, y: 138, fontSize: 2, default: '基本运费' },
            { type: 'text', x: 53.5, y: 138, fontSize: 2, default: '实收运费' },
            { type: 'text', x: 105, y: 138, fontSize: 2, default: '总运费' },
            { type: 'line', x: 154.5, y: 130, orientation: 'p', length: 16 },
            { type: 'text', x: 156.5, y: 132, fontSize: 2, default: '备注' },


            // { type: 'text', x: 10, y: 30, fontSize: 3, default: '菜名' },
            // { type: 'line', x: 25, y: 27, orientation: 'p', length: 8 },
            // { type: 'line', x: 2, y: 35, length: 72 },
            // { type: 'line', x: 2, y: 27, length: 72 },
            // { type: 'text', x: 10, y: 50, fontSize: 3, default: '二维码' },
            // { type: 'line', x: 25, y: 35, orientation: 'p', length: 30 },
            // { type: 'line', x: 2, y: 65, length: 72 },

          ],
          data: {
            name: { type: 'text', x: 35, y: 30, fontSize: 2.8 },
            code: {
              type: 'barcode',
              x: 160,
              y: 3,
              format: 'CODE128A',
              width: 1,
              margin: 0,
              fontSize: 2,
              fontOptions: 'bold',
              displayValue: true,
              height: 12
            },
            qrcodeUrl: { type: 'qrcode', x: 165.5, y: 95, width: 30, default: 'https://www.baidu.com' },
          }
        }
      )
      // this.template.push({
      //   name:'printTemplate', // 模板名称
      //   unit:'10000mm',        // 尺寸  mm / px
      //   size:'a4',        // a4 或 [221,291]
      //   fixed:[           // 固定的数据
      //     {
      //       type:'line' ,  // 类型 线条  line / text / image / barcode / qrcode
      //       x:10,          // x
      //       y:20,          // y
      //       length:10,     // 长度
      //       orientation:'l'// 方向 默认 l 横向  / p 竖向
      //     },
      //     {
      //       type:'text' ,         // 类型  文本 line / text / image / barcode / qrcode
      //       default:'张三',       // 默认值  \n 换行  或设置maxWidth大小
      //       x:10,                 // x
      //       y:20,                 // y
      //       fontSize:'20',        // 字体大小
      //       fontFamily:'微软雅黑', // 字体类型   默认 '微软雅黑'
      //       fontWeight:null,      // 字体宽度
      //       fontStyle:'normal',   // 字体样式 normal / 斜体
      //       maxWidth:null,        // 最大换行宽度
      //       orientation:'l'       // 方向 默认 l 横向  / p 竖向
      //     },
      //     {
      //       type:'image' ,        // 图片  文本 line / text / image / barcode / qrcode
      //       default:'图片地址',    // *默认值  图片地址 或 base64
      //       x:10,                 // *x
      //       y:20,                 // *y
      //       width: 25,            // *宽度
      //       height: 25,           // *高度
      //     },
      //     {
      //       type:'barcode' ,      // 条形码  文本 line / text / image / barcode / qrcode
      //       default:'OK111111',   // *默认值  条形码值
      //       x:10,                 // *x
      //       y:20,                 // *y
      //       width: 3,             // *线宽
      //       height: 25,           // *高度
      //       format: 'CODE128A',   // 条形码格式
      //       fontOptions: 'bold'   // 粗体   bold / italic / bold  italic
      //     },
      //     {
      //       type:'qrcode' ,      // *条形码  文本 line / text / image / barcode / qrcode
      //       default:'二维码文本',  // *默认值
      //       x:10,                 // *x
      //       y:20,                 // *y
      //       width: 25,            // *宽度
      //     }
      //
      //   ],
      //   data:{                    // 动态数据
      //     code1: {                // 传入数据的属性名称
      //       type:'barcode' ,      // 条形码  文本 line / text / image / barcode / qrcode
      //       x:10,                 // *x
      //       y:20,                 // *y
      //       width: 3,            // *线宽度
      //       height: 25,           // *高度
      //       format: 'CODE128A',   // 条形码格式
      //     },
      //     code2:{                 // 传入数据的属性名称
      //       type:'qrcode' ,       // *条形码  文本 line / text / image / barcode / qrcode
      //       x:10,                 // *x
      //       y:20,                 // *y
      //       width: 25,            // *宽度
      //     }
      //
      //   }
      //
      // })
    },
    pushList(){
      const list = [];
      list.push({ type: 'text', x: 6, y: 60, fontSize: 2, default: '1' });
      list.push({ type: 'text', x: 24.5, y: 60, fontSize: 2, default: '肥皂' });
      list.push({ type: 'text', x: 42.5, y: 60, fontSize: 2, default: '纸箱' });
      list.push({ type: 'text', x: 61, y: 60, fontSize: 2, default: '166' });
      list.push({ type: 'text', x: 79.5, y: 60, fontSize: 2, default: '重量/t' });
      list.push({ type: 'text', x: 98.5, y: 60, fontSize: 2, default: '300' });
      list.push({ type: 'text', x: 116.5, y: 60, fontSize: 2, default: '20' });
      list.push({ type: 'text', x: 135, y: 60, fontSize: 2, default: '6000' });
      list.push({ type: 'line', x: 4, y: 64, length: 148 });
      // list.push({ type: 'line', x: 4, y: 70, length: 148 });
      return list;
    },
    print() {
      let printData = []
      let printUrl = null
      for ( let index = 0; index < this.formData.number; index++ ) {
        printData.push( {
          code: this.formData.code + (index + 1),
          name: this.formData.name + (index + 1),
          qrcodeUrl: this.formData.qrcodeUrl
        } )
      }
      this.template.print( 'printTemplate', printData ).then( printPdf => {
        if ( printPdf ) {
          this.$message.success( '生成成功' )
          printUrl = printPdf.output( 'bloburi', { filename: '打印文件' } )
          window.open( printUrl, '_blank' )
        } else {
          this.$message.warning( '生成失败' )
        }
      } )
    }
  }
}
</script>

<style>
#container {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
