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
      <el-form-item label="仓库方格ID" prop="itemId">
        <el-input
          v-model="queryParams.itemId"
          placeholder="请输入仓库方格ID"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
    </ICol>
    <ICol>
      <el-form-item label="运单ID" prop="waybillId">
        <el-input
          v-model="queryParams.waybillId"
          placeholder="请输入运单ID"
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
          v-hasPermi="['wms:WmsWaybillMdWarehouseExtItem:add']"
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
          v-hasPermi="['wms:WmsWaybillMdWarehouseExtItem:edit']"
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
          v-hasPermi="['wms:WmsWaybillMdWarehouseExtItem:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['wms:WmsWaybillMdWarehouseExtItem:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>
    </el-card>
    <el-card :body-style="{padding:'15px'}">
    <el-table v-loading="loading" :data="WmsWaybillMdWarehouseExtItemList" @selection-change="handleSelectionChange">
      <el-table-column align="center" fixed type="selection" width="55"/>
      <el-table-column align="center" fixed label="序号" type="index" width="60"/>
              <el-table-column label="ID" show-overflow-tooltip width="150" align="center" prop="id" >
        <template slot-scope="{row}">
          {{row.id}}
        </template>
      </el-table-column>
      <el-table-column label="仓库方格ID" show-overflow-tooltip width="150" align="center" prop="itemId" >
        <template slot-scope="{row}">
          {{row.itemId}}
        </template>
      </el-table-column>
      <el-table-column label="运单ID" show-overflow-tooltip width="150" align="center" prop="waybillId" >
        <template slot-scope="{row}">
          {{row.waybillId}}
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" fixed="right" width="200" class-name="small-padding fixed-width">
         <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['wms:WmsWaybillMdWarehouseExtItem:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['wms:WmsWaybillMdWarehouseExtItem:remove']"
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
    <!-- 添加或修改运单-仓库方格中间对话框 -->
    <el-dialog :title="title" fullscreen :visible.sync="open" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-row :gutter="24">
      <ICol>
        <el-form-item label="仓库方格ID" prop="itemId">
          <el-input v-model="form.itemId" placeholder="请输入仓库方格ID" />
        </el-form-item>
      </ICol>
      <ICol>
        <el-form-item label="运单ID" prop="waybillId">
          <el-input v-model="form.waybillId" placeholder="请输入运单ID" />
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
import { listWmsWaybillMdWarehouseExtItem, getWmsWaybillMdWarehouseExtItem, delWmsWaybillMdWarehouseExtItem, addWmsWaybillMdWarehouseExtItem, updateWmsWaybillMdWarehouseExtItem } from "@/api/wms/WmsWaybillMdWarehouseExtItem";
import ICol from "@/components/ICol";
export default {
  name: "WmsWaybillMdWarehouseExtItem",
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
      // 运单-仓库方格中间表格数据
      WmsWaybillMdWarehouseExtItemList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        itemId: null,
        waybillId: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        itemId: [
          { required: true, message: "仓库方格ID不能为空", trigger: "blur" }
        ],
        waybillId: [
          { required: true, message: "运单ID不能为空", trigger: "blur" }
        ]
      },
    toggleSearchFormValue:0,
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询运单-仓库方格中间列表 */
    getList() {
      this.loading = true;
      listWmsWaybillMdWarehouseExtItem(this.queryParams).then(response => {
        this.WmsWaybillMdWarehouseExtItemList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        id: null,
        itemId: null,
        waybillId: null
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
      this.ids = selection.map(item => item.id)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加运单-仓库方格中间";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getWmsWaybillMdWarehouseExtItem(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改运单-仓库方格中间";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateWmsWaybillMdWarehouseExtItem(this.form).then(response => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addWmsWaybillMdWarehouseExtItem(this.form).then(response => {
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
      const ids = row.id || this.ids;
      this.$confirm('是否确认删除运单-仓库方格中间编号为"' + ids + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delWmsWaybillMdWarehouseExtItem(ids);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        })
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('wms/WmsWaybillMdWarehouseExtItem/export', {
        ...this.queryParams
      }, `wms_WmsWaybillMdWarehouseExtItem.xlsx`)
    },
    toggleSearchForm(toggle) {
      if (toggle >= 0) {
        this.toggleSearchFormValue = toggle;
      }
    },
  }
};
</script>