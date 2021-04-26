<template>
  <el-card>
    <el-steps :active="viewType+1" finish-status="success">
      <el-step v-for="(item,index) in stowageStatusOptions"
               v-if="!(item.dictValue==='-1')" :key="index"
               :title="item.dictLabel">
        <svg-icon slot="icon" icon-class=""/>
      </el-step>
    </el-steps>
    <el-tabs v-model="activeName">
      <el-tab-pane label="基本信息" name="basicInfo">
        <el-form ref="stowageForm" :model="stowageForm" :rules="stowageFormRules" label-width="100px">
          <el-row :gutter="24">
            <ICol>
              <el-form-item label="配载编码" prop="stowageCode">
                <el-input v-model="stowageForm.stowageCode" placeholder="请输入配载编码" readonly/>
              </el-form-item>
            </ICol>
            <ICol>
              <el-form-item label="配载站点名" prop="stowageWarehouseName">
                <el-input v-model="stowageForm.stowageWarehouseName" placeholder="请输入配载站点名" readonly/>
              </el-form-item>
            </ICol>
            <ICol>
              <el-form-item label="发出站点" prop="departure">
                <el-select v-model="stowageForm.departure"
                           :loading="loading" :remote-method="(keyword)=>getWarehouseOptions(keyword,1)"
                           class="common-select-width"
                           disabled filterable remote reserve-keyword>
                  <el-option
                    v-for="warehouse in departureWarehouseOptions"
                    :key="warehouse.warehouseId"
                    :label="warehouse.warehouseName"
                    :value="warehouse.warehouseId"
                  />
                </el-select>
              </el-form-item>
            </ICol>
            <ICol>
              <el-form-item label="目的地站点" prop="destination">
                <el-select v-model="stowageForm.destination"
                           :loading="loading" :remote-method="(keyword)=>getWarehouseOptions(keyword,2)"
                           class="common-select-width"
                           disabled filterable remote reserve-keyword>
                  <el-option
                    v-for="(warehouse,index) in destinationWarehouseOptions"
                    :key="index"
                    :label="warehouse.warehouseName"
                    :value="warehouse.warehouseId"/>
                </el-select>
              </el-form-item>
            </ICol>
            <!--
            <ICol>
              <el-form-item label="发出站点名" prop="departureName">
                <el-input v-model="stowageForm.departureName" placeholder="请输入发出站点名"/>
              </el-form-item>
            </ICol>
            <ICol>
              <el-form-item label="目的地站点名" prop="destinationName">
                <el-input v-model="stowageForm.destinationName" placeholder="请输入目的地站点名"/>
              </el-form-item>
            </ICol>
            -->
            <ICol>
              <el-form-item label="发车司机" prop="userId">
                <el-select v-model="stowageForm.departureDriverId"
                           :disabled="this.finalUserOptions.length==0||this.readOnlyAll"
                           :loading="loading" :remote-method="(keyword)=>getDriverData(keyword)"
                           class="common-select-width" filterable placeholder="请选择发车司机" remote reserve-keyword>
                  <el-option v-for="(item,index) in finalUserOptions" :key="index"
                             :disabled="item.disabled"
                             :label="item.nickName"
                             :value="item.userId">
                    <span style="float: left">{{ item.nickName }}</span>
                    <span style="float: right">{{ item.disabledMsg }}</span>
                  </el-option>
                </el-select>
              </el-form-item>
            </ICol>

            <!--
            <ICol>
              <el-form-item label="发车司机ID" prop="departureDriverId">
                <el-input v-model="stowageForm.departureDriverId" placeholder="请输入发车司机ID"/>
              </el-form-item>
            </ICol>
            <ICol>
              <el-form-item label="发车司机名" prop="departureDriverName">
                <el-input v-model="stowageForm.departureDriverName" placeholder="请输入发车司机名"/>
              </el-form-item>
            </ICol>
            -->
            <ICol>
              <el-form-item label="发车车辆" prop="userId">
                <el-select v-model="stowageForm.departureVehicleId"
                           :disabled="this.readOnlyAll"
                           :loading="loading" :remote-method="(keyword)=>getVehicleData(keyword)"
                           class="common-select-width" filterable placeholder="请选择发车车辆" remote reserve-keyword>
                  <el-option v-for="(item,index) in vehicleOptions" :key="index"
                             :disabled="!(item.vehicleStatus==='0')"
                             :label="item.vehiclePlate"
                             :value="item.vehicleId">
                    <el-row>
                      <el-col :span="8">{{item.vehiclePlate}}</el-col>
                      <el-col :span="6">{{vehicleSourceFormat( item.vehicleSource )}}</el-col>
                      <el-col :span="5">{{vehicleTypeFormat( item.vehicleType )}}</el-col>
                      <el-col :span="5">{{vehicleStatusFormat( item.vehicleStatus )}}</el-col>
                    </el-row>
                  </el-option>
                </el-select>
              </el-form-item>
            </ICol>
            <!--
            <ICol>
              <el-form-item label="发车车ID" prop="departureVehicleId">
                <el-input v-model="stowageForm.departureVehicleId" :readonly="readOnlyAll" placeholder="请输入发车车ID"/>
              </el-form-item>
            </ICol>
            <ICol>
              <el-form-item label="发车车编码" prop="departureVehicleCode">
                <el-input v-model="stowageForm.departureVehicleCode" :readonly="readOnlyAll" placeholder="请输入发车车编码"/>
              </el-form-item>
            </ICol>
            <ICol>
              <el-form-item label="发车车牌号" prop="departureVehiclePlate">
                <el-input v-model="stowageForm.departureVehiclePlate" :readonly="readOnlyAll" placeholder="请输入发车车牌号"/>
              </el-form-item>
            </ICol>
            -->

            <!--
            <ICol>
              <el-form-item label="发车批次" prop="departureCode">
                <el-input v-model="stowageForm.departureCode" :readonly="readOnlyAll" placeholder="请输入发车批次"/>
              </el-form-item>
            </ICol>
            -->

            <ICol>
              <el-form-item label="发车时间" prop="departureTime">
                <el-date-picker v-model="stowageForm.departureTime" class="common-select-width"
                                clearable
                                disabled placeholder="选择发车时间" size="small"
                                type="datetime" value-format="yyyy-MM-dd hh:mm:ss">
                </el-date-picker>
              </el-form-item>
            </ICol>
            <!--
            <ICol>
              <el-form-item label="配载状态" prop="stowageStatus">
                <el-tag :type="stowageStatusTagFormat(stowageForm.stowageStatus)">{{stowageStatusFormat( stowageForm.stowageStatus )}}</el-tag>
              </el-form-item>
            </ICol>
            <ICol>
              <el-form-item label="部门ID" prop="deptId">
                <el-input v-model="stowageForm.deptId" placeholder="请输入部门ID"/>
              </el-form-item>
            </ICol>
            -->
            <ICol type="full">
              <el-form-item label="备注" prop="remark">
                <el-input v-model="stowageForm.remark" :readonly="readOnlyAll" placeholder="请输入备注" type="textarea"/>
              </el-form-item>
            </ICol>
          </el-row>
          <el-form-item style="text-align: center;margin-left:-100px;margin-top:10px;">
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="路线信息" name="routeInfo">
        <routeInfoForm ref="routeInfoForm" :pKey="stowageForm.stowageId" :vehicleId="stowageForm.departureVehicleId"
                       :view-type="viewType"
                       @on-change-tab="changeTabs"/>
      </el-tab-pane>
      <el-tab-pane disabled label="运单信息" name="stowageWaybillInfo">
        <stowageWaybillInfoForm ref="stowageWaybillInfoForm" :pKey="routeId" :params="stowageWaybillInfoFormParams"
                                :view-type="viewType"/>
      </el-tab-pane>
    </el-tabs>
    <el-form label-width="100px">
      <el-button-group>
        <el-button @click="close()">返回</el-button>
        <el-button v-if="endingStowage" type="primary" @click="submitForm()">保存</el-button>
        <el-button v-if="endingStowage" type="warning" @click="endingStowageMethod()">结束配载</el-button>
        <el-button v-if="departure" type="danger" @click="departureMethod()">发车</el-button>
      </el-button-group>
    </el-form>
  </el-card>
