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
      <el-form v-show="showSearch" ref="queryForm" :model="queryParams" disabled label-position="left"
               label-width="100px">
        <el-row :gutter="24">
          <ICol>
            <el-form-item label="仓库ID" prop="warehouseId">
              <el-input
                v-model="queryParams.warehouseId"
                clearable
                placeholder="请输入仓库ID"
                size="small"
                @keyup.enter.native="handleQuery"
              />
            </el-form-item>
          </ICol>
          <ICol>
            <el-form-item label="方格横轴" prop="itemX">
              <el-input
                v-model="queryParams.itemX"
                clearable
                placeholder="请输入方格横轴"
                size="small"
                @keyup.enter.native="handleQuery"
              />
            </el-form-item>
          </ICol>
          <ICol>
            <el-form-item label="方格纵轴" prop="itemY">
              <el-input
                v-model="queryParams.itemY"
                clearable
                placeholder="请输入方格纵轴"
                size="small"
                @keyup.enter.native="handleQuery"
              />
            </el-form-item>
          </ICol>
          <ICol>
            <el-form-item label="状态" prop="status">
              <el-select v-model="queryParams.status" clearable placeholder="请选择状态" size="small">
                <el-option
                  v-for="dict in itemStatusOptions"
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
              <el-button icon="el-icon-search" size="mini" type="primary" @click="handleQuery">搜索</el-button>
              <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
            </el-form-item>
          </ICol>
        </el-row>
      </el-form>
    </el-card>
    <!--
    <el-card :body-style="{padding:'15px'}">
      <el-row :gutter="10" class="mb8">
        <el-col :span="1.5">
          <el-button
            v-hasPermi="['wms:ExtItem:add']"
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
            v-hasPermi="['wms:ExtItem:edit']"
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
            v-hasPermi="['wms:ExtItem:remove']"
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
            v-hasPermi="['wms:ExtItem:export']"
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
-->
    <el-card :body-style="{padding:'15px'}">
      <ICol :grid="{xs: {span: 24, offset: 0},sm: {span: 24, offset: 0},md: {span: 12, offset: 0},lg: {span: 12, offset: 0},xl: {span: 12, offset: 0}}">
        <WarehouseEcharts v-model="warehouse" :loading="loading" :x="xList"
                          :y="yList" @on-click-item="handleEchartsClickItem"/>
      </ICol>
      <ICol
        :grid="{xs: {span: 24, offset: 0},sm: {span: 24, offset: 0},md: {span: 12, offset: 0},lg: {span: 12, offset: 0},xl: {span: 12, offset: 0}}">
        <el-card>
          <div slot="header" class="clearfix">
            <span>{{itemCardTitle}}</span>
          </div>
          <el-form ref="form" :disabled="!form.itemId>0" :model="form" :rules="rules" label-position="top">
            <el-row :gutter="24">
              <ICol>
                <el-form-item label="方格横轴" prop="itemX">
                  <el-input v-model="form.itemX" placeholder="请输入方格横轴" readonly/>
                </el-form-item>
              </ICol>
              <ICol>
                <el-form-item label="方格纵轴" prop="itemY">
                  <el-input v-model="form.itemY" placeholder="请输入方格纵轴" readonly/>
                </el-form-item>
              </ICol>
              <ICol>
                <el-form-item>
                  <div slot="label">
                    状态
                    <el-tooltip v-show="showItemStatusTooltip" content="为装载状态时,不可改变状态">
                      <i class="el-icon-question"></i>
                    </el-tooltip>
                  </div>
                  <el-switch
                    v-model="form.status"
                    :disabled="showItemStatusTooltip"
                    active-color="#13ce66"
                    active-value="1"
                    inactive-color="#ff4949"
                    inactive-value="0">
                  </el-switch>
                </el-form-item>
              </ICol>
              <ICol type="full">
                <el-form-item label="备注" prop="remark">
                  <el-input v-model="form.remark" placeholder="请输入内容" type="textarea"/>
                </el-form-item>
              </ICol>
              <ICol type="search">
                <el-button v-if="showItemStatusTooltip" icon="el-icon-paperclip" @click="handleClickLookBindingWaybillCargo">查看装载运单</el-button>
                <el-button :disabled="!form.itemId>0" type="primary" @click="submitForm">保 存</el-button>
              </ICol>
            </el-row>
          </el-form>

        </el-card>
      </ICol>
      <!--<el-table v-loading="loading" :data="WmsWarehouseExtItemList" @selection-change="handleSelectionChange">
        <el-table-column align="center" fixed type="selection" width="55"/>
        <el-table-column align="center" fixed label="序号" type="index" width="60"/>
        <el-table-column align="center" label="仓库方格ID" prop="itemId" show-overflow-tooltip width="150">
          <template slot-scope="{row}">
            {{row.itemId}}
          </template>
        </el-table-column>
        <el-table-column align="center" label="仓库ID" prop="warehouseId" show-overflow-tooltip width="150">
          <template slot-scope="{row}">
            {{row.warehouseId}}
          </template>
        </el-table-column>
        <el-table-column align="center" label="方格横轴" prop="itemX" show-overflow-tooltip width="150">
          <template slot-scope="{row}">
            {{row.itemX}}
          </template>
        </el-table-column>
        <el-table-column align="center" label="方格纵轴" prop="itemY" show-overflow-tooltip width="150">
          <template slot-scope="{row}">
            {{row.itemY}}
          </template>
        </el-table-column>
        <el-table-column :formatter="statusFormat" align="center" label="状态" prop="status" show-overflow-tooltip
                         width="150"/>
        <el-table-column align="center" label="备注" prop="remark" show-overflow-tooltip width="150">
          <template slot-scope="{row}">
            {{row.remark}}
          </template>
        </el-table-column>
        <el-table-column align="center" class-name="small-padding fixed-width" fixed="right" label="操作" width="200">
          <template slot-scope="scope">
            <el-button
              v-hasPermi="['wms:ExtItem:edit']"
              icon="el-icon-edit"
              size="mini"
              type="text"
              @click="handleUpdate(scope.row)"
            >修改
            </el-button>
            <el-button
              v-hasPermi="['wms:ExtItem:remove']"
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
      -->
    </el-card>
    <!-- 添加或修改仓库拓展-仓库方格信息对话框 -->
    <!--
    <el-dialog :title="dialog.title" :visible.sync="dialog.open" append-to-body fullscreen>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-row :gutter="24">
          <ICol>
            <el-form-item v-show="false" label="仓库ID" prop="warehouseId">
              <el-input v-model="form.warehouseId" placeholder="请输入仓库ID"/>
            </el-form-item>
          </ICol>
          <ICol>
            <el-form-item label="方格横轴" prop="itemX">
              <el-input v-model="form.itemX" placeholder="请输入方格横轴"/>
            </el-form-item>
          </ICol>
          <ICol>
            <el-form-item label="方格纵轴" prop="itemY">
              <el-input v-model="form.itemY" placeholder="请输入方格纵轴"/>
            </el-form-item>
          </ICol>
          <ICol>
            <el-form-item label="状态">
              <el-radio-group v-model="form.status">
                <el-radio
                  v-for="dict in filterItemStatusOptions"
                  :key="dict.dictValue"
                  :label="dict.dictValue"
                >
                  {{dict.dictLabel}}
                </el-radio>
              </el-radio-group>
            </el-form-item>
          </ICol>
          <ICol>
            <el-form-item label="备注" prop="remark">
              <el-input v-model="form.remark" placeholder="请输入内容" type="textarea"/>
            </el-form-item>
          </ICol>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
    -->

    <el-dialog :close-on-click-modal="false" :close-on-press-escape="false"
               :show-close="false" :visible.sync="initDialog.open">
      <span slot="title"><Icon color="#ffba00" name="warning-outline"/> {{initDialog.title}}</span>
      <el-form ref="initDialogForm" :inline="false" :model="initDialogForm" :rules="initDialogFormRules">
        <el-row>
          <ICol>
            <el-form-item label="托盘规格" prop="trayType">
              <el-select v-model="initDialogForm.trayType" placeholder="请选择托盘规格">
                <el-option v-for="(dict,index) in trayTypeOptions" :key="index" :label="dict.dictLabel"
                           :value="dict.dictValue">
                  {{dict.dictLabel}}
                </el-option>
              </el-select>
            </el-form-item>
          </ICol>
          <ICol>
            <el-form-item label="托盘间隔" prop="trayInterval">
              <el-input-number v-model="initDialogForm.trayInterval" :disabled="false" :min="100" :step="10"
                               prefix="mm"></el-input-number>
            </el-form-item>
          </ICol>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="warning" @click="handleInitDialogClose">初始化</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  addWmsWarehouseExtItem,
  delWmsWarehouseExtItem,
  getWmsWarehouseExtItem,
  getWmsWarehouseExtItemByXY, getWmsWaybillByItemId,
  listWmsWarehouseExtItem,
  updateWmsWarehouseExtItem
} from "@/api/wms/WmsWarehouseExtItem";
import ICol from "@/components/ICol/index";
import Icon from "@/components/Icon/index";
import WarehouseEcharts from "@/views/components/wms/WarehouseEcharts/index";
import {getWarehouse, initWarehouseExtItem} from "@/api/wms/warehouse";

