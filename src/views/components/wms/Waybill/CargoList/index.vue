<template>
  <el-card :body-style="{padding:'15px'}">
    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          v-hasPermi="['wms:WmsCargoTemp:add']"
          :disabled="disable||readOnly"
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
      <el-table v-loading="loading" :data="WmsCargoTempList" :show-summary="true" :summary-method="getSummaries" border
                @selection-change="handleSelectionChange">
        <el-table-column align="center" fixed type="selection" width="55"/>
        <el-table-column align="center" fixed label="序号" type="index" prop="index" width="60"/>
        <el-table-column align="center" label="品名" prop="tcargoName" show-overflow-tooltip width="150">
          <template slot-scope="{row}">
            <el-input v-if="row.editable" v-model="rowData.tcargoName"/>
            <span v-else>{{row.tcargoName}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="包装方式" prop="packageType" width="150">
          <template slot-scope="{row}">
            <el-select v-if="row.editable" v-model="rowData.packageType" placeholder="请选择包装方式">
              <el-option
                v-for="(dict,index) in packageTypeOptions"
                :key="index"
                :label="dict.dictLabel"
                :value="dict.dictValue"/>
            </el-select>
            <span v-else>{{packageTypeFormat(row)}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="件数" prop="tcargoCount" width="150">
          <template slot-scope="{row}">
            <el-input-number v-if="row.editable" v-model="rowData.tcargoCount" :min="1" :precision="0" :step="1"
                             controls-position="right" size="small"/>
            <span v-else> {{row.tcargoCount}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="计价方式" prop="valuationType" width="150">
          <template slot-scope="{row}">
            <el-select v-if="row.editable" v-model="rowData.valuationType" placeholder="请选择包装方式">
              <el-option
                v-for="(dict,index) in valuationTypeOptions"
                :key="index"
                :label="dict.dictLabel"
                :value="dict.dictValue"/>
            </el-select>
            <span v-else>{{valuationTypeFormat(row)}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="计价值" prop="valuationValue" width="150">
          <template slot-scope="{row}">
            <el-input-number v-if="row.editable" v-model="rowData.valuationValue" :min="1" :precision="2" :step="0.1"
                             controls-position="right" size="small"/>
            <span v-else>{{row.valuationValue}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="计量数" prop="valuationCount" width="150">
          <template slot-scope="{row}">
            <el-input-number v-if="row.editable" v-model="rowData.valuationCount" :min="1" :precision="2" :step="0.1"
                             controls-position="right" size="small"/>
            <span v-else>{{row.valuationCount}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="基础运费" prop="tcargoTotalFee" width="150">
          <template slot-scope="{row}">
            {{row.tcargoTotalFee}}
          </template>
        </el-table-column>
        <el-table-column align="center" label="贵重货物" prop="valuable" width="150">
          <template slot-scope="{row}">
            <el-switch
              v-if="row.editable"
              active-value="1"
              inactive-value="0"
              v-model="rowData.valuable">
            </el-switch>
            <i v-else :class="valuableFormat(row)"></i>
<!--            <span v-else>{{valuableFormat(row)}}</span>-->
          </template>
        </el-table-column>
        <el-table-column align="center" label="异形货物" prop="irregular" width="150">
          <template slot-scope="{row}">
            <el-switch
              v-if="row.editable"
              active-value="1"
              inactive-value="0"
              v-model="rowData.irregular">
            </el-switch>
            <i v-else :class="irregularFormat(row)"></i>
<!--            <span v-else>{{irregularFormat(row)}}</span>-->
          </template>
        </el-table-column>
        <el-table-column align="center" label="货物单据" prop="documents" width="150">
          <template slot-scope="{row}">
            <el-switch
              v-if="row.editable"
              active-value="1"
              inactive-value="0"
              v-model="rowData.documents">
            </el-switch>
            <i v-else :class="documentsFormat(row)"></i>
<!--            <span v-else>{{documentsFormat(row)}}</span>-->
          </template>
        </el-table-column>
        <!--
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
        -->
        <el-table-column align="center" label="备注" prop="remark" show-overflow-tooltip width="150">
          <template slot-scope="{row}">
            <el-input v-if="row.editable" v-model="rowData.remark"/>
            <span v-else>{{row.remark}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" class-name="small-padding fixed-width" fixed="right" label="操作" prop="action"
                         width="200">
          <template slot-scope="{row}">
            <el-button
              v-hasPermi="['wms:WmsCargoTemp:edit']"
              :disabled="!row.editable||readOnly"
              icon="el-icon-edit"
              size="mini"
              type="text"
              @click="handleClickSave()">
              保存
            </el-button>
            <el-button
              v-hasPermi="['wms:WmsCargoTemp:edit']"
              :disabled="disable||readOnly"
              icon="el-icon-edit"
              size="mini"
              type="text"
              @click="handleClickEdit(row.id)">
              修改
            </el-button>
            <el-button
              v-hasPermi="['wms:WmsCargoTemp:remove']"
              :disabled="!row.editable||readOnly"
              icon="el-icon-delete"
              size="mini"
              type="text"
              @click="handleDelete(row)">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <el-row>

    </el-row>
  </el-card>
</template>

<script>
import {
  addWmsCargoTemp, addWmsCargoTempList,
  delWmsCargoTemp,
  getWmsCargoTemp,
  listWmsCargoTemp,
  updateWmsCargoTemp
} from "@/api/wms/WmsCargoTemp";
import ICol from "@/components/ICol";
import {cloneDeep} from 'lodash';
import {add, multiply} from "@/utils/number/math";

export default {
  name: "WmsCargoTemp",
  components: {
    ICol,
  },
  props: {
    value: {
      type: Object,
    },
    commitComplete:{
      type:Boolean,
      default:false
    }
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
    commitComplete: {
      handler(val) {
        if (val !== this.commit) {
          this.commit=val;
          if (this.commit){
            this.commitCargoTempList();
          }
        }
      },
      immediate: true
    },
  },
  computed: {
    readOnly() {
      return false;
    },
    disable() {
      return this.editing;
    },
    totalListFee() {
      const list = this.WmsCargoTempList;
      const length = list.length;
      let totalFee = 0;
      for (let i = length - 1; i >= 0; i--) {
        totalFee = add(totalFee, list[i].tcargoTotalFee);
      }
      return totalFee;
    },
  },
  data() {
    return {
      commit:false,
      maxAppendId: 0,
      appendIds: [],
      waybill: {},
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
      rowDataString: '',
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
        pageSize: 100,
        tcargoName: null,
        packageType: null,
        tcargoCount: null,
        valuationType: null,
        valuationValue: null,
        valuationCount: null,
        tcargoTotalFee: null,
        valuable: null,
        irregular: null,
        documents: null,
        cargoId: null,
        waybillId: null,
        status: null,
      },
      baseTotalFee:0,
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
        tcargoTotalFee: [
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
      this.queryParams.waybillId = this.waybill.waybillId;
      listWmsCargoTemp(this.queryParams).then(({
                                                 rows, total
                                               }) => {
        this.WmsCargoTempList = rows.map(item => {
          item.editable = false;
          return item;
        });
        this.total = total;
        this.loading = false;
      });
    },
    commitCargoTempList(){
      addWmsCargoTempList(this.WmsCargoTempList).then(res=>{
        console.log(res)
      }).finally(()=>{

      });
    },
    handleGetRow(id) {
      return this.WmsCargoTempList.find(item => (item.id === id || item.isCreate));
    },
    handleClickEdit(id) {
      this.rowData = this.handleGetRow(id);
      console.log(this.rowData)
      this.editing = true;
      this.rowDataString = JSON.stringify({...this.rowData, editable: null});
      this.rowData.editable = !this.rowData.editable;
    },
    handleClickDisableOrEnable(id, status) {
    },
    handleClickSave() {
      this.rowData.tcargoTotalFee = multiply(this.rowData.valuationValue, this.rowData.valuationCount);
      const data = cloneDeep(this.rowData);
      data.editable = null;
      const editRowDataString = JSON.stringify(data);
      if (data.isCreate) {
        // addWmsCargoTemp({...data}).then(res => {
        //   this.recoveryState(data);
        // }).finally(() => {
        // });
        console.log('create');
      } else {
        console.log('edit');
        // if (editRowDataString !== this.rowDataString) {
        //   updateWmsCargoTemp(data).then(res => {
        //   }).finally(() => {
        //   })
        // }
      }
      this.rowData.editable = !this.rowData.editable;
      this.editing = false;
    },
    handleAddRow() {
      this.WmsCargoTempList.push({
        id: --this.maxAppendId,
        tcargoName: '',
        tcargoCount: 1,
        packageType: '',
        valuationType: '',
        valuationValue: 0,
        status: '0',
        editable: false,
        isCreate: true,
      });
      this.rowData = this.handleGetRow(this.maxAppendId);
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
      return +row.valuable?'el-icon-check ii':'el-icon-close batu';
    },
    // 异形货物字典翻译
    irregularFormat(row, column) {
      return +row.irregular?'el-icon-check ii':'el-icon-close batu';
    },
    // 货物单据字典翻译
    documentsFormat(row, column) {
      return +row.documents?'el-icon-check ii':'el-icon-close batu';
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
        tcargoName: null,
        packageType: null,
        tcargoCount: null,
        valuationType: null,
        valuationValue: null,
        valuationCount: null,
        tcargoTotalFee: null,
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
    getSummaries(param) {
      const {columns, data} = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '汇总';
          return;
        }
        // if (column.property == 'tcargoName' || column.property == 'valuationType' || column.property == 'status' || column.property == 'remark' || column.property == 'action') {
        //   sums[index] = '';
        //   return;
        // }
        if (column.property == 'tcargoCount') {
          const values = data.map(item => Number(item[column.property]));
          if (!values.every(value => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                return add(prev, curr);
              } else {
                return prev;
              }
            }, 0);
            sums[index] += ' 件';
          } else {
            sums[index] = 'N/A';
          }
          return;
        }
        if (column.property == 'packageType') {
          const set = Array.from(new Set(data.map(item => Number(item[column.property]))));
          sums[index] = `${set.length} 种`;
          return;
        }
        if (column.property == 'valuable') {
          const values = data.map(item => Number(item[column.property]));
          if (!values.every(value => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                return add(prev, curr);
              } else {
                return prev;
              }
            }, 0);
            sums[index] += ' 批';
          } else {
            sums[index] = 'N/A';
          }
          return;
        }
        if (column.property == 'irregular') {
          const values = data.map(item => Number(item[column.property]));
          if (!values.every(value => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                return add(prev, curr);
              } else {
                return prev;
              }
            }, 0);
            sums[index] += ' 批';
          } else {
            sums[index] = 'N/A';
          }
          return;
        }
        if (column.property == 'documents') {
          const values = data.map(item => Number(item[column.property]));
          if (!values.every(value => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                return add(prev, curr);
              } else {
                return prev;
              }
            }, 0);
            sums[index] += ' 批';
          } else {
            sums[index] = 'N/A';
          }
          return;
        }
        if (column.property == 'tcargoTotalFee'){
          const values = data.map(item => Number(item[column.property]));
          if (!values.every(value => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                return add(prev, curr);
              } else {
                return prev;
              }
            }, 0);
            this.$emit('on-change-total-fee',+sums[index])
            sums[index] += ' 元';
          } else {
            sums[index] = 'N/A';
          }
        }
        if (column.property == 'index'){
          sums[index] = data.length+' 例';
          return;
        }
        return;
      });
      return sums;
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
    init() {
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
      if (this.waybill.waybillId && this.waybill.waybillId > 0) {
        this.init();
      } else {
        this.WmsCargoTempList.length = 0;
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
<style scoped>
.batu{
  color: #ff435b;
}
.ii{
  color: #016B09;
}
</style>
