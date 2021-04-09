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
            <el-form-item label="配载编码" prop="stowageCode">
              <el-input
                v-model="queryParams.stowageCode"
                placeholder="请输入配载编码"
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
          <ICol>
            <el-form-item label="发出站点" prop="departure">
              <el-input
                v-model="queryParams.departure"
                placeholder="请输入发出站点"
                clearable
                size="small"
                @keyup.enter.native="handleQuery"
              />
            </el-form-item>
          </ICol>
          <ICol>
            <el-form-item label="发出站点名" prop="departureName">
              <el-input
                v-model="queryParams.departureName"
                placeholder="请输入发出站点名"
                clearable
                size="small"
                @keyup.enter.native="handleQuery"
              />
            </el-form-item>
          </ICol>
          <ICol>
            <el-form-item label="发车批次" prop="departureCode">
              <el-input
                v-model="queryParams.departureCode"
                placeholder="请输入发车批次"
                clearable
                size="small"
                @keyup.enter.native="handleQuery"
              />
            </el-form-item>
          </ICol>
          <ICol>
            <el-form-item label="发车司机ID" prop="departureDriverId">
              <el-input
                v-model="queryParams.departureDriverId"
                placeholder="请输入发车司机ID"
                clearable
                size="small"
                @keyup.enter.native="handleQuery"
              />
            </el-form-item>
          </ICol>
          <ICol>
            <el-form-item label="发车司机名" prop="departureDriverName">
              <el-input
                v-model="queryParams.departureDriverName"
                placeholder="请输入发车司机名"
                clearable
                size="small"
                @keyup.enter.native="handleQuery"
              />
            </el-form-item>
          </ICol>
          <ICol>
            <el-form-item label="发车车ID" prop="departureVehicleId">
              <el-input
                v-model="queryParams.departureVehicleId"
                placeholder="请输入发车车ID"
                clearable
                size="small"
                @keyup.enter.native="handleQuery"
              />
            </el-form-item>
          </ICol>
          <ICol>
            <el-form-item label="发车车编码" prop="departureVehicleCode">
              <el-input
                v-model="queryParams.departureVehicleCode"
                placeholder="请输入发车车编码"
                clearable
                size="small"
                @keyup.enter.native="handleQuery"
              />
            </el-form-item>
          </ICol>
          <ICol>
            <el-form-item label="发车车牌号" prop="departureVehiclePlate">
              <el-input
                v-model="queryParams.departureVehiclePlate"
                placeholder="请输入发车车牌号"
                clearable
                size="small"
                @keyup.enter.native="handleQuery"
              />
            </el-form-item>
          </ICol>
          <ICol>
            <el-form-item label="发车时间" prop="departureTime">
              <el-date-picker clearable size="small"
                              v-model="queryParams.departureTime"
                              type="date"
                              value-format="yyyy-MM-dd"
                              placeholder="选择发车时间">
              </el-date-picker>
            </el-form-item>
          </ICol>
          <ICol>
            <el-form-item label="目的地站点" prop="destination">
              <el-input
                v-model="queryParams.destination"
                placeholder="请输入目的地站点"
                clearable
                size="small"
                @keyup.enter.native="handleQuery"
              />
            </el-form-item>
          </ICol>
          <ICol>
            <el-form-item label="目的地站点名" prop="destinationName">
              <el-input
                v-model="queryParams.destinationName"
                placeholder="请输入目的地站点名"
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
            v-hasPermi="['wms:stowage:add']"
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
            v-hasPermi="['wms:stowage:edit']"
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
            v-hasPermi="['wms:stowage:remove']"
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
            v-hasPermi="['wms:stowage:export']"
          >导出
          </el-button>
        </el-col>
        <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
      </el-row>
    </el-card>
    <el-card :body-style="{padding:'15px'}">
      <el-table v-loading="loading" :data="stowageList" @selection-change="handleSelectionChange">
        <el-table-column align="center" fixed type="selection" width="55"/>
        <el-table-column align="center" fixed label="序号" type="index" width="60"/>
        <el-table-column label="配载编码" show-overflow-tooltip width="150" align="center" prop="stowageCode">
          <template slot-scope="{row}">
            {{row.stowageCode}}
          </template>
        </el-table-column>
        <el-table-column label="配载站点名" show-overflow-tooltip width="150" align="center" prop="stowageWarehouseName">
          <template slot-scope="{row}">
            {{row.stowageWarehouseName}}
          </template>
        </el-table-column>
        <el-table-column label="发出站点" show-overflow-tooltip width="150" align="center" prop="departure">
          <template slot-scope="{row}">
            {{row.departure}}
          </template>
        </el-table-column>
        <el-table-column label="发出站点名" show-overflow-tooltip width="150" align="center" prop="departureName">
          <template slot-scope="{row}">
            {{row.departureName}}
          </template>
        </el-table-column>
        <el-table-column label="发车批次" show-overflow-tooltip width="150" align="center" prop="departureCode">
          <template slot-scope="{row}">
            {{row.departureCode}}
          </template>
        </el-table-column>
        <el-table-column label="发车司机ID" show-overflow-tooltip width="150" align="center" prop="departureDriverId">
          <template slot-scope="{row}">
            {{row.departureDriverId}}
          </template>
        </el-table-column>
        <el-table-column label="发车司机名" show-overflow-tooltip width="150" align="center" prop="departureDriverName">
          <template slot-scope="{row}">
            {{row.departureDriverName}}
          </template>
        </el-table-column>
        <el-table-column label="发车车ID" show-overflow-tooltip width="150" align="center" prop="departureVehicleId">
          <template slot-scope="{row}">
            {{row.departureVehicleId}}
          </template>
        </el-table-column>
        <el-table-column label="发车车编码" show-overflow-tooltip width="150" align="center" prop="departureVehicleCode">
          <template slot-scope="{row}">
            {{row.departureVehicleCode}}
          </template>
        </el-table-column>
        <el-table-column label="发车车牌号" show-overflow-tooltip width="150" align="center" prop="departureVehiclePlate">
          <template slot-scope="{row}">
            {{row.departureVehiclePlate}}
          </template>
        </el-table-column>
        <el-table-column label="发车时间" show-overflow-tooltip align="center" prop="departureTime" width="180">
          <template slot-scope="scope">
            <span>{{ parseTime(scope.row.departureTime, '{y}-{m}-{d}') }}</span>
          </template>
        </el-table-column>
        <el-table-column label="目的地站点" show-overflow-tooltip width="150" align="center" prop="destination">
          <template slot-scope="{row}">
            {{row.destination}}
          </template>
        </el-table-column>
        <el-table-column label="目的地站点名" show-overflow-tooltip width="150" align="center" prop="destinationName">
          <template slot-scope="{row}">
            {{row.destinationName}}
          </template>
        </el-table-column>
        <el-table-column label="部门ID" show-overflow-tooltip width="150" align="center" prop="deptId">
          <template slot-scope="{row}">
            {{row.deptId}}
          </template>
        </el-table-column>
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
              v-hasPermi="['wms:stowage:edit']"
            >修改
            </el-button>
            <el-button
              size="mini"
              type="text"
              icon="el-icon-delete"
              @click="handleDelete(scope.row)"
              v-hasPermi="['wms:stowage:remove']"
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
    <!-- 添加或修改运单配载对话框 -->
    <el-dialog :title="title" fullscreen :visible.sync="open" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-row :gutter="24">
          <ICol>
            <el-form-item label="配载编码" prop="stowageCode">
              <el-input v-model="form.stowageCode" placeholder="请输入配载编码"/>
            </el-form-item>
          </ICol>
          <ICol>
            <el-form-item label="配载站点名" prop="stowageWarehouseName">
              <el-input v-model="form.stowageWarehouseName" placeholder="请输入配载站点名"/>
            </el-form-item>
          </ICol>
          <ICol>
            <el-form-item label="发出站点" prop="departure">
              <el-input v-model="form.departure" placeholder="请输入发出站点"/>
            </el-form-item>
          </ICol>
          <ICol>
            <el-form-item label="发出站点名" prop="departureName">
              <el-input v-model="form.departureName" placeholder="请输入发出站点名"/>
            </el-form-item>
          </ICol>
          <ICol>
            <el-form-item label="发车批次" prop="departureCode">
              <el-input v-model="form.departureCode" placeholder="请输入发车批次"/>
            </el-form-item>
          </ICol>
          <ICol>
            <el-form-item label="发车司机ID" prop="departureDriverId">
              <el-input v-model="form.departureDriverId" placeholder="请输入发车司机ID"/>
            </el-form-item>
          </ICol>
          <ICol>
            <el-form-item label="发车司机名" prop="departureDriverName">
              <el-input v-model="form.departureDriverName" placeholder="请输入发车司机名"/>
            </el-form-item>
          </ICol>
          <ICol>
            <el-form-item label="发车车ID" prop="departureVehicleId">
              <el-input v-model="form.departureVehicleId" placeholder="请输入发车车ID"/>
            </el-form-item>
          </ICol>
          <ICol>
            <el-form-item label="发车车编码" prop="departureVehicleCode">
              <el-input v-model="form.departureVehicleCode" placeholder="请输入发车车编码"/>
            </el-form-item>
          </ICol>
          <ICol>
            <el-form-item label="发车车牌号" prop="departureVehiclePlate">
              <el-input v-model="form.departureVehiclePlate" placeholder="请输入发车车牌号"/>
            </el-form-item>
          </ICol>
          <ICol>
            <el-form-item label="发车时间" prop="departureTime">
              <el-date-picker clearable size="small"
                              v-model="form.departureTime"
                              type="date"
                              value-format="yyyy-MM-dd"
                              placeholder="选择发车时间">
              </el-date-picker>
            </el-form-item>
          </ICol>
          <ICol>
            <el-form-item label="目的地站点" prop="destination">
              <el-input v-model="form.destination" placeholder="请输入目的地站点"/>
            </el-form-item>
          </ICol>
          <ICol>
            <el-form-item label="目的地站点名" prop="destinationName">
              <el-input v-model="form.destinationName" placeholder="请输入目的地站点名"/>
            </el-form-item>
          </ICol>
          <ICol>
            <el-form-item label="部门ID" prop="deptId">
              <el-input v-model="form.deptId" placeholder="请输入部门ID"/>
            </el-form-item>
          </ICol>
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
import {addWmsStowage, delWmsStowage, getWmsStowage, listWmsStowage, updateWmsStowage} from "@/api/wms/WmsStowage";
import ICol from "@/components/ICol";

