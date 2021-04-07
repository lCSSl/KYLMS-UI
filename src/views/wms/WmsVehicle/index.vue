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
            <el-form-item label="编码" prop="vehicleCode">
              <el-input
                v-model="queryParams.vehicleCode"
                clearable
                placeholder="请输入编码"
                size="small"
                @keyup.enter.native="handleQuery"
              />
            </el-form-item>
          </ICol>
          <ICol>
            <el-form-item label="牌号" prop="vehiclePlate">
              <el-input
                v-model="queryParams.vehiclePlate"
                clearable
                placeholder="请输入牌号"
                size="small"
                @keyup.enter.native="handleQuery"
              />
            </el-form-item>
          </ICol>
          <ICol>
            <el-form-item label="类型" prop="vehicleType">
              <el-select v-model="queryParams.vehicleType" clearable placeholder="请选择类型" size="small">
                <el-option
                  v-for="dict in vehicleTypeOptions"
                  :key="dict.dictValue"
                  :label="dict.dictLabel"
                  :value="dict.dictValue"
                />
              </el-select>
            </el-form-item>
          </ICol>
          <ICol>
            <el-form-item label="来源" prop="vehicleSource">
              <el-select v-model="queryParams.vehicleSource" clearable placeholder="请选择来源" size="small">
                <el-option
                  v-for="dict in vehicleSourceOptions"
                  :key="dict.dictValue"
                  :label="dict.dictLabel"
                  :value="dict.dictValue"
                />
              </el-select>
            </el-form-item>
          </ICol>
          <ICol>
            <el-form-item label="长" prop="vehicleLength">
              <el-input
                v-model="queryParams.vehicleLength"
                clearable
                placeholder="请输入长"
                size="small"
                @keyup.enter.native="handleQuery"
              />
            </el-form-item>
          </ICol>
          <ICol>
            <el-form-item label="宽" prop="vehicleWidth">
              <el-input
                v-model="queryParams.vehicleWidth"
                clearable
                placeholder="请输入宽"
                size="small"
                @keyup.enter.native="handleQuery"
              />
            </el-form-item>
          </ICol>
          <ICol>
            <el-form-item label="高" prop="vehicleHeight">
              <el-input
                v-model="queryParams.vehicleHeight"
                clearable
                placeholder="请输入高"
                size="small"
                @keyup.enter.native="handleQuery"
              />
            </el-form-item>
          </ICol>
          <ICol>
            <el-form-item label="归属部门" prop="deptId">
              <TreeSelect v-model="queryParams.deptId" :options="deptOptions" :show-count="true"
                          placeholder="请选择归属部门" />
            </el-form-item>
          </ICol>
          <!--<ICol>
            <el-form-item label="状态" prop="status">
              <el-select v-model="queryParams.status" clearable placeholder="请选择状态" size="small">
                <el-option
                  v-for="dict in statusOptions"
                  :key="dict.dictValue"
                  :label="dict.dictLabel"
                  :value="dict.dictValue"
                />
              </el-select>
            </el-form-item>
          </ICol>-->
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
            v-hasPermi="['wms:WmsVehicle:add']"
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
            v-hasPermi="['wms:WmsVehicle:edit']"
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
            v-hasPermi="['wms:WmsVehicle:remove']"
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
            v-hasPermi="['wms:WmsVehicle:export']"
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
      <el-table v-loading="loading" :data="WmsVehicleList" @selection-change="handleSelectionChange">
        <el-table-column align="center" fixed type="selection" width="55"/>
        <el-table-column align="center" fixed label="序号" type="index" width="60"/>
        <el-table-column align="center" label="编码" prop="vehicleCode" show-overflow-tooltip width="150">
          <template slot-scope="{row}">
            {{row.vehicleCode}}
          </template>
        </el-table-column>
        <el-table-column align="center" label="牌号" prop="vehiclePlate" show-overflow-tooltip width="150">
          <template slot-scope="{row}">
            {{row.vehiclePlate}}
          </template>
        </el-table-column>
        <el-table-column :formatter="vehicleTypeFormat" align="center" label="类型" prop="vehicleType"
                         show-overflow-tooltip
                         width="150"/>
        <el-table-column :formatter="vehicleSourceFormat" align="center" label="来源" prop="vehicleSource"
                         show-overflow-tooltip
                         width="150"/>

        <el-table-column align="center" label="长(米)" prop="vehicleLength" show-overflow-tooltip width="150">
          <template slot-scope="{row}">
            {{row.vehicleLength}}
          </template>
        </el-table-column>
        <el-table-column align="center" label="宽(米)" prop="vehicleWidth" show-overflow-tooltip width="150">
          <template slot-scope="{row}">
            {{row.vehicleWidth}}
          </template>
        </el-table-column>
        <el-table-column align="center" label="高(米)" prop="vehicleHeight" show-overflow-tooltip width="150">
          <template slot-scope="{row}">
            {{row.vehicleHeight}}
          </template>
        </el-table-column>
        <!--<el-table-column align="center" label="部门ID" prop="deptId" show-overflow-tooltip width="150">
          <template slot-scope="{row}">
            {{row.deptId}}
          </template>
        </el-table-column>-->
        <el-table-column align="center" label="所属部门" prop="deptId" show-overflow-tooltip width="150">
          <template slot-scope="{row}">
            {{row.deptName}}
          </template>
        </el-table-column>
        <!--<el-table-column :formatter="statusFormat" align="center" label="状态" prop="status" show-overflow-tooltip
                         width="150"/>-->
        <el-table-column align="center" label="备注" prop="remark" show-overflow-tooltip width="150">
          <template slot-scope="{row}">
            {{row.remark}}
          </template>
        </el-table-column>
        <el-table-column align="center" class-name="small-padding fixed-width" fixed="right" label="状态" prop="vehicleStatus"
                         show-overflow-tooltip
                         width="150">
          <template slot-scope="{row}">
            <el-tag :type="vehicleStatusTagFormat(row.vehicleStatus)">{{vehicleStatusFormat(row)}}</el-tag>
