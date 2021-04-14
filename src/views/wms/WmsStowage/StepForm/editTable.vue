<template>
  <el-card>
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
                <el-select v-model="stowageForm.departureDriverId" :disabled="this.userOptions.length==0"
                           :loading="loading" :remote-method="(keyword)=>getDriverData(keyword)"
                           class="common-select-width" filterable placeholder="请选择发车司机" remote reserve-keyword>
                  <el-option v-for="(item,index) in userOptions" :key="index"
                             :label="item.nickName"
                             :value="item.userId"/>
                </el-select>
              </el-form-item>
            </ICol>
            <ICol>
              <el-form-item label="发车批次" prop="departureCode">
                <el-input v-model="stowageForm.departureCode" placeholder="请输入发车批次"/>
              </el-form-item>
            </ICol>
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
            <ICol>
              <el-form-item label="发车车ID" prop="departureVehicleId">
                <el-input v-model="stowageForm.departureVehicleId" placeholder="请输入发车车ID"/>
              </el-form-item>
            </ICol>
            <ICol>
              <el-form-item label="发车车编码" prop="departureVehicleCode">
                <el-input v-model="stowageForm.departureVehicleCode" placeholder="请输入发车车编码"/>
              </el-form-item>
            </ICol>
            <ICol>
              <el-form-item label="发车车牌号" prop="departureVehiclePlate">
                <el-input v-model="stowageForm.departureVehiclePlate" placeholder="请输入发车车牌号"/>
              </el-form-item>
            </ICol>
            <ICol>
              <el-form-item label="发车时间" prop="departureTime">
                <el-date-picker v-model="stowageForm.departureTime" clearable
                                placeholder="选择发车时间"
                                size="small"
                                type="date"
                                value-format="yyyy-MM-dd">
                </el-date-picker>
              </el-form-item>
            </ICol>
            <!--
            <ICol>
              <el-form-item label="部门ID" prop="deptId">
                <el-input v-model="stowageForm.deptId" placeholder="请输入部门ID"/>
              </el-form-item>
            </ICol>
            -->
            <ICol type="full">
              <el-form-item label="备注" prop="remark">
                <el-input v-model="stowageForm.remark" placeholder="请输入备注"/>
              </el-form-item>
            </ICol>
          </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="submitForm">确 定</el-button>
          <el-button @click="cancel">取 消</el-button>
        </div>
      </el-tab-pane>
      <el-tab-pane label="路线信息" name="routeInfo">
        <routeInfoForm ref="routeInfoForm" :pKey="stowageForm.stowageId" @on-change-tab="changeTabs"/>
      </el-tab-pane>
      <el-tab-pane disabled label="运单信息" name="stowageWaybillInfo">
        <stowageWaybillInfoForm ref="stowageWaybillInfoForm" :pKey="routeId"/>
      </el-tab-pane>
    </el-tabs>
    <el-form label-width="100px">
      <el-form-item style="text-align: center;margin-left:-100px;margin-top:10px;">
        <el-button type="primary" @click="submitForm()">提交</el-button>
        <el-button @click="close()">返回</el-button>
      </el-form-item>
    </el-form>
    <el-dialog :title="'请选择'+appendEntityDialog.title" :visible.sync="appendEntityDialog.open" append-to-body>
      <el-form v-show="!loading" ref="currentAppendForm" :model="currentAppendEntity" :rules="currentAppendFormRules"
               label-position="left" label-width="80px">
        <el-row>
          <ICol type="half">
            <el-row>
              <ICol type="two_thirds">
                <el-form-item label="部门" prop="dept">
                  <TreeSelect v-model="currentAppendEntity.dept" :options="deptOptions"
                              :show-count="true"
                              placeholder="请选择部门"
                              valueFormat="object" @select="handleFormDeptIdClick">
                  </TreeSelect>
                </el-form-item>
              </ICol>
            </el-row>
          </ICol>
          <ICol type="half">
            <el-row>
              <ICol type="two_thirds">
                <el-form-item label="司机" prop="userId">
                  <el-select v-model="currentAppendEntity.userId" :disabled="!this.userOptions.length>0"
                             placeholder="请选择司机"
                             style="width: 100%;">
                    <el-option v-for="(item,index) in userOptions" :key="index"
                               :label="item.nickName"
                               :value="item.userId"/>
                  </el-select>
                </el-form-item>
              </ICol>
            </el-row>
          </ICol>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleSubmitAppendEntity">确 定</el-button>
        <el-button @click="appendEntityDialogCancel">取 消</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>
