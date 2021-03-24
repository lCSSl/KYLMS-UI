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
      <el-form v-show="showSearch" ref="queryForm" :model="queryParams" label-position="left" label-width="100px">
        <el-row :gutter="24">
          <ICol>
            <el-form-item label="站点编码" prop="warehouseCode">
              <el-input
                v-model="queryParams.warehouseCode"
                clearable
                placeholder="请输入站点编码"
                size="small"
                @keyup.enter.native="handleQuery"
              />
            </el-form-item>
          </ICol>
          <ICol>
            <el-form-item label="站点名" prop="warehouseName">
              <el-input
                v-model="queryParams.warehouseName"
                clearable
                placeholder="请输入站点名"
                size="small"
                @keyup.enter.native="handleQuery"
              />
            </el-form-item>
          </ICol>
          <ICol>
            <el-form-item label="归属部门" prop="deptId">
              <TreeSelect v-model="queryParams.deptId" :options="deptOptions" :show-count="true"
                          placeholder="请选择归属部门" @select="handleQueryParamsDeptIdClick"/>
            </el-form-item>
          </ICol>
          <ICol>
            <el-form-item label="站点主管" prop="warehouseInCharge">
              <el-select v-model="queryParams.warehouseInCharge"
                         :disabled="!this.queryParams.warehouseInChargeOptions.length > 0" placeholder="请选择站点主管"
                         size="small"
                         @keyup.enter.native="handleQuery">
                <el-option v-for="(item,index) in queryParams.warehouseInChargeOptions" :key="index"
                           :label="item.nickName"
                           :value="item.userId"/>
              </el-select>
            </el-form-item>
          </ICol>
          <template v-if="toggleSearchFormValue>=1">
            <ICol :grid="regionSelectGrid">
              <el-form-item>
                <regionSelect v-model="queryParams.regionSelectValue" :level="3"
                              @on-change="updateQueryParamsRegionSelectValue"/>
              </el-form-item>
            </ICol>
            <ICol>
              <el-form-item label="站点类型" prop="warehouseType">
                <el-select v-model="queryParams.warehouseType" clearable placeholder="请选择站点类型" size="small">
                  <el-option
                    v-for="dict in warehouseTypeOptions"
                    :key="dict.dictValue"
                    :label="dict.dictLabel"
                    :value="dict.dictValue"
                  />
                </el-select>
              </el-form-item>
            </ICol>
            <ICol>
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
            </ICol>
          </template>
          <template v-if="toggleSearchFormValue>=2">
            <ICol>
              <el-form-item label="站点面积" prop="warehouseArea">
                <el-input
                  v-model="queryParams.warehouseArea"
                  clearable
                  placeholder="请输入站点面积"
                  size="small"
                  @keyup.enter.native="handleQuery"
                />
              </el-form-item>
            </ICol>
            <ICol>
              <el-form-item label="站点面积长" prop="warehouseAreaX">
                <el-input
                  v-model="queryParams.warehouseAreaX"
                  clearable
                  placeholder="请输入站点面积长"
                  size="small"
                  @keyup.enter.native="handleQuery"
                />
              </el-form-item>
            </ICol>
            <ICol>
              <el-form-item label="站点面积宽" prop="warehouseAreaY">
                <el-input
                  v-model="queryParams.warehouseAreaY"
                  clearable
                  placeholder="请输入站点面积宽"
                  size="small"
                  @keyup.enter.native="handleQuery"
                />
              </el-form-item>
            </ICol>
            <ICol>
              <el-form-item label="站点详细地址" prop="warehouseAddress">
                <el-input
                  v-model="queryParams.warehouseAddress"
                  clearable
                  placeholder="请输入站点详细地址"
                  size="small"
                  @keyup.enter.native="handleQuery"
                />
              </el-form-item>
            </ICol>
          </template>
          <!--<ICol>
            <el-form-item label="省市区街道" prop="provinceCityDistrictStreet">
              <el-input
                v-model="queryParams.provinceCityDistrictStreet"
                clearable
                placeholder="请输入省市区街道"
                size="small"
                @keyup.enter.native="handleQuery"
              />
            </el-form-item>
          </ICol>
          <ICol>
            <el-form-item label="省代码" prop="provinceCode">
              <el-input
                v-model="queryParams.provinceCode"
                clearable
                placeholder="请输入省代码"
                size="small"
                @keyup.enter.native="handleQuery"
              />
            </el-form-item>
          </ICol>
          <ICol>
            <el-form-item label="市代码" prop="cityCode">
              <el-input
                v-model="queryParams.cityCode"
                clearable
                placeholder="请输入市代码"
                size="small"
                @keyup.enter.native="handleQuery"
              />
            </el-form-item>
          </ICol>
          <ICol>
            <el-form-item label="区代码" prop="districtCode">
              <el-input
                v-model="queryParams.districtCode"
                clearable
                placeholder="请输入区代码"
                size="small"
                @keyup.enter.native="handleQuery"
              />
            </el-form-item>
          </ICol>
          <ICol>
            <el-form-item label="街道代码" prop="streetCode">
              <el-input
                v-model="queryParams.streetCode"
                clearable
                placeholder="请输入街道代码"
                size="small"
                @keyup.enter.native="handleQuery"
              />
            </el-form-item>
          </ICol>
          -->
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
            v-hasPermi="['wms:warehouse:add']"
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
            v-hasPermi="['wms:warehouse:edit']"
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
            v-hasPermi="['wms:warehouse:remove']"
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
            v-hasPermi="['wms:warehouse:export']"
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
      <el-table v-loading="loading" :data="warehouseList" @selection-change="handleSelectionChange">
        <el-table-column align="center" fixed type="selection" width="55"/>
        <el-table-column align="center" fixed label="序号" type="index" width="60"/>
        <!--        <el-table-column align="center"  label="站点ID" prop="warehouseId">-->
        <!--          <template slot-scope="{row}">-->
        <!--            {{row.warehouseId}}-->
        <!--          </template>-->
        <!--        </el-table-column>-->
        <el-table-column align="center" label="站点编码" prop="warehouseCode">
          <template slot-scope="{row}">
            {{row.warehouseCode}}
          </template>
        </el-table-column>
        <el-table-column align="center" label="站点名" prop="warehouseName" show-overflow-tooltip show-overflow-tooltip>
          <template slot-scope="{row}">
            {{row.warehouseName}}
          </template>
        </el-table-column>
        <el-table-column align="center" label="站点主管" prop="warehouseInChargeName">
          <template slot-scope="{row}">
            {{row.warehouseInChargeName}}
          </template>
        </el-table-column>
        <el-table-column :formatter="warehouseTypeFormat" align="center" label="站点类型" prop="warehouseType"/>
        <el-table-column align="center" label="站点面积" prop="warehouseArea">
          <template slot-scope="{row}">
            {{row.warehouseArea}}
          </template>
        </el-table-column>
        <el-table-column align="center" label="站点面积长" prop="warehouseAreaX">
          <template slot-scope="{row}">
            {{row.warehouseAreaX}}
          </template>
        </el-table-column>
        <el-table-column align="center" label="站点面积宽" prop="warehouseAreaY">
          <template slot-scope="{row}">
            {{row.warehouseAreaY}}
          </template>
        </el-table-column>
        <el-table-column align="center" label="站点详细地址" prop="warehouseAddress" show-overflow-tooltip width="100">
          <template slot-scope="{row}">
            {{row.warehouseAddress}}
          </template>
        </el-table-column>
        <el-table-column align="center" label="省市区街道" prop="provinceCityDistrictStreet" show-overflow-tooltip
                         width="100">
          <template slot-scope="{row}">
            {{row.provinceCityDistrictStreet}}
          </template>
        </el-table-column>
        <!--        <el-table-column align="center" label="省代码" prop="provinceCode">-->
        <!--          <template slot-scope="{row}">-->
        <!--            {{row.provinceCode}}-->
        <!--          </template>-->
        <!--        </el-table-column>-->
        <!--        <el-table-column align="center" label="市代码" prop="cityCode">-->
        <!--          <template slot-scope="{row}">-->
        <!--            {{row.cityCode}}-->
        <!--          </template>-->
        <!--        </el-table-column>-->
        <!--        <el-table-column align="center" label="区代码" prop="districtCode">-->
        <!--          <template slot-scope="{row}">-->
        <!--            {{row.districtCode}}-->
        <!--          </template>-->
        <!--        </el-table-column>-->
        <!--        <el-table-column align="center" label="街道代码" prop="streetCode">-->
        <!--          <template slot-scope="{row}">-->
        <!--            {{row.streetCode}}-->
        <!--          </template>-->
        <!--        </el-table-column>-->
        <el-table-column align="center" label="部门" prop="deptName">
          <template slot-scope="{row}">
            {{row.deptName}}
          </template>
        </el-table-column>
        <el-table-column :formatter="statusFormat" align="center" label="状态" prop="status"/>
        <el-table-column align="center" label="备注" prop="remark">
          <template slot-scope="{row}">
            {{row.remark}}
          </template>
        </el-table-column>
        <el-table-column align="center" class-name="small-padding fixed-width" fixed="right" label="操作" width="200">
          <template slot-scope="{row}">
            <el-button
              v-hasPermi="['wms:warehouse:edit']"
              icon="el-icon-view"
              size="mini"
              type="text">
              <router-link :to="$route.path+'/WmsWarehouseExtItem/' + row. warehouseId" class="link-type">
                <span>仓库预览</span>
              </router-link>
            </el-button>
            <el-button
              v-hasPermi="['wms:warehouse:edit']"
              icon="el-icon-edit"
              size="mini"
              type="text"
              @click="handleUpdate(row)">
              修改
            </el-button>
            <el-button
              v-hasPermi="['wms:warehouse:remove']"
              icon="el-icon-delete"
              size="mini"
              type="text"
              @click="handleDelete(row)"
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
    <!-- 添加或修改站点(仓库)信息对话框 -->
    <el-dialog :title="dialog.title" :visible.sync="dialog.open" append-to-body fullscreen>
      <el-form ref="form" :model="form" :rules="rules" label-position="top" label-width="100px">
        <el-row :gutter="24">
          <ICol v-if="readOnly">
            <el-form-item label="站点编码" prop="warehouseCode">
              <el-input v-model="form.warehouseCode" :readonly="readOnly" placeholder="请输入站点编码"/>
            </el-form-item>
          </ICol>
          <ICol>
            <el-form-item label="站点名" prop="warehouseName">
              <el-input v-model="form.warehouseName" placeholder="请输入站点名"/>
            </el-form-item>
          </ICol>
          <ICol>
            <el-form-item label="归属部门" prop="deptId">
              <TreeSelect v-model="form.deptId" :options="deptOptions" :show-count="true"
                          placeholder="请选择归属部门" @select="handleFormDeptIdClick"/>
            </el-form-item>
          </ICol>
          <ICol>
            <el-form-item label="站点主管" prop="warehouseInCharge">
              <el-select v-model="form.warehouseInCharge" :disabled="checkWarehouseInChargeOptions"
                         placeholder="请选择站点主管">
                <el-option v-for="(item,index) in warehouseInChargeOptions" :key="index" :label="item.nickName"
                           :value="item.userId"/>
              </el-select>
            </el-form-item>
          </ICol>
        </el-row>
        <el-row :gutter="24">
          <ICol>
            <el-form-item label="站点面积" prop="warehouseArea">
              <el-input v-model="form.warehouseArea" :disabled="true" placeholder="请输入站点面积"/>
            </el-form-item>
          </ICol>
          <ICol>
            <el-form-item label="站点面积长" prop="warehouseAreaX">
              <el-input-number v-model="form.warehouseAreaX" :disabled="false" :min="1" :precision="2"
                               :step="0.1" @change="calculateArea"></el-input-number>
            </el-form-item>
          </ICol>
          <ICol>
            <el-form-item label="站点面积宽" prop="warehouseAreaY">
              <el-input-number v-model="form.warehouseAreaY" :disabled="false" :min="1" :precision="2"
                               :step="0.1" @change="calculateArea"></el-input-number>
            </el-form-item>
          </ICol>
          <ICol>
            <el-form-item label="站点类型" prop="warehouseType">
              <el-select v-model="form.warehouseType" placeholder="请选择站点类型">
                <el-option
                  v-for="dict in warehouseTypeOptions"
                  :key="dict.dictValue"
                  :label="dict.dictLabel"
                  :value="dict.dictValue"
                ></el-option>
              </el-select>
            </el-form-item>
          </ICol>
        </el-row>
        <el-row :gutter="24">
          <ICol>
            <el-form-item label="行政区" prop="provinceCityDistrictStreet">
              <regionSelect v-model="form.regionSelectValue" :level="3"
                            @on-change="updateRegionSelectValue"/>
            </el-form-item>
          </ICol>
          <ICol>
            <el-form-item label="省市区街道" prop="provinceCityDistrictStreetS">
              <el-input v-model="form.provinceCityDistrictStreet" placeholder="请输入省市区街道" readonly/>
            </el-form-item>
          </ICol>
          <ICol>
            <el-form-item label="站点详细地址" prop="warehouseAddress">
              <el-input v-model="form.warehouseAddress" placeholder="请输入站点详细地址"/>
            </el-form-item>
          </ICol>

          <!--          <ICol>-->
          <!--            <el-form-item label="省代码" prop="provinceCode">-->
          <!--              <el-input v-model="form.provinceCode" placeholder="请输入省代码"/>-->
          <!--            </el-form-item>-->
          <!--          </ICol>-->
          <!--          <ICol>-->
          <!--            <el-form-item label="市代码" prop="cityCode">-->
          <!--              <el-input v-model="form.cityCode" placeholder="请输入市代码"/>-->
          <!--            </el-form-item>-->
          <!--          </ICol>-->
          <!--          <ICol>-->
          <!--            <el-form-item label="区代码" prop="districtCode">-->
          <!--              <el-input v-model="form.districtCode" placeholder="请输入区代码"/>-->
          <!--            </el-form-item>-->
          <!--          </ICol>-->
          <!--          <ICol>-->
          <!--            <el-form-item label="街道代码" prop="streetCode">-->
          <!--              <el-input v-model="form.streetCode" placeholder="请输入街道代码"/>-->
          <!--            </el-form-item>-->
          <!--          </ICol>-->
          <ICol>
            <el-form-item label="备注" prop="remark">
              <el-input v-model="form.remark" placeholder="请输入备注"/>
            </el-form-item>
          </ICol>
        </el-row>
        <el-row :gutter="24">
          <ICol>
            <el-form-item label="状态">
              <el-radio-group v-model="form.status">
                <el-radio
                  v-for="dict in statusOptions"
                  :key="dict.dictValue"
                  :label="dict.dictValue">
                  {{dict.dictLabel}}
                </el-radio>
              </el-radio-group>
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
  addWarehouse,
  delWarehouse,
  getWarehouse,
  getWarehouseInChargeList,
  listWarehouse,
  updateWarehouse
} from "@/api/wms/warehouse";
import {multiply,divide} from '@/utils/number/math'
import ICol from "@/components/ICol";
import {treeselect} from "@/api/system/dept";
import TreeSelect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
import RegionSelect from "@/components/regionSelect/index";
import {listUser} from "@/api/system/user";
import Ellipsis from "@/components/Ellipsis/index";