<!--            <el-tag type="info">标签三</el-tag>-->
<!--            <el-tag type="warning">标签四</el-tag>-->
<!--            <el-tag type="danger">标签五</el-tag>-->
          </template>
        </el-table-column>
        <el-table-column align="center" class-name="small-padding fixed-width" fixed="right" label="操作" width="200">
          <template slot-scope="scope">
            <el-button
              v-hasPermi="['wms:WmsVehicle:edit']"
              icon="el-icon-edit"
              size="mini"
              type="text"
              @click="handleUpdate(scope.row)">
              修改
            </el-button>
            <el-button
              v-hasPermi="['wms:WmsVehicle:remove']"
              icon="el-icon-delete"
              size="mini"
              type="text"
              @click="handleDelete(scope.row)">
              删除
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
    <!-- 添加或修改运输工具信息主对话框 -->
    <el-dialog :visible.sync="dialog.open" append-to-body fullscreen>
      <span slot="title" class="dialog_title">
        <span>
            {{dialog.title}}
        </span>
        <el-input v-show="dialog.type!=0" v-model="form.vehicleCode" class="dialog_title_plus" readonly>
          <template slot="prepend">设备编码</template>
        </el-input>
      </span>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-row :gutter="24">
          <ICol>
            <el-form-item label="牌号" prop="vehiclePlate">
              <el-input v-model="form.vehiclePlate" placeholder="请输入牌号"/>
            </el-form-item>
          </ICol>
          <ICol>
            <el-form-item label="类型" prop="vehicleType">
              <el-select v-model="form.vehicleType" placeholder="请选择类型">
                <el-option
                  v-for="dict in vehicleTypeOptions"
                  :key="dict.dictValue"
                  :label="dict.dictLabel"
                  :value="dict.dictValue"
                ></el-option>
              </el-select>
            </el-form-item>
          </ICol>
          <ICol>
            <el-form-item label="来源" prop="vehicleSource">
              <el-select v-model="form.vehicleSource" placeholder="请选择来源">
                <el-option
                  v-for="dict in vehicleSourceOptions"
                  :key="dict.dictValue"
                  :label="dict.dictLabel"
                  :value="dict.dictValue"
                ></el-option>
              </el-select>
            </el-form-item>
          </ICol>
          <ICol>
            <el-form-item label="状态" prop="vehicleStatus">
              <el-select v-model="form.vehicleStatus" placeholder="请选择设备状态">
                <el-option
                  v-for="dict in vehicleStatusOptions"
                  :key="dict.dictValue"
                  :label="dict.dictLabel"
                  :value="dict.dictValue"
                ></el-option>
              </el-select>
            </el-form-item>
          </ICol>
          <ICol>
            <el-form-item label="归属部门" prop="deptId">
              <TreeSelect v-model="form.deptId" :options="deptOptions" :show-count="true"
                          placeholder="请选择归属部门" @select="handleDeptIdClick"/>
            </el-form-item>
          </ICol>
        </el-row>
        <el-row>
          <ICol>
            <el-form-item label="长(米)" prop="vehicleLength">
              <el-input-number v-model="form.vehicleLength" :min="1" :precision="2" :step="0.1"/>
            </el-form-item>
          </ICol>
          <ICol>
            <el-form-item label="宽(米)" prop="vehicleWidth">
              <el-input-number v-model="form.vehicleWidth" :min="1" :precision="2" :step="0.1"/>
            </el-form-item>
          </ICol>
          <ICol>
            <el-form-item label="高(米)" prop="vehicleHeight">
              <el-input-number v-model="form.vehicleHeight" :min="1" :precision="2" :step="0.1"/>
            </el-form-item>
          </ICol>

          <!--<ICol>
            <el-form-item label="状态">
              <el-radio-group v-model="form.status">
                <el-radio
                  v-for="dict in statusOptions"
                  :key="dict.dictValue"
                  :label="dict.dictValue"
                >{{dict.dictLabel}}
                </el-radio>
              </el-radio-group>
            </el-form-item>
          </ICol>
          <ICol>
            <el-form-item label="删除标志" prop="delFlag">
              <el-input v-model="form.delFlag" placeholder="请输入删除标志"/>
            </el-form-item>
          </ICol>-->
        </el-row>
        <el-row>
          <ICol>
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
import {addWmsVehicle, delWmsVehicle, getWmsVehicle, listWmsVehicle, updateWmsVehicle} from "@/api/wms/WmsVehicle";
import ICol from "@/components/ICol";
import {treeSelect} from "@/api/system/dept";
import TreeSelect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";

