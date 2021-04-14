<template>
  <el-dialog :title="dialog.title" :visible.sync="dialog.open" append-to-body>
    <el-form ref="form" :model="form" :rules="rules" label-width="100px">
      <el-row :gutter="24">
        <ICol type="half">
          <el-form-item label="发出站点" prop="departure">
            <el-select
              v-model="form.departure" :disabled="loading" :loading="loading"
              :remote-method="(keyword)=>getWarehouseOptions(keyword,1)"
              class="select-width" filterable remote reserve-keyword>
              <el-option
                v-for="warehouse in departureWarehouseOptions"
                :key="warehouse.warehouseId"
                :label="warehouse.warehouseName"
                :value="warehouse.warehouseId"
              />
            </el-select>
          </el-form-item>
        </ICol>
        <ICol type="half">
          <el-form-item label="目的地站点" prop="destination">
            <el-select
              v-model="form.destination" :disabled="loading" :loading="loading"
              :remote-method="(keyword)=>getWarehouseOptions(keyword,2)"
              class="select-width" filterable remote reserve-keyword>
              <el-option
                v-for="(warehouse,index) in destinationWarehouseOptions"
                :key="index"
                :label="warehouse.warehouseName"
                :value="warehouse.warehouseId"/>
            </el-select>
          </el-form-item>
        </ICol>
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="submitForm">确 定</el-button>
      <el-button @click="cancel">取 消</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { addWmsStowage } from '@/api/wms/WmsStowage'
import { listWarehouse } from '@/api/wms/warehouse'
import ICol from '@/components/ICol'
import { cloneDeep } from 'lodash'

export default {
  name: "beginStowage",
  components:{
    ICol,
  },
  props: {
    option: {
      type: Object,
      required: true
    },
    waybillIds:{
      type:Array,
      default(){
        return[];
      }
    },
  },
  watch: {
    option: {
      handler(val) {
        if (val !== this.dialog) {
          this.checkProps();
        }
      },
      immediate: true
    },
  },
  data() {
    return {
      dialog: {
        type: 0,
        title: "",
        open: false,
      },
      loading:false,
      form: {},
      rules:{
        departure: [
          {required: true, message: "发出站点不能为空", trigger: "blur"}
        ],
        destination: [
          {required: true, message: "目的地站点不能为空", trigger: "blur"}
        ],
      },
      departureWarehouseOptions:[],
      destinationWarehouseOptions:[],
    }
  },
  methods: {
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          const form = cloneDeep(this.form);
          const departureWarehouse = this.departureWarehouseOptions.find(i=>i.warehouseId === form.departure);
          const destinationWarehouse = this.destinationWarehouseOptions.find(i=>i.warehouseId === form.destination);
          form.stowageWarehouseName = departureWarehouse.warehouseName;
          form.departureName = departureWarehouse.warehouseName;
          form.destinationName = destinationWarehouse.warehouseName;
          addWmsStowage( {
            wmsStowage:form,
            ids:this.waybillIds
          }).then(response => {
            this.msgSuccess("新增成功");
            this.dialog.open = false;
            this.$emit('on-success');
          });
        }
      });
    },
    // 取消按钮
    cancel() {
      this.dialog.open = false;
      this.reset();
    },
    reset() {
      this.form = {
        departure: null,
        departureName: null,
        destination: null,
        destinationName: null,
        remark: null
      };
      this.resetForm("form");
    },
    getWarehouseOptions(warehouseName=null, type=0) {
      this.loading=true;
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
        this.loading=false;
      });
    },
    handleAdd() {
      this.reset();
      this.dialog.type = 0;
      this.dialog.open = true;
      this.dialog.title = "开始配载";
    },
    checkProps() {
      console.log('checkProps')
      if (this.option.open) {
        const type = +this.option.type;
        switch (type) {
          case 0:
            console.log('handleAdd')
            this.handleAdd();
            break;
          case 1:
            break;
          case 2:
            break;
        }
      }
    },
  },
  mounted() {
    this.getWarehouseOptions();
  }
}
</script>
<style scoped>
.select-width {
  width: 100%;
}
</style>
