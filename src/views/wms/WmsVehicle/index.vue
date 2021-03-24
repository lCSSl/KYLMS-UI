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
            <el-form-item label="编码" prop="vehicleCode">
              <el-input
                v-model="queryParams.vehicleCode"
                placeholder="请输入编码"
                clearable
                size="small"
                @keyup.enter.native="handleQuery"
              />
            </el-form-item>
          </ICol>
          <ICol>
            <el-form-item label="牌号" prop="vehiclePlate">
              <el-input
                v-model="queryParams.vehiclePlate"
                placeholder="请输入牌号"
                clearable
                size="small"
                @keyup.enter.native="handleQuery"
              />
            </el-form-item>
          </ICol>
          <ICol>
            <el-form-item label="类型" prop="vehicleType">
              <el-select v-model="queryParams.vehicleType" placeholder="请选择类型" clearable size="small">
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
              <el-select v-model="queryParams.vehicleSource" placeholder="请选择来源" clearable size="small">
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
            <el-form-item label="宽" prop="vehicleWidth">
              <el-input
                v-model="queryParams.vehicleWidth"
                placeholder="请输入宽"
                clearable
                size="small"
                @keyup.enter.native="handleQuery"
              />
            </el-form-item>
          </ICol>
          <ICol>
            <el-form-item label="长" prop="vehicleLength">
              <el-input
                v-model="queryParams.vehicleLength"
                placeholder="请输入长"
                clearable
                size="small"
                @keyup.enter.native="handleQuery"
              />
            </el-form-item>
          </ICol>
          <ICol>
            <el-form-item label="高" prop="vehicleHeight">
              <el-input
                v-model="queryParams.vehicleHeight"
                placeholder="请输入高"
                clearable
                size="small"
                @keyup.enter.native="handleQuery"
              />
            </el-form-item>
          </ICol>
          <ICol>
            <el-form-item label="部门ID" prop="deptId">
              <el-input
                v-model="queryParams.deptId"
                placeholder="请输入部门ID"
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
                  v-for="dict in statusOptions"
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
            v-hasPermi="['wms:WmsVehicle:add']"
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
            v-hasPermi="['wms:WmsVehicle:edit']"
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
            v-hasPermi="['wms:WmsVehicle:remove']"
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
            v-hasPermi="['wms:WmsVehicle:export']"
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
        <el-table-column label="ID" show-overflow-tooltip width="150" align="center" prop="vehicleId">
          <template slot-scope="{row}">
            {{row.vehicleId}}
          </template>
        </el-table-column>
        <el-table-column label="编码" show-overflow-tooltip width="150" align="center" prop="vehicleCode">
          <template slot-scope="{row}">
            {{row.vehicleCode}}
          </template>
        </el-table-column>
        <el-table-column label="牌号" show-overflow-tooltip width="150" align="center" prop="vehiclePlate">
          <template slot-scope="{row}">
            {{row.vehiclePlate}}
          </template>
        </el-table-column>
        <el-table-column label="类型" show-overflow-tooltip width="150" align="center" prop="vehicleType"
                         :formatter="vehicleTypeFormat"/>
        <el-table-column label="来源" show-overflow-tooltip width="150" align="center" prop="vehicleSource"
                         :formatter="vehicleSourceFormat"/>
        <el-table-column label="宽" show-overflow-tooltip width="150" align="center" prop="vehicleWidth">
          <template slot-scope="{row}">
            {{row.vehicleWidth}}
          </template>
        </el-table-column>
        <el-table-column label="长" show-overflow-tooltip width="150" align="center" prop="vehicleLength">
          <template slot-scope="{row}">
            {{row.vehicleLength}}
          </template>
        </el-table-column>
        <el-table-column label="高" show-overflow-tooltip width="150" align="center" prop="vehicleHeight">
          <template slot-scope="{row}">
            {{row.vehicleHeight}}
          </template>
        </el-table-column>
        <el-table-column label="部门ID" show-overflow-tooltip width="150" align="center" prop="deptId">
          <template slot-scope="{row}">
            {{row.deptId}}
          </template>
        </el-table-column>
        <el-table-column label="状态" show-overflow-tooltip width="150" align="center" prop="status"
                         :formatter="statusFormat"/>
        <el-table-column label="备注" show-overflow-tooltip width="150" align="center" prop="remark">
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
              v-hasPermi="['wms:WmsVehicle:edit']"
            >修改
            </el-button>
            <el-button
              size="mini"
              type="text"
              icon="el-icon-delete"
              @click="handleDelete(scope.row)"
              v-hasPermi="['wms:WmsVehicle:remove']"
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
    <!-- 添加或修改运输工具信息主对话框 -->
    <el-dialog :title="title" fullscreen :visible.sync="open" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-row :gutter="24">
          <ICol>
            <el-form-item label="编码" prop="vehicleCode">
              <el-input v-model="form.vehicleCode" placeholder="请输入编码"/>
            </el-form-item>
          </ICol>
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
            <el-form-item label="宽" prop="vehicleWidth">
              <el-input v-model="form.vehicleWidth" placeholder="请输入宽"/>
            </el-form-item>
          </ICol>
          <ICol>
            <el-form-item label="长" prop="vehicleLength">
              <el-input v-model="form.vehicleLength" placeholder="请输入长"/>
            </el-form-item>
          </ICol>
          <ICol>
            <el-form-item label="高" prop="vehicleHeight">
              <el-input v-model="form.vehicleHeight" placeholder="请输入高"/>
            </el-form-item>
          </ICol>
          <ICol>
            <el-form-item label="部门ID" prop="deptId">
              <el-input v-model="form.deptId" placeholder="请输入部门ID"/>
            </el-form-item>
          </ICol>
          <ICol>
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
          <!--      <ICol>-->
          <!--        <el-form-item label="删除标志" prop="delFlag">-->
          <!--          <el-input v-model="form.delFlag" placeholder="请输入删除标志" />-->
          <!--        </el-form-item>-->
          <!--      </ICol>-->
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
import {listWmsVehicle, getWmsVehicle, delWmsVehicle, addWmsVehicle, updateWmsVehicle} from "@/api/wms/WmsVehicle";
import ICol from "@/components/ICol";

