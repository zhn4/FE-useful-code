<template>
  <div class="chart-container">
    <div class="container">
      <header>
        <h1>12个月份配色方案 - 柱状图</h1>
        <p class="description">
          此图表展示了全年销售数据，采用精心设计的配色方案，从冬季冷色调渐变到秋季暖色调，反映季节变化。
        </p>
      </header>

      <div ref="twelveMonthsBarChart" id="chart-container" class="chart-container"></div>

      <div class="color-palette" id="color-palette">
        <!-- 颜色块将通过JS动态生成 -->
        <template v-for="(color, index) in colorPalette">
          <div class="color-item" :key="index">
            <div class="color-box" :style="`background-color: ${color}`"></div>
            <span class="color-name">{{ color }}</span>
          </div>
        </template>
      </div>

      <div class="controls">
        <button id="update-btn" @click="handleUpdateData">更新数据</button>
        <button id="switch-view" @click="handleSwitchView">切换视图</button>
        <button id="export-btn">导出图片</button>
      </div>
    </div>

    <footer>
      <p>© 2025 数据可视化设计 | 配色方案专为柱状图优化</p>
    </footer>
  </div>
</template>

<script>
import * as echarts from 'echarts'

// 定义12个月份的配色方案
const colorPalette = [
  '#5D8CAE', // 1月 - 冬季蓝
  '#6C8FB7', // 2月
  '#7E9FC1', // 3月
  '#92B6D5', // 4月 - 春季淡蓝
  '#A5CFE3', // 5月
  '#B4DFDB', // 6月 - 初夏绿
  '#9ED9A0', // 7月
  '#87C77E', // 8月 - 盛夏绿
  '#D4B483', // 9月 - 初秋金
  '#D1986F', // 10月
  '#D17F6F', // 11月 - 秋叶红
  '#C96B6B', // 12月 - 深冬红
]

// 月份名称
const months = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']

export default {
  name: 'ChinaMap',
  data() {
    return {
      chart: null,
      colorPalette: colorPalette,
      isHorizontal: false,
    }
  },
  mounted() {
    this.initChart()
    window.addEventListener('resize', this.handleResize) // 监听窗口尺寸变化
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize) // 移除监听
    if (this.chart) {
      this.chart.dispose() // 销毁图表实例
    }
  },
  methods: {
    generateData() {
      return Array.from({ length: 12 }, () => Math.floor(Math.random() * 100) + 50)
    },
    initChart() {
      this.chart = echarts.init(this.$refs.twelveMonthsBarChartRef || document.getElementById('chart-container'))
      const option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
          },
          formatter: '{b}: {c} 单位',
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '10%',
          top: '15%',
          containLabel: true,
        },
        xAxis: {
          type: 'category',
          data: months,
          axisLine: {
            lineStyle: {
              color: '#ccc',
            },
          },
          axisLabel: {
            color: '#666',
            fontSize: 12,
            interval: 0,
          },
        },
        yAxis: {
          type: 'value',
          name: '销售额',
          nameTextStyle: {
            color: '#666',
            padding: [0, 0, 0, 30],
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: '#ccc',
            },
          },
          splitLine: {
            lineStyle: {
              color: '#f0f0f0',
              type: 'dashed',
            },
          },
        },
        series: [
          {
            name: '月度销售',
            type: 'bar',
            barWidth: '50%',
            data: this.generateData().map((value, index) => {
              return {
                value: value,
                itemStyle: {
                  color: colorPalette[index],
                },
              }
            }),
            label: {
              show: true,
              position: 'top',
              color: '#555',
              fontSize: 12,
            },
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowColor: 'rgba(0, 0, 0, 0.3)',
              },
            },
          },
        ],
        animation: true,
        animationDuration: 1500,
        animationEasing: 'cubicOut',
      }
      this.chart.setOption(option)
    },
    handleResize() {
      if (this.chart) {
        this.chart.resize() // 调整图表大小
      }
    },
    handleUpdateData() {
      if (this.chart) {
        const newData = this.generateData().map((value, index) => {
          return {
            value: value,
            itemStyle: {
              color: colorPalette[index],
            },
          }
        })
        this.chart.setOption({
          series: [
            {
              data: newData,
            },
          ],
        })
      }
    },
    handleSwitchView() {
      this.isHorizontal = !this.isHorizontal

      if (this.isHorizontal) {
        this.chart.setOption({
          xAxis: {
            type: 'value',
          },
          yAxis: {
            type: 'category',
            data: months,
          },
          series: [
            {
              type: 'bar',
              data: this.generateData().map((value, index) => {
                return {
                  value: value,
                  itemStyle: {
                    color: colorPalette[index],
                  },
                }
              }),
            },
          ],
        })
      } else {
        this.chart.setOption({
          xAxis: {
            type: 'category',
            data: months,
          },
          yAxis: {
            type: 'value',
          },
          series: [
            {
              type: 'bar',
              data: this.generateData().map((value, index) => {
                return {
                  value: value,
                  itemStyle: {
                    color: colorPalette[index],
                  },
                }
              }),
            },
          ],
        })
      }
    },
  },
}
</script>

<style scoped>
.chart-container {
  width: 100%;
  height: 100%;
}

header {
  background: linear-gradient(90deg, #3498db, #2c3e50);
  color: white;
  padding: 25px;
  text-align: center;
}

h1 {
  font-size: 2.2rem;
  margin-bottom: 10px;
}

.description {
  font-size: 1.1rem;
  opacity: 0.9;
  max-width: 800px;
  margin: 0 auto;
  line-height: 1.6;
}

.chart-container {
  width: 100%;
  height: 500px;
  padding: 20px;
}

.controls {
  display: flex;
  justify-content: center;
  gap: 15px;
  padding: 20px;
  flex-wrap: wrap;
  background: #f8f9fa;
  border-top: 1px solid #eaeaea;
}

button {
  padding: 12px 25px;
  border: none;
  border-radius: 30px;
  background: #3498db;
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

button:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.color-palette {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 5px;
  padding: 15px;
  background: #f8f9fa;
  border-top: 1px solid #eaeaea;
}

.color-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 5px;
}

.color-box {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  margin-bottom: 5px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
}

.color-name {
  font-size: 0.8rem;
  color: #555;
}

footer {
  text-align: center;
  padding: 20px;
  color: #666;
  font-size: 0.9rem;
  margin-top: 20px;
}

@media (max-width: 768px) {
  .chart-container {
    height: 400px;
  }

  h1 {
    font-size: 1.8rem;
  }

  .description {
    font-size: 1rem;
  }
}

@media (max-width: 480px) {
  .chart-container {
    height: 350px;
  }

  header {
    padding: 15px;
  }

  h1 {
    font-size: 1.5rem;
  }
}
</style>