</template>
<script>
import { preDeparture, endStowage, getWmsStowage, updateWmsStowage } from '@/api/wms/WmsStowage'
import routeInfoForm from './routeInfoForm'
import stowageWaybillInfoForm from './stowageWaybillInfoForm'
import ICol from '@/components/ICol'
import { listWarehouse } from '@/api/wms/warehouse'
import { isNotEmpty } from '@/utils/utils'
import { treeSelect } from '@/api/system/dept'
import { getDriver, listUser } from '@/api/system/user'
import TreeSelect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
import { listWmsVehicle } from '@/api/wms/WmsVehicle'
import { deepClone } from '@/utils'

export default {
  name: 'StowageEdit',
  components: {
    ICol,
    TreeSelect,
    routeInfoForm,
    stowageWaybillInfoForm
  },
  props: {},
  computed: {
    readOnly() {
      return this.viewType >= 1
    },
    readOnlyAll() {
      return this.viewType === -1 || this.viewType === 3
    },
    departure() {
      return this.viewType === 1
    },
    endingStowage() {
      return this.viewType === 0
    },
    finalUserOptions() {
      if ( this.viewType === -1 || this.viewType === 3 ) {
        return this.userOptions
      }
      return this.userOptions.map( item => {
        if ( this.userIdleOptions.find( i => i.userId === item.userId ) ) {
          item.disabled = false
          item.disabledMsg = '空闲'
        } else {
          item.disabled = true
          item.disabledMsg = '繁忙'
        }
        return item
      } )
    },
  },
  data() {
    return {
      // 选中选项卡的 name
      activeName: 'basicInfo',
      // 表格的高度
      tableHeight: document.documentElement.scrollHeight - 245 + 'px',
      // 表信息
      tables: [],
      // 表列信息
      cloumns: [],
      // 字典信息
      dictOptions: [],
      // 菜单信息
      menus: [],
      // 表详细信息
      loading: false,
      routeId: null,
      stowageWaybillInfoFormParams: {},
      info: {},
      viewType: null,
      stowageForm: {
        stowageId: null,
      },
      sourceStowageForm: {},
      driverEntity: {
        visible: false,
      },
      currentAppendEntity: {
        dept: null,
        userId: null
      },
      deptOptions: [],
      userOptions: [],
      userIdleOptions: [],
      vehicleOptions: [],
      vehicleSourceOptions: [],
      vehicleTypeOptions: [],
      stowageStatusOptions: [],
      vehicleStatusOptions: [],
      currentAppendFormRules: {
        dept: [
          { required: true, message: '公司不能为空', trigger: 'blur' }
        ],
        userId: [
          { required: true, message: '负责人不能为空', trigger: 'blur' }
        ],
      },
      appendEntityDialog: {
        // 弹出层标题
        title: '',
        // 是否显示弹出层
        open: false,
        //0-添加 1-编辑
        type: 0,
      },
      stowageFormRules: {
        stowageCode: [
          { required: true, message: '配载编码不能为空', trigger: 'blur' }
        ],
        departure: [
          { required: true, message: '发出站点不能为空', trigger: 'blur' }
        ],
        departureName: [
          { required: true, message: '发出站点名不能为空', trigger: 'blur' }
        ],
        destination: [
          { required: true, message: '目的地站点不能为空', trigger: 'blur' }
        ],
        destinationName: [
          { required: true, message: '目的地站点名不能为空', trigger: 'blur' }
        ],
      },
      departureWarehouseOptions: [],
      destinationWarehouseOptions: [],
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      const stowageId = this.$route.params && this.$route.params.stowageId
      if ( stowageId ) {
        this.stowageId = stowageId
        this.loading = true
        this.getDictMethods()
        this.getWarehouseOptions()
        this.getDriverData( '', false )
        this.getDriverData( '' )
        this.getVehicleData()
        this.getWmsStowageData()
      }
    },
    getWmsStowageData() {
      // 获取表详细信息
      getWmsStowage( this.stowageId ).then( ( { data } ) => {
        this.loading = false
        if ( isNotEmpty( data ) ) {
          this.sourceStowageForm = deepClone( data )
          this.stowageForm = data
          const stowageStatus = this.stowageForm.stowageStatus
          const viewType = +stowageStatus
          this.viewType = viewType
        } else {
          this.$router.back()
        }
      } )
    },
    getDriverData( nickName = '', idle = true ) {
      this.loading = true
      getDriver( {
        nickName,
        idle
      } ).then( res => {
        this.loading = false
        if ( idle ) {
          this.userIdleOptions.length = 0
          this.userIdleOptions = res.rows
        } else {
          this.userOptions.length = 0
          this.userOptions = res.rows
        }
      } )
    },
    getVehicleData( vehiclePlate = '', vehicleStatus = '' ) {
      this.loading = true
      listWmsVehicle( {
        vehiclePlate,
        vehicleStatus
      } ).then( res => {
        this.loading = false
        this.vehicleOptions.length = 0
        this.vehicleOptions = res.rows
      } )
    },
    /** 提交按钮 */
    submitForm( type = 0 ) {
      this.$refs['stowageForm'].validate( valid => {
        if ( valid ) {
          const stowageForm = deepClone( this.stowageForm )
          stowageForm.params = { prev: this.sourceStowageForm }
          if ( stowageForm.stowageId != null ) {
            const user = this.userOptions.find( i => i.userId === stowageForm.departureDriverId )
            stowageForm.departureDriverName = user ? user.nickName : stowageForm.departureDriverId = null
            const vehicle = this.vehicleOptions.find( i => i.vehicleId === stowageForm.departureVehicleId )
            stowageForm.departureVehicleCode = vehicle ? vehicle.vehicleCode : stowageForm.departureVehicleId = null
            stowageForm.departureVehiclePlate = vehicle ? vehicle.vehiclePlate : stowageForm.departureVehicleId = null
            updateWmsStowage( stowageForm ).then( response => {
              this.msgSuccess( '保存成功' )
              if ( type == 1 ) {
                endStowage( this.stowageId ).then( res => {
                  this.msgSuccess( '配载成功' )
                  this.init()
                } )
              } else if ( type == 2 ) {
                preDeparture( this.stowageId ).then( res => {
                  this.msgSuccess( '发车成功' )
                  this.init()
                } )
              } else {
                this.init()
              }
            } )
          }
        }
      } )
    },
    endingStowageMethod() {
      this.submitForm( 1 )
    },
    departureMethod() {
      this.submitForm( 2 )
    },
    getFormPromise( form ) {
      return new Promise( resolve => {
        form.validate( res => {
          resolve( res )
        } )
      } )
    },
    getWarehouseOptions( warehouseName = null, type = 0 ) {
      listWarehouse( {
        warehouseName,
        pageNum: 1,
        pageSize: 10
      } ).then( res => {
        if ( type === 0 ) {
          this.departureWarehouseOptions = res.rows
          this.destinationWarehouseOptions = res.rows
        } else if ( type === 1 ) {
          this.departureWarehouseOptions = res.rows
        } else if ( type === 2 ) {
          this.destinationWarehouseOptions = res.rows
        }
      } )
    },
    /** 关闭按钮 */
    close() {
      this.$store.dispatch( 'tagsView/delView', this.$route )
      this.$router.push( { path: '/app/wms/WmsStowage', query: { t: Date.now() } } )
    },
    cancel() {
      this.reset()
    },
    // 表单重置
    reset() {
      this.stowageForm = {
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
        status: '0',
        delFlag: null,
        createBy: null,
        createTime: null,
        updateBy: null,
        updateTime: null,
        remark: null
      }
      this.resetForm( 'stowageForm' )
    },
    changeTabs( activeName, key ) {
      switch ( activeName ) {
        case 'basicInfo':
          break
        case 'routeInfo':
          break
        case 'stowageWaybillInfo':
          this.activeName = activeName
          this.routeId = key.routeId
          this.stowageWaybillInfoFormParams.departure = this.stowageForm.departure
          this.stowageWaybillInfoFormParams.destination = key.stowageWarehouseId
          this.stowageWaybillInfoFormParams.waybillStatus = '3'
          break
      }
    },
    appendEntityDialogReset() {
      this.currentAppendEntity = {
        dept: null,
        userId: null,
      }
      this.resetForm( 'currentAppendForm' )
    },
    /** 查询部门下拉树结构 */
    getTreeSelect( params ) {
      treeSelect( params ).then( response => {
        this.deptOptions = response.data
      } )
    },
    handleFormDeptIdClick( { id, orderNum } ) {
      this.currentAppendEntity.userId = ''
      this.getUserInTheDepartment( id, orderNum )
    },
    getUserInTheDepartment( deptId, orderNum ) {
      if ( deptId && +orderNum >= 0 )
        listUser( { deptId } ).then( res => {
          this.userOptions.length = 0
          this.userOptions = res.rows
        } )
      else {
        return
      }
    },
    getDictMethods() {
      this.getDicts( 'wms_vehicle_type' ).then( response => {
        this.vehicleTypeOptions = response.data
      } )
      this.getDicts( 'wms_vehicle_source' ).then( response => {
        this.vehicleSourceOptions = response.data
      } )
      this.getDicts( 'wms_vehicle_status' ).then( response => {
        this.vehicleStatusOptions = response.data
      } )
      this.getDicts( 'wms_stowage_status' ).then( response => {
        this.stowageStatusOptions = response.data
      } )
    },
    stowageStatusTagFormat( stowageStatus ) {
      if ( stowageStatus == '0' ) {
        return 'info'
      } else if ( stowageStatus == '1' ) {
        return 'warning'
      } else if ( stowageStatus == '2' ) {
        return 'success'
      } else if ( stowageStatus == '3' ) {
        return null
      } else if ( stowageStatus == '-1' ) {
        return 'danger'
      }
    },
    // 类型字典翻译
    stowageStatusFormat( key ) {
      return this.selectDictLabel( this.stowageStatusOptions, key )
    },
    // 类型字典翻译
    vehicleTypeFormat( key ) {
      return this.selectDictLabel( this.vehicleTypeOptions, key )
    },
    // 来源字典翻译
    vehicleSourceFormat( key ) {
      return this.selectDictLabel( this.vehicleSourceOptions, key )
    },
    vehicleStatusFormat( key ) {
      return this.selectDictLabel( this.vehicleStatusOptions, key )
    },
  },
  mounted() {

  }
}
</script>
