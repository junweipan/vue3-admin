<template>
  <div class="Echarts">
    <div id="dotchart" style="width: 100%; height: 600px"></div>
  </div>
</template>

<script>
import { getCurrentInstance } from 'vue';
import ecStat from "echarts-stat";

export default {
  name: "DotChart",
  components: {},
  data() {
    return {};
  },
  filters: {},
  computed: {},
  watch: {},
  methods: {
    myEcharts() {
      const { ctx } = getCurrentInstance();
      var myChart = ctx.echarts.init(document.getElementById("dotchart"));
      //配置图表

      // See https://github.com/ecomfe/echarts-stat
      ctx.echarts.registerTransform(ecStat.transform.regression);
      var option = {
        dataset: [
          {
            source: [
              [1, 4862.4],
              [2, 5294.7],
              [3, 5934.5],
              [4, 7171.0],
              [5, 8964.4],
              [6, 10202.2],
              [7, 11962.5],
              [8, 14928.3],
              [9, 16909.2],
              [10, 18547.9],
              [11, 21617.8],
              [12, 26638.1],
              [13, 34634.4],
              [14, 46759.4],
              [15, 58478.1],
              [16, 67884.6],
              [17, 74462.6],
              [18, 79395.7],
            ],
          },
          {
            transform: {
              type: "ecStat:regression",
              config: {
                method: "exponential",
                // 'end' by default
                // formulaOn: 'start'
              },
            },
          },
        ],
        title: {
          text: "散点图",
          subtext: "1981 - 1998 gross domestic product GDP (trillion yuan)",
          sublink: "https://github.com/ecomfe/echarts-stat",
          left: "center",
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
          },
        },
        xAxis: {
          splitLine: {
            lineStyle: {
              type: "dashed",
            },
          },
        },
        yAxis: {
          splitLine: {
            lineStyle: {
              type: "dashed",
            },
          },
        },
        series: [
          {
            name: "scatter",
            type: "scatter",
            datasetIndex: 0,
          },
          {
            name: "line",
            type: "line",
            smooth: true,
            datasetIndex: 1,
            symbolSize: 0.1,
            symbol: "circle",
            label: { show: true, fontSize: 16 },
            labelLayout: { dx: -20 },
            encode: { label: 2, tooltip: 1 },
          },
        ],
      };

      myChart.setOption(option);
    },
  },
  mounted() {
    this.myEcharts();
  },
};
</script>