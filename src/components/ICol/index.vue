<template>
  <el-col :offset="offset" :pull="pull" :push="push" :xs="gridData.xs" :sm="gridData.sm" :md="gridData.md" :lg="gridData.lg"
          :xl="gridData.xl">
    <div :style="colStyle">
      <slot>

      </slot>
    </div>
  </el-col>
</template>

<script>
export default {
  name: "ICol",
  props: {
    grid: {
      type: Object,
      default: () => {
        return {
          gutter: 24,
          xs: {span: 24, offset: 0},
          sm: {span: 12, offset: 0},
          md: {span: 8, offset: 0},
          lg: {span: 6, offset: 0},
          xl: {span: 6, offset: 0}
        }
      },
    },
    offset: Number,
    pull: Number,
    push: Number,
    type: String,
  },
  watch: {
    grid: {
      handler(val) {
        if (val !== this.gridData) {
          this.gridData = val;
        }
      },
      immediate: true
    },
  },
  computed: {},
  data(){
    return{
      gridData:{},
      colStyle:{},
    };
  },
  mounted() {
    switch (this.type) {
      case 'search':
        this.gridData.xs.offset = 0;
        this.gridData.sm.offset = 0;
        this.gridData.md.offset = 12;
        this.gridData.lg.offset = 18;
        this.gridData.xl.offset = 18;
        this.colStyle={display:'flex',justifyContent:'flex-end',};
        break;
      case 'full':
        this.gridData = {
          gutter: 24,
          xs: {span: 24, offset: 0},
          sm: {span: 24, offset: 0},
          md: {span: 24, offset: 0},
          lg: {span: 24, offset: 0},
          xl: {span: 24, offset: 0}
        }
        break;
    }
  }
}
</script>

<style scoped>

</style>
