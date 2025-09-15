<template>
  <div class="container">
    <!-- 第一行：左边折线图，右边柱状图 -->
    <div class="row">
      <div class="chart-item">
        <!-- <h3>折线图</h3> -->
        <div ref="lineChart" class="chart"></div>
      </div>
      <div class="chart-item">
        <!-- <h3>柱状图</h3> -->
        <div ref="barChart" class="chart"></div>
      </div>
    </div>

    <!-- 第二行：三个饼图 -->
    <div class="row">
      <div class="chart-item">
        <!-- <h3>饼图 1</h3> -->
        <div ref="pieChart1" class="chart"></div>
      </div>
      <div class="chart-item">
        <!-- <h3>饼图 2</h3> -->
        <div ref="pieChart2" class="chart"></div>
      </div>
      <div class="chart-item">
        <!-- <h3>饼图 3</h3> -->
        <div ref="pieChart3" class="chart"></div>
      </div>
    </div>

    <!-- 第三行：列表 -->
    <div class="row">
      <div class="list-item">
        <!-- <h3>列表</h3> -->
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column prop="name" label="名称" align="center"></el-table-column>
          <el-table-column prop="value" label="值" align="center"></el-table-column>
          <el-table-column prop="name" label="名称" align="center"></el-table-column>
          <el-table-column prop="value" label="值" align="center"></el-table-column>
          <el-table-column prop="name" label="名称" align="center"></el-table-column>
          <el-table-column prop="value" label="值" align="center"></el-table-column>
          <el-table-column prop="name" label="名称" align="center"></el-table-column>
          <el-table-column prop="value" label="值" align="center"></el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts'

export default {
  name: 'MixCharts',
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
    this.initBarChart()
    this.initPieChart1()
    this.initPieChart2()
    this.initPieChart3()
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
      this.charts.push(lineChart)
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
      this.charts.push(barChart)
    },
    initPieChart1() {
      const pieChart1 = echarts.init(this.$refs.pieChart1)
      const option = {
        // title: { text: '饼图 1', left: 'center' },
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
      pieChart1.setOption(option)
      this.charts.push(pieChart1)
    },
    initPieChart2() {
      const pieChart2 = echarts.init(this.$refs.pieChart2)
      const option = {
        // title: { text: '饼图 2', left: 'center' },
        series: [
          {
            type: 'pie',
            radius: '50%',
            data: [
              { value: 400, name: '项目一' },
              { value: 300, name: '项目二' },
              { value: 200, name: '项目三' },
            ],
          },
        ],
      }
      pieChart2.setOption(option)
      this.charts.push(pieChart2)
    },
    initPieChart3() {
      const pieChart3 = echarts.init(this.$refs.pieChart3)
      const option = {
        // title: { text: '饼图 3', left: 'center' },
        series: [
          {
            type: 'pie',
            radius: '50%',
            data: [
              { value: 500, name: '项目一' },
              { value: 600, name: '项目二' },
              { value: 700, name: '项目三' },
            ],
          },
        ],
      }
      pieChart3.setOption(option)
      this.charts.push(pieChart3)
    },
    handleResize() {
      this.charts.forEach(chart => chart.resize()) // 调整每个图表的尺寸
    },
  },
}
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
}

.row {
  display: flex;
  gap: 20px;
  flex: 1;
}

.chart-item {
  flex: 1;
  border: 1px solid #dcdfe6;
  padding: 10px;
  box-sizing: border-box;
}

.list-item {
  flex: 1;
  border: 1px solid #dcdfe6;
  padding: 10px;
  box-sizing: border-box;
}

.chart {
  width: 100%;
  /* height: 300px; */
  height: 100%;
}
</style>
