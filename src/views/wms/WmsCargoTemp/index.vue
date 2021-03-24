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
    <ICol>
      <el-form-item label="货物ID" prop="cargoId">
        <el-input
          v-model="queryParams.cargoId"
          placeholder="请输入货物ID"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
    </ICol>
    <ICol>
      <el-form-item label="品名" prop="tCargoName">
        <el-input
          v-model="queryParams.tCargoName"
          placeholder="请输入品名"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
    </ICol>
    <ICol>
      <el-form-item label="件数" prop="tCargoNumber">
        <el-input
          v-model="queryParams.tCargoNumber"
          placeholder="请输入件数"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
    </ICol>
    <ICol>
      <el-form-item label="重量" prop="tCargoTotalWeight">
        <el-input
          v-model="queryParams.tCargoTotalWeight"
          placeholder="请输入重量"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
    </ICol>
    <ICol>
      <el-form-item label="体积" prop="tCargoTotalVolume">
        <el-input
          v-model="queryParams.tCargoTotalVolume"
          placeholder="请输入体积"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
    </ICol>
  <ICol>
      <el-form-item label="贵重货物" prop="valuable">
        <el-select v-model="queryParams.valuable" placeholder="请选择贵重货物" clearable size="small">
          <el-option
            v-for="dict in valuableOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>
    </ICol>
  <ICol>
      <el-form-item label="异形货物" prop="irregular">
        <el-select v-model="queryParams.irregular" placeholder="请选择异形货物" clearable size="small">
          <el-option
            v-for="dict in irregularOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>
    </ICol>
  <ICol>
      <el-form-item label="货物单据" prop="documents">
        <el-select v-model="queryParams.documents" placeholder="请选择货物单据" clearable size="small">
          <el-option
            v-for="dict in documentsOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>
    </ICol>
  <ICol>
      <el-form-item label="包装方式" prop="packageType">
        <el-select v-model="queryParams.packageType" placeholder="请选择包装方式" clearable size="small">
          <el-option
            v-for="dict in packageTypeOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
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
          v-hasPermi="['wms:WmsCargoTemp:add']"
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
          v-hasPermi="['wms:WmsCargoTemp:edit']"
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
          v-hasPermi="['wms:WmsCargoTemp:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['wms:WmsCargoTemp:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>
    </el-card>
    <el-card :body-style="{padding:'15px'}">
    <el-table v-loading="loading" :data="WmsCargoTempList" @selection-change="handleSelectionChange">
      <el-table-column align="center" fixed type="selection" width="55"/>
      <el-table-column align="center" fixed label="序号" type="index" width="60"/>
              <el-table-column label="主键ID--序号" show-overflow-tooltip width="150" align="center" prop="id" >
        <template slot-scope="{row}">
          {{row.id}}
        </template>
      </el-table-column>
      <el-table-column label="运单ID" show-overflow-tooltip width="150" align="center" prop="waybillId" >
        <template slot-scope="{row}">
          {{row.waybillId}}
        </template>
      </el-table-column>
      <el-table-column label="货物ID" show-overflow-tooltip width="150" align="center" prop="cargoId" >
        <template slot-scope="{row}">
          {{row.cargoId}}
        </template>
      </el-table-column>
      <el-table-column label="品名" show-overflow-tooltip width="150" align="center" prop="tCargoName" >
        <template slot-scope="{row}">
          {{row.tCargoName}}
        </template>
      </el-table-column>
      <el-table-column label="件数" show-overflow-tooltip width="150" align="center" prop="tCargoNumber" >
        <template slot-scope="{row}">
          {{row.tCargoNumber}}
        </template>
      </el-table-column>
      <el-table-column label="重量" show-overflow-tooltip width="150" align="center" prop="tCargoTotalWeight" >
        <template slot-scope="{row}">
          {{row.tCargoTotalWeight}}
        </template>
      </el-table-column>
      <el-table-column label="体积" show-overflow-tooltip width="150" align="center" prop="tCargoTotalVolume" >
        <template slot-scope="{row}">
          {{row.tCargoTotalVolume}}
        </template>
      </el-table-column>
      <el-table-column label="贵重货物" show-overflow-tooltip width="150" align="center" prop="valuable" :formatter="valuableFormat" />
      <el-table-column label="异形货物" show-overflow-tooltip width="150" align="center" prop="irregular" :formatter="irregularFormat" />
      <el-table-column label="货物单据" show-overflow-tooltip width="150" align="center" prop="documents" :formatter="documentsFormat" />
      <el-table-column label="包装方式" show-overflow-tooltip width="150" align="center" prop="packageType" :formatter="packageTypeFormat" />
      <el-table-column label="操作" align="center" fixed="right" width="200" class-name="small-padding fixed-width">
         <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['wms:WmsCargoTemp:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['wms:WmsCargoTemp:remove']"
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
    <!-- 添加或修改运单货物临时对话框 -->
    <el-dialog :title="title" fullscreen :visible.sync="open" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-row :gutter="24">
      <ICol>
        <el-form-item label="运单ID" prop="waybillId">
          <el-input v-model="form.waybillId" placeholder="请输入运单ID" />
        </el-form-item>
      </ICol>
      <ICol>
        <el-form-item label="货物ID" prop="cargoId">
          <el-input v-model="form.cargoId" placeholder="请输入货物ID" />
        </el-form-item>
      </ICol>
      <ICol>
        <el-form-item label="品名" prop="tCargoName">
          <el-input v-model="form.tCargoName" placeholder="请输入品名" />
        </el-form-item>
      </ICol>
      <ICol>
        <el-form-item label="件数" prop="tCargoNumber">
          <el-input v-model="form.tCargoNumber" placeholder="请输入件数" />
        </el-form-item>
      </ICol>
      <ICol>
        <el-form-item label="重量" prop="tCargoTotalWeight">
          <el-input v-model="form.tCargoTotalWeight" placeholder="请输入重量" />
        </el-form-item>
      </ICol>
      <ICol>
        <el-form-item label="体积" prop="tCargoTotalVolume">
          <el-input v-model="form.tCargoTotalVolume" placeholder="请输入体积" />
        </el-form-item>
      </ICol>
<ICol>
        <el-form-item label="贵重货物">
          <el-radio-group v-model="form.valuable">
            <el-radio
              v-for="dict in valuableOptions"
              :key="dict.dictValue"
              :label="dict.dictValue"
            >{{dict.dictLabel}}</el-radio>
          </el-radio-group>
        </el-form-item>
</ICol>
<ICol>
        <el-form-item label="异形货物">
          <el-radio-group v-model="form.irregular">
            <el-radio
              v-for="dict in irregularOptions"
              :key="dict.dictValue"
              :label="dict.dictValue"
            >{{dict.dictLabel}}</el-radio>
          </el-radio-group>
        </el-form-item>
</ICol>
<ICol>
        <el-form-item label="货物单据">
          <el-radio-group v-model="form.documents">
            <el-radio
              v-for="dict in documentsOptions"
              :key="dict.dictValue"
              :label="dict.dictValue"
            >{{dict.dictLabel}}</el-radio>
          </el-radio-group>
        </el-form-item>
</ICol>
<ICol>
        <el-form-item label="包装方式" prop="packageType">
          <el-select v-model="form.packageType" placeholder="请选择包装方式">
            <el-option
              v-for="dict in packageTypeOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictValue"
            ></el-option>
          </el-select>
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
import { listWmsCargoTemp, getWmsCargoTemp, delWmsCargoTemp, addWmsCargoTemp, updateWmsCargoTemp } from "@/api/wms/WmsCargoTemp";
import ICol from "@/components/ICol";
export default {
  name: "WmsCargoTemp",
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
      // 运单货物临时表格数据
      WmsCargoTempList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 贵重货物字典
      valuableOptions: [],
      // 异形货物字典
      irregularOptions: [],
      // 货物单据字典
      documentsOptions: [],
      // 包装方式字典
      packageTypeOptions: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        waybillId: null,
        cargoId: null,
        tCargoName: null,
        tCargoNumber: null,
        tCargoTotalWeight: null,
        tCargoTotalVolume: null,
        valuable: null,
        irregular: null,
        documents: null,
        packageType: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
      },
    toggleSearchFormValue:0,
    };
  },
  created() {
    this.getList();
    this.getDicts("public_common_yes_no").then(response => {
      this.valuableOptions = response.data;
    });
    this.getDicts("public_common_yes_no").then(response => {
      this.irregularOptions = response.data;
    });
    this.getDicts("public_common_yes_no").then(response => {
      this.documentsOptions = response.data;
    });
    this.getDicts("wms_cargo_package_type").then(response => {
      this.packageTypeOptions = response.data;
    });
  },
  methods: {
    /** 查询运单货物临时列表 */
    getList() {
      this.loading = true;
      listWmsCargoTemp(this.queryParams).then(response => {
        this.WmsCargoTempList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 贵重货物字典翻译
    valuableFormat(row, column) {
      return this.selectDictLabel(this.valuableOptions, row.valuable);
    },
    // 异形货物字典翻译
    irregularFormat(row, column) {
      return this.selectDictLabel(this.irregularOptions, row.irregular);
    },
    // 货物单据字典翻译
    documentsFormat(row, column) {
      return this.selectDictLabel(this.documentsOptions, row.documents);
    },
    // 包装方式字典翻译
    packageTypeFormat(row, column) {
      return this.selectDictLabel(this.packageTypeOptions, row.packageType);
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
        waybillId: null,
        cargoId: null,
        tCargoName: null,
        tCargoNumber: null,
        tCargoTotalWeight: null,
        tCargoTotalVolume: null,
        valuable: "0",
        irregular: "0",
        documents: "0",
        packageType: null
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
      this.title = "添加运单货物临时";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getWmsCargoTemp(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改运单货物临时";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateWmsCargoTemp(this.form).then(response => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addWmsCargoTemp(this.form).then(response => {
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
      this.$confirm('是否确认删除运单货物临时编号为"' + ids + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delWmsCargoTemp(ids);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        })
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('wms/WmsCargoTemp/export', {
        ...this.queryParams
      }, `wms_WmsCargoTemp.xlsx`)
    },
    toggleSearchForm(toggle) {
      if (toggle >= 0) {
        this.toggleSearchFormValue = toggle;
      }
    },
  }
};
</script>