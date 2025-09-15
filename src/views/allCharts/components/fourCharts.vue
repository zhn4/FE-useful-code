<template>
  <div class="container grid-container">
    <!-- 左上角：列表 -->
    <div class="grid-item">
      <!-- <h3>列表</h3> -->
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="name" label="名称" align="center"></el-table-column>
        <el-table-column prop="value" label="值" align="center"></el-table-column>
        <el-table-column prop="name" label="名称" align="center"></el-table-column>
        <el-table-column prop="value" label="值" align="center"></el-table-column>
        <el-table-column prop="name" label="名称" align="center"></el-table-column>
        <el-table-column prop="value" label="值" align="center"></el-table-column>
      </el-table>
    </div>

    <!-- 右上角：折线图 -->
    <div class="grid-item">
      <!-- <h3>折线图</h3> -->
      <div ref="lineChart" class="chart"></div>
    </div>

    <!-- 左下角：饼图 -->
    <div class="grid-item">
      <!-- <h3>饼图</h3> -->
      <div ref="pieChart" class="chart"></div>
    </div>

    <!-- 右下角：柱状图 -->
    <div class="grid-item">
      <!-- <h3>柱状图</h3> -->
      <div ref="barChart" class="chart"></div>
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts'

export default {
  name: 'FourCharts',
  data() {
    return {
      tableData: [
        { name: '项目一', value: 120 },
        { name: '项目二', value: 200 },
        { name: '项目三', value: 150 },
      ],
      charts: [], // 存储图表实例
    }
  },
  mounted() {
    this.initLineChart()
    this.initPieChart()
    this.initBarChart()
    window.addEventListener('resize', this.handleResize) // 监听窗口尺寸变化
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize) // 移除监听
    this.charts.forEach(chart => chart.dispose()) // 销毁图表实例
  },
  methods: {
    initLineChart() {
      const lineChart = echarts.init(this.$refs.lineChart)
      const option = {
        // title: { text: '折线图示例' },
        xAxis: { type: 'category', data: ['一月', '二月', '三月', '四月'] },
        yAxis: { type: 'value' },
        series: [{ data: [820, 932, 901, 934], type: 'line' }],
      }
      lineChart.setOption(option)
      this.charts.push(lineChart) // 保存实例
    },
    initPieChart() {
      const pieChart = echarts.init(this.$refs.pieChart)
      const option = {
        // title: { text: '饼图示例', left: 'center' },
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
      this.charts.push(pieChart) // 保存实例
    },
    initBarChart() {
      const barChart = echarts.init(this.$refs.barChart)
      const option = {
        // title: { text: '柱状图示例' },
        xAxis: { type: 'category', data: ['一月', '二月', '三月', '四月'] },
        yAxis: { type: 'value' },
        series: [{ data: [120, 200, 150, 80], type: 'bar' }],
      }
      barChart.setOption(option)
      this.charts.push(barChart) // 保存实例
    },
    handleResize() {
      this.charts.forEach(chart => chart.resize()) // 调整每个图表的尺寸
    },
  },
}
</script>

<style scoped>
.grid-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 20px;
  height: 100%;
  padding: 20px;
  box-sizing: border-box;
}

.grid-item {
  border: 1px solid #dcdfe6;
  padding: 10px;
  box-sizing: border-box;
  flex: 1;
}

.chart {
  width: 100%;
  /* height: 300px; */
  height: 100%;
}
</style>
