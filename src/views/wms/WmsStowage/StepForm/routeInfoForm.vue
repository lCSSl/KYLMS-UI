<template>
  <div class="app-container">
    <template>
      <baidu-map center="广东" class="map">
        <bm-scale anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-scale>
        <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
        <bm-city-list anchor="BMAP_ANCHOR_TOP_LEFT"></bm-city-list>
        <bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :showAddressBar="true" :autoLocation="true"></bm-geolocation>
        <bml-curve-line :points="points" :editing="true" @lineupdate="update"></bml-curve-line>
      </baidu-map>
    </template>
    <el-card :body-style="{padding:'15px'}">
      <template>
        <div slot="header" class="radio">
          排序：
          <el-radio-group v-model="reverse">
            <el-radio :label="false">正序</el-radio>
            <el-radio :label="true">倒序</el-radio>
          </el-radio-group>
        </div>
        <el-timeline :reverse="reverse">
          <el-timeline-item v-for="(item,index) in WmsStowageRouteList"
                            :key="index"
                            :timestamp="''+item.routeSort"
                            :type="item.routeStatus==='-1'?'danger':(item.routeStatus==='0'?'info':(item.routeStatus==='1'?'success':'warn'))"
                            hide-timestamp
                            placement="top">
            <el-card>
              <el-row>
                <ICol>{{item.stowageWarehouseName}}</ICol>
                <ICol>=</ICol>
                <ICol>=</ICol>
                <ICol>
                  <el-button
                    v-if="!(item.routeSort===0)"
                    v-hasPermi="['wms:WmsStowageRoute:edit']"
                    icon="el-icon-view"
                    size="mini"
                    type="text"
                    @click="handleChangeTabToWaybillList(item)">
                    查看运单
                  </el-button>
                  <el-button
                    v-if="!(item.routeSort===127)&&!readOnly"
                    v-hasPermi="['wms:WmsStowageRoute:edit']"
                    icon="el-icon-plus"
                    size="mini"
                    type="text"
                    @click="handleAdd(item)">
                    添加
                  </el-button>
                  <el-button
                    v-if="!(item.routeSort===0||item.routeSort===127)&&!readOnly"
                    v-hasPermi="['wms:WmsStowageRoute:edit']"
                    icon="el-icon-edit"
                    size="mini"
                    type="text"
                    @click="handleUpdate(item)">
                    修改
                  </el-button>
                  <el-button
                    v-if="!(item.routeSort===0||item.routeSort===127)&&!readOnly"
                    v-hasPermi="['wms:WmsStowageRoute:remove']"
                    icon="el-icon-delete"
                    size="mini"
                    type="text"
                    @click="handleDelete(item)">
                    删除
                  </el-button>
                </ICol>
              </el-row>
            </el-card>
          </el-timeline-item>
        </el-timeline>
      </template>
    </el-card>
    <!-- 添加或修改运单配载线路对话框 -->
    <el-dialog :title="title" :visible.sync="open" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-row :gutter="24">
          <ICol type="half">
            <el-form-item label="配载站点" prop="stowageWarehouseId">
              <el-select
                v-model="form.stowageWarehouseId" :disabled="loading" :loading="loading"
                :remote-method="(keyword)=>getWarehouseOptions(keyword)"
                class="common-select-width" filterable remote reserve-keyword>
                <el-option
                  v-for="warehouse in warehouseOptions"
                  :key="warehouse.warehouseId"
                  :label="warehouse.warehouseName"
                  :value="warehouse.warehouseId"
                />
              </el-select>
            </el-form-item>
          </ICol>
          <ICol type="half">
            <el-form-item label="备注" prop="remark">
              <el-input v-model="form.remark" placeholder="请输入备注"/>
            </el-form-item>
          </ICol>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  addWmsStowageRoute,
  delWmsStowageRoute,
  listWmsStowageRoute,
  updateWmsStowageRoute
} from '@/api/wms/WmsStowageRoute'
import ICol from '@/components/ICol'
import { listWarehouse } from '@/api/wms/warehouse'
import { cloneDeep } from 'lodash'
import { BmlCurveLine } from 'vue-baidu-map'
import { isNotEmpty } from '@/utils/utils'