export default {
  name: "Stowage",
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
      // 运单配载表格数据
      stowageList: [],
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
        stowageCode: null,
        stowageWarehouseName: null,
        departure: null,
        departureName: null,
        departureCode: null,
        departureDriverId: null,
        departureDriverName: null,
        departureVehicleId: null,
        departureVehicleCode: null,
        departureVehiclePlate: null,
        departureTime: null,
        destination: null,
        destinationName: null,
        deptId: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        stowageCode: [
          {required: true, message: "配载编码不能为空", trigger: "blur"}
        ],
        departure: [
          {required: true, message: "发出站点不能为空", trigger: "blur"}
        ],
        departureName: [
          {required: true, message: "发出站点名不能为空", trigger: "blur"}
        ],
        departureCode: [
          {required: true, message: "发车批次不能为空", trigger: "blur"}
        ],
        destination: [
          {required: true, message: "目的地站点不能为空", trigger: "blur"}
        ],
        destinationName: [
          {required: true, message: "目的地站点名不能为空", trigger: "blur"}
        ],
      },
      toggleSearchFormValue: 0,
    };
  },
  created() {
    this.getList();
    this.getDicts("sys_common_status").then(response => {
      this.statusOptions = response.data;
    });
  },
  methods: {
    /** 查询运单配载列表 */
    getList() {
      this.loading = true;
      listWmsStowage(this.queryParams).then(response => {
        this.stowageList = response.rows;
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
        stowageId: null,
        stowageCode: null,
        stowageWarehouseName: null,
        departure: null,
        departureName: null,
        departureCode: null,
        departureDriverId: null,
        departureDriverName: null,
        departureVehicleId: null,
        departureVehicleCode: null,
        departureVehiclePlate: null,
        departureTime: null,
        destination: null,
        destinationName: null,
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
      this.ids = selection.map(item => item.stowageId)
      this.single = selection.length !== 1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加运单配载";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const stowageId = row.stowageId || this.ids
      getWmsStowage(stowageId).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改运单配载";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.stowageId != null) {
            updateWmsStowage(this.form).then(response => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addWmsStowage(this.form).then(response => {
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
      const stowageIds = row.stowageId || this.ids;
      this.$confirm('是否确认删除运单配载编号为"' + stowageIds + '"的数据项?', "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(function () {
        return delWmsStowage(stowageIds);
      }).then(() => {
        this.getList();
        this.msgSuccess("删除成功");
      })
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('wms/stowage/export', {
        ...this.queryParams
      }, `wms_stowage.xlsx`)
    },
    toggleSearchForm(toggle) {
      if (toggle >= 0) {
        this.toggleSearchFormValue = toggle;
      }
    },
  }
};
</script>
