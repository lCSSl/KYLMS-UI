<template>
  <el-card :body-style="{padding:'15px'}">
    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          v-hasPermi="['wms:WmsCargoTemp:add']"
          icon="el-icon-plus"
          plain
          size="mini"
          type="primary"
          @click="handleAddRow">
          新增
        </el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-table v-loading="loading" :data="WmsCargoTempList" @selection-change="handleSelectionChange">
        <el-table-column align="center" fixed type="selection" width="55"/>
        <el-table-column align="center" fixed label="序号" type="index" width="60"/>
        <el-table-column align="center" label="品名" prop="tCargoName" show-overflow-tooltip width="150">
          <template slot-scope="{row}">
            {{row.tCargoName}}
          </template>
        </el-table-column>
        <el-table-column :formatter="packageTypeFormat" align="center" label="包装方式" prop="packageType"
                         show-overflow-tooltip
                         width="150"/>
        <el-table-column align="center" label="件数" prop="tCargoCount" show-overflow-tooltip width="150">
          <template slot-scope="{row}">
            {{row.tCargoCount}}
          </template>
        </el-table-column>
        <el-table-column :formatter="valuationTypeFormat" align="center" label="计价方式" prop="valuationType"
                         show-overflow-tooltip
                         width="150"/>
        <el-table-column align="center" label="计价值" prop="valuationValue" show-overflow-tooltip width="150">
          <template slot-scope="{row}">
            {{row.valuationValue}}
          </template>
        </el-table-column>
        <el-table-column align="center" label="计量数" prop="valuationCount" show-overflow-tooltip width="150">
          <template slot-scope="{row}">
            {{row.valuationCount}}
          </template>
        </el-table-column>
        <el-table-column align="center" label="基础运费" prop="tCargoTotalFee" show-overflow-tooltip width="150">
          <template slot-scope="{row}">
            {{row.tCargoTotalFee}}
          </template>
        </el-table-column>
        <el-table-column :formatter="valuableFormat" align="center" label="贵重货物" prop="valuable" show-overflow-tooltip
                         width="150"/>
        <el-table-column :formatter="irregularFormat" align="center" label="异形货物" prop="irregular" show-overflow-tooltip
                         width="150"/>
        <el-table-column :formatter="documentsFormat" align="center" label="货物单据" prop="documents" show-overflow-tooltip
                         width="150"/>
        <el-table-column align="center" label="货物ID" prop="cargoId" show-overflow-tooltip width="150">
          <template slot-scope="{row}">
            {{row.cargoId}}
          </template>
        </el-table-column>
        <el-table-column align="center" label="运单ID" prop="waybillId" show-overflow-tooltip width="150">
          <template slot-scope="{row}">
            {{row.waybillId}}
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
              v-hasPermi="['wms:WmsCargoTemp:edit']"
              icon="el-icon-edit"
              size="mini"
              type="text"
              @click="handleUpdate(scope.row)"
            >修改
            </el-button>
            <el-button
              v-hasPermi="['wms:WmsCargoTemp:remove']"
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
        @pagination="getList"/>
    </el-row>
    <el-row>

    </el-row>
  </el-card>
</template>

<script>
import {
  addWmsCargoTemp,
  delWmsCargoTemp,
  getWmsCargoTemp,
  listWmsCargoTemp,
  updateWmsCargoTemp
} from "@/api/wms/WmsCargoTemp";
import ICol from "@/components/ICol";
import {cloneDeep} from 'lodash';

