<template>
  <div class="app-container">
    <!--
    <el-card :body-style="{padding:'15px'}">
      <div slot="header" class="clearfix hidden-sm-and-down">
        <el-button style="float: right;" type="text">
          <span v-if="toggleSearchFormValue===0" @click="()=>toggleSearchForm(1)">
            展开
          </span>
          <span v-else-if="toggleSearchFormValue===1" @click="()=>toggleSearchForm(2)">
            更多
          </span>
          <span v-if="toggleSearchFormValue!==0" @click="()=>toggleSearchForm(0)">
            收起
          </span>
        </el-button>
      </div>
      <template v-if="toggleSearchFormValue>=1"></template>
      <template v-if="toggleSearchFormValue>=2"></template>
      <el-form v-show="showSearch" ref="queryForm" :model="queryParams" label-position="left" label-width="100px">
        <el-row :gutter="24">
          <ICol>
            <el-form-item label="配载ID" prop="stowageId">
              <el-input
                v-model="queryParams.stowageId"
                clearable
                placeholder="请输入配载ID"
                size="small"
                @keyup.enter.native="handleQuery"
              />
            </el-form-item>
          </ICol>
          <ICol>
            <el-form-item label="配载站点ID" prop="stowageWarehouseId">
              <el-input
                v-model="queryParams.stowageWarehouseId"
                clearable
                placeholder="请输入配载站点ID"
                size="small"
                @keyup.enter.native="handleQuery"
              />
            </el-form-item>
          </ICol>
          <ICol>
            <el-form-item label="配载站点名" prop="stowageWarehouseName">
              <el-input
                v-model="queryParams.stowageWarehouseName"
                clearable
                placeholder="请输入配载站点名"
                size="small"
                @keyup.enter.native="handleQuery"
              />
            </el-form-item>
          </ICol>
        </el-row>
        <el-row>
          <ICol type="search">
            <el-form-item>
              <el-button icon="el-icon-search" size="mini" type="primary" @click="handleQuery">搜索</el-button>
              <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
            </el-form-item>
          </ICol>
        </el-row>
      </el-form>
    </el-card>
    -->
    <!--
    <el-card :body-style="{padding:'15px'}">
      <el-row :gutter="10" class="mb8">
        <el-col :span="1.5">
          <el-button
            v-hasPermi="['wms:WmsStowageRoute:add']"
            icon="el-icon-plus"
            plain
            size="mini"
            type="primary"
            @click="handleAdd"
          >新增
          </el-button>
        </el-col>
        <el-col :span="1.5">
          <el-button
            v-hasPermi="['wms:WmsStowageRoute:edit']"
            :disabled="single"
            icon="el-icon-edit"
            plain
            size="mini"
            type="success"
            @click="handleUpdate"
          >修改
          </el-button>
        </el-col>
        <el-col :span="1.5">
          <el-button
            v-hasPermi="['wms:WmsStowageRoute:remove']"
            :disabled="multiple"
            icon="el-icon-delete"
            plain
            size="mini"
            type="danger"
            @click="handleDelete"
          >删除
          </el-button>
        </el-col>
        <el-col :span="1.5">
          <el-button
            v-hasPermi="['wms:WmsStowageRoute:export']"
            icon="el-icon-download"
            plain
            size="mini"
            type="warning"
            @click="handleExport"
          >导出
          </el-button>
        </el-col>
        <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
      </el-row>
    </el-card>
    -->
    <el-card :body-style="{padding:'15px'}">
      <!--
      <el-table v-loading="loading" :data="WmsStowageRouteList" @selection-change="handleSelectionChange">
        <el-table-column align="center" fixed type="selection" width="55"/>
        <el-table-column align="center" fixed label="序号" type="index" width="60"/>
        <el-table-column align="center" label="ID" prop="routeId" show-overflow-tooltip width="150">
          <template slot-scope="{row}">
            {{row.routeId}}
          </template>
        </el-table-column>
        <el-table-column align="center" label="配载ID" prop="stowageId" show-overflow-tooltip width="150">
          <template slot-scope="{row}">
            {{row.stowageId}}
          </template>
        </el-table-column>
        <el-table-column align="center" label="配载站点ID" prop="stowageWarehouseId" show-overflow-tooltip width="150">
          <template slot-scope="{row}">
            {{row.stowageWarehouseId}}
          </template>
        </el-table-column>
        <el-table-column align="center" label="配载站点名" prop="stowageWarehouseName" show-overflow-tooltip width="150">
          <template slot-scope="{row}">
            {{row.stowageWarehouseName}}
          </template>
        </el-table-column>
        <el-table-column :formatter="statusFormat" align="center" label="状态" prop="status" show-overflow-tooltip
                         width="150"/>
        <el-table-column align="center" label="备注" prop="remark" show-overflow-tooltip width="150">
          <template slot-scope="{row}">
            {{row.remark}}
          </template>
        </el-table-column>
        <el-table-column align="center" class-name="small-padding fixed-width" fixed="right" label="操作" width="200">
          <template slot-scope="scope">
            <el-button
              v-hasPermi="['wms:WmsStowageRoute:edit']"
              icon="el-icon-edit"
              size="mini"
              type="text"
              @click="handleUpdate(scope.row)"
            >修改
            </el-button>
            <el-button
              v-hasPermi="['wms:WmsStowageRoute:remove']"
              icon="el-icon-delete"
              size="mini"
              type="text"
              @click="handleDelete(scope.row)"
            >删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      -->
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
                    v-if="!(item.routeSort===127)"
                    v-hasPermi="['wms:WmsStowageRoute:edit']"
                    icon="el-icon-plus"
                    size="mini"
                    type="text"
                    @click="handleAdd(item)">
                    添加
                  </el-button>
                  <el-button
                    v-if="!(item.routeSort===0||item.routeSort===127)"
                    v-hasPermi="['wms:WmsStowageRoute:edit']"
                    icon="el-icon-edit"
                    size="mini"
                    type="text"
                    @click="handleUpdate(item)">
                    修改
                  </el-button>
                  <el-button
                    v-if="!(item.routeSort===0||item.routeSort===127)"
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
      <!--
      <pagination
        v-show="total>0"
        :limit.sync="queryParams.pageSize"
        :page.sync="queryParams.pageNum"
        :total="total"
        @pagination="getList"/>
       -->
    </el-card>
    <!-- 添加或修改运单配载线路对话框 -->
    <el-dialog :title="title" :visible.sync="open" append-to-body >
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-row :gutter="24">
          <!--
          <ICol>
            <el-form-item label="配载ID" prop="stowageId">
              <el-input v-model="form.stowageId" placeholder="请输入配载ID"/>
            </el-form-item>
          </ICol>
          <ICol>
            <el-form-item label="配载站点名" prop="stowageWarehouseName">
              <el-input v-model="form.stowageWarehouseName" placeholder="请输入配载站点名"/>
            </el-form-item>
          </ICol>
          -->
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
import { isNotEmpty } from '@/utils/utils'
import { listWarehouse } from '@/api/wms/warehouse'
import { cloneDeep } from 'lodash'

export default {
  name: 'WmsStowageRoute',
  components: {
    ICol,
  },
  props: {
    pKey: {
      type: String,
    }
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
  computed: {},
  data() {
    return {
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
    }
  },
  methods: {
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
    handleChangeTabToWaybillList(item){
      this.$emit('on-change-tab','stowageWaybillInfo',item);
    },
    /** 新增按钮操作 */
    handleAdd(row) {
      this.reset()
      this.form.params = {prevRoute:row};
      this.form.stowageId = this.stowageId;
      this.open = true
      this.title = '添加运单配载线路'
    },
    /** 修改按钮操作 */
    handleUpdate( row ) {
      this.reset()
      // const routeId = row.routeId || this.ids
      this.form = row;
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
    getWarehouseOptions( warehouseName = null) {
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
      this.getWarehouseOptions();
      this.getDicts( 'sys_common_status' ).then( response => {
        this.statusOptions = response.data
      } )
    },
  },
}
</script>
