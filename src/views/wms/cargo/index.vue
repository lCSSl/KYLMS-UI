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
      <el-form v-show="showSearch" ref="queryForm" :model="queryParams" label-position="left" label-width="100px">
        <el-row :gutter="24">
          <ICol>
            <el-form-item label="编码" prop="cargoCode">
              <el-input
                v-model="queryParams.cargoCode"
                clearable
                placeholder="请输入编码"
                size="small"
                @keyup.enter.native="handleQuery"
              />
            </el-form-item>
          </ICol>
          <ICol>
            <el-form-item label="品名" prop="cargoName">
              <el-input
                v-model="queryParams.cargoName"
                clearable
                placeholder="请输入品名"
                size="small"
                @keyup.enter.native="handleQuery"
              />
            </el-form-item>
          </ICol>
          <ICol>
            <el-form-item label="单件重量" prop="cargoWeight">
              <el-input
                v-model="queryParams.cargoWeight"
                clearable
                placeholder="请输入单件重量"
                size="small"
                @keyup.enter.native="handleQuery"
              />
            </el-form-item>
          </ICol>
          <ICol>
            <el-form-item label="单件体积" prop="cargoVolume">
              <el-input
                v-model="queryParams.cargoVolume"
                clearable
                placeholder="请输入单件体积"
                size="small"
                @keyup.enter.native="handleQuery"
              />
            </el-form-item>
          </ICol>
          <ICol>
            <el-form-item label="贵重货物" prop="valuable">
              <el-select v-model="queryParams.valuable" clearable placeholder="请选择贵重货物" size="small">
                <el-option
                  v-for="(dict,index) in publicCommonYesNo"
                  :key="index"
                  :label="dict.dictLabel"
                  :value="dict.dictValue"
                />
              </el-select>
            </el-form-item>
          </ICol>
          <ICol>
            <el-form-item label="异形货物" prop="irregular">
              <el-select v-model="queryParams.irregular" clearable placeholder="请选择异形货物" size="small">
                <el-option
                  v-for="(dict,index) in publicCommonYesNo"
                  :key="index"
                  :label="dict.dictLabel"
                  :value="dict.dictValue"
                />
              </el-select>
            </el-form-item>
          </ICol>
          <ICol>
            <el-form-item label="货物单据" prop="documents">
              <el-select v-model="queryParams.documents" clearable placeholder="请选择货物单据" size="small">
                <el-option
                  v-for="(dict,index) in publicCommonYesNo"
                  :key="index"
                  :label="dict.dictLabel"
                  :value="dict.dictValue"
                />
              </el-select>
            </el-form-item>
          </ICol>
          <ICol>
            <el-form-item label="包装方式" prop="packageType">
              <el-select v-model="queryParams.packageType" clearable placeholder="请选择包装方式" size="small">
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
            <el-form-item label="客户公司" prop="deptId">
              <TreeSelect v-model="queryParams.deptId" :options="deptOptions" :show-count="true"
                          placeholder="请选择归属部门" @select="handleQueryParamsDeptIdClick"/>
            </el-form-item>
          </ICol>
          <ICol>
            <el-form-item label="客户" prop="csrId">
              <el-select v-model="queryParams.csrId"
                         :disabled="!this.queryParams.customerOptions.length > 0" placeholder="请选择站点主管"
                         size="small"
                         @keyup.enter.native="handleQuery">
                <el-option v-for="(item,index) in queryParams.customerOptions" :key="index"
                           :label="item.nickName"
                           :value="item.userId"/>
              </el-select>
            </el-form-item>
          </ICol>
          <ICol>
            <el-form-item label="状态" prop="status">
              <el-select v-model="queryParams.status" clearable placeholder="请选择状态" size="small">
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
              <el-button icon="el-icon-search" size="mini" type="primary" @click="handleQuery">搜索</el-button>
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
            v-hasPermi="['wms:cargo:add']"
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
            v-hasPermi="['wms:cargo:edit']"
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
            v-hasPermi="['wms:cargo:remove']"
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
            v-hasPermi="['wms:cargo:export']"
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
      <el-table v-loading="loading" :data="cargoList" @selection-change="handleSelectionChange">
        <el-table-column align="center" fixed type="selection" width="55"/>
        <el-table-column align="center" fixed label="序号" type="index" width="60"/>
        <el-table-column align="center" label="编码" prop="cargoCode" show-overflow-tooltip width="150">
          <template slot-scope="{row}">
            {{row.cargoCode}}
          </template>
        </el-table-column>
        <el-table-column align="center" label="品名" prop="cargoName" show-overflow-tooltip width="150">
          <template slot-scope="{row}">
            {{row.cargoName}}
          </template>
        </el-table-column>
        <el-table-column align="center" label="单件重量" prop="cargoWeight" show-overflow-tooltip width="150">
          <template slot-scope="{row}">
            {{row.cargoWeight}}
          </template>
        </el-table-column>
        <el-table-column align="center" label="单件体积" prop="cargoVolume" show-overflow-tooltip width="150">
          <template slot-scope="{row}">
            {{row.cargoVolume}}
          </template>
        </el-table-column>
        <el-table-column :formatter="publicCommonYesNoFormat" align="center" label="贵重货物" prop="valuable" show-overflow-tooltip
                         width="150"/>
        <el-table-column :formatter="publicCommonYesNoFormat" align="center" label="异形货物" prop="irregular" show-overflow-tooltip
                         width="150"/>
        <el-table-column :formatter="publicCommonYesNoFormat" align="center" label="货物单据" prop="documents" show-overflow-tooltip
                         width="150"/>
        <el-table-column :formatter="packageTypeFormat" align="center" label="包装方式" prop="packageType"
                         show-overflow-tooltip
                         width="150"/>
        <el-table-column align="center" label="客户ID" prop="csrId" show-overflow-tooltip width="150">
          <template slot-scope="{row}">
            {{row.csrId}}
          </template>
        </el-table-column>
        <el-table-column align="center" label="部门ID-客户公司" prop="deptId" show-overflow-tooltip width="150">
          <template slot-scope="{row}">
            {{row.deptId}}
          </template>
        </el-table-column>
        <el-table-column :formatter="statusFormat" align="center" label="状态" prop="status" show-overflow-tooltip
                         width="150"/>
        <el-table-column align="center" label="开单备注" prop="remark" show-overflow-tooltip width="150">
          <template slot-scope="{row}">
            {{row.remark}}
          </template>
        </el-table-column>
        <el-table-column align="center" class-name="small-padding fixed-width" fixed="right" label="操作" width="200">
          <template slot-scope="scope">
            <el-button
              v-hasPermi="['wms:cargo:edit']"
              icon="el-icon-edit"
              size="mini"
              type="text"
              @click="handleUpdate(scope.row)"
            >修改
            </el-button>
            <el-button
              v-hasPermi="['wms:cargo:remove']"
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
    <!-- 添加或修改货物对话框 -->
    <el-dialog :title="title" :visible.sync="open" append-to-body fullscreen>
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
              <el-input-number v-model="form.cargoWeight" :min="0.01" placeholder="请输入单件重量" :precision="2" :step="0.1"/>
            </el-form-item>
          </ICol>
          <ICol>
            <el-form-item label="单件体积" prop="cargoVolume">
              <el-input-number v-model="form.cargoVolume" :min="0.01" placeholder="请输入单件重量" :precision="2" :step="0.1"/>
            </el-form-item>
          </ICol>
          <ICol>
            <el-form-item label="贵重货物">
              <el-radio-group v-model="form.valuable">
                <el-radio
                  v-for="(dict,index) in publicCommonYesNo"
                  :key="index"
                  :label="dict.dictValue"
                >
                  {{dict.dictLabel}}
                </el-radio>
              </el-radio-group>
            </el-form-item>
          </ICol>
          <ICol>
            <el-form-item label="异形货物">
              <el-radio-group v-model="form.irregular">
                <el-radio
                  v-for="(dict,index) in publicCommonYesNo"
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
                  v-for="(dict,index) in publicCommonYesNo"
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
            <el-form-item label="客户公司" prop="deptId">
              <TreeSelect v-model="form.deptId" :options="deptOptions" :show-count="true"
                          placeholder="请选择归属部门" @select="handleFormDeptIdClick"/>
            </el-form-item>
          </ICol>
          <ICol>
            <el-form-item label="客户" prop="csrId">
              <el-select v-model="form.csrId" :disabled="checkCustomerOptions"
                         placeholder="请选择客户">
                <el-option v-for="(item,index) in customerOptions" :key="index" :label="item.nickName"
                           :value="item.userId"/>
              </el-select>
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
import {addCargo, delCargo, getCargo, listCargo, updateCargo} from "@/api/wms/cargo";
import TreeSelect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
import ICol from "@/components/ICol";
import NumberInput from "@/components/NumberInput";
import {treeSelect} from "@/api/system/dept";
import {listUser} from "@/api/system/user";
export default {
  name: "Cargo",
  components: {
    ICol,
    TreeSelect,
    NumberInput,
  },
  computed:{
    checkCustomerOptions() {
      return !this.customerOptions.length > 0;
    },
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
      publicCommonYesNo: [],
      // 包装方式字典
      packageTypeOptions: [],
      // 状态字典
      statusOptions: [],
      // 部门树选项
      deptOptions: [],
      customerOptions: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        cargoCode: null,
        cargoName: null,
        cargoWeight: null,
        customerOptions: [],
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
        cargoCode: [
          {required: true, message: "编码不能为空", trigger: "blur"}
        ],
      },
      toggleSearchFormValue: 0,
    };
  },
  created() {
    this.getList();
    this.getTreeSelect();
    this.getDicts("public_common_yes_no").then(response => {
      this.publicCommonYesNo = response.data;
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
    publicCommonYesNoFormat(row, column) {
      return this.selectDictLabel(this.publicCommonYesNo, row.valuable);
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
    /** 查询部门下拉树结构 */
    getTreeSelect() {
      treeSelect({
        parentId:110
      }).then(response => {
        this.deptOptions = response.data;
      });
    },
    handleQueryParamsDeptIdClick({id, orderNum}) {
      this.queryParams.csrId = '';
      this.getUserInTheDepartment(id, orderNum, 0);
    },
    handleFormDeptIdClick({id, orderNum}) {
      this.form.csrId = '';
      this.getUserInTheDepartment(id, orderNum, 1);
    },
    getUserInTheDepartment(deptId, orderNum, type) {
      if (deptId && +orderNum >= 0)
        listUser({deptId}).then(res => {
          switch (+type) {
            case 0:
              this.queryParams.customerOptions = res.rows;
              break;
            case 1:
              this.customerOptions = res.rows;
              break;
          }
        });
      else {
        return;
      }
    },
  }
};
</script>
