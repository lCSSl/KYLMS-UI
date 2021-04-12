<template>
  <el-card>
    <el-tabs v-model="activeName">
      <el-tab-pane label="基本信息" name="basicInfo">
        <!--
        <el-table ref="dragTable" :data="cloumns" row-key="columnId" :max-height="tableHeight">
          <el-table-column label="序号" type="index" min-width="5%" class-name="allowDrag" />
          <el-table-column
            label="字段列名"
            prop="columnName"
            min-width="10%"
            :show-overflow-tooltip="true"
          />
          <el-table-column label="字段描述" min-width="10%">
            <template slot-scope="scope">
              <el-input v-model="scope.row.columnComment"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            label="物理类型"
            prop="columnType"
            min-width="10%"
            :show-overflow-tooltip="true"
          />
          <el-table-column label="Java类型" min-width="11%">
            <template slot-scope="scope">
              <el-select v-model="scope.row.javaType">
                <el-option label="Long" value="Long" />
                <el-option label="String" value="String" />
                <el-option label="Integer" value="Integer" />
                <el-option label="Double" value="Double" />
                <el-option label="BigDecimal" value="BigDecimal" />
                <el-option label="Date" value="Date" />
              </el-select>
            </template>
          </el-table-column>
          <el-table-column label="java属性" min-width="10%">
            <template slot-scope="scope">
              <el-input v-model="scope.row.javaField"></el-input>
            </template>
          </el-table-column>

          <el-table-column label="插入" min-width="5%">
            <template slot-scope="scope">
              <el-checkbox true-label="1" v-model="scope.row.isInsert"></el-checkbox>
            </template>
          </el-table-column>
          <el-table-column label="编辑" min-width="5%">
            <template slot-scope="scope">
              <el-checkbox true-label="1" v-model="scope.row.isEdit"></el-checkbox>
            </template>
          </el-table-column>
          <el-table-column label="列表" min-width="5%">
            <template slot-scope="scope">
              <el-checkbox true-label="1" v-model="scope.row.isList"></el-checkbox>
            </template>
          </el-table-column>
          <el-table-column label="查询" min-width="5%">
            <template slot-scope="scope">
              <el-checkbox true-label="1" v-model="scope.row.isQuery"></el-checkbox>
            </template>
          </el-table-column>
          <el-table-column label="查询方式" min-width="10%">
            <template slot-scope="scope">
              <el-select v-model="scope.row.queryType">
                <el-option label="=" value="EQ" />
                <el-option label="!=" value="NE" />
                <el-option label=">" value="GT" />
                <el-option label=">=" value="GTE" />
                <el-option label="<" value="LT" />
                <el-option label="<=" value="LTE" />
                <el-option label="LIKE" value="LIKE" />
                <el-option label="BETWEEN" value="BETWEEN" />
              </el-select>
            </template>
          </el-table-column>
          <el-table-column label="必填" min-width="5%">
            <template slot-scope="scope">
              <el-checkbox true-label="1" v-model="scope.row.isRequired"></el-checkbox>
            </template>
          </el-table-column>
          <el-table-column label="显示类型" min-width="12%">
            <template slot-scope="scope">
              <el-select v-model="scope.row.htmlType">
                <el-option label="文本框" value="input" />
                <el-option label="文本域" value="textarea" />
                <el-option label="下拉框" value="select" />
                <el-option label="单选框" value="radio" />
                <el-option label="复选框" value="checkbox" />
                <el-option label="日期控件" value="datetime" />
                <el-option label="图片上传" value="imageUpload" />
                <el-option label="文件上传" value="fileUpload" />
                <el-option label="富文本控件" value="editor" />
              </el-select>
            </template>
          </el-table-column>
          <el-table-column label="字典类型" min-width="12%">
            <template slot-scope="scope">
              <el-select v-model="scope.row.dictType" clearable filterable placeholder="请选择">
                <el-option
                  v-for="dict in dictOptions"
                  :key="dict.dictType"
                  :label="dict.dictName"
                  :value="dict.dictType">
                  <span style="float: left">{{ dict.dictName }}</span>
                  <span style="float: right; color: #8492a6; font-size: 13px">{{ dict.dictType }}</span>
                </el-option>
              </el-select>
            </template>
          </el-table-column>
        </el-table>
        -->
        <el-form ref="stowageForm" :model="stowageForm" :rules="stowageFormRules" label-width="100px">
          <el-row :gutter="24">
            <ICol type="half">
              <el-form-item label="发出站点" prop="departure">
                <el-select
                  v-model="stowageForm.departure" :disabled="readOnly" :loading="loading"
                  :remote-method="(keyword)=>getWarehouseOptions(keyword,1)"
                  class="common-select-width" filterable remote reserve-keyword>
                  <el-option
                    v-for="warehouse in departureWarehouseOptions"
                    :key="warehouse.warehouseId"
                    :label="warehouse.warehouseName"
                    :value="warehouse.warehouseId"
                  />
                </el-select>
              </el-form-item>
            </ICol>
            <ICol type="half">
              <el-form-item label="目的地站点" prop="destination">
                <el-select
                  v-model="stowageForm.destination" :disabled="readOnly" :loading="loading"
                  :remote-method="(keyword)=>getWarehouseOptions(keyword,2)"
                  class="common-select-width" filterable remote reserve-keyword>
                  <el-option
                    v-for="(warehouse,index) in destinationWarehouseOptions"
                    :key="index"
                    :label="warehouse.warehouseName"
                    :value="warehouse.warehouseId"/>
                </el-select>
              </el-form-item>
            </ICol>
            <ICol>
              <el-form-item label="配载编码" prop="stowageCode">
                <el-input v-model="stowageForm.stowageCode" placeholder="请输入配载编码"/>
              </el-form-item>
            </ICol>
            <ICol>
              <el-form-item label="配载站点名" prop="stowageWarehouseName">
                <el-input v-model="stowageForm.stowageWarehouseName" placeholder="请输入配载站点名"/>
              </el-form-item>
            </ICol>
            <ICol>
              <el-form-item label="发出站点名" prop="departureName">
                <el-input v-model="stowageForm.departureName" placeholder="请输入发出站点名"/>
              </el-form-item>
            </ICol>
            <ICol>
              <el-form-item label="发车批次" prop="departureCode">
                <el-input v-model="stowageForm.departureCode" placeholder="请输入发车批次"/>
              </el-form-item>
            </ICol>
            <ICol>
              <el-form-item label="发车司机ID" prop="departureDriverId">
                <el-input v-model="stowageForm.departureDriverId" placeholder="请输入发车司机ID"/>
              </el-form-item>
            </ICol>
            <ICol>
              <el-form-item label="发车司机名" prop="departureDriverName">
                <el-input v-model="stowageForm.departureDriverName" placeholder="请输入发车司机名"/>
              </el-form-item>
            </ICol>
            <ICol>
              <el-form-item label="发车车ID" prop="departureVehicleId">
                <el-input v-model="stowageForm.departureVehicleId" placeholder="请输入发车车ID"/>
              </el-form-item>
            </ICol>
            <ICol>
              <el-form-item label="发车车编码" prop="departureVehicleCode">
                <el-input v-model="stowageForm.departureVehicleCode" placeholder="请输入发车车编码"/>
              </el-form-item>
            </ICol>
            <ICol>
              <el-form-item label="发车车牌号" prop="departureVehiclePlate">
                <el-input v-model="stowageForm.departureVehiclePlate" placeholder="请输入发车车牌号"/>
              </el-form-item>
            </ICol>
            <ICol>
              <el-form-item label="发车时间" prop="departureTime">
                <el-date-picker v-model="stowageForm.departureTime" clearable
                                placeholder="选择发车时间"
                                size="small"
                                type="date"
                                value-format="yyyy-MM-dd">
                </el-date-picker>
              </el-form-item>
            </ICol>
            <ICol>
              <el-form-item label="目的地站点名" prop="destinationName">
                <el-input v-model="stowageForm.destinationName" placeholder="请输入目的地站点名"/>
              </el-form-item>
            </ICol>
            <ICol>
              <el-form-item label="部门ID" prop="deptId">
                <el-input v-model="stowageForm.deptId" placeholder="请输入部门ID"/>
              </el-form-item>
            </ICol>
            <ICol type="full">
              <el-form-item label="备注" prop="remark">
                <el-input v-model="stowageForm.remark" placeholder="请输入备注"/>
              </el-form-item>
            </ICol>
          </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="submitForm">确 定</el-button>
          <el-button @click="cancel">取 消</el-button>
        </div>
      </el-tab-pane>
      <el-tab-pane label="路线信息" name="routeInfo">
        <routeInfoForm ref="routeInfoForm" :pKey="stowageForm.stowageId"/>
      </el-tab-pane>
      <el-tab-pane label="运单信息" name="stowageWaybillInfo">
        <stowageWaybillInfoForm ref="stowageWaybillInfoForm" :pKey="stowageForm.stowageId"/>
      </el-tab-pane>
    </el-tabs>
    <el-form label-width="100px">
      <el-form-item style="text-align: center;margin-left:-100px;margin-top:10px;">
        <el-button type="primary" @click="submitForm()">提交</el-button>
        <el-button @click="close()">返回</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
