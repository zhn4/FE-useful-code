<template>
  <div class="all-charts">
    <!-- 标签页 -->
    <el-tabs v-model="activeTab" @tab-click="handleTabClick">
      <!-- <el-tab-pane label="列表" name="list"></el-tab-pane>
      <el-tab-pane label="折线图" name="lineChart"></el-tab-pane>
      <el-tab-pane label="饼图" name="pieChart"></el-tab-pane>
      <el-tab-pane label="柱状图" name="barChart"></el-tab-pane> -->
      <el-tab-pane label="田字格" name="fourCharts"></el-tab-pane>
      <el-tab-pane label="混合" name="mixCharts"></el-tab-pane>
      <el-tab-pane label="中国地图" name="chinaMap"></el-tab-pane>
      <el-tab-pane label="12个月柱状图" name="twelveMonthsBarChart"></el-tab-pane>
      <el-tab-pane label="Graph 实现简单流程图" name="flowByGraph"></el-tab-pane>
    </el-tabs>

    <!-- 动态组件切换 -->
    <component :is="currentComponent" class="tab-content"></component>
  </div>
</template>

<script>
import * as echarts from 'echarts'

import fourCharts from './components/fourCharts.vue'
import mixCharts from './components/mixCharts.vue'
import chinaMap from './components/chinaMap.vue'
import twelveMonthsBarChart from './components/twelveMonthsBarChart.vue'
import flowByGraph from './components/flowByGraph.vue'

export default {
  name: 'AllCharts',
  data() {
    return {
      activeTab: 'fourCharts', // 当前激活的标签
      currentComponent: 'fourCharts', // 当前显示的组件
      tableData: [
        { name: '项目一', value: 120 },
        { name: '项目二', value: 200 },
        { name: '项目三', value: 150 },
      ],
      charts: [], // 存储图表实例
    }
  },
  components: {
    fourCharts,
    mixCharts,
    chinaMap,
    twelveMonthsBarChart,
    flowByGraph,
    ListComponent: {
      template: `
        <div>
          <h3>列表</h3>
          <el-table :data="$parent.tableData" border style="width: 100%">
            <el-table-column prop="name" label="名称" width="120"></el-table-column>
            <el-table-column prop="value" label="值" width="120"></el-table-column>
          </el-table>
        </div>
      `,
    },
    LineChartComponent: {
      template: `<div ref="lineChart" class="chart"></div>`,
      mounted() {
        const lineChart = echarts.init(this.$refs.lineChart)
        const option = {
          title: { text: '折线图示例' },
          xAxis: { type: 'category', data: ['一月', '二月', '三月', '四月'] },
          yAxis: { type: 'value' },
          series: [{ data: [820, 932, 901, 934], type: 'line' }],
        }
        lineChart.setOption(option)
        this.$parent.charts.push(lineChart)
      },
    },
    PieChartComponent: {
      template: `<div ref="pieChart" class="chart"></div>`,
      mounted() {
        const pieChart = echarts.init(this.$refs.pieChart)
        const option = {
          title: { text: '饼图示例', left: 'center' },
          series: [
            {
              type: 'pie',
              radius: '50%',
              data: [
                { value: 1048, name: '项目一' },
                { value: 735, name: '项目二' },
                { value: 580, name: '项目三' },
              ],
            },
          ],
        }
        pieChart.setOption(option)
        this.$parent.charts.push(pieChart)
      },
    },
    BarChartComponent: {
      template: `<div ref="barChart" class="chart"></div>`,
      mounted() {
        const barChart = echarts.init(this.$refs.barChart)
        const option = {
          title: { text: '柱状图示例' },
          xAxis: { type: 'category', data: ['一月', '二月', '三月', '四月'] },
          yAxis: { type: 'value' },
          series: [{ data: [120, 200, 150, 80], type: 'bar' }],
        }
        barChart.setOption(option)
        this.$parent.charts.push(barChart)
      },
    },
  },
  mounted() {
    window.addEventListener('resize', this.handleResize) // 监听窗口尺寸变化
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize) // 移除监听
    this.charts.forEach(chart => chart.dispose()) // 销毁图表实例
  },
  methods: {
    handleTabClick(tab) {
      // 根据标签切换组件
      // const componentMap = {
      //   list: 'ListComponent',
      //   lineChart: 'LineChartComponent',
      //   pieChart: 'PieChartComponent',
      //   barChart: 'BarChartComponent',
      // }
      // this.currentComponent = componentMap[tab.name]
      this.currentComponent = tab.name
    },
    handleResize() {
      this.charts.forEach(chart => chart.resize()) // 调整每个图表的尺寸
    },
  },
}
</script>

<style scoped>
.all-charts {
  /* padding: 20px; */
  /* background-color: #f5f7fa; */
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.tab-content {
  /* padding: 20px; */
  /* border: 1px solid #dcdfe6; */
  /* margin-top: 20px; */
  flex: 1;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
}

.chart {
  width: 100%;
  height: 300px;
}
</style>