<script>
import { getWmsStowage } from '@/api/wms/WmsStowage'
import routeInfoForm from './routeInfoForm'
import stowageWaybillInfoForm from './stowageWaybillInfoForm'
import ICol from '@/components/ICol'
import { listWarehouse } from '@/api/wms/warehouse'
import { isNotEmpty } from '@/utils/utils'
import { treeSelect } from '@/api/system/dept'
import { getDriver, listUser } from '@/api/system/user'
import TreeSelect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'

export default {
  name: 'StowageEdit',
  components: {
    ICol,
    TreeSelect,
    routeInfoForm,
    stowageWaybillInfoForm
  },
  props:{

  },
  computed: {
    readOnly() {
      return false
    },
    stowageWarehouse() {
      const stowageWarehouseName = this.stowageForm.stowageWarehouseName

    }
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
      info: {},
      stowageForm: {
        stowageId: null,
      },
      driverEntity: {
        visible: false,
      },
      currentAppendEntity: {
        dept: null,
        userId: null
      },
      deptOptions: [],
      userOptions: [],
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
        departureCode: [
          { required: true, message: '发车批次不能为空', trigger: 'blur' }
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
        this.getWarehouseOptions()
        this.getDriverData()
        this.getWmsStowageData()
      }
    },
    getWmsStowageData() {
      // 获取表详细信息
      getWmsStowage( this.stowageId ).then( ( { data } ) => {
        this.loading = false
        if ( isNotEmpty( data ) ) {
          this.stowageForm = data
        } else {
          this.$router.back()
        }
      } )
    },
    getDriverData(nickName='',idle=true) {
      getDriver( {
        nickName,
        idle:false
      }).then( res => {
        this.userOptions.length = 0
        this.userOptions = res.rows
      });
    },
    /** 提交按钮 */
    submitForm() {
      // const routeInfoForm = this.$refs.basicInfo.$refs.routeInfoForm
      // const stowageWaybillInfoForm = this.$refs.genInfo.$refs.stowageWaybillInfoForm
      // Promise.all( [ routeInfoForm, stowageWaybillInfoForm ].map( this.getFormPromise ) ).then( res => {
      //   const validateResult = res.every( item => !!item )
      //   if ( validateResult ) {
      //     const genTable = Object.assign( {}, routeInfoForm.model, stowageWaybillInfoForm.model )
      //     genTable.columns = this.cloumns
      //     genTable.params = {
      //       treeCode: genTable.treeCode,
      //       treeName: genTable.treeName,
      //       treeParentCode: genTable.treeParentCode,
      //       parentMenuId: genTable.parentMenuId
      //     }
      //     updateGenTable( genTable ).then( res => {
      //       this.msgSuccess( res.msg )
      //       if ( res.code === 200 ) {
      //         this.close()
      //       }
      //     } )
      //   } else {
      //     this.msgError( '表单校验未通过，请重新检查提交内容' )
      //   }
      // } )
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
      // this.$store.dispatch( 'tagsView/delView', this.$route );
      // this.$router.push( { path: '/tool/gen', query: { t: Date.now() } } );
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
          break
      }
    },
    openUserDialog( type ) {
      this.appendEntityDialogReset()
      this.getTreeSelect( { parentId: 100 } )
      this.currentAppendEntity.type = type
      this.appendEntityDialog.open = true
      this.appendEntityDialog.title = +type == 0 ? '发货' : '收货'
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
          this.userOptions.length=0;
          this.userOptions = res.rows
        } )
      else {
        return
      }
    },
    // 取消按钮
    appendEntityDialogCancel() {
      this.appendEntityDialog.open = false
      this.appendEntityDialog.type = 0
      this.appendEntityDialogReset()
    },
    handleSubmitAppendEntity() {
      this.$refs['currentAppendForm'].validate( valid => {
        if ( valid ) {
          // const currentAppendEntity = this.currentAppendEntity
          // const type = currentAppendEntity.type
          // const stowageForm = cloneDeep( this.stowageForm )
          // const user = this.userOptions.find( i => i.userId == currentAppendEntity.userId )
          // stowageForm.deliverEntity.visible = true
          // stowageForm.deliverEntity.deliverCoId = currentAppendEntity.dept.id
          // stowageForm.deliverEntity.deliverCoName = currentAppendEntity.dept.label
          // stowageForm.csrId = user.userId
          // stowageForm.csrCode = user.userName
          // stowageForm.deliverEntity.consignorName = user.nickName
          // stowageForm.deliverEntity.consignorMobile = user.phonenumber
          // this.form = stowageForm
          // this.$message.info( '添加成功' )
          // this.appendEntityDialog.open = false
        }
      } )
    },
  },
  mounted() {

  }
}
</script>
