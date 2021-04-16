<template>
  <div class="app-container">
    <el-card v-if="action.toolbar" :body-style="{padding:'15px'}">
      <el-row :gutter="10" class="mb8">
        <el-col :span="1.5">
          <el-button
            v-hasPermi="['wms:waybill:add']"
            icon="el-icon-plus"
            plain
            size="mini"
            v-if="!readOnly"
            type="primary"
            @click="handleAdd">
            新增
          </el-button>
        </el-col>
        <el-col :span="1.5">
          <el-button
            v-hasPermi="['wms:waybill:remove']"
            :disabled="multiple"
            icon="el-icon-delete"
            v-if="!readOnly"
            plain
            size="mini"
            type="danger"
            @click="handleDelete">
            删除
          </el-button>
        </el-col>
      </el-row>
    </el-card>
    <el-card v-if="action.tableList.base" :body-style="{padding:'15px'}">
      <el-table v-loading="loading" :data="waybillList" @selection-change="handleSelectionChange">
        <el-table-column align="center" fixed type="selection" width="55"/>
        <el-table-column align="center" fixed label="序号" prop="waybillId" type="index"/>
        <el-table-column align="center" label="运单号" prop="waybillCode" show-overflow-tooltip width="150">
          <template slot-scope="{row}">
            <Ellipsis :text="row.waybillCode"/>
          </template>
        </el-table-column>
        <el-table-column align="center" label="始发站" prop="departure" show-overflow-tooltip width="150">
          <template slot-scope="{row}">
            {{row.departureName}}
          </template>
          v
        </el-table-column>
        <el-table-column align="center" label="到达站" prop="destination" show-overflow-tooltip width="150">
          <template slot-scope="{row}">
            {{row.destinationName}}
          </template>
        </el-table-column>

        <el-table-column align="center" label="中转地" prop="transitPlace" show-overflow-tooltip width="150">
          <template slot-scope="{row}">
            {{row.transitPlace}}
          </template>
        </el-table-column>
        <el-table-column align="center" label="客户ID" prop="csrId" show-overflow-tooltip>
          <template slot-scope="{row}">
            {{row.csrId}}
          </template>
        </el-table-column>
        <el-table-column align="center" label="客户编号" prop="csrCode" show-overflow-tooltip>
          <template slot-scope="{row}">
            {{row.csrCode}}
          </template>
        </el-table-column>
        <el-table-column align="center" label="客户单号" prop="csrOrderNumber" show-overflow-tooltip>
          <template slot-scope="{row}">
            {{row.csrOrderNumber}}
          </template>
        </el-table-column>
        <el-table-column align="center" label="发货人手机" prop="consignorMobile" show-overflow-tooltip width="150">
          <template slot-scope="{row}">
            {{row.consignorMobile}}
          </template>
        </el-table-column>
        <el-table-column align="center" label="发货人座机" prop="consignorTelephone" show-overflow-tooltip
                         show-overflow-tooltip width="150">
          <template slot-scope="{row}">
            {{row.consignorTelephone}}
          </template>
        </el-table-column>
        <el-table-column align="center" label="发货联系人" prop="consignorName" show-overflow-tooltip width="150">
          <template slot-scope="{row}">
            {{row.consignorName}}
          </template>
        </el-table-column>
        <el-table-column align="center" label="发货公司名称" prop="deliverCoName" show-overflow-tooltip width="150">
          <template slot-scope="{row}">
            {{row.deliverCoName}}
          </template>
        </el-table-column>
        <el-table-column align="center" label="收货人手机" prop="consigneeMobile" show-overflow-tooltip width="150">
          <template slot-scope="{row}">
            {{row.consigneeMobile}}
          </template>
        </el-table-column>
        <el-table-column align="center" label="收货人座机" prop="consigneeTelephone" show-overflow-tooltip
                         show-overflow-tooltip width="150">
          <template slot-scope="{row}">
            {{row.consigneeTelephone}}
          </template>
        </el-table-column>
        <el-table-column align="center" label="收货联系人" prop="consigneeName" show-overflow-tooltip width="150">
          <template slot-scope="{row}">
            {{row.consigneeName}}
          </template>
        </el-table-column>
        <el-table-column align="center" label="收货公司名称" prop="receivingCoName" show-overflow-tooltip width="150">
          <template slot-scope="{row}">
            {{row.receivingCoName}}
          </template>
        </el-table-column>
        <el-table-column align="center" label="收货省" prop="receivingProvince" show-overflow-tooltip width="150">
          <template slot-scope="{row}">
            {{row.receivingProvince}}
          </template>
        </el-table-column>
        <el-table-column align="center" label="收货市" prop="receivingCity" show-overflow-tooltip width="150">
          <template slot-scope="{row}">
            {{row.receivingCity}}
          </template>
        </el-table-column>
        <el-table-column align="center" label="收货区" prop="receivingDistrict" show-overflow-tooltip width="150">
          <template slot-scope="{row}">
            {{row.receivingDistrict}}
          </template>
        </el-table-column>
        <el-table-column align="center" label="收货街道" prop="receivingStreet" show-overflow-tooltip width="150">
          <template slot-scope="{row}">
            {{row.receivingStreet}}
          </template>
        </el-table-column>
        <el-table-column align="center" label="收货详细地址" prop="receivingAddress" show-overflow-tooltip width="150">
          <template slot-scope="{row}">
            {{row.receivingAddress}}
          </template>
        </el-table-column>
        <el-table-column align="center" label="开单事业部" prop="deptId" show-overflow-tooltip width="150">
          <template slot-scope="{row}">
            {{row.deptId}}
          </template>
        </el-table-column>
        <el-table-column align="center" label="配载站点" prop="stowageId" show-overflow-tooltip width="150">
          <template slot-scope="{row}">
            {{row.stowageId}}
          </template>
        </el-table-column>
        <el-table-column align="center" label="目的网点" prop="destinationNode" show-overflow-tooltip width="150">
          <template slot-scope="{row}">
            {{row.destinationNode}}
          </template>
        </el-table-column>
        <el-table-column :formatter="handoverModeFormat" align="center" label="交接方式" prop="handoverMode" width="100"/>
        <el-table-column :formatter="transportModeFormat" align="center" label="运输方式" prop="transportMode" width="100"/>
        <el-table-column :formatter="payMethodFormat" align="center" label="付款方式" prop="payMethod" width="100"/>
        <el-table-column :formatter="receiptStatusFormat" align="center" label="回单状态" prop="receiptStatus"/>
        <el-table-column :formatter="rebateReturnedFormat" align="center" label="回扣已返" prop="rebateReturned"
                         width="100"/>
        <el-table-column :formatter="writeInvoiceFormat" align="center" label="是否开发票" prop="writeInvoice" width="100"/>
        <el-table-column align="center" label="基本运费" prop="basicFreight" show-overflow-tooltip width="150">
          <template slot-scope="{row}">
            {{row.basicFreight}}
          </template>
        </el-table-column>
        <el-table-column align="center" label="实收运费" prop="realFreight" show-overflow-tooltip width="150">
          <template slot-scope="{row}">
            {{row.realFreight}}
          </template>
        </el-table-column>
        <el-table-column align="center" label="总运费" prop="totalFreight" show-overflow-tooltip width="150">
          <template slot-scope="{row}">
            {{row.totalFreight}}
          </template>
        </el-table-column>
        <el-table-column align="center" label="送货车号" prop="deliveryVehicleId" show-overflow-tooltip width="150">
          <template slot-scope="{row}">
            {{row.deliveryVehicleId}}
          </template>
        </el-table-column>
        <el-table-column align="center" label="送货车号" prop="deliveryVehicleCode" show-overflow-tooltip width="150">
          <template slot-scope="{row}">
            {{row.deliveryVehicleCode}}
          </template>
        </el-table-column>
        <el-table-column align="center" label="送货司机" prop="deliveryDriverId" show-overflow-tooltip width="150">
          <template slot-scope="{row}">
            {{row.deliveryDriverId}}
          </template>
        </el-table-column>
        <el-table-column align="center" label="送货司机" prop="deliveryDriverName" show-overflow-tooltip width="150">
          <template slot-scope="{row}">
            {{row.deliveryDriverName}}
          </template>
        </el-table-column>
        <el-table-column align="center" label="送货时间" prop="deliveryTime" show-overflow-tooltip width="180">
          <template slot-scope="scope">
            <span>{{ parseTime( scope.row.deliveryTime, '{y}-{m}-{d}' ) }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="开单人ID" prop="drawerId" show-overflow-tooltip width="150">
          <template slot-scope="{row}">
            {{row.drawerId}}
          </template>
        </el-table-column>
        <el-table-column align="center" label="开单人" prop="drawerName" show-overflow-tooltip width="150">
          <template slot-scope="{row}">
            {{row.drawerName}}
          </template>
        </el-table-column>
        <el-table-column align="center" label="设备来源" prop="equipmentSource" show-overflow-tooltip width="150">
          <template slot-scope="{row}">
            {{row.equipmentSource}}
          </template>
        </el-table-column>
        <el-table-column align="center" label="开单来源" prop="creationSource" show-overflow-tooltip width="150">
          <template slot-scope="{row}">
            {{row.creationSource}}
          </template>
        </el-table-column>
        <el-table-column align="center" fixed="right" label="运单状态" prop="waybillStatus">
          <template slot-scope="{row}">
            <el-tag :type="waybillStatusTagFormat(row.waybillStatus)">{{waybillStatusFormat( row )}}</el-tag>
          </template>
        </el-table-column>

        <el-table-column :formatter="statusFormat" align="center" label="状态" prop="status"/>
        <el-table-column align="center" fixed="right" label="开单备注" prop="remark">
          <template slot-scope="{row}">
            {{row.remark}}
          </template>
        </el-table-column>
        <el-table-column align="center" class-name="small-padding fixed-width" fixed="right" label="操作" width="200">
          <template slot-scope="scope">
            <el-button
              v-hasPermi="['wms:waybill:edit']"
              icon="bad"
              size="mini"
              type="text"
              @click="handleDetail(scope.row)">
              <svg-icon slot="default" icon-class="eye-open"/>
              详情
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination
        v-show="total>0"
        :limit.sync="queryParams.pageSize"
        :page.sync="queryParams.pageNum"
        :total="total"
        @pagination="getList"
      />
    </el-card>
    <!-- 添加或修改运单信息主对话框 -->
    <WaybillDialog v-if="action.dialog" v-model="row" :option="dialogOption" @on-success="getList"/>
    <el-dialog :visible.sync="waybillDialog.open" append-to-body fullscreen>
      <Waybill :option="waybillOption" @on-handle-selection-change="handleSelectionChange"/>
      <template slot="footer">
        <el-button v-if="!readOnly" :disabled="loading" type="primary" @click="submit">
          <svg-icon slot="default" icon-class="transport-0"/>
          配 载
        </el-button>
        <el-button :disabled="loading" @click="cancel">关 闭</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { listWaybillByRouteId } from '@/api/wms/waybill'
import 'element-ui/lib/theme-chalk/display.css'
import ICol from '@/components/ICol'
import RegionSelect from '@/components/regionSelect/index'
import Ellipsis from '@/components/Ellipsis/index'
import { listWarehouse } from '@/api/wms/warehouse'
import WaybillDialog from '@/views/components/wms/Waybill/Dialog/index'
import BeginStowage from '@/views/components/wms/Stowage/beginStowage'
import { isNotEmpty } from '@/utils/utils'
import { delWaybillFormRoute, makeStowage } from '@/api/wms/WmsStowageMdWaybill'
import Waybill from '@/views/wms/waybill/index'

export default {
  name: 'StowageWaybill',
  components: {
    Waybill,
    BeginStowage,
    WaybillDialog,
    Ellipsis,
    RegionSelect,
    ICol,
  },
  props: {
    pKey: {
      type: String,
    },
    viewType:{
      type:Number
    }
  },
  watch: {
    pKey: {
      handler( val ) {
        if ( val !== this.routeId ) {
          this.routeId = val
          if ( isNotEmpty( this.routeId ) ) {
            this.init()
          }
        }
      },
      immediate: true
    },
  },
  computed: {
    readOnly() {
      console.log(this.viewType)
      return this.viewType >=1
    },
    action() {
      const componentOption = this.componentOption
      const obj = {
        searchForm: true,
        toolbar: true,
        tableList: {
          base: true,
          action: true,
        },
        dialog: true
      }
      switch ( +componentOption.action ) {
        case 0:
          break
        case 1:
          obj.searchForm = false
          obj.toolbar = false
          obj.dialog = false
          obj.tableList.action = false
          break
        case 2:
          break
        default:
          break
      }
      return obj
    },
  },
  data() {
    return {
      routeId: null,
      componentOption: {
        action: 0,
      },
      grid: {
        gutter: 24,
        xs: 24,
        sm: 24,
        md: 12,
        lg: 6,
        xl: 6
      },
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      departureWarehouseOptions: [],
      destinationWarehouseOptions: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 运单信息主表格数据
      waybillList: [],
      // 弹出层标题
      // 是否显示弹出层
      row: {},
      dialogOption: {
        open: false,
        type: 0,
      },
      beginStowageDialogOption: {
        open: false,
        type: 0,
      },
      // 交接方式字典
      handoverModeOptions: [],
      // 运输方式字典
      transportModeOptions: [],
      // 付款方式字典
      payMethodOptions: [],
      // 回单状态字典
      receiptStatusOptions: [],
      // 回扣已返字典
      rebateReturnedOptions: [],
      // 是否开发票字典
      writeInvoiceOptions: [],
      // 运单状态字典
      waybillStatusOptions: [],
      // 状态字典
      statusOptions: [],
      // 创建时间时间范围
      daterangeCreateTime: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        waybillCode: null,
        departure: null,
        destination: null,
        transitPlace: null,
        csrId: null,
        csrCode: null,
        csrOrderNumber: null,
        consignorMobile: null,
        consignorTelephone: null,
        consignorName: null,
        deliverCoName: null,
        consigneeMobile: null,
        consigneeTelephone: null,
        consigneeName: null,
        receivingCoName: null,
        receivingProvince: null,
        receivingCity: null,
        receivingDistrict: null,
        receivingStreet: null,
        receivingAddress: null,
        deptId: null,
        stowageId: null,
        destinationNode: null,
        handoverMode: null,
        transportMode: null,
        payMethod: null,
        receiptStatus: null,
        rebateReturned: null,
        writeInvoice: null,
        basicFreight: null,
        realFreight: null,
        totalFreight: null,
        deliveryVehicleId: null,
        deliveryVehicleCode: null,
        deliveryDriverId: null,
        deliveryDriverName: null,
        deliveryTime: null,
        drawerId: null,
        drawerName: null,
        equipmentSource: null,
        creationSource: null,
        waybillStatus: null,
        status: null,
        createTime: null,
      },
      // 表单参数
      form: {
        deliverEntity: {},
        receivingEntity: {},
        provinceCityDistrictStreet: null
      },
      // 表单校验
      toggleSearchFormValue: 0,
      waybillDialog: {
        open: false,
      },
      waybillOption: {
        pKey: null,
        action: 1
      },
      waybillIds: [],
    }
  },
  methods: {
    init() {
      if ( isNotEmpty( this.routeId ) && this.routeId > 0 ) {
        this.getList()
        this.getDictMethods()
        this.getWarehouseOptions( null, 0 )
      }
    },
    /** 查询运单信息主列表 */
    getList() {
      this.loading = true
      listWaybillByRouteId( this.routeId ).then( response => {
        this.waybillList = response.rows
        this.total = response.total
        this.loading = false
      } )
    },
    getDictMethods() {
      this.getDicts( 'wms_waybill_handover_mode' ).then( response => {
        this.handoverModeOptions = response.data
      } )
      this.getDicts( 'wms_waybill_transport_mode' ).then( response => {
        this.transportModeOptions = response.data
      } )
      this.getDicts( 'wms_waybill_pay_method' ).then( response => {
        this.payMethodOptions = response.data
      } )
      this.getDicts( 'wms_waybill_receipt_status' ).then( response => {
        this.receiptStatusOptions = response.data
      } )
      this.getDicts( 'public_common_yes_no' ).then( response => {
        this.rebateReturnedOptions = response.data
        this.writeInvoiceOptions = response.data
      } )
      this.getDicts( 'wms_waybill_status' ).then( response => {
        this.waybillStatusOptions = response.data
      } )
      this.getDicts( 'sys_common_status' ).then( response => {
        this.statusOptions = response.data
      } )
    },
    getWarehouseOptions( warehouseName, type ) {
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
    // 交接方式字典翻译
    handoverModeFormat( row, column ) {
      return this.selectDictLabel( this.handoverModeOptions, row.handoverMode )
    },
    // 运输方式字典翻译
    transportModeFormat( row, column ) {
      return this.selectDictLabel( this.transportModeOptions, row.transportMode )
    },
    // 付款方式字典翻译
    payMethodFormat( row, column ) {
      return this.selectDictLabel( this.payMethodOptions, row.payMethod )
    },
    // 回单状态字典翻译
    receiptStatusFormat( row, column ) {
      return this.selectDictLabel( this.receiptStatusOptions, row.receiptStatus )
    },
    // 回扣已返字典翻译
    rebateReturnedFormat( row, column ) {
      return this.selectDictLabel( this.rebateReturnedOptions, row.rebateReturned )
    },
    // 是否开发票字典翻译
    writeInvoiceFormat( row, column ) {
      return this.selectDictLabel( this.writeInvoiceOptions, row.writeInvoice )
    },
    // 运单状态字典翻译
    waybillStatusFormat( row, column ) {
      return this.selectDictLabel( this.waybillStatusOptions, row.waybillStatus )
    },
    waybillStatusTagFormat( waybillStatus ) {
      if ( waybillStatus == -1 ) {
        return 'info'
      }
      if ( waybillStatus >= 0 && waybillStatus <= 2 ) {
        return 'warning'
      }
      if ( waybillStatus >= 3 && waybillStatus <= 5 ) {
        return null
      }
      if ( waybillStatus >= 6 && waybillStatus <= 8 ) {
        return 'success'
      }
      if ( waybillStatus > 8 ) {
        return 'danger'
      }
    },

    toggleSearchForm( toggle ) {
      if ( toggle >= 0 ) {
        this.toggleSearchFormValue = toggle
      }
    },
    // 状态字典翻译
    statusFormat( row, column ) {
      return this.selectDictLabel( this.statusOptions, row.status )
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1
      this.getList()
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.daterangeCreateTime = []
      this.resetForm( 'queryForm' )
      this.handleQuery()
    },
    // 多选框选中数据
    handleSelectionChange( selection ) {
      this.waybillIds = selection.ids
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.row = {}
      this.waybillDialog.open = true
      // this.waybillDialog.type = 0
    },
    /** 修改按钮操作 */
    handleUpdate( row ) {
      this.row = row
      this.dialogOption = {}
      this.dialogOption.open = true
      this.dialogOption.type = 1
    },
    handleDetail( row ) {
      this.row = row
      this.dialogOption = {}
      this.dialogOption.open = true
      this.dialogOption.type = 2
    },
    /** 删除按钮操作 */
    handleDelete( row ) {
      const waybillIds = row.waybillId || this.ids
      this.$confirm( '是否确认删除运单信息主编号为"' + waybillIds + '"的数据项?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      } ).then( function () {
        return delWaybillFormRoute( waybillIds )
      } ).then( () => {
        this.getList()
        this.msgSuccess( '删除成功' )
      } )
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download( 'wms/waybill/export', {
        ...this.queryParams
      }, `wms_waybill.xlsx` )
    },
    /** 配载按钮点击 */
    handleStowage() {
      this.beginStowageDialogOption = {}
      this.beginStowageDialogOption.type = 0
      this.beginStowageDialogOption.open = true
    },
    completeBeginStowage() {
      this.$router.replace( { name: 'WmsStowage', params: { 'stowageId': '10000' } } )
    },
    updateRegionSelectValue( data, label, status ) {
      const form = this.form
      this.form.regionSelectValue = data
      this.form.regionSelectStatus = status
      if ( status ) {
        this.form.receivingProvince = data.provinceCode
        this.form.receivingCity = data.cityCode
        this.form.receivingDistrict = data.districtCode
        this.form.receivingStreet = data.streetCode
        if ( this.dialog.type == 0 )
          this.form.receivingAddress = label.split( '-' ).join( '' ) + this.form.receivingAddress
      } else {
        form.provinceCityDistrictStreet = ''
      }
    },
    submit() {
      const waybillIds = this.waybillIds
      console.log(waybillIds);
      if ( waybillIds.length > 0 ) {
        makeStowage(this.routeId,waybillIds).then((res)=>{
          this.waybillDialog.open = false;
          this.init();
        });
      }
    },
    cancel() {
      this.waybillDialog.open = false;
    },
  },
}
</script>
<style scoped>
.dialog_title {
  display: flex;
  justify-content: space-between;
}

.dialog_title_plus {
  width: 25%;
  padding-right: 30px;
}

/deep/ .el-form-item {
  margin-bottom: 0;
  padding-right: 1px;
  padding-left: 1px;
}

.select-width {
  width: 100%;
}
</style>
