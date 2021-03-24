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
      <el-form :model="queryParams" ref="queryForm" v-show="showSearch" label-position="left" label-width="100px">
        <el-row :gutter="24">
          <ICol>
            <el-form-item label="编码" prop="cargoCode">
              <el-input
                v-model="queryParams.cargoCode"
                placeholder="请输入编码"
                clearable
                size="small"
                @keyup.enter.native="handleQuery"
              />
            </el-form-item>
          </ICol>
          <ICol>
            <el-form-item label="品名" prop="cargoName">
              <el-input
                v-model="queryParams.cargoName"
                placeholder="请输入品名"
                clearable
                size="small"
                @keyup.enter.native="handleQuery"
              />
            </el-form-item>
          </ICol>
          <ICol>
            <el-form-item label="单件重量" prop="cargoWeight">
              <el-input
                v-model="queryParams.cargoWeight"
                placeholder="请输入单件重量"
                clearable
                size="small"
                @keyup.enter.native="handleQuery"
              />
            </el-form-item>
          </ICol>
          <ICol>
            <el-form-item label="单件重量" prop="cargoVolume">
              <el-input
                v-model="queryParams.cargoVolume"
                placeholder="请输入单件重量"
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
                  v-for="(dict,index) in valuableOptions"
                  :key="index"
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
                  v-for="(dict,index) in irregularOptions"
                  :key="index"
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
                  v-for="(dict,index) in documentsOptions"
                  :key="index"
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
                  v-for="(dict,index) in packageTypeOptions"
                  :key="index"
                  :label="dict.dictLabel"
                  :value="dict.dictValue"
                />
              </el-select>
            </el-form-item>
          </ICol>
          <ICol>
            <el-form-item label="客户ID" prop="csrId">
              <el-input
                v-model="queryParams.csrId"
                placeholder="请输入客户ID"
                clearable
                size="small"
                @keyup.enter.native="handleQuery"
              />
            </el-form-item>
          </ICol>
          <ICol>
            <el-form-item label="部门ID-客户公司" prop="deptId">
              <el-input
                v-model="queryParams.deptId"
                placeholder="请输入部门ID-客户公司"
                clearable
                size="small"
                @keyup.enter.native="handleQuery"
              />
            </el-form-item>
          </ICol>
          <ICol>
            <el-form-item label="状态" prop="status">
              <el-select v-model="queryParams.status" placeholder="请选择状态" clearable size="small">
                <el-option
                  v-for="(dict,index) in statusOptions"
                  :key="index"
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
            v-hasPermi="['wms:cargo:add']"
          >新增
          </el-button>
        </el-col>
        <el-col :span="1.5">
          <el-button
            type="success"
            plain
            icon="el-icon-edit"
            size="mini"
            :disabled="single"
            @click="handleUpdate"
            v-hasPermi="['wms:cargo:edit']"
          >修改
          </el-button>
        </el-col>
        <el-col :span="1.5">
          <el-button
            type="danger"
            plain
            icon="el-icon-delete"
            size="mini"
            :disabled="multiple"
            @click="handleDelete"
            v-hasPermi="['wms:cargo:remove']"
          >删除
          </el-button>
        </el-col>
        <el-col :span="1.5">
          <el-button
            type="warning"
            plain
            icon="el-icon-download"
            size="mini"
            @click="handleExport"
            v-hasPermi="['wms:cargo:export']"
          >导出
          </el-button>
        </el-col>
        <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
      </el-row>
    </el-card>
    <el-card :body-style="{padding:'15px'}">
      <el-table v-loading="loading" :data="cargoList" @selection-change="handleSelectionChange">
        <el-table-column align="center" fixed type="selection" width="55"/>
        <el-table-column align="center" fixed label="序号" type="index" width="60"/>
        <el-table-column label="主键ID" show-overflow-tooltip width="150" align="center" prop="cargoId">
          <template slot-scope="{row}">
            {{row.cargoId}}
          </template>
        </el-table-column>
        <el-table-column label="编码" show-overflow-tooltip width="150" align="center" prop="cargoCode">
          <template slot-scope="{row}">
            {{row.cargoCode}}
          </template>
        </el-table-column>
        <el-table-column label="品名" show-overflow-tooltip width="150" align="center" prop="cargoName">
          <template slot-scope="{row}">
            {{row.cargoName}}
          </template>
        </el-table-column>
        <el-table-column label="单件重量" show-overflow-tooltip width="150" align="center" prop="cargoWeight">
          <template slot-scope="{row}">
            {{row.cargoWeight}}
          </template>
        </el-table-column>
        <el-table-column label="单件重量" show-overflow-tooltip width="150" align="center" prop="cargoVolume">
          <template slot-scope="{row}">
            {{row.cargoVolume}}
          </template>
        </el-table-column>
        <el-table-column label="贵重货物" show-overflow-tooltip width="150" align="center" prop="valuable"
                         :formatter="valuableFormat"/>
        <el-table-column label="异形货物" show-overflow-tooltip width="150" align="center" prop="irregular"
                         :formatter="irregularFormat"/>
        <el-table-column label="货物单据" show-overflow-tooltip width="150" align="center" prop="documents"
                         :formatter="documentsFormat"/>
        <el-table-column label="包装方式" show-overflow-tooltip width="150" align="center" prop="packageType"
                         :formatter="packageTypeFormat"/>
        <el-table-column label="客户ID" show-overflow-tooltip width="150" align="center" prop="csrId">
          <template slot-scope="{row}">
            {{row.csrId}}
          </template>
        </el-table-column>
        <el-table-column label="部门ID-客户公司" show-overflow-tooltip width="150" align="center" prop="deptId">
          <template slot-scope="{row}">
            {{row.deptId}}
          </template>
        </el-table-column>
        <el-table-column label="状态" show-overflow-tooltip width="150" align="center" prop="status"
                         :formatter="statusFormat"/>
        <el-table-column label="开单备注" show-overflow-tooltip width="150" align="center" prop="remark">
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
              v-hasPermi="['wms:cargo:edit']"
            >修改
            </el-button>
            <el-button
              size="mini"
              type="text"
              icon="el-icon-delete"
              @click="handleDelete(scope.row)"
              v-hasPermi="['wms:cargo:remove']"
            >删除
            </el-button>
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
    <!-- 添加或修改货物对话框 -->
    <el-dialog :title="title" fullscreen :visible.sync="open" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-row :gutter="24">
          <ICol>
            <el-form-item label="编码" prop="cargoCode">
              <el-input v-model="form.cargoCode" placeholder="请输入编码"/>
            </el-form-item>
          </ICol>
          <ICol>
            <el-form-item label="品名" prop="cargoName">
              <el-input v-model="form.cargoName" placeholder="请输入品名"/>
            </el-form-item>
          </ICol>
          <ICol>
            <el-form-item label="单件重量" prop="cargoWeight">
              <el-input v-model="form.cargoWeight" placeholder="请输入单件重量"/>
            </el-form-item>
          </ICol>
          <ICol>
            <el-form-item label="单件重量" prop="cargoVolume">
              <el-input v-model="form.cargoVolume" placeholder="请输入单件重量"/>
            </el-form-item>
          </ICol>
          <ICol>
            <el-form-item label="贵重货物">
              <el-radio-group v-model="form.valuable">
                <el-radio
                  v-for="(dict,index) in valuableOptions"
                  :key="index"
                  :label="dict.dictValue"
                >{{dict.dictLabel}}
                </el-radio>
              </el-radio-group>
            </el-form-item>
          </ICol>
          <ICol>
            <el-form-item label="异形货物">
              <el-radio-group v-model="form.irregular">
                <el-radio
                  v-for="(dict,index) in irregularOptions"
                  :key="index"
                  :label="dict.dictValue"
                >{{dict.dictLabel}}
                </el-radio>
              </el-radio-group>
            </el-form-item>
          </ICol>
          <ICol>
            <el-form-item label="货物单据">
              <el-radio-group v-model="form.documents">
                <el-radio
                  v-for="(dict,index) in documentsOptions"
                  :key="index"
                  :label="dict.dictValue"
                >{{dict.dictLabel}}
                </el-radio>
              </el-radio-group>
            </el-form-item>
          </ICol>
          <ICol>
            <el-form-item label="包装方式" prop="packageType">
              <el-select v-model="form.packageType" placeholder="请选择包装方式">
                <el-option
                  v-for="(dict,index) in packageTypeOptions"
                  :key="index"
                  :label="dict.dictLabel"
                  :value="dict.dictValue"
                ></el-option>
              </el-select>
            </el-form-item>
          </ICol>
          <ICol>
            <el-form-item label="客户ID" prop="csrId">
              <el-input v-model="form.csrId" placeholder="请输入客户ID"/>
            </el-form-item>
          </ICol>
          <ICol>
            <el-form-item label="部门ID-客户公司" prop="deptId">
              <el-input v-model="form.deptId" placeholder="请输入部门ID-客户公司"/>
            </el-form-item>
          </ICol>
          <ICol>
            <el-form-item label="状态">
              <el-radio-group v-model="form.status">
                <el-radio
                  v-for="(dict,index) in statusOptions"
                  :key="index"
                  :label="dict.dictValue"
                >{{dict.dictLabel}}
                </el-radio>
              </el-radio-group>
            </el-form-item>
          </ICol>