export default {
  name: "WmsVehicle",
  components: {
    ICol, TreeSelect,
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
      // 运输工具信息主表格数据
      WmsVehicleList: [],
      // 弹出层标题
      dialog: {
        title: '',
        type: 0,
        open: false,
      },
      // 是否显示弹出层
      // 类型字典
      vehicleTypeOptions: [],
      // 来源字典
      vehicleSourceOptions: [],
      vehicleStatusOptions: [],
      // 状态字典
      statusOptions: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        vehicleCode: null,
        vehiclePlate: null,
        vehicleType: null,
        vehicleSource: null,
        vehicleStatus: null,
        vehicleWidth: null,
        vehicleLength: null,
        vehicleHeight: null,
        deptId: null,
        status: null,
      },
      // 部门树选项
      deptOptions: [],
      // 表单参数
      form: {},
      // 表单校验
      rules: {},
      toggleSearchFormValue: 0,
    };
  },
  created() {
    this.getList();
    this.getDictMethods();
    this.getTreeSelect();
  },
  methods: {
    /** 查询运输工具信息主列表 */
    getList() {
      this.loading = true;
      listWmsVehicle(this.queryParams).then(response => {
        this.WmsVehicleList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },

    // 取消按钮
    cancel() {
      this.dialog.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        vehicleId: null,
        vehicleCode: null,
        vehiclePlate: null,
        vehicleType: null,
        vehicleSource: null,
        vehicleStatus: null,
        vehicleWidth: 1,
        vehicleLength: 1,
        vehicleHeight: 1,
        deptId: null,
        deptName: null,
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
      this.ids = selection.map(item => item.vehicleId)
      this.single = selection.length !== 1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.dialog.open = true;
      this.dialog.title = "添加运输工具信息";
      this.dialog.type = 0;
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const vehicleId = row.vehicleId || this.ids
      getWmsVehicle(vehicleId).then(response => {
        this.form = response.data;
        this.dialog.open = true;
        this.dialog.type = 1;
        this.dialog.title = "修改运输工具信息";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.vehicleId != null) {
            updateWmsVehicle(this.form).then(response => {
              this.msgSuccess("修改成功");
              this.dialog.open = false;
              this.getList();
            });
          } else {
            addWmsVehicle(this.form).then(response => {
              this.msgSuccess("新增成功");
              this.dialog.open = false;
              this.getList();
            });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const vehicleIds = row.vehicleId || this.ids;
      this.$confirm('是否确认删除运输工具信息主编号为"' + vehicleIds + '"的数据项?', "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(function () {
        return delWmsVehicle(vehicleIds);
      }).then(() => {
        this.getList();
        this.msgSuccess("删除成功");
      })
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('wms/WmsVehicle/export', {
        ...this.queryParams
      }, `wms_WmsVehicle.xlsx`)
    },
    toggleSearchForm(toggle) {
      if (toggle >= 0) {
        this.toggleSearchFormValue = toggle;
      }
    },
    getDictMethods() {
      this.getDicts("wms_vehicle_type").then(response => {
        this.vehicleTypeOptions = response.data;
      });
      this.getDicts("wms_vehicle_source").then(response => {
        this.vehicleSourceOptions = response.data;
      });
      this.getDicts("sys_common_status").then(response => {
        this.statusOptions = response.data;
      });
      this.getDicts("wms_vehicle_status").then(response => {
        this.vehicleStatusOptions = response.data;
      });
    },
    // 类型字典翻译
    vehicleTypeFormat(row, column) {
      return this.selectDictLabel(this.vehicleTypeOptions, row.vehicleType);
    },
    // 来源字典翻译
    vehicleSourceFormat(row, column) {
      return this.selectDictLabel(this.vehicleSourceOptions, row.vehicleSource);
    },
    vehicleStatusFormat(row, column) {
      return this.selectDictLabel(this.vehicleStatusOptions, row.vehicleStatus);
    },
    vehicleStatusTagFormat(vehicleStatus) {
      switch (+vehicleStatus){
        case -1:
          return 'info';
          break;
        case 0:
          return 'warning';
          break;
        case 1:
          return 'success';
          break;
        case 2:
          return null;
          break;
        case 3:
          return 'danger';
          break;
      }
    },
    // 状态字典翻译
    statusFormat(row, column) {
      return this.selectDictLabel(this.statusOptions, row.status);
    },
    getTreeSelect() {
      treeSelect().then(response => {
        this.deptOptions = response.data;
      });
    },
    handleDeptIdClick(item) {
      this.form.deptName = item.label;
    },
  }
};
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

.select-width {
  width: 100%;
}
</style>
