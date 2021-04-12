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
            <el-form-item label="线路ID" prop="routeId">
              <el-input
                v-model="queryParams.routeId"
                clearable
                placeholder="请输入线路ID"
                size="small"
                @keyup.enter.native="handleQuery"
              />
            </el-form-item>
          </ICol>
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
            <el-form-item label="运单ID" prop="waybillId">
              <el-input
                v-model="queryParams.waybillId"
                clearable
                placeholder="请输入运单ID"
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
    <el-card :body-style="{padding:'15px'}">
      <el-row :gutter="10" class="mb8">
        <el-col :span="1.5">
          <el-button
            v-hasPermi="['wms:WmsStowageMdWaybill:add']"
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
            v-hasPermi="['wms:WmsStowageMdWaybill:edit']"
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
            v-hasPermi="['wms:WmsStowageMdWaybill:remove']"
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
            v-hasPermi="['wms:WmsStowageMdWaybill:export']"
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
    <el-card :body-style="{padding:'15px'}">
      <el-table v-loading="loading" :data="WmsStowageMdWaybillList" @selection-change="handleSelectionChange">
        <el-table-column align="center" fixed type="selection" width="55"/>
        <el-table-column align="center" fixed label="序号" type="index" width="60"/>
        <el-table-column align="center" label="线路ID" prop="routeId" show-overflow-tooltip width="150">
          <template slot-scope="{row}">
            {{row.routeId}}
          </template>
        </el-table-column>
        <el-table-column align="center" label="配载ID" prop="stowageId" show-overflow-tooltip width="150">
          <template slot-scope="{row}">
            {{row.stowageId}}
          </template>
        </el-table-column>
        <el-table-column align="center" label="运单ID" prop="waybillId" show-overflow-tooltip width="150">
          <template slot-scope="{row}">
            {{row.waybillId}}
          </template>
        </el-table-column>
        <el-table-column align="center" class-name="small-padding fixed-width" fixed="right" label="操作" width="200">
          <template slot-scope="scope">
            <el-button
              v-hasPermi="['wms:WmsStowageMdWaybill:edit']"
              icon="el-icon-edit"
              size="mini"
              type="text"
              @click="handleUpdate(scope.row)"
            >修改
            </el-button>
            <el-button
              v-hasPermi="['wms:WmsStowageMdWaybill:remove']"
              icon="el-icon-delete"
              size="mini"
              type="text"
              @click="handleDelete(scope.row)"
            >删除
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
    <!-- 添加或修改配载运单中间关联对话框 -->
    <el-dialog :title="title" :visible.sync="open" append-to-body fullscreen>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-row :gutter="24">
          <ICol>
            <el-form-item label="线路ID" prop="routeId">
              <el-input v-model="form.routeId" placeholder="请输入线路ID"/>
            </el-form-item>
          </ICol>
          <ICol>
            <el-form-item label="配载ID" prop="stowageId">
              <el-input v-model="form.stowageId" placeholder="请输入配载ID"/>
            </el-form-item>
          </ICol>
          <ICol>
            <el-form-item label="运单ID" prop="waybillId">
              <el-input v-model="form.waybillId" placeholder="请输入运单ID"/>
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
  addWmsStowageMdWaybill,
  delWmsStowageMdWaybill,
  getWmsStowageMdWaybill,
  listWmsStowageMdWaybill,
  updateWmsStowageMdWaybill
} from '@/api/wms/WmsStowageMdWaybill'
import ICol from '@/components/ICol'
import { isNotEmpty } from '@/utils/utils'

export default {
  name: 'WmsStowageMdWaybill',
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
          if (isNotEmpty(this.stowageId)) {
            this.init();
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
      // 配载运单中间关联表格数据
      WmsStowageMdWaybillList: [],
      // 弹出层标题
      title: '',
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        routeId: null,
        stowageId: null,
        waybillId: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        routeId: [
          { required: true, message: '线路ID不能为空', trigger: 'blur' }
        ],
        stowageId: [
          { required: true, message: '配载ID不能为空', trigger: 'blur' }
        ],
        waybillId: [
          { required: true, message: '运单ID不能为空', trigger: 'blur' }
        ]
      },
      toggleSearchFormValue: 0,
    }
  },
  methods: {
    init() {
      this.getList()
    },
    /** 查询配载运单中间关联列表 */
    getList() {
      this.loading = true
      listWmsStowageMdWaybill( {
        stowageId:this.stowageId
      }).then( response => {
        this.WmsStowageMdWaybillList = response.rows
        this.total = response.total
        this.loading = false
      } )
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
        waybillId: null
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
    /** 新增按钮操作 */
    handleAdd() {
      this.reset()
      this.open = true
      this.title = '添加配载运单中间关联'
    },
    /** 修改按钮操作 */
    handleUpdate( row ) {
      this.reset()
      const routeId = row.routeId || this.ids
      getWmsStowageMdWaybill( routeId ).then( response => {
        this.form = response.data
        this.open = true
        this.title = '修改配载运单中间关联'
      } )
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs['form'].validate( valid => {
        if ( valid ) {
          if ( this.form.routeId != null ) {
            updateWmsStowageMdWaybill( this.form ).then( response => {
              this.msgSuccess( '修改成功' )
              this.open = false
              this.getList()
            } )
          } else {
            addWmsStowageMdWaybill( this.form ).then( response => {
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
      this.$confirm( '是否确认删除配载运单中间关联编号为"' + routeIds + '"的数据项?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      } ).then( function () {
        return delWmsStowageMdWaybill( routeIds )
      } ).then( () => {
        this.getList()
        this.msgSuccess( '删除成功' )
      } )
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download( 'wms/WmsStowageMdWaybill/export', {
        ...this.queryParams
      }, `wms_WmsStowageMdWaybill.xlsx` )
    },
    toggleSearchForm( toggle ) {
      if ( toggle >= 0 ) {
        this.toggleSearchFormValue = toggle
      }
    },

  }
}
</script>