<!--          <ICol>-->
<!--            <el-form-item label="删除标志" prop="delFlag">-->
<!--              <el-input v-model="form.delFlag" placeholder="请输入删除标志"/>-->
<!--            </el-form-item>-->
<!--          </ICol>-->
          <ICol>
            <el-form-item label="开单备注" prop="remark">
              <el-input v-model="form.remark" placeholder="请输入开单备注"/>
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
import {listCargo, getCargo, delCargo, addCargo, updateCargo} from "@/api/wms/cargo";
import ICol from "@/components/ICol";

export default {
  name: "Cargo",
  components: {
    ICol,
  },
  data() {
    return {
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
      // 货物表格数据
      cargoList: [],
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
      // 状态字典
      statusOptions: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        cargoCode: null,
        cargoName: null,
        cargoWeight: null,
        cargoVolume: null,
        valuable: null,
        irregular: null,
        documents: null,
        packageType: null,
        csrId: null,
        deptId: null,
        status: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        cargoName: [
          {required: true, message: "品名不能为空", trigger: "blur"}
        ],
        cargoWeight: [
          {required: true, message: "单件重量不能为空", trigger: "blur"}
        ],
        cargoVolume: [
          {required: true, message: "单件重量不能为空", trigger: "blur"}
        ],
        valuable: [
          {required: true, message: "贵重货物不能为空", trigger: "blur"}
        ],
        irregular: [
          {required: true, message: "异形货物不能为空", trigger: "blur"}
        ],
        documents: [
          {required: true, message: "货物单据不能为空", trigger: "blur"}
        ],
        packageType: [
          {required: true, message: "包装方式不能为空", trigger: "change"}
        ],
      },
      toggleSearchFormValue: 0,
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
    this.getDicts("sys_common_status").then(response => {
      this.statusOptions = response.data;
    });
  },
  methods: {
    /** 查询货物列表 */
    getList() {
      this.loading = true;
      listCargo(this.queryParams).then(response => {
        this.cargoList = response.rows;
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
        cargoId: null,
        cargoCode: null,
        cargoName: null,
        cargoWeight: null,
        cargoVolume: null,
        valuable: "0",
        irregular: "0",
        documents: "0",
        packageType: null,
        csrId: null,
        deptId: null,
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
      this.ids = selection.map(item => item.cargoId)
      this.single = selection.length !== 1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加货物";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const cargoId = row.cargoId || this.ids
      getCargo(cargoId).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改货物";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.cargoId != null) {
            updateCargo(this.form).then(response => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addCargo(this.form).then(response => {
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
      const cargoIds = row.cargoId || this.ids;
      this.$confirm('是否确认删除货物编号为"' + cargoIds + '"的数据项?', "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(function () {
        return delCargo(cargoIds);
      }).then(() => {
        this.getList();
        this.msgSuccess("删除成功");
      })
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('wms/cargo/export', {
        ...this.queryParams
      }, `wms_cargo.xlsx`)
    },
    toggleSearchForm(toggle) {
      if (toggle >= 0) {
        this.toggleSearchFormValue = toggle;
      }
    },
  }
};
</script>
