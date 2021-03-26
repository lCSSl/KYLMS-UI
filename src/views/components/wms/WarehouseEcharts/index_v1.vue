<template>
  <div id="warehouseExtItemCanvas">

  </div>
</template>

<script>

import * as echarts from "echarts";

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
        return [item.itemX, item.itemY, item ? item.status == '0' ? item.itemId : '-' : '-'];
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
        tooltip: {
          position: 'inside',
        },
        grid: {
          top: '0%',
          bottom: '0%',
          right: '0%',
          left: '0%',
          width: '100%',
          height: '100%'
        },

        xAxis: {
          type: 'category',
          data: this.x,
          splitArea: {
            show: true
          },
          show: false
        },
        yAxis: {
          type: 'category',
          data: this.y,
          splitArea: {
            show: true
          },
          show: false
        },
        visualMap: {
          show: false
        },
        dataZoom: [//滑动条
          {
            show: true,//是否显示滑动条
            type: 'inside', // 这个 dataZoom 组件是 slider 型 dataZoom 组件
            startValue: 0, // 从头开始。
            endValue: 5  // 一次性展示6个。
          }
        ],
        series: [{
          // name: 'Punch Card',
          type: 'heatmap',
          data: this.canvasData,
          label: {
            show: true
          },
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }]
      };
      charts.setOption(option);
    }
  }
};
</script>
<style>
#warehouseExtItemCanvas {
  width: 1800px;
  height: 1000px;
}
</style>