export default {
  name: "WmsCargoTemp",
  components: {
    ICol,
  },
  props: {
    value: {
      type: Object,
    },
  },
  watch: {
    value: {
      handler(val) {
        if (val !== this.row) {
          this.checkProps();
        }
      },
      immediate: true
    },
  },
  data() {
    return {
      maxAppendId:0,
      appendIds:[],
      waybill:{},
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
      // 运单货物临时表表格数据
      WmsCargoTempList: [],
      rowData: {},
      rowDataString:'',
      editing: false,
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 包装方式字典
      packageTypeOptions: [],
      // 计价方式字典
      valuationTypeOptions: [],
      // 贵重货物字典
      valuableOptions: [],
      // 异形货物字典
      irregularOptions: [],
      // 货物单据字典
      documentsOptions: [],
      // 状态字典
      statusOptions: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 3,
        tCargoName: null,
        packageType: null,
        tCargoCount: null,
        valuationType: null,
        valuationValue: null,
        valuationCount: null,
        tCargoTotalFee: null,
        valuable: null,
        irregular: null,
        documents: null,
        cargoId: null,
        waybillId: null,
        status: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        valuationType: [
          {required: true, message: "计价方式不能为空", trigger: "change"}
        ],
        valuationValue: [
          {required: true, message: "计价值不能为空", trigger: "blur"}
        ],
        valuationCount: [
          {required: true, message: "计量数不能为空", trigger: "blur"}
        ],
        tCargoTotalFee: [
          {required: true, message: "基础运费不能为空", trigger: "blur"}
        ],
      },
      toggleSearchFormValue: 0,
    };
  },
  methods: {
    /** 查询运单货物临时表列表 */
    getList() {
      this.loading = true;
      this.queryParams.waybillId=this.waybill.waybillId;
      listWmsCargoTemp(this.queryParams).then(({
           rows, total
        }) => {
        this.WmsCargoTempList = rows.map(item => {
          item.editable = false;
          return item
        });
        this.total = total;
        this.loading = false;
      });
    },

    handleGetRow(id) {
      return this.WmsCargoTempList.find(item => (item.id === id || item.isCreate));
    },
    handleClickEdit(id) {
      this.rowData = this.handleGetRow(id);
      this.editing = true;
      this.rowDataString = JSON.stringify({...this.rowData, editable: null});
      this.rowData.editable = !this.rowData.editable;
    },
    handleClickDisableOrEnable(id, status) {
    },
    recoveryState(data) {
      data.editable = !data.editable;
      this.rowData = data;
      this.editing = false;
    },
    handleClickSave() {
      const data = cloneDeep(this.rowData);
      data.editable = null;
      const editRowDataString = JSON.stringify(data);
      if (data.isCreate) {
        // addWmsCargoTemp({...data}).then(res => {
        //   this.recoveryState(data);
        // }).finally(() => {
        //   this.recoveryState(data);
        // });
        console.log('create');
      } else {
        console.log('edit');
        // if (editRowDataString !== this.rowDataString) {
        //   updateWmsCargoTemp(data).then(res => {
        //     this.recoveryState(data);
        //   }).finally(() => {
        //     this.recoveryState(data);
        //   })
        // }
      }
    },
    handleAddRow() {
      this.WmsCargoTempList.push({
        id:--this.maxAppendId,
        status: '0',
        editable: false,
        isCreate: true,
      });
      this.rowData = this.handleGetRow(-1);
      this.editing = true;
      this.rowDataString = JSON.stringify(this.rowData);
      this.rowData.editable = !this.rowData.editable;
    },
    // handleDelete (id) {
    //   this.editing = false;
    //   // this.rowData.editable = !this.rowData.editable;
    //   this.list.splice(this.list.indexOf(this.handleGetRow(id)), 1);
    // },

    // 包装方式字典翻译
    packageTypeFormat(row, column) {
      return this.selectDictLabel(this.packageTypeOptions, row.packageType);
    },
    // 计价方式字典翻译
    valuationTypeFormat(row, column) {
      return this.selectDictLabel(this.valuationTypeOptions, row.valuationType);
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
        id: null,
        tCargoName: null,
        packageType: null,
        tCargoCount: null,
        valuationType: null,
        valuationValue: null,
        valuationCount: null,
        tCargoTotalFee: null,
        valuable: null,
        irregular: null,
        documents: null,
        cargoId: null,
        waybillId: null,
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
      this.ids = selection.map(item => item.id)
      this.single = selection.length !== 1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加运单货物临时表";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getWmsCargoTemp(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改运单货物临时表";
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
      this.$confirm('是否确认删除运单货物临时表编号为"' + ids + '"的数据项?', "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(function () {
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
    init(){
      this.getList();
    },
    getDictMethods() {
      this.getDicts("wms_cargo_package_type").then(response => {
        this.packageTypeOptions = response.data;
      });
      this.getDicts("wms_waybill_billing_type").then(response => {
        this.valuationTypeOptions = response.data;
      });
      this.getDicts("public_common_yes_no").then(response => {
        this.valuableOptions = response.data;
        this.irregularOptions = response.data;
        this.documentsOptions = response.data;
      });
      this.getDicts("sys_common_status").then(response => {
        this.statusOptions = response.data;
      });
    },
    checkProps() {
      console.log('checkProps');
      if (this.value !== this.waybill) {
        this.waybill = this.value;
      }
      if (this.waybill.waybillId&&this.waybill.waybillId>0){
        this.init();
      }else {

        this.loading = false;
      }
    },
  },
  created() {
    this.getDictMethods();
    // this.getList();
  },
  mounted() {
  }
};
</script>