import { getWmsStowage } from '@/api/wms/WmsStowage'
import routeInfoForm from './routeInfoForm'
import stowageWaybillInfoForm from './stowageWaybillInfoForm'
import ICol from '@/components/ICol'
import { listWarehouse } from '@/api/wms/warehouse'
import { isNotEmpty } from '@/utils/utils'

export default {
  name: 'StowageEdit',
  components: {
    ICol,
    routeInfoForm,
    stowageWaybillInfoForm
  },
  computed:{
    readOnly(){
      return false;
    }
  },
  data() {
    return {
      // 选中选项卡的 name
      activeName: 'basicInfo',
      // 表格的高度
      tableHeight: document.documentElement.scrollHeight - 245 + 'px',
      // 表信息
      tables: [],
      // 表列信息
      cloumns: [],
      // 字典信息
      dictOptions: [],
      // 菜单信息
      menus: [],
      // 表详细信息
      loading:false,
      info: {},
      stowageForm: {
        stowageId:null,
      },
      stowageFormRules: {
        stowageCode: [
          { required: true, message: '配载编码不能为空', trigger: 'blur' }
        ],
        departure: [
          { required: true, message: '发出站点不能为空', trigger: 'blur' }
        ],
        departureName: [
          { required: true, message: '发出站点名不能为空', trigger: 'blur' }
        ],
        departureCode: [
          { required: true, message: '发车批次不能为空', trigger: 'blur' }
        ],
        destination: [
          { required: true, message: '目的地站点不能为空', trigger: 'blur' }
        ],
        destinationName: [
          { required: true, message: '目的地站点名不能为空', trigger: 'blur' }
        ],
      },
      departureWarehouseOptions: [],
      destinationWarehouseOptions: [],
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      const stowageId = this.$route.params && this.$route.params.stowageId
      if ( stowageId ) {
        this.loading=true;
        this.getWarehouseOptions()
        // 获取表详细信息
        getWmsStowage( stowageId ).then( ({data}) => {
          this.loading=false;
          if (isNotEmpty(data)){
            this.stowageForm=data;
          }else {
            this.$router.back();
          }
        });
      }
    },
    /** 提交按钮 */
    submitForm() {
      // const routeInfoForm = this.$refs.basicInfo.$refs.routeInfoForm
      // const stowageWaybillInfoForm = this.$refs.genInfo.$refs.stowageWaybillInfoForm
      // Promise.all( [ routeInfoForm, stowageWaybillInfoForm ].map( this.getFormPromise ) ).then( res => {
      //   const validateResult = res.every( item => !!item )
      //   if ( validateResult ) {
      //     const genTable = Object.assign( {}, routeInfoForm.model, stowageWaybillInfoForm.model )
      //     genTable.columns = this.cloumns
      //     genTable.params = {
      //       treeCode: genTable.treeCode,
      //       treeName: genTable.treeName,
      //       treeParentCode: genTable.treeParentCode,
      //       parentMenuId: genTable.parentMenuId
      //     }
      //     updateGenTable( genTable ).then( res => {
      //       this.msgSuccess( res.msg )
      //       if ( res.code === 200 ) {
      //         this.close()
      //       }
      //     } )
      //   } else {
      //     this.msgError( '表单校验未通过，请重新检查提交内容' )
      //   }
      // } )
    },
    getFormPromise( form ) {
      return new Promise( resolve => {
        form.validate( res => {
          resolve( res )
        } )
      } )
    },
    getWarehouseOptions( warehouseName = null, type = 0 ) {
      listWarehouse( {
        warehouseName,
        pageNum: 1,
        pageSize: 10
      } ).then( res => {
        if ( type === 0 ) {
          this.departureWarehouseOptions = res.rows
          this.destinationWarehouseOptions = res.rows
        } else if ( type === 1 ) {
          this.departureWarehouseOptions = res.rows
        } else if ( type === 2 ) {
          this.destinationWarehouseOptions = res.rows
        }
      } )
    },
    /** 关闭按钮 */
    close() {
      // this.$store.dispatch( 'tagsView/delView', this.$route );
      // this.$router.push( { path: '/tool/gen', query: { t: Date.now() } } );
    },
    cancel() {
      this.reset();
    },
    // 表单重置
    reset() {
      this.stowageForm = {
        stowageId: null,
        stowageCode: null,
        stowageWarehouseName: null,
        departure: null,
        departureName: null,
        departureCode: null,
        departureDriverId: null,
        departureDriverName: null,
        departureVehicleId: null,
        departureVehicleCode: null,
        departureVehiclePlate: null,
        departureTime: null,
        destination: null,
        destinationName: null,
        deptId: null,
        status: "0",
        delFlag: null,
        createBy: null,
        createTime: null,
        updateBy: null,
        updateTime: null,
        remark: null
      };
      this.resetForm("stowageForm");
    },
  },
  mounted() {
    // const el = this.$refs.dragTable.$el.querySelectorAll( '.el-table__body-wrapper > Table > tbody' )[0]
    // const sortable = Sortable.create( el, {
    //   handle: '.allowDrag',
    //   onEnd: evt => {
    //     const targetRow = this.cloumns.splice( evt.oldIndex, 1 )[0]
    //     this.cloumns.splice( evt.newIndex, 0, targetRow )
    //     for ( let index in this.cloumns ) {
    //       this.cloumns[index].sort = parseInt( index ) + 1
    //     }
    //   }
    // } )
  }
}
</script>
