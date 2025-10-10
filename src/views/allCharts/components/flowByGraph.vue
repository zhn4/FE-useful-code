<template>
  <div style="width: 100%; height: 100%">
    <div ref="lineChart" class="chart"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts'

export default {
  name: 'flowByGraph',
  data() {
    return {
      charts: {}, // 存储图表实例
    }
  },
  mounted() {
    this.initLineChart()
  },
  methods: {
    initLineChart() {
      const lineChart = echarts.init(this.$refs.lineChart)
      const option = {
        title: {
          text: '简单的流程图，使用 Graph 图表',
          left: 'center',
        },
        series: [
          {
            type: 'graph',
            layout: 'none',
            symbolSize: [80, 30], // [宽度, 高度] 设置成长方形
            roam: true,
            color: '#6A5ACD',
            label: {
              show: true,
              fontSize: 14,
              color: '#FFF',
              formatter: '{b}',
            },
            symbol: 'rect', // 改为矩形
            edgeSymbol: ['none', 'arrow'],
            edgeSymbolSize: [4, 10],
            edgeLabel: {
              fontSize: 12,
            },
            // 鱼骨图数据 - 竖向结构
            data: [
              // 主线节点
              {
                name: 'zero',
                id: 'zero',
                x: 500,
                y: 100,
              },
              // 第一层分支 start
              {
                name: 'one',
                id: 'one',
                x: 500,
                y: 200,
              },
              {
                name: 'one-1',
                id: 'one-1',
                x: 300,
                y: 150,
              },
              {
                name: 'one-2',
                id: 'one-2',
                x: 700,
                y: 150,
              },
              {
                name: 'one-3',
                id: 'one-3',
                x: 300,
                y: 200,
              },
              {
                name: 'one-4',
                id: 'one-4',
                x: 700,
                y: 200,
              },
              {
                name: 'one-5',
                id: 'one-5',
                x: 300,
                y: 250,
              },
              {
                name: 'one-6',
                id: 'one-6',
                x: 700,
                y: 250,
              },
              {
                name: 'one-7',
                id: 'one-7',
                x: 300,
                y: 300,
              },
              {
                name: 'one-8',
                id: 'one-8',
                x: 700,
                y: 300,
              },
              // 第一层分支 end

              // 第二层分支 - 机相关
              {
                name: 'two',
                id: 'two',
                x: 500,
                y: 300,
              },
              // 第三层分支 - 更细分的原因
              {
                name: 'three',
                id: 'three',
                x: 500,
                y: 400,
              },
              {
                name: 'four',
                id: 'four',
                x: 500,
                y: 500,
              },
              {
                name: 'five',
                id: 'five',
                x: 500,
                y: 600,
              },
              {
                name: 'six',
                id: 'six',
                x: 500,
                y: 700,
              },
            ],
            // 连接线
            links: [
              {
                source: 'zero',
                target: 'one',
                lineStyle: {
                  color: '#473C8B',
                  width: 2,
                },
              },
              {
                source: 'one',
                target: 'two',
                lineStyle: {
                  color: '#473C8B',
                  width: 2,
                },
              },
              {
                source: 'two',
                target: 'three',
                lineStyle: {
                  color: '#473C8B',
                  width: 2,
                },
              },
              {
                source: 'three',
                target: 'four',
                lineStyle: {
                  color: '#473C8B',
                  width: 2,
                },
              },
              {
                source: 'four',
                target: 'five',
                lineStyle: {
                  color: '#473C8B',
                  width: 2,
                },
              },
              {
                source: 'five',
                target: 'six',
                lineStyle: {
                  color: '#473C8B',
                  width: 2,
                },
              },
              // 分支
              {
                source: 'one',
                target: 'one-1',
                lineStyle: {
                  color: '#473C8B',
                  width: 2,
                },
              },
              {
                source: 'one',
                target: 'one-2',
                lineStyle: {
                  color: '#473C8B',
                  width: 2,
                },
              },
              {
                source: 'one',
                target: 'one-3',
                lineStyle: {
                  color: '#473C8B',
                  width: 2,
                },
              },
              {
                source: 'one',
                target: 'one-4',
                lineStyle: {
                  color: '#473C8B',
                  width: 2,
                },
              },
              {
                source: 'one',
                target: 'one-5',
                lineStyle: {
                  color: '#473C8B',
                  width: 2,
                },
              },
              {
                source: 'one',
                target: 'one-6',
                lineStyle: {
                  color: '#473C8B',
                  width: 2,
                },
              },
            ],
          },
        ],
      }
      lineChart.setOption(option)
      this.charts = lineChart
    },
  },
}
</script>

<style>
.chart {
  width: 100%;
  height: 100%;
}
</style>
