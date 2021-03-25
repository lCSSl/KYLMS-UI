<template>
  <el-col :offset="offset" :pull="pull" :push="push" :xs="grid.xs" :sm="grid.sm" :md="grid.md" :lg="grid.lg"
          :xl="grid.xl">
    <slot>

    </slot>
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
  computed: {},
  mounted() {
    switch (this.type) {
      case 'search':
        this.grid.xs.offset = 0;
        this.grid.sm.offset = 0;
        this.grid.md.offset = 12;
        this.grid.lg.offset = 18;
        this.grid.xl.offset = 18;
        break;
      case 'full':
        this.grid = {
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