export default {
  name: "WmsWarehouseExtItem",
  components: {
    ICol, Icon, WarehouseEcharts
  },
  computed: {
    filterItemStatusOptions() {
      return this.itemStatusOptions.filter(i => i.dictValue != '2');
    },
    showItemStatusTooltip() {
      return this.form.status === '2';
    },
    itemCardTitle() {
      return this.warehouse && this.warehouse.warehouseName;
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
      // 仓库拓展-仓库方格信息表格数据
      WmsWarehouseExtItemList: [],
      WmsWarehouseExtItemCanvasData: [],
      xList: [],
      yList: [],
      // 弹出层标题
      dialog: {
        title: "",
        type: 0,
        open: false,
      },
      initDialog: {
        title: '',
        type: 0,
        open: false,
      },
      initDialogForm: {
        warehouseId: '',
        dictCode: '',
        trayType: '',
        trayInterval: 100,
      },
      // 是否显示弹出层
      warehouse: {},
      avc: '',
      // 状态字典
      itemStatusOptions: [],
      trayTypeOptions: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        warehouseId: null,
        itemX: null,
        itemY: null,
        status: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        warehouseId: [
          {required: true, message: "仓库ID不能为空", trigger: "blur"}
        ],
        itemX: [
          {required: true, message: "方格横轴不能为空", trigger: "blur"}
        ],
        itemY: [
          {required: true, message: "方格纵轴不能为空", trigger: "blur"}
        ],
      },
      initDialogFormRules: {
        trayType: [
          {required: true, message: "托盘类型不能为空", trigger: "blur"}
        ],
        trayInterval: [
          {required: true, message: "托盘间距不能为空", trigger: "blur"}
        ],
      },
      toggleSearchFormValue: 0,
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      const params = this.$route.params;
      const warehouseId = params && params.warehouseId;
      this.checkPageParams(params);
      this.getDicts("wms_warehouse_item_status").then(response => {
        this.itemStatusOptions = response.data;
      });
      getWarehouse(warehouseId).then((res) => {
        this.warehouse = res.data;
        this.checkPageParams(this.warehouse);
        if (this.warehouse.warehouseMaxX <= 0 || this.warehouse.warehouseMaxX <= 0) {
          this.getDicts('wms_tray_type').then(response => {
            this.trayTypeOptions = response.data;
          });
          this.initDialogForm.warehouseId = warehouseId;
          this.initDialog.open = true;
          this.initDialog.title = `警告-当前未初始化`;
        } else {
          this.getList();
        }
      });
    },
    checkPageParams(params) {
      const {warehouseId} = params;
      if (warehouseId && warehouseId <= 0) {
        this.$router.back();
        return;
      }
    },
    /** 查询仓库拓展-仓库方格信息列表 */
    getList() {
      this.loading = true;
      const warehouseId = this.warehouse.warehouseId;
      listWmsWarehouseExtItem({
        ...this.queryParams,
        warehouseId,
      }).then(({data}) => {
        this.WmsWarehouseExtItemCanvasData = data.canvasList;
        const maxX = data.x;
        const maxY = data.y;
        this.xList = []
        this.yList = []
        for (let i = 1; i <= maxX; i++) {
          this.xList.push(i)
        }
        for (let i = 1; i <= maxY; i++) {
          this.yList.push(i)
        }
        this.loading = false;
      });
    },
    // 状态字典翻译
    statusFormat(row, column) {
      return this.selectDictLabel(this.itemStatusOptions, row.status);
    },
    // 取消按钮
    cancel() {
      this.dialog.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        itemId: null,
        warehouseId: null,
        itemX: null,
        itemY: null,
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
      this.ids = selection.map(item => item.itemId)
      this.single = selection.length !== 1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.dialog.open = true;
      this.dialog.title = "添加仓库拓展-仓库方格信息";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const itemId = row.itemId || this.ids
      getWmsWarehouseExtItem(itemId).then(response => {
        this.form = response.data;
        this.dialog.open = true;
        this.dialog.title = "修改仓库拓展-仓库方格信息";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          const form = this.form;
          if (form.itemId != null) {
            const {itemId, status, remark,} = form;
            updateWmsWarehouseExtItem({
              itemId,
              status,
              remark,
            }).then(response => {
              this.msgSuccess("修改成功");
              this.dialog.open = false;
              this.getList();
            });
          } else {
            addWmsWarehouseExtItem(form).then(response => {
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
      const itemIds = row.itemId || this.ids;
      this.$confirm('是否确认删除仓库拓展-仓库方格信息编号为"' + itemIds + '"的数据项?', "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(function () {
        return delWmsWarehouseExtItem(itemIds);
      }).then(() => {
        this.getList();
        this.msgSuccess("删除成功");
      })
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('wms/ExtItem/export', {
        ...this.queryParams
      }, `wms_WmsWarehouseExtItem.xlsx`)
    },
    toggleSearchForm(toggle) {
      if (toggle >= 0) {
        this.toggleSearchFormValue = toggle;
      }
    },
    handleInitDialogClose() {
      this.$refs["initDialogForm"].validate(valid => {
        if (valid) {
          this.loading = true;
          const initDialogForm = this.initDialogForm;
          initDialogForm.dictCode = this.trayTypeOptions.find(i => i.dictValue == initDialogForm.trayType).dictCode;
          initWarehouseExtItem(initDialogForm).then(res => {
            this.loading = false;
            this.initDialog.open = false;
          }).finally(() => {
            this.loading = false;
          });
        }
      });
    },
    handleEchartsClickItem({value}) {
      this.reset();
      const itemX = value[0];
      const itemY = value[1];
      this.avc = value[2];
      getWmsWarehouseExtItemByXY({
        warehouseId: this.warehouse.warehouseId,
        itemX,
        itemY
      }).then(res => {
        this.form = res.data;
      });
    },
    handleClickLookBindingWaybillCargo(){
      getWmsWaybillByItemId(this.form.itemId).then(res=>{
        console.log(res)
      })
    },
  }
};
</script>
