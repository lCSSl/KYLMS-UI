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
        <el-table-column align="center" fixed label="序号" prop="index" type="index" width="60"/>
        <el-table-column align="center" label="品名" prop="tcargoName" show-overflow-tooltip width="240">
          <template slot-scope="{$index,row}">
            <el-input v-if="row.editable" v-model="rowData.tcargoName">
              <el-popover
                slot="append"
                trigger="click">
                <el-select
                  v-model="remoteSelect"
                  :loading="loading"
                  :remote-method="remoteCargoMethod" filterable
                  placeholder="请输入关键词"
                  remote
                  @change="remoteChangeMethod">
                  <el-option
                    v-for="(item,index) in cargoList"
                    :key="index"
                    :label="item.cargoName"
                    :value="item.cargoId">
                  </el-option>
                </el-select>
                <el-button icon="el-icon-search" @click="()=>remoteCommit($index)">确定</el-button>
                <el-button slot="reference" icon="el-icon-search" size="small"></el-button>
              </el-popover>
            </el-input>
            <span v-else>{{row.tcargoName}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="包装方式" prop="packageType" width="100">
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
        <el-table-column align="center" label="计价方式" prop="valuationType" width="120">
          <template slot-scope="{row}">
            <el-select v-if="row.editable" v-model="rowData.valuationType" placeholder="请选择计价方式">
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
        <el-table-column align="center" label="贵重货物" prop="valuable" width="70">
          <template slot-scope="{row}">
            <el-switch
              v-if="row.editable"
              v-model="rowData.valuable"
              active-value="1"
              inactive-value="0">
            </el-switch>
            <i v-else :class="valuableFormat(row)"></i>
            <!--            <span v-else>{{valuableFormat(row)}}</span>-->
          </template>
        </el-table-column>
        <el-table-column align="center" label="异形货物" prop="irregular" width="70">
          <template slot-scope="{row}">
            <el-switch
              v-if="row.editable"
              v-model="rowData.irregular"
              active-value="1"
              inactive-value="0">
            </el-switch>
            <i v-else :class="irregularFormat(row)"></i>
            <!--            <span v-else>{{irregularFormat(row)}}</span>-->
          </template>
        </el-table-column>
        <el-table-column align="center" label="货物单据" prop="documents" width="70">
          <template slot-scope="{row}">
            <el-switch
              v-if="row.editable"
              v-model="rowData.documents"
              active-value="1"
              inactive-value="0">
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
          <template slot-scope="{row,$index}">
            <el-button
              v-hasPermi="['wms:WmsCargoTemp:edit']"
              :disabled="!row.editable||readOnly"
              icon="el-icon-edit"
              size="mini"
              type="text"
              @click="handleClickSave($index)">
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
import {addWmsCargoTempList, delWmsCargoTemp, listWmsCargoTemp} from "@/api/wms/WmsCargoTemp";
import ICol from "@/components/ICol";
import {cloneDeep} from 'lodash';
import {add, multiply} from "@/utils/number/math";
import {listCargo} from "@/api/wms/cargo";

export default {
  name: "WmsCargoTemp",
  components: {
    ICol,
  },
  props: {
    value: {
      type: Object,
    },
    commitComplete: {
      type: Boolean,
      default: false
    },
    waybillId: null,
    readOnly: {
      type: Boolean,
      default: true
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
    commitComplete: {
      handler(val) {
        if (val !== this.commit) {
          this.commit = val;
          if (this.commit && this.waybillId && +this.waybillId > 0) {
            this.commitCargoTempList();
          }
        }
      },
      immediate: true
    },
  },
  computed: {
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
    list() {
      return this.WmsCargoTempList.map(i => {
        i.waybillId = this.waybill.waybillId;
        return i;
      })
    }
  },
  data() {
    return {
      commit: false,
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
      cargoList: [],
      rowData: {},
      remoteSelect: '',
      rowDataStr: '',
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
      baseTotalFee: 0,
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
    checkStates() {
      if (this.loading) {
        this.msgError("加载中");
        return 1;
      }
      if (this.editing) {
        this.msgError("请点击保存");
        return 2;
      }
      return 0;
    },

    getList() {
      this.loading = true;
      this.queryParams.waybillId = this.waybill.waybillId;
      listWmsCargoTemp(this.queryParams).then(({rows, total}) => {
        this.WmsCargoTempList = rows.map(item => {
          item.editable = false;
          return item;
        });
        this.total = total;
        this.loading = false;
        this.$emit('on-load');
      });
    },
    /** 提交 */
    commitCargoTempList() {
      const list = this.WmsCargoTempList.map(i => {
        i.waybillId = this.waybillId;
        return i;
      })
      if (this.checkStates() != 0) {
        return;
      }
      addWmsCargoTempList(list).then(res => {
        this.commit = false;
        this.$emit('on-success');
      }).finally(() => {

      });
    },

    handleGetRow(id) {
      return this.WmsCargoTempList.find(item => (item.id === id));
    },
    /** 修改按钮操作 */
    handleClickEdit(id) {
      this.rowData = this.handleGetRow(id);
      // console.log(this.rowData)
      this.editing = true;
      this.rowDataStr = JSON.stringify({...this.rowData, editable: null});
      // console.log(this.rowDataStr);
      this.rowData.editable = !this.rowData.editable;
    },
    handleClickSave(index) {
      this.rowData.tcargoTotalFee = multiply(this.rowData.valuationValue, this.rowData.valuationCount);
      const data = cloneDeep(this.rowData);
      data.editable = null;
      const editRowDataString = JSON.stringify(data);
      if (editRowDataString != this.rowDataStr) {
        this.rowData.editable = !this.rowData.editable;
        const list = cloneDeep(this.WmsCargoTempList);
        this.WmsCargoTempList = list;
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
      }
      this.editing = false;
    },
    /** 新增按钮操作 */
    handleAddRow() {
      this.WmsCargoTempList.push({
        id: --this.maxAppendId,
        tcargoName: '',
        tcargoCount: 1,
        packageType: '1',
        valuationType: '1',
        valuationValue: 0,
        valuationCount: 0,
        valuable: '0',
        irregular: '0',
        documents: '0',
        status: '0',
        editable: false,
        isCreate: true,
      });
      this.rowData = this.handleGetRow(this.maxAppendId);
      this.editing = true;
      this.rowDataStr = JSON.stringify(this.rowData);
      this.rowData.editable = !this.rowData.editable;
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
        valuationCount: 1.00,
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
        if (column.property == 'tcargoTotalFee') {
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
            this.$emit('on-change-total-fee', +sums[index])
            sums[index] += ' 元';
          } else {
            sums[index] = 'N/A';
          }
        }
        if (column.property == 'index') {
          sums[index] = data.length + ' 例';
          return;
        }
        return;
      });
      return sums;
    },

    /** 删除按钮操作 */
    handleDelete(row) {
      const ids = row.id || this.ids;
      if (row && row.id <= 0) {
        this.editing = false;
        this.rowData.editable = !this.rowData.editable;
        this.handleDeleteRow(row.id);
        return;
      }
      this.$confirm('是否确认删除运单货物临时编号为"' + ids + '"的数据项?', "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(function () {
        return delWmsCargoTemp(ids);
      }).then(() => {
        this.getList();
        this.msgSuccess("删除成功");
      });
    },
    handleDeleteRow(id) {
      this.WmsCargoTempList.splice(this.WmsCargoTempList.indexOf(this.handleGetRow(id)), 1);
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
      // console.log('init')
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
    remoteCargoMethod(cargoName) {
      listCargo({cargoName}).then(res => {
        this.cargoList = res.rows;
      });
    },
    remoteCommit(index) {
      const list = cloneDeep(this.WmsCargoTempList);
      const item = list[index];
      const find = this.cargoList.find(i => i.cargoId === this.remoteSelect);
      this.rowData = list[index] = {
        ...item,
        ...find,
        tcargoName: find.cargoName,
        // id: item.id,
        // tcargoName: select.cargoName,
        // packageType: select.packageType,
        // tcargoCount: item.tcargoCount,
        // valuationType: select.valuationType,
        // valuationValue: select.valuationValue,
        // valuationCount: item.valuationCount,
        tcargoTotalFee: multiply(find.valuationValue, item.valuationCount),
        // valuable: select.valuable,
        // irregular: select.irregular,
        // documents: select.documents,
        // cargoId: select.cargoId,
        // waybillId: item.waybillId,
        // status: item.status,
        // createBy: item.createBy,
        // createTime: item.createTime,
        // updateBy: item.updateBy,
        // updateTime: item.updateTime,
        // remark: item.remark,
        editable: true
      }
      this.WmsCargoTempList = list;
    },
    remoteChangeMethod(value) {
      this.remoteSelect = value;
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
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.id)
      this.single = selection.length !== 1
      this.multiple = !selection.length
    },
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
      return +row.valuable ? 'el-icon-check ii' : 'el-icon-close batu';
    },
    // 异形货物字典翻译
    irregularFormat(row, column) {
      return +row.irregular ? 'el-icon-check ii' : 'el-icon-close batu';
    },
    // 货物单据字典翻译
    documentsFormat(row, column) {
      return +row.documents ? 'el-icon-check ii' : 'el-icon-close batu';
    },
    // 状态字典翻译
    statusFormat(row, column) {
      return this.selectDictLabel(this.statusOptions, row.status);
    },

  },
  created() {
    this.getDictMethods();
    listCargo().then(res => {
      this.cargoList = res.rows;
    });
  },
  mounted() {
  }
};
</script>
<style scoped>
.batu {
  color: #ff435b;
}

.ii {
  color: #016B09;
}
</style>