export default {
  name: "WmsVehicle",
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
      // 运输工具信息主表格数据
      WmsVehicleList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 类型字典
      vehicleTypeOptions: [],
      // 来源字典
      vehicleSourceOptions: [],
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
        vehicleWidth: null,
        vehicleLength: null,
        vehicleHeight: null,
        deptId: null,
        status: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        vehicleCode: [
          {required: true, message: "编码不能为空", trigger: "blur"}
        ],
        vehicleWidth: [
          {required: true, message: "宽不能为空", trigger: "blur"}
        ],
        status: [
          {required: true, message: "状态不能为空", trigger: "blur"}
        ],
      },
      toggleSearchFormValue: 0,
    };
  },
  created() {
    this.getList();
    this.getDicts("wms_vehicle_type").then(response => {
      this.vehicleTypeOptions = response.data;
    });
    this.getDicts("wms_vehicle_source").then(response => {
      this.vehicleSourceOptions = response.data;
    });
    this.getDicts("sys_common_status").then(response => {
      this.statusOptions = response.data;
    });
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
    // 类型字典翻译
    vehicleTypeFormat(row, column) {
      return this.selectDictLabel(this.vehicleTypeOptions, row.vehicleType);
    },
    // 来源字典翻译
    vehicleSourceFormat(row, column) {
      return this.selectDictLabel(this.vehicleSourceOptions, row.vehicleSource);
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
        vehicleId: null,
        vehicleCode: null,
        vehiclePlate: null,
        vehicleType: null,
        vehicleSource: null,
        vehicleWidth: null,
        vehicleLength: null,
        vehicleHeight: null,
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
      this.ids = selection.map(item => item.vehicleId)
      this.single = selection.length !== 1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加运输工具信息主";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const vehicleId = row.vehicleId || this.ids
      getWmsVehicle(vehicleId).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改运输工具信息主";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.vehicleId != null) {
            updateWmsVehicle(this.form).then(response => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addWmsVehicle(this.form).then(response => {
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
  }
};
</script>
