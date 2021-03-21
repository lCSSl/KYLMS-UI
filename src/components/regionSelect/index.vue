<template>
  <el-row :gutter="10">
    <ICol v-if="+regionLevel>=1" :grid="grid">
      <el-select size="small" v-model="provinceCode" :disabled="disabled" placeholder="省" transfer
              @on-change="(code)=>{setCode(code,0);setCityList(code);}">
        <Option v-for="(item,index) in provinceList" :key="index" :value="item.code">{{item.name}}</Option>
      </el-select>
    </ICol>
    <ICol v-if="+regionLevel>=2" :grid="grid">
      <el-select size="small" v-model="cityCode" :disabled="disabled" placeholder="市" transfer
              @on-change="(code)=>{setCode(code,1);setDistrictList(code)}">
        <Option v-for="(item,index) in cityList" :key="index" :value="item.code">{{item.name}}</Option>
      </el-select>
    </ICol>
    <ICol v-if="+regionLevel>=3" :grid="grid">
      <el-select size="small" v-model="districtCode" :disabled="disabled" placeholder="区" transfer
              @on-change="(code)=>{setCode(code,2);}">
        <Option v-for="(item,index) in districtList" :key="index" :value="item.code">{{item.name}}</Option>
      </el-select>
    </ICol>
  </el-row>
</template>

<script>
import { listArea } from '@/api/system/area';
import ICol from '@/components/ICol'
export default {
  name: 'region-select',
  components:{
    ICol
  },
  props: {
    value: {
      type: Object,
      default: {}
    },
    level: {
      type: Number, String,
      default: 3
    },
    /* eslint-disable */
    disabledSelect: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      regionLevel: '',
      currentValue: {},
      provinceList: [],
      cityList: [],
      districtList: [],
      provinceCode: -1,
      cityCode: -1,
      districtCode: -1,
      status: false,
      disabled: false,
      provinceCityDistrict: ''
    }
  },
  computed: {
    grid () {
      switch (+this.regionLevel) {
        case 1:
          return { xl: 24, lg: 24, md: 24, sm: 24, xs: 24 };
          break;
        case 2:
          return { xl: 12, lg: 12, md: 12, sm: 24, xs: 24 };
          break;
        case 3:
          return { xl: 8, lg: 8, md: 12, sm: 24, xs: 24 };
          break;
      }
    }
  },
  watch: {
    value: {
      handler (val) {
        if (val !== this.currentValue) {
          this.currentValue = val;
          this.renderData(this.currentValue);
        }
      },
      immediate: true
    },
    disabledSelect: {
      handler (val) {
        if (val !== this.disabled) {
          this.disabled = val;
        }
      },
      immediate: true
    },
    level: {
      handler (val) {
        if (val !== this.regionLevel) {
          this.regionLevel = val;
        }
      },
      immediate: true
    },
  },
  methods: {
    init () {
      if (this.currentValue.code) {
        this.renderData(this.currentValue)
      } else {
        listArea({
          code: 0
        }).then((res => {
          this.provinceList = res
        }));
      }
    },
    renderData (data) {
      const { code, child, level, parentCode } = data;
      listArea({ code: parentCode >= 0 ? parentCode : 0 }).then(res => {
        switch (level) {
          case 0:
            this.provinceList = res;
            this.setCode(code, level)
            break;
          case 1:
            this.cityList = res;
            this.setCode(code, level)
            break;
          case 2:
            this.districtList = res;
            this.setCode(code, level)
            break;
          default:
            break;
        }
        if (child) {
          this.renderData(child);
        }
      });
    },
    checkLevel (level) {
      return level > this.regionLevel;
    },
    setCode (code, level) {
      const _code = +code;
      const _level = +level;
      switch (_level) {
        case 0:
          if (this.checkLevel(1)) {
            return;
          }
          this.currentValue = { _code, _level }
          this.currentValue.provinceCode = _code;
          this.provinceCode = _code;
          this.cityList = [];
          this.cityCode = '';
          this.districtList = [];
          this.districtCode = '';
          break;
        case 1:
          if (this.checkLevel(2)) {
            return;
          }
          this.currentValue.child = { _code, _level };
          this.currentValue.cityCode = _code;
          this.cityCode = _code;
          this.districtList = [];
          this.districtCode = '';
          break;
        case 2:
          if (this.checkLevel(3)) {
            return;
          }
          this.currentValue.child.child = { _code, _level };
          this.currentValue.districtCode = _code;
          this.districtCode = _code;
          break;
        default:
          break;
      }
      const regionLevel = this.regionLevel;
      switch (+regionLevel) {
        case 1:
          this.provinceCode ? this.status = true : this.status = false;
          break;
        case 2:
          this.cityCode ? this.status = true : this.status = false;
          break;
        case 3:
          this.districtCode ? this.status = true : this.status = false;
          break;
      }

      const province = this.provinceList.find(({ code }) => code === this.provinceCode);
      const city = this.cityList.find(({ code }) => code === this.cityCode);
      const district = this.districtList.find(({ code }) => code === this.districtCode);

      this.provinceCityDistrict = `${province && province.name ? province.name : ''}${city && city.name ? '-'+city.name : ''}${district && district.name ? '-'+district.name : ''}`;

      this.$emit('on-change', this.currentValue, this.provinceCityDistrict, this.status);
    },
    setProvinceList (code) {
      if (!code) {
        return
      }
      listArea({
        code: 0
      }).then((res => {
        this.provinceList = res
      }));
    },
    setCityList (code) {
      if (!code) {
      }
      listArea({
        code: code
      }).then((res => {
        this.cityList = res
      }));
    },
    setDistrictList (code) {
      if (!code) {
        return
      }
      listArea({
        code: code
      }).then((res => {
        this.districtList = res
      }));
    },
  },
  mounted () {
    this.init();
  },
  beforeDestroy () {

  }
}
</script>
<style lang="less">

</style>
