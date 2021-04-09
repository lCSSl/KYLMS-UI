<template>
  <div class="app-container">
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
    <el-form :model="queryParams" ref="queryForm" v-show="showSearch" label-position="left" label-width="100px" >
      <el-row :gutter="24">
    <ICol>
      <el-form-item label="配载ID" prop="stowageId">
        <el-input
          v-model="queryParams.stowageId"
          placeholder="请输入配载ID"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
    </ICol>
    <ICol>
      <el-form-item label="配载站点ID" prop="stowageWarehouseId">
        <el-input
          v-model="queryParams.stowageWarehouseId"
          placeholder="请输入配载站点ID"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
    </ICol>
    <ICol>
      <el-form-item label="配载站点名" prop="stowageWarehouseName">
        <el-input
          v-model="queryParams.stowageWarehouseName"
          placeholder="请输入配载站点名"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
    </ICol>
      </el-row>
      <el-row>
          <ICol type="search">
            <el-form-item>
              <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
              <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
            </el-form-item>
          </ICol>
      </el-row>
    </el-form>
    </el-card>
    <el-card :body-style="{padding:'15px'}">
    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['wms:WmsStowageRoute:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['wms:WmsStowageRoute:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['wms:WmsStowageRoute:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['wms:WmsStowageRoute:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>
    </el-card>
    <el-card :body-style="{padding:'15px'}">
    <el-table v-loading="loading" :data="WmsStowageRouteList" @selection-change="handleSelectionChange">
      <el-table-column align="center" fixed type="selection" width="55"/>
      <el-table-column align="center" fixed label="序号" type="index" width="60"/>
              <el-table-column label="ID" show-overflow-tooltip width="150" align="center" prop="routeId" >
        <template slot-scope="{row}">
          {{row.routeId}}
        </template>
      </el-table-column>
      <el-table-column label="配载ID" show-overflow-tooltip width="150" align="center" prop="stowageId" >
        <template slot-scope="{row}">
          {{row.stowageId}}
        </template>
      </el-table-column>
      <el-table-column label="配载站点ID" show-overflow-tooltip width="150" align="center" prop="stowageWarehouseId" >
        <template slot-scope="{row}">
          {{row.stowageWarehouseId}}
        </template>
      </el-table-column>
      <el-table-column label="配载站点名" show-overflow-tooltip width="150" align="center" prop="stowageWarehouseName" >
        <template slot-scope="{row}">
          {{row.stowageWarehouseName}}
        </template>
      </el-table-column>
      <el-table-column label="状态" show-overflow-tooltip width="150" align="center" prop="status" :formatter="statusFormat" />
      <el-table-column label="备注" show-overflow-tooltip width="150" align="center" prop="remark" >
        <template slot-scope="{row}">
          {{row.remark}}
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" fixed="right" width="200" class-name="small-padding fixed-width">
         <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['wms:WmsStowageRoute:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['wms:WmsStowageRoute:remove']"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />
    </el-card>
    <!-- 添加或修改运单配载线路对话框 -->
    <el-dialog :title="title" fullscreen :visible.sync="open" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-row :gutter="24">
      <ICol>
        <el-form-item label="配载ID" prop="stowageId">
          <el-input v-model="form.stowageId" placeholder="请输入配载ID" />
        </el-form-item>
      </ICol>
      <ICol>
        <el-form-item label="配载站点ID" prop="stowageWarehouseId">
          <el-input v-model="form.stowageWarehouseId" placeholder="请输入配载站点ID" />
        </el-form-item>
      </ICol>
      <ICol>
        <el-form-item label="配载站点名" prop="stowageWarehouseName">
          <el-input v-model="form.stowageWarehouseName" placeholder="请输入配载站点名" />
        </el-form-item>
      </ICol>
      <ICol>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="form.remark" placeholder="请输入备注" />
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
import { listWmsStowageRoute, getWmsStowageRoute, delWmsStowageRoute, addWmsStowageRoute, updateWmsStowageRoute } from "@/api/wms/WmsStowageRoute";
import ICol from "@/components/ICol";
export default {
  name: "WmsStowageRoute",
  components: {
    ICol,
  },
  data() {
    return {
      grid: {
        gutter:24,
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
      // 弹出层标题
      title: "",
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
      // 表单校验
      rules: {
        stowageId: [
          { required: true, message: "配载ID不能为空", trigger: "blur" }
        ],
        stowageWarehouseId: [
          { required: true, message: "配载站点ID不能为空", trigger: "blur" }
        ],
        stowageWarehouseName: [
          { required: true, message: "配载站点名不能为空", trigger: "blur" }
        ],
      },
    toggleSearchFormValue:0,
    };
  },
  created() {
    this.getList();
    this.getDicts("sys_common_status").then(response => {
      this.statusOptions = response.data;
    });
  },
  methods: {
    /** 查询运单配载线路列表 */
    getList() {
      this.loading = true;
      listWmsStowageRoute(this.queryParams).then(response => {
        this.WmsStowageRouteList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 状态字典翻译
    statusFormat(row, column) {
      return this.selectDictLabel(this.statusOptions, row.status);
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        routeId: null,
        stowageId: null,
        stowageWarehouseId: null,
        stowageWarehouseName: null,
        status: "0",
        delFlag: null,
        createBy: null,
        createTime: null,
        updateBy: null,
        updateTime: null,
        remark: null
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.routeId)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加运单配载线路";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const routeId = row.routeId || this.ids
      getWmsStowageRoute(routeId).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改运单配载线路";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.routeId != null) {
            updateWmsStowageRoute(this.form).then(response => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addWmsStowageRoute(this.form).then(response => {
              this.msgSuccess("新增成功");
              this.open = false;
              this.getList();
            });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const routeIds = row.routeId || this.ids;
      this.$confirm('是否确认删除运单配载线路编号为"' + routeIds + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delWmsStowageRoute(routeIds);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        })
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('wms/WmsStowageRoute/export', {
        ...this.queryParams
      }, `wms_WmsStowageRoute.xlsx`)
    },
    toggleSearchForm(toggle) {
      if (toggle >= 0) {
        this.toggleSearchFormValue = toggle;
      }
    },
  }
};
</script>