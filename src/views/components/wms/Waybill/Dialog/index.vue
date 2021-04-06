<template>
  <el-dialog :visible.sync="dialog.open" append-to-body fullscreen>
      <span slot="title" class="dialog_title">
        <span>
            {{dialog.title}}
        </span>
        <el-input v-show="readOnly" v-model="form.waybillCode" class="dialog_title_plus" readonly>
          <template slot="prepend">运单号</template>
        </el-input>
      </span>
    <el-form v-show="!loading" ref="form" :model="form" :rules="rules" :show-message="false" label-position="left"
             label-width="100px">
      <el-row>
        <el-row>
          <ICol type="half">
            <el-row>
              <ICol border type="half">
                <el-row>
                  <el-form-item label="始发站" prop="departure">
                    <el-select
                      v-model="form.departure"
                      :disabled="readOnly"
                      :loading="loading"
                      :remote-method="(keyword)=>getWarehouseOptions(keyword,1)"
                      class="select-width"
                      filterable
                      placeholder="请选择站点类型"
                      remote
                      reserve-keyword>
                      <el-option
                        v-for="(warehouse,index)  in departureWarehouseOptions"
                        :key="index"
                        :label="warehouse.warehouseName"
                        :value="warehouse.warehouseId"
                      />
                    </el-select>
                  </el-form-item>
                </el-row>
              </ICol>
              <ICol border type="half">
                <el-row>
                  <el-form-item label="到达站" prop="destination">
                    <el-select
                      v-model="form.destination"
                      :disabled="readOnly"
                      :loading="loading"
                      :remote-method="(keyword)=>getWarehouseOptions(keyword,2)"
                      class="select-width"
                      filterable
                      placeholder="请选择站点类型"
                      remote
                      reserve-keyword>
                      <el-option
                        v-for="(warehouse,index) in destinationWarehouseOptions"
                        :key="index"
                        :label="warehouse.warehouseName"
                        :value="warehouse.warehouseId"
                      />
                    </el-select>
                  </el-form-item>
                </el-row>

              </ICol>
            </el-row>
          </ICol>
          <ICol type="half">
            <el-row>
              <ICol border type="half">
                <el-form-item label="中转地" prop="transitPlace">
                  <el-input v-model="form.transitPlace" placeholder="请输入中转地"/>
                </el-form-item>
              </ICol>
              <ICol border type="half">
                <el-form-item label="客户单号" prop="csrOrderNumber">
                  <el-input v-model="form.csrOrderNumber" placeholder="请输入客户单号"/>
                </el-form-item>
              </ICol>
            </el-row>
          </ICol>
        </el-row>
        <el-row>
          <el-row>
            <template v-if="!form.deliverEntity.visible">
              <ICol border type="full">
                <el-form-item label="发货方" prop="receivingEntity">
                  <el-button style="width: 100%" @click="()=>openUserDialog(0)">添 加</el-button>
                </el-form-item>
              </ICol>
            </template>
          </el-row>
          <template v-if="form.deliverEntity.visible">
            <el-row>
              <ICol
                :grid="{xs: {span: 24, offset: 0},sm: {span: 6, offset: 0},md: {span: 6, offset: 0},lg: {span: 6, offset: 0},xl: {span: 6, offset: 0}}"
                border>
                <el-form-item label="发货公司名称" prop="deliverCoName">
                  <el-input v-model="form.deliverEntity.deliverCoName" placeholder="请输入发货公司名称"/>
                </el-form-item>
              </ICol>
              <ICol
                :grid="{xs: {span: 24, offset: 0},sm: {span: 6, offset: 0},md: {span: 6, offset: 0},lg: {span: 6, offset: 0},xl: {span: 6, offset: 0}}"
                border>
                <el-form-item label="发货联系人" prop="consignorName">
                  <el-input v-model="form.deliverEntity.consignorName" placeholder="请输入发货联系人"/>
                </el-form-item>
              </ICol>
              <ICol
                :grid="{xs: {span: 24, offset: 0},sm: {span: 5, offset: 0},md: {span: 5, offset: 0},lg: {span: 5, offset: 0},xl: {span: 5, offset: 0}}"
                border>
                <el-form-item label="发货人手机" prop="consignorMobile">
                  <el-input v-model="form.deliverEntity.consignorMobile" placeholder="请输入发货人手机"/>
                </el-form-item>
              </ICol>
              <ICol
                :grid="{xs: {span: 24, offset: 0},sm: {span: 5, offset: 0},md: {span: 5, offset: 0},lg: {span: 5, offset: 0},xl: {span: 5, offset: 0}}"
                border>
                <el-form-item label="发货人座机" prop="consignorTelephone">
                  <el-input v-model="form.deliverEntity.consignorTelephone" placeholder="请输入发货人座机"/>
                </el-form-item>
              </ICol>
              <ICol
                :grid="{xs: {span: 24, offset: 0},sm: {span: 2, offset: 0},md: {span: 2, offset: 0},lg: {span: 2, offset: 0},xl: {span: 2, offset: 0}}"
                border>
                <el-button class="select-width" @click="()=>openUserDialog(0)">修改</el-button>
              </ICol>
            </el-row>
          </template>
        </el-row>
        <el-row>
          <el-row>
            <template v-if="!form.receivingEntity.visible">
              <ICol border type="full">
                <el-form-item label="收货方" prop="receivingEntity">
                  <el-button class="select-width" @click="()=>openUserDialog(1)">添 加</el-button>
                </el-form-item>
              </ICol>
            </template>
          </el-row>
          <template v-if="form.receivingEntity.visible">
            <el-row>
              <ICol
                :grid="{xs: {span: 24, offset: 0},sm: {span: 6, offset: 0},md: {span: 6, offset: 0},lg: {span: 6, offset: 0},xl: {span: 6, offset: 0}}"
                border>
                <el-form-item label="收货公司名称" prop="receivingCoName">
                  <el-input v-model="form.receivingEntity.receivingCoName" placeholder="请输入收货公司名称"/>
                </el-form-item>
              </ICol>
              <ICol
                :grid="{xs: {span: 24, offset: 0},sm: {span: 6, offset: 0},md: {span: 6, offset: 0},lg: {span: 6, offset: 0},xl: {span: 6, offset: 0}}"
                border>
                <el-form-item label="收货联系人" prop="consigneeName">
                  <el-input v-model="form.receivingEntity.consigneeName" placeholder="请输入收货联系人"/>
                </el-form-item>
              </ICol>
              <ICol
                :grid="{xs: {span: 24, offset: 0},sm: {span: 5, offset: 0},md: {span: 5, offset: 0},lg: {span: 5, offset: 0},xl: {span: 5, offset: 0}}"
                border>
                <el-form-item label="收货人手机" prop="consigneeMobile">
                  <el-input v-model="form.receivingEntity.consigneeMobile" placeholder="请输入收货人手机"/>
                </el-form-item>
              </ICol>
              <ICol
                :grid="{xs: {span: 24, offset: 0},sm: {span: 5, offset: 0},md: {span: 5, offset: 0},lg: {span: 5, offset: 0},xl: {span: 5, offset: 0}}"
                border>
                <el-form-item label="收货人座机" prop="consigneeTelephone">
                  <el-input v-model="form.receivingEntity.consigneeTelephone" placeholder="请输入收货人座机"/>
                </el-form-item>
              </ICol>
              <ICol
                :grid="{xs: {span: 24, offset: 0},sm: {span: 2, offset: 0},md: {span: 2, offset: 0},lg: {span: 2, offset: 0},xl: {span: 2, offset: 0}}"
                border>
                <el-button class="select-width" @click="()=>openUserDialog(1)">修改</el-button>
              </ICol>
            </el-row>
          </template>
        </el-row>
        <el-row>
          <ICol border type="half">
            <el-form-item label-width="0px" prop="provinceCityDistrictStreet">
              <regionSelect v-model="form.regionSelectValue" :level="3"
                            @on-change="updateRegionSelectValue"/>
            </el-form-item>
          </ICol>
          <ICol border type="half">
            <el-form-item label="收货详细地址" prop="receivingAddress">
              <el-input v-model="form.receivingAddress" placeholder="请输入收货详细地址"/>
            </el-form-item>
          </ICol>
        </el-row>
        <el-row>
          <ICol border>
            <el-form-item label="运输方式" prop="transportMode">
              <el-select
                v-model="form.transportMode"
                class="select-width"
                clearable placeholder="请输入付款方式" size="small">
                <el-option
                  v-for="dict in transportModeOptions"
                  :key="dict.dictValue"
                  :label="dict.dictLabel"
                  :value="dict.dictValue"/>
              </el-select>
            </el-form-item>
          </ICol>
          <ICol border>
            <el-form-item label="交接方式" prop="handoverMode">
              <el-select
                v-model="form.handoverMode"
                class="select-width"
                clearable placeholder="请输入交接方式" size="small">
                <el-option
                  v-for="dict in handoverModeOptions"
                  :key="dict.dictValue"
                  :label="dict.dictLabel"
                  :value="dict.dictValue"/>
              </el-select>
            </el-form-item>
          </ICol>
          <ICol border>
            <el-form-item label="付款方式" prop="payMethod">
              <el-select
                v-model="form.payMethod" class="select-width"
                clearable placeholder="请输入付款方式" size="small">
                <el-option
                  v-for="dict in payMethodOptions"
                  :key="dict.dictValue"
                  :label="dict.dictLabel"
                  :value="dict.dictValue"/>
              </el-select>
            </el-form-item>
          </ICol>
          <ICol border>
            <el-form-item label="是否开发票">
              <el-radio-group v-model="form.writeInvoice">
                <el-radio
                  v-for="dict in writeInvoiceOptions"
                  :key="dict.dictValue"
                  :label="dict.dictValue">
                  {{dict.dictLabel}}
                </el-radio>
              </el-radio-group>
            </el-form-item>
          </ICol>
        </el-row>
      </el-row>
      <el-row>
        <ICol border type="three_quarters">
          <el-card>
            <span slot="header">
              货物清单
            </span>
            <CargoTempList v-model="form" :commit-complete="commitComplete"
                           @on-change-total-fee="OnChangeCargoBasicFreight"/>
          </el-card>
        </ICol>
        <ICol border type="quarter">
          <el-card>
            <span slot="header">
              增值服务
            </span>
            <ICol type="full">
            </ICol>
          </el-card>
        </ICol>
      </el-row>
      <el-row>
        <ICol border type="full">
          <el-card>
            <span slot="header">结算信息</span>
            <el-row v-if="false">
              <ICol border>
                <el-form-item label="基本运费" prop="basicFreight">
                  <el-input v-model="form.basicFreight" placeholder="请输入基本运费"/>
                </el-form-item>
              </ICol>
              <ICol border>
                <el-form-item label="实收运费" prop="realFreight">
                  <el-input v-model="form.realFreight" placeholder="请输入实收运费"/>
                </el-form-item>
              </ICol>
              <ICol border>
                <el-form-item label="总运费" prop="totalFreight">
                  <el-input v-model="form.totalFreight" placeholder="请输入总运费"/>
                </el-form-item>
              </ICol>
              <ICol border>
                <el-form-item label="开单备注" prop="remark">
                  <el-input v-model="form.remark" placeholder="请输入开单备注"/>
                </el-form-item>
              </ICol>
            </el-row>
            <el-row>
              <ICol border>
                <el-form-item label="基本运费" prop="basicFreight">
                  <el-input v-model="form.basicFreight" placeholder="请输入基本运费"/>
                </el-form-item>
              </ICol>
              <ICol border>
                <el-form-item label="实收运费" prop="realFreight">
                  <el-input v-model="form.realFreight" placeholder="请输入实收运费"/>
                </el-form-item>
              </ICol>
              <ICol border>
                <el-form-item label="总运费" prop="totalFreight">
                  <el-input v-model="form.totalFreight" placeholder="请输入总运费"/>
                </el-form-item>
              </ICol>
              <ICol border>
                <el-form-item label="开单备注" prop="remark">
                  <el-input v-model="form.remark" placeholder="请输入开单备注"/>
                </el-form-item>
              </ICol>
            </el-row>
          </el-card>
        </ICol>
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="submitForm">确 定</el-button>
      <el-button @click="cancel">取 消</el-button>
    </div>
    <el-dialog :title="'请选择'+appendEntityDialog.title+'方'" :visible.sync="appendEntityDialog.open" append-to-body>
      <el-form v-show="!loading" ref="currentAppendForm" :model="currentAppendEntity" :rules="currentAppendFormRules"
               label-position="left" label-width="80px">
        <el-row>
          <ICol type="half">
            <el-row>
              <ICol type="two_thirds">
                <el-form-item :label="appendEntityDialog.title+'公司'" prop="dept">
                  <TreeSelect v-model="currentAppendEntity.dept" :options="deptOptions"
                              :placeholder="'请选择'+appendEntityDialog.title+'公司'"
                              :show-count="true"
                              valueFormat="object" @select="handleFormDeptIdClick">
                  </TreeSelect>
                </el-form-item>
              </ICol>
              <ICol type="one_third">
                <el-button remark="新增公司" @click="openAddDialog(1)">新增</el-button>
              </ICol>
            </el-row>
          </ICol>
          <ICol type="half">
            <el-row>
              <ICol type="two_thirds">
                <el-form-item label="收货人" prop="userId">
                  <el-select v-model="currentAppendEntity.userId" :disabled="!this.userOptions.length>0"
                             :placeholder="'请选择'+appendEntityDialog.title+'人'"
                             style="width: 100%;">
                    <el-option v-for="(item,index) in userOptions" :key="index"
                               :label="item.nickName"
                               :value="item.userId"/>
                  </el-select>
                </el-form-item>
              </ICol>
              <ICol type="one_third">
                <el-button remark="负责人" @click="openAddDialog(2)">新增</el-button>
              </ICol>
            </el-row>
          </ICol>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleSubmitAppendEntity">确 定</el-button>
        <el-button @click="appendEntityDialogCancel">取 消</el-button>
      </div>
      <DeptDialog v-model="deptDialogRow" :option="deptDialogOption" @on-success="initAddCoOrUser"/>
      <UserDialog v-model="userDialogRow" :option="userDialogOption" @on-success="initAddCoOrUser"/>
    </el-dialog>
  </el-dialog>
</template>

<script>
import {addWaybill, getWaybill, updateWaybill} from "@/api/wms/waybill";
import 'element-ui/lib/theme-chalk/display.css';
import ICol from "@/components/ICol";
import RegionSelect from "@/components/regionSelect/index";
import TreeSelect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
import {cloneDeep} from 'lodash'
import {getDefaultWarehouse, listWarehouse} from "@/api/wms/warehouse";
import {treeSelect} from "@/api/system/dept";
import {listUser} from "@/api/system/user";
import CargoTempList from "@/views/components/wms/Waybill/CargoList"
import UserDialog from "@/views/components/system/user/Dialog/index";
import DeptDialog from "@/views/components/system/dept/Dialog/index";

export default {
  name: "WaybillDialog",
  components: {
    ICol,
    TreeSelect,
    RegionSelect,
    CargoTempList,
    DeptDialog,
    UserDialog,
  },
  props: {
    value: {
      type: Object,
    },
    option: {
      type: Object,
      required: true
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
    option: {
      handler(val) {
        if (val !== this.dialog) {
          this.checkProps();
        }
      },
      immediate: true
    },
  },
  computed: {
    readOnly() {
      return this.dialog.type != 0;
    },
  },
  data() {
    return {
      loading: false,
      row: {},
      dialog: {
        // 弹出层标题
        title: "",
        // 是否显示弹出层
        open: false,
        //0-添加 1-编辑
        type: 0,
      },
      deptOptions: [],
      userOptions: [],
      currentAppendEntity: {
        dept: null,
        userId: null
      },
      currentAppendFormRules: {
        dept: [
          {required: true, message: "公司不能为空", trigger: "blur"}
        ],
        userId: [
          {required: true, message: "负责人不能为空", trigger: "blur"}
        ],
      },
      appendEntityDialog: {
        // 弹出层标题
        title: "",
        // 是否显示弹出层
        open: false,
        //0-添加 1-编辑
        type: 0,
      },
      userDialogOption: {
        type: 0,
        open: false,
      },
      userDialogRow: {
        temp: 0
      },
      deptDialogOption: {
        type: 0,
        open: false,
      },
      deptDialogRow: {
        temp: 0
      },
      grid: {
        gutter: 24,
        xs: 24,
        sm: 24,
        md: 12,
        lg: 6,
        xl: 6
      },
      departureWarehouseOptions: [],
      destinationWarehouseOptions: [],
      // 交接方式字典
      handoverModeOptions: [],
      // 运输方式字典
      transportModeOptions: [],
      // 付款方式字典
      payMethodOptions: [],
      // 回单状态字典
      receiptStatusOptions: [],
      // 回扣已返字典
      rebateReturnedOptions: [],
      // 是否开发票字典
      writeInvoiceOptions: [],
      // 运单状态字典
      waybillStatusOptions: [],
      // 状态字典
      statusOptions: [],
      // 创建时间时间范围
      daterangeCreateTime: [],
      // 表单参数
      form: {
        deliverEntity: {
          visible: false,
          deliverCoId: null,
          deliverCoName: null,
          consignorName: null,
          consignorMobile: null,
          consignorTelephone: null,
        },
        receivingEntity: {
          visible: false,
          receivingCoId: null,
          receivingCoName: null,
          consigneeName: null,
          consigneeMobile: null,
          consigneeTelephone: null,
        },
        provinceCityDistrictStreet: null
      },
      fromStr: '',
      commitComplete: false,
      // 表单校验
      rules: {
        destination: [
          {required: true, message: "到达站不能为空", trigger: "blur"}
        ],
        departure: [
          {required: true, message: "始发站不能为空", trigger: "blur"}
        ],
        creationSource: [
          {required: true, message: "开单来源不能为空", trigger: "blur"}
        ],
      },

    };
  },
  methods: {
    checkProps() {
      if (this.value !== this.row) {
        this.row = this.value;
      }
      if (this.option !== this.dialog) {
        this.dialog.type = this.option.type;
        // this.dialog.open = this.option.open;
      }
      if (this.option.open) {
        const type = +this.dialog.type;
        switch (type) {
          case 0:
            this.handleAdd();
            break;
          case 1:
            this.handleUpdate(this.row);
            break;
        }
      }
    },
    /** 查询运单信息主列表 */
    getDictMethods() {
      this.getDicts("wms_waybill_handover_mode").then(response => {
        this.handoverModeOptions = response.data;
      });
      this.getDicts("wms_waybill_transport_mode").then(response => {
        this.transportModeOptions = response.data;
      });
      this.getDicts("wms_waybill_pay_method").then(response => {
        this.payMethodOptions = response.data;
      });
      this.getDicts("wms_waybill_receipt_status").then(response => {
        this.receiptStatusOptions = response.data;
      });
      this.getDicts("public_common_yes_no").then(response => {
        this.rebateReturnedOptions = response.data;
        this.writeInvoiceOptions = response.data;
      });
      this.getDicts("wms_waybill_status").then(response => {
        this.waybillStatusOptions = response.data;
      });
      this.getDicts("sys_common_status").then(response => {
        this.statusOptions = response.data;
      });
    },
    getWarehouseOptions(warehouseName, type) {
      listWarehouse({
        warehouseName,
        pageNum: 1,
        pageSize: 10
      }).then(res => {
        if (type === 0) {
          this.departureWarehouseOptions = res.rows;
          this.destinationWarehouseOptions = res.rows;
        } else if (type === 1) {
          this.departureWarehouseOptions = res.rows;
        } else if (type === 2) {
          this.destinationWarehouseOptions = res.rows;
        }
      });
    },
    // 取消按钮
    cancel() {
      this.dialog.open = false;
      this.dialog.type = 0;
      this.reset();
    },
    // 取消按钮
    appendEntityDialogCancel() {
      this.appendEntityDialog.open = false;
      this.appendEntityDialog.type = 0;
      this.appendEntityDialogReset();
    },
    handleSubmitAppendEntity() {
      this.$refs['currentAppendForm'].validate(valid => {
        if (valid) {
          const currentAppendEntity = this.currentAppendEntity;
          const type = currentAppendEntity.type;
          const form = cloneDeep(this.form);
          const user = this.userOptions.find(i => i.userId == currentAppendEntity.userId);
          switch (+type) {
            //发货方
            case 0:
              form.deliverEntity.visible = true;
              form.deliverEntity.deliverCoId = currentAppendEntity.dept.id;
              form.deliverEntity.deliverCoName = currentAppendEntity.dept.label;
              form.csrId = user.userId
              form.csrCode = user.userName
              form.deliverEntity.consignorName = user.nickName
              form.deliverEntity.consignorMobile = user.phonenumber;
              this.form = form;
              break;
            //收货方
            case 1:
              form.receivingEntity.visible = true;
              form.receivingEntity.receivingCoId = currentAppendEntity.dept.id;
              form.receivingEntity.receivingCoName = currentAppendEntity.dept.label;
              form.receivingEntity.consigneeId = user.userId
              form.receivingEntity.consigneeName = user.nickName
              form.receivingEntity.consigneeMobile = user.phonenumber;
              this.form = form;
              break;
          }
          this.$message.info('添加成功');
          this.appendEntityDialog.open = false;
        }
      })
    },
    // 表单重置
    reset() {
      this.form = {
        waybillId: null,
        waybillCode: null,
        departure: null,
        destination: null,
        transitPlace: null,
        deliverEntity: {
          visible: false,
          deliverCoId: null,
          deliverCoName: null,
          consignorId: null,
          consignorName: null,
          consignorMobile: null,
          consignorTelephone: null,
        },
        receivingEntity: {
          visible: false,
          receivingCoId: null,
          receivingCoName: null,
          consigneeId: null,
          consigneeName: null,
          consigneeMobile: null,
          consigneeTelephone: null,
        },
        regionSelectValue: null,
        provinceCityDistrictStreet: null,
        csrId: null,
        csrCode: null,
        csrOrderNumber: null,
        deliverCoId: null,
        deliverCoName: null,
        consignorName: null,
        consignorMobile: null,
        consignorTelephone: null,
        receivingCoId: null,
        receivingCoName: null,
        consigneeName: null,
        consigneeMobile: null,
        consigneeTelephone: null,
        receivingProvince: null,
        receivingCity: null,
        receivingDistrict: null,
        receivingStreet: null,
        receivingAddress: null,
        deptId: null,
        stowageId: null,
        destinationNode: null,
        handoverMode: null,
        transportMode: null,
        payMethod: null,
        receiptStatus: "0",
        rebateReturned: "0",
        writeInvoice: "0",
        basicFreight: null,
        realFreight: null,
        totalFreight: null,
        deliveryVehicleId: null,
        deliveryVehicleCode: null,
        deliveryDriverId: null,
        deliveryDriverName: null,
        deliveryTime: null,
        drawerId: null,
        drawerName: null,
        equipmentSource: null,
        creationSource: null,
        waybillStatus: null,
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
    appendEntityDialogReset() {
      this.currentAppendEntity = {
        dept: null,
        userId: null,
      };
      this.resetForm("currentAppendForm");
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.dialog.open = true;
      getDefaultWarehouse().then(({data}) => {
        this.form.departure = data.warehouseId;
        this.dialog.type = 0;
        this.dialog.title = "添加运单信息";
      });
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      this.loading = true;
      this.getWarehouseOptions(null, 0);
      const waybillId = row.waybillId || this.ids
      getWaybill(waybillId).then(response => {
        const data = this.form = response.data;
        this.form.regionSelectValue = {
          level: 0,
          code: data.receivingProvince,
          parentCode: 0,
          child: {
            level: 1,
            code: data.receivingCity,
            parentCode: data.receivingProvince,
            child: {
              level: 2,
              code: data.receivingDistrict,
              parentCode: data.receivingCity,
              child: {
                level: 3,
                code: data.receivingStreet,
                parentCode: data.receivingDistrict,
              },
            },
          },
        };
        this.form.deliverEntity = {
          visible: true,
          deliverCoName: data.deliverCoName,
          consignorName: data.consignorName,
          consignorMobile: data.consignorMobile,
          consignorTelephone: data.consignorTelephone,
        };
        this.form.receivingEntity = {
          visible: true,
          receivingCoName: data.receivingCoName,
          consigneeName: data.consigneeName,
          consigneeMobile: data.consigneeMobile,
          consigneeTelephone: data.consigneeTelephone,
        };
        this.form.provinceCityDistrictStreet = '';
        this.form.departure = +data.departure;
        this.form.destination = +data.destination;
        this.dialog.open = true;
        this.dialog.type = 1;
        this.dialog.title = "修改运单信息";
        this.loading = false;
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          const form = this.form;
          this.dataProcessing(form);
          if (form.waybillId != null) {
            console.log('update')
            updateWaybill(form).then(({data}) => {
              this.form = data;
              this.msgSuccess("修改成功");
              this.dialog.open = false;
              this.$emit('on-success');
              this.commitComplete = true;
            });
          } else {
            console.log('add')
            addWaybill(form).then(response => {
              console.log(response)
              // this.commitComplete = true;
              // this.msgSuccess("新增成功");
              // this.dialog.open = false;
              // this.$emit('on-success');
            });
          }
        }
      });
    },
    updateRegionSelectValue(data, label, status) {
      this.form.regionSelectValue = data
      if (status) {
        this.form.receivingProvince = data.provinceCode;
        this.form.receivingCity = data.cityCode;
        this.form.receivingDistrict = data.districtCode;
        this.form.receivingStreet = data.streetCode;
        if (this.dialog.type == 0)
          this.form.receivingAddress = label.split('-').join('') + this.form.receivingAddress;
      } else {
        this.form.provinceCityDistrictStreet = '';
      }
    },
    handleFormDeptIdClick({id, orderNum}) {
      this.currentAppendEntity.userId = '';
      this.getUserInTheDepartment(id, orderNum, 1);
    },
    /** 查询部门下拉树结构 */
    getTreeSelect(params) {
      treeSelect(params).then(response => {
        this.deptOptions = response.data;
      });
    },
    getUserInTheDepartment(deptId, orderNum, type) {
      if (deptId && +orderNum >= 0)
        listUser({deptId}).then(res => {
          switch (+type) {
            case 1:
              this.userOptions = [];
              this.userOptions = res.rows;
              break;
          }
        });
      else {
        return;
      }
    },
    openUserDialog(type) {
      this.appendEntityDialogReset();
      this.getTreeSelect({parentId: 110});
      this.currentAppendEntity.type = type;
      this.appendEntityDialog.open = true;
      this.appendEntityDialog.title = +type == 0 ? '发货' : '收货';
    },
    openAddDialog(type) {
      switch (+type) {
        case 1:
          this.deptDialogRow = {};
          this.deptDialogOption = {}
          this.deptDialogOption.type = 0;
          this.deptDialogOption.open = true;
          break;
        case 2:
          this.userDialogRow = {};
          this.userDialogOption = {}
          this.userDialogOption.type = 0;
          this.userDialogOption.open = true;
          break;
      }
    },
    initAddCoOrUser() {
      this.getTreeSelect({parentId: 110});
      this.userOptions = [];
      this.currentAppendEntity.userId = '';
    },
    OnChangeCargoBasicFreight(fee) {
      this.form.basicFreight = fee;
    },
    dataProcessing() {
      const form = cloneDeep(this.form);
      form.deliverCoId = form.deliverEntity.deliverCoId;
      form.deliverCoName = form.deliverEntity.deliverCoName;
      form.consignorName = form.deliverEntity.consignorName;
      form.consignorMobile = form.deliverEntity.consignorMobile;
      form.consignorTelephone = form.deliverEntity.consignorTelephone;
      form.receivingCoId = form.receivingEntity.receivingCoId;
      form.receivingCoName = form.receivingEntity.receivingCoName;
      form.consigneeName = form.receivingEntity.consigneeName;
      form.consigneeMobile = form.receivingEntity.consigneeMobile;
      form.consigneeTelephone = form.receivingEntity.consigneeTelephone;
      this.form = form;
    }
  },
  created() {
    this.getDictMethods();
    this.getWarehouseOptions(null, 0);
  },
  mounted() {
    this.reset();
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

/deep/ .el-form-item {
  margin-bottom: 0;
  padding-right: 1px;
  padding-left: 1px;
}

.select-width {
  width: 100%;
}

.erect {
  width: 15px;
  margin: 0 auto;
  line-height: 24px;
  font-size: 20px;
  word-wrap: break-word;
}
</style>
