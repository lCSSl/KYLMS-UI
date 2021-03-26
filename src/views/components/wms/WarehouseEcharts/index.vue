<template>
  <el-card v-loading="isLoading">
    <div id="warehouseExtItemCanvas"></div>
  </el-card>
</template>

<script>

import * as echarts from "echarts";
import 'echarts-gl';

export default {
  props: {
    value: {
      required: true
    },
    loading: {
      type: Boolean,
      default: false
    },
    x: {
      required: true
    },
    y: {
      required: true
    }
  },
  watch: {
    value: {
      handler(val) {
        if (val !== this.data) {
          this.data = val;
        }
      },
      immediate: true
    },
    loading: {
      handler: function (val) {
        if (val !== this.isLoading) {
          this.isLoading = val;
          if (!this.isLoading) {
            this.init();
          }
        }
      },
      immediate: true
    },
  },
  computed: {
    canvasData() {
      return this.data.map(function (item) {
        return [item.itemX, item.itemY, item ? (item.status ? +item.status : 1) : 0];
      });
    }
  },
  data() {
    return {
      data: '',
      isLoading: false,
    };
  },
  mounted() {
    if (!this.isLoading && this.data.length > 0) {
      this.init();
    }
  },
  methods: {
    init() {
      // var i=0;
      // 基于准备好的dom，初始化echarts实例
      const charts = echarts.init(document.getElementById("warehouseExtItemCanvas"));


      const option = {
        tooltip: {},
        toolbox: {
          feature: {
            saveAsImage: {
              show: true,
            },
            restore: {
              show: true,
            },
            dataView: {
              show: true,
            },
            dataZoom: {
              show: true,
            },
          }
        },
        grid: {
          top: '0%',
          bottom: '0%',
          right: '0%',
          left: '0%',
          width: '100%',
          height: '100%'
        },
        visualMap: {
          max: 6,
          inRange: {
            color: ['#8d8787', '#83f364', '#ffdf61', '#fdae61', '#f46d43', '#d73027', '#a50026']
          }
        },
        xAxis3D: {
          type: 'category',
          data: this.x
        },
        yAxis3D: {
          type: 'category',
          data: this.y
        },
        zAxis3D: {
          type: 'category',
          data: [1, 2, 3, 4, 5, 6],
        },

        grid3D: {
          boxWidth: 200,
          boxDepth: 80,
          light: {
            main: {
              intensity: 1.2
            },
            ambient: {
              intensity: 0.3
            }
          }
        },
        series: [{
          type: 'bar3D',
          data: this.canvasData,
          shading: 'color',
          name: '',
          label: {
            show: false,
            fontSize: 16,
            borderWidth: 1
          },

          itemStyle: {
            opacity: 0.4
          },

          emphasis: {
            label: {
              fontSize: 20,
              color: '#900'
            },
            itemStyle: {
              color: '#900'
            }
          }
        }]
      };
      charts.setOption(option);
      const that = this
      charts.on('click', function (params) {
        that.$emit('on-click-item', params);
      });
    }
  }
};
</script>
<style>
#warehouseExtItemCanvas {
  /*width: 1800px;*/
  height: 500px;
}
</style>
