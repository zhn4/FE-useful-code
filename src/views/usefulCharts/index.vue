<template>
  <div class="page">
    <div class="right">
      <el-form label-position="top">
        <el-form-item label="展示数据">
          <el-radio-group v-model="currentDataType">
            <el-radio-button v-for="i in listByData" :key="i" :label="i">{{ dataTypeList[i].name }}</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="图表展示方式">
          <el-radio-group v-model="currentChartType">
            <el-radio-button v-for="i in listByType" :key="i" :label="i">{{ chartTypeList[i].name }}</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="完整展示x轴数据">
          <el-radio-group v-model="xAxisLabelMethod">
            <el-radio-button label="default">默认</el-radio-button>
            <el-radio-button label="full">完整（带旋转）</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="grid矩形配置">
          <el-form-item label="上">
            <el-slider v-model="grid.top" show-input :min="0" :max="50"></el-slider>
          </el-form-item>
          <el-form-item label="右">
            <el-slider v-model="grid.right" show-input :min="0" :max="50"></el-slider>
          </el-form-item>
          <el-form-item label="下">
            <el-slider v-model="grid.bottom" show-input :min="0" :max="50"></el-slider>
          </el-form-item>
          <el-form-item label="左">
            <el-slider v-model="grid.left" show-input :min="0" :max="50"></el-slider>
          </el-form-item>
        </el-form-item>
        <el-form-item label="btns">
          <el-button type="danger" @click="onDispose">销毁实例</el-button>
          <el-button type="primary" @click="onShowCode">展示配置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="left">
      <div ref="chartRef" style="width: 100%; height: 100%"></div>
    </div>
    <el-drawer title="配置" :visible.sync="visibleDrawer" size="600px;">
      <JsonViewer :value="currentOption" :theme="theme" :expand-depth="3" expand copyable boxed sort />
    </el-drawer>
  </div>
</template>

<script>
import * as echarts from 'echarts'

import { debounce } from 'lodash'
// import debounce from 'lodash/debounce'

const dataTypeList = {
  week: {
    name: `星期数据`,
    xData: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    yData: [120, 200, 150, 80, 70, 110, 130],
  },
  month: {
    name: `月份数据`,
    xData: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    yData: [820, 932, 901, 934, 1290, 1330, 1320, 1450, 1600, 1700, 1800, 1900],
  },
  xAxisByLongLabel: {
    name: `x轴长文本数据`,
    xData: [
      '这是一个非常非常长的标签1',
      '这是一个非常非常长的标签2',
      '这是一个非常非常长的标签3',
      '这是一个非常非常长的标签4',
      '这是一个非常非常长的标签5',
      '这是一个非常非常长的标签6',
      '这是一个非常非常长的标签7',
      '这是一个非常非常长的标签8',
      '这是一个非常非常长的标签9',
      '这是一个非常非常长的标签10',
    ],
    yData: [100, 50, 80, 85, 90, 120, 20, 33, 80],
  },
}

const chartTypeList = {
  bar: {
    name: `柱状图`,
  },
  line: {
    name: `折线图`,
  },
}

export default {
  name: 'usefulCharts',
  data() {
    return {
      dataTypeList,
      currentDataType: ``, // 展示数据类型
      chartTypeList,
      currentChartType: `bar`,
      xAxisLabelMethod: `default`,
      grid: {
        top: 10, // 上边距
        right: 4, // 右边距
        bottom: 15, // 下边距，为 X 轴标签留出足够空间
        left: 3, // 左边距
        containLabel: true,
      },
      chart: null,
      currentOption: null,
      visibleDrawer: false,
      theme: `vs-code`,
    }
  },
  computed: {
    listByData() {
      return Object.keys(this.dataTypeList).map(key => key)
    },
    listByType() {
      return Object.keys(this.chartTypeList).map(key => key)
    },
  },
  watch: {
    currentDataType() {
      this.initChart()
    },
    currentChartType() {
      this.initChart()
    },
    xAxisLabelMethod() {
      this.initChart()
    },
    grid: {
      deep: true,
      handler() {
        // 调用复用的防抖函数（用户停止操作 300ms 后触发一次）
        if (this.debouncedInitChart) this.debouncedInitChart()
      },
    },
  },
  created() {
    this.currentDataType = this.listByData[0]
    // 复用的防抖函数，避免频繁重绘
    this.debouncedInitChart = debounce(() => {
      this.initChart()
    }, 300)
  },
  mounted() {
    // this.initChart()
  },
  methods: {
    initChart() {
      console.log('render')
      if (this.chart) {
        this.chart.dispose() // 销毁图表实例
      }

      const myChart = echarts.init(this.$refs.chartRef)

      let option = {
        grid: {
          top: `${this.grid.top}%`,
          right: `${this.grid.right}%`,
          bottom: `${this.grid.bottom}%`,
          left: `${this.grid.left}%`,
          containLabel: true, // NOTE: 重要，确保坐标轴标签在 grid 内
        },
        xAxis: {
          type: 'category',
          data: this.dataTypeList[this.currentDataType].xData,
        },
        yAxis: {
          type: 'value',
          // name: '数量',
          // nameTextStyle: { // NOTE: 坐标轴名称的文字样式
          //   fontSize: 16,
          //   color: 'red',
          // },
          // axisLabel: { // NOTE: 坐标轴刻度标签的相关设置
          //   fontSize: 12,
          // },
        },
        series: [
          {
            data: this.dataTypeList[this.currentDataType].yData,
            type: this.currentChartType,
          },
        ],
      }

      switch (this.xAxisLabelMethod) {
        case 'full':
          option.xAxis.axisLabel = {
            interval: 0, // 显示所有标签，0 表示不间隔
            rotate: 45, // 标签旋转角度，避免重叠
            margin: 10, // 标签与坐标轴的间距
            width: 80, // 标签最大宽度
            overflow: 'break', // 文字超出宽度时换行
            // 或者使用截断
            // overflow: 'truncate',
            // ellipsis: '...'
          }

          break
        case 'default':
        default:
          // 使用默认设置
          break
      }

      myChart.setOption(option)

      this.chart = myChart // 保存实例

      this.currentOption = JSON.parse(JSON.stringify(option)) // 暂存图表配置,方便展示
    },
    onDispose() {
      if (this.chart) this.chart.dispose()
    },
    onShowCode() {
      console.log(this.currentOption)
      this.visibleDrawer = true
    },
  },
}
</script>

<style lang="less" scoped>
// @import './style/index';
@import './style/vs-code';

.page {
  display: flex;
  width: 100%;
  height: 100%;

  .left {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    border-left: 1px solid #eee;
  }

  .right {
    width: 400px;
    padding: 20px;
    box-sizing: border-box;
    overflow: auto;
  }
}
</style>
