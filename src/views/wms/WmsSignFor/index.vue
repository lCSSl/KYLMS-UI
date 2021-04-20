<template>
  <div class="app-container">
    <Waybill v-if="init" :option="waybillOption" @on-handle-selection-change="handleSelectionChange"/>
  </div>
</template>

<script>
import { listWaybillByRouteId } from '@/api/wms/waybill'
import 'element-ui/lib/theme-chalk/display.css'
import ICol from '@/components/ICol'
import RegionSelect from '@/components/regionSelect/index'
import Ellipsis from '@/components/Ellipsis/index'
import { getDefaultWarehouse, listWarehouse } from '@/api/wms/warehouse'
import WaybillDialog from '@/views/components/wms/Waybill/Dialog/index'
import BeginStowage from '@/views/components/wms/Stowage/beginStowage'
import { isNotEmpty } from '@/utils/utils'
import { delWaybillFormRoute, makeStowage } from '@/api/wms/WmsStowageMdWaybill'
import Waybill from '@/views/wms/waybill/index'

export default {
  name: 'StowageWaybill',
  components: {
    Waybill,
  },
  props: {
  },
  watch: {

  },
  computed: {

  },
  data() {
    return {
      init:false,
      warehouse:{},
      waybillOption: {
        pKey: null,
        action: 1,
        params:{
        },
      },
    }
  },
  methods: {
    // 多选框选中数据
    handleSelectionChange( selection ) {
      this.waybillIds = selection.ids
    },
    getData(){
      this.init=false;
      getDefaultWarehouse().then(( { data })=>{
        this.warehouse = data;
        this.waybillOption.params.destination = data.warehouseId;
        this.init=true;
      })
    }
  },
  mounted() {
    this.getData();
  }
}
</script>
<style scoped>

</style>