export default {
  name: 'WmsStowageRoute',
  components: {
    BmlCurveLine,
    ICol,
  },
  props: {
    pKey: {
      type: String,
    },
    viewType: {
      type: Number
    },
  },
  watch: {
    pKey: {
      handler( val ) {
        if ( val !== this.stowageId ) {
          this.stowageId = val
          if ( isNotEmpty( this.stowageId ) ) {
            this.init()
          }
        }
      },
      immediate: true
    },
  },
  computed: {
    readOnly() {
      return this.viewType >= 1
    },
  },
  data() {
    return {
      action: false,
      stowageId: null,
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
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 运单配载线路表格数据
      WmsStowageRouteList: [],
      reverse: false,
      // 弹出层标题
      title: '',
      // 是否显示弹出层
      open: false,
      // 状态字典
      statusOptions: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        stowageId: null,
        stowageWarehouseId: null,
        stowageWarehouseName: null,
      },
      // 表单参数
      form: {},
      warehouseOptions: [],
      // 表单校验
      rules: {
        stowageId: [
          { required: true, message: '配载ID不能为空', trigger: 'blur' }
        ],
        stowageWarehouseId: [
          { required: true, message: '配载站点ID不能为空', trigger: 'blur' }
        ],
        stowageWarehouseName: [
          { required: true, message: '配载站点名不能为空', trigger: 'blur' }
        ],
      },
      toggleSearchFormValue: 0,
      points: [
        {lng: 113.360702, lat: 23.291494},
        {lng: 117.674233, lat: 24.489312},
        {lng: 118.105896, lat: 24.538735}
      ],
    }
  },
  methods: {
    update (e) {
      this.points = e.target.cornerPoints
    },
    /** 查询运单配载线路列表 */
    getList() {
      this.loading = true
      listWmsStowageRoute( {
        stowageId: this.stowageId
      } ).then( response => {
        this.reset()
        this.WmsStowageRouteList = response.rows
        this.total = response.total
        this.loading = false
      } )
    },
    // 状态字典翻译
    statusFormat( row, column ) {
      return this.selectDictLabel( this.statusOptions, row.status )
    },
    // 取消按钮
    cancel() {
      this.open = false
      this.reset()
    },
    // 表单重置
    reset() {
      this.form = {
        routeId: null,
        stowageId: null,
        stowageWarehouseId: null,
        stowageWarehouseName: null,
        status: '0',
        delFlag: null,
        createBy: null,
        createTime: null,
        updateBy: null,
        updateTime: null,
        remark: null
      }
      this.resetForm( 'form' )
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1
      this.getList()
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm( 'queryForm' )
      this.handleQuery()
    },
    // 多选框选中数据
    handleSelectionChange( selection ) {
      this.ids = selection.map( item => item.routeId )
      this.single = selection.length !== 1
      this.multiple = !selection.length
    },
    handleChangeTabToWaybillList( item ) {
      this.$emit( 'on-change-tab', 'stowageWaybillInfo', item )
    },
    /** 新增按钮操作 */
    handleAdd( row ) {
      this.reset()
      this.form.params = { prevRoute: row }
      this.form.stowageId = this.stowageId
      this.open = true
      this.title = '添加运单配载线路'
    },
    /** 修改按钮操作 */
    handleUpdate( row ) {
      this.reset()
      // const routeId = row.routeId || this.ids
      this.form = row
      // getWmsStowageRoute( routeId ).then( response => {
      //   this.form = response.data
      this.open = true
      this.title = '修改运单配载线路'
      // } )
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs['form'].validate( valid => {
        if ( valid ) {
          const form = cloneDeep( this.form )
          const warehouseName = this.warehouseOptions.find( i => i.warehouseId === form.stowageWarehouseId )
          form.stowageWarehouseName = warehouseName.warehouseName
          if ( form.routeId != null ) {
            updateWmsStowageRoute( form ).then( response => {
              this.msgSuccess( '修改成功' )
              this.open = false
              this.getList()
            } )
          } else {
            addWmsStowageRoute( form ).then( response => {
              this.msgSuccess( '新增成功' )
              this.open = false
              this.getList()
            } )
          }
        }
      } )
    },
    /** 删除按钮操作 */
    handleDelete( row ) {
      const routeIds = row.routeId || this.ids
      this.$confirm( '是否确认删除运单配载线路编号为"' + routeIds + '"的数据项?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      } ).then( function () {
        return delWmsStowageRoute( routeIds )
      } ).then( () => {
        this.getList()
        this.msgSuccess( '删除成功' )
      } )
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download( 'wms/WmsStowageRoute/export', {
        ...this.queryParams
      }, `wms_WmsStowageRoute.xlsx` )
    },
    toggleSearchForm( toggle ) {
      if ( toggle >= 0 ) {
        this.toggleSearchFormValue = toggle
      }
    },
    getWarehouseOptions( warehouseName = null ) {
      this.loading = true
      listWarehouse( {
        warehouseName,
        pageNum: 1,
        pageSize: 10
      } ).then( res => {
        this.warehouseOptions = res.rows
        this.loading = false
      } )
    },
    init() {
      this.getList()
      this.getWarehouseOptions()
      this.getDicts( 'sys_common_status' ).then( response => {
        this.statusOptions = response.data
      } )
    },
  },
}
</script>

<style scoped>
.map {
  width: 100%;
  height: 400px;
}
</style>