export default {
  name: "Warehouse",
  components: {
    Ellipsis,
    RegionSelect,
    ICol,
    TreeSelect
  },
  computed: {
    checkWarehouseInChargeOptions() {
      return !this.warehouseInChargeOptions.length > 0;
    },
    readOnly() {
      return this.dialog.type != 0;
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
      // 站点(仓库)信息表格数据
      warehouseList: [],
      // 弹出层标题
      dialog: {
        title: "",
        type: 0,
        open: false,
      },
      // 是否显示弹出层
      // 站点类型字典
      warehouseTypeOptions: [],
      warehouseInChargeOptions: [],
      // 状态字典
      statusOptions: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        warehouseCode: null,
        warehouseName: null,
        warehouseInCharge: null,
        warehouseInChargeOptions: [],
        warehouseType: null,
        warehouseArea: null,
        warehouseAreaX: null,
        warehouseAreaY: null,
        warehouseAddress: null,
        provinceCityDistrictStreet: null,
        provinceCode: null,
        cityCode: null,
        districtCode: null,
        streetCode: null,
        deptId: null,
        status: null,
        regionSelectValue: {},
        regionSelectStatus: false,
      },
      // 表单参数
      form: {},
      regionSelectGrid: {
        gutter: 10,
        xs: {span: 24, offset: 0},
        sm: {span: 24, offset: 0},
        md: {span: 12, offset: 0},
        lg: {span: 12, offset: 0},
        xl: {span: 12, offset: 0}
      },
      // 部门树选项
      deptOptions: [],
      // 表单校验
      rules: {
        warehouseCode: [
          {required: true, message: "站点编码不能为空", trigger: "blur"}
        ],
        warehouseName: [
          {required: true, message: "站点名不能为空", trigger: "blur"}
        ],
        warehouseType: [
          {required: true, message: "站点类型不能为空", trigger: "change"}
        ],
        warehouseArea: [
          {required: true, message: "站点面积不能为空", trigger: "blur"}
        ],
        warehouseAreaX: [
          {required: true, message: "站点面积长不能为空", trigger: "blur"}
        ],
        warehouseAreaY: [
          {required: true, message: "站点面积宽不能为空", trigger: "blur"}
        ],
        provinceCityDistrictStreet: [
          {required: true, message: "行政区选择不为空", trigger: "blur"}
        ],
      },
      toggleSearchFormValue: 0,
    };
  },
  created() {
    this.getList();
    this.getTreeSelect();
    this.getDicts("wms_warehouse_type").then(response => {
      this.warehouseTypeOptions = response.data;
    });
    this.getDicts("sys_common_status").then(response => {
      this.statusOptions = response.data;
    });
  },
  methods: {
    /** 查询站点(仓库)信息列表 */
    getList() {
      this.loading = true;
      listWarehouse(this.queryParams).then(response => {
        this.warehouseList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 站点类型字典翻译
    warehouseTypeFormat(row, column) {
      return this.selectDictLabel(this.warehouseTypeOptions, row.warehouseType);
    },

    // 状态字典翻译
    statusFormat(row, column) {
      return this.selectDictLabel(this.statusOptions, row.status);
    },
    // 取消按钮
    cancel() {
      this.dialog.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        warehouseId: null,
        warehouseCode: null,
        warehouseName: null,
        warehouseInCharge: null,
        warehouseType: null,
        warehouseArea: null,
        warehouseAreaX: null,
        warehouseAreaY: null,
        warehouseAddress: null,
        provinceCityDistrictStreet: null,
        provinceCode: null,
        cityCode: null,
        districtCode: null,
        streetCode: null,
        deptId: null,
        status: "0",
        delFlag: null,
        createBy: null,
        createTime: null,
        updateBy: null,
        updateTime: null,
        regionSelectValue: {},
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
      this.ids = selection.map(item => item.warehouseId)
      this.single = selection.length !== 1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.getTreeSelect();
      this.dialog.open = true;
      this.dialog.title = "添加站点(仓库)信息";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      this.getTreeSelect();
      const warehouseId = row.warehouseId || this.ids
      getWarehouse(warehouseId).then(response => {
        const data = this.form = response.data;
        this.getUserInTheDepartment(data.deptId, 0, 1);
        this.form.warehouseInCharge = +this.form.warehouseInCharge;
        this.form.regionSelectValue = {
          level: 0,
          code: data.provinceCode,
          parentCode: 0,
          child: {
            level: 1,
            code: data.cityCode,
            parentCode: data.provinceCode,
            child: {
              level: 2,
              code: data.districtCode,
              parentCode: data.cityCode,
              child: {
                level: 3,
                code: data.streetCode,
                parentCode: data.districtCode,
              },
            },
          },
        };
        this.dialog.open = true;
        this.dialog.type = 1;
        this.dialog.title = "修改站点(仓库)信息";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          const form = this.form;
          const {provinceCode, cityCode, districtCode, streetCode} = form.regionSelectValue;
          form.provinceCode = provinceCode
          form.cityCode = cityCode
          form.districtCode = districtCode
          form.streetCode = streetCode
          if (form.warehouseId != null) {
            updateWarehouse(form).then(response => {
              this.msgSuccess("修改成功");
              this.form.open = false;
              this.getList();
            });
          } else {
            addWarehouse(form).then(response => {
              this.msgSuccess("新增成功");
              this.form.open = false;
              this.getList();
            });
          }
        }
      });
    },
    handleQueryParamsDeptIdClick({id, orderNum}) {
      this.queryParams.warehouseInCharge = '';
      this.getUserInTheDepartment(id, orderNum, 0);
    },
    handleFormDeptIdClick({id, orderNum}) {
      this.form.warehouseInCharge = '';
      this.getUserInTheDepartment(id, orderNum, 1);
    },
    getUserInTheDepartment(deptId, orderNum, type) {
      if (deptId && +orderNum >= 0)
        listUser({deptId}).then(res => {
          switch (+type) {
            case 0:
              this.queryParams.warehouseInChargeOptions = res.rows;
              break;
            case 1:
              this.warehouseInChargeOptions = res.rows;
              break;
          }
        });
      else {
        return;
      }
    },
    getUserInChargeWarehouse() {
      getWarehouseInChargeList().then(res => {
        this.queryParams.warehouseInChargeOptions = res.data;
      })
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const warehouseIds = row.warehouseId || this.ids;
      this.$confirm('是否确认删除站点(仓库)信息编号为"' + warehouseIds + '"的数据项?', "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(function () {
        return delWarehouse(warehouseIds);
      }).then(() => {
        this.getList();
        this.msgSuccess("删除成功");
      })
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('wms/warehouse/export', {
        ...this.queryParams
      }, `wms_warehouse.xlsx`)
    },
    /** 查询部门下拉树结构 */
    getTreeSelect() {
      treeselect().then(response => {
        this.deptOptions = response.data;
      });
    },
    updateRegionSelectValue(data, label, status) {
      this.form.regionSelectValue = data
      this.form.regionSelectStatus = status;
      if (status) {
        this.form.provinceCityDistrictStreet = label;
        this.$refs["form"].validateField('provinceCityDistrictStreet');
      } else {
        this.form.provinceCityDistrictStreet = '';
      }
    },
    updateQueryParamsRegionSelectValue(data, label, status) {
      this.queryParams.regionSelectValue = data
      this.queryParams.regionSelectStatus = status;
    },
    toggleSearchForm(toggle) {
      if (toggle >= 0) {
        this.toggleSearchFormValue = toggle;
      }
    },
    calculateArea() {
      this.form.warehouseArea = multiply(this.form.warehouseAreaX,this.form.warehouseAreaY);
    },
  }
};
</script>
