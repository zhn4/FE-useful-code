<template>
  <div class="import-excel">
    <div class="top">
      <div>
        <el-tooltip class="box-item" effect="dark" :content="contentByTips" placement="top-start">
          <el-button type="primary" @click="downloadTemplate">下载 Excel 模板</el-button>
        </el-tooltip>
      </div>
      <div>
        <el-button type="primary" @click="$refs.uploadRef.click()">选择 Excel 文件</el-button>
        <!-- 分析文件 -->
        <input ref="uploadRef" type="file" @change="handleFileUpload" accept=".xlsx, .xls" style="display: none" />
      </div>
      <div v-if="filteredTableData.length" class="filter">
        <el-input v-model.number="filter.minNum" placeholder="输入最小余额" style="width: 150px; margin-right: 10px" />
        <el-input v-model.number="filter.maxNum" placeholder="输入最大余额" style="width: 150px; margin-right: 10px" />
        <el-button type="primary" @click="filterByBalance('收入(元)')">过滤收入</el-button>
        <el-button type="primary" @click="filterByBalance('支出(元)')">过滤支出</el-button>
        <el-button type="primary" @click="filterByBalance('余额(元)')">过滤余额</el-button>
        <el-button @click="handleReset">重置</el-button>
      </div>
    </div>
    <div v-if="filteredTableData.length" class="bottom">
      <div class="b-left">
        <el-table :data="filteredTableData" height="100%" border style="width: 100%">
          <el-table-column type="index" label="序号" width="60"></el-table-column>
          <el-table-column
            v-for="(header, index) in excelData[0]"
            :key="index"
            :prop="`col_${index}`"
            :label="header"
          ></el-table-column>
        </el-table>
      </div>
      <div class="b-right">
        <div class="all-statistics">
          <div class="statistics">
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <div class="card-header"><span>收入</span></div>
                <el-button type="text" @click="handleReset">重置</el-button>
              </div>
              <ul>
                <li>
                  最高：
                  <span class="mark-num" @click="handleFilteByTypeAndNum('收入(元)', moneyCount.maxIncome)">
                    {{ moneyCount.maxIncome || '-' }}
                  </span>
                  元
                </li>
                <li>
                  最低：
                  <span class="mark-num" @click="handleFilteByTypeAndNum('收入(元)', moneyCount.minIncome)">
                    {{ moneyCount.minIncome || '-' }}
                  </span>
                  元
                </li>
                <li>中位数：{{ moneyCount.medianIncome || '-' }} 元</li>
              </ul>
            </el-card>
          </div>
          <div class="statistics">
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <div class="card-header"><span>支出</span></div>
                <el-button type="text" @click="handleReset">重置</el-button>
              </div>
              <ul>
                <li>
                  最高：
                  <span class="mark-num" @click="handleFilteByTypeAndNum('支出(元)', moneyCount.maxExpense)">
                    {{ moneyCount.maxExpense || '-' }}
                  </span>
                  元
                </li>
                <li>
                  最低：
                  <span class="mark-num" @click="handleFilteByTypeAndNum('支出(元)', moneyCount.minExpense)">
                    {{ moneyCount.minExpense || '-' }}
                  </span>
                  元
                </li>
                <li>中位数：{{ moneyCount.medianExpense || '-' }} 元</li>
              </ul>
            </el-card>
          </div>
          <div class="statistics">
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <div class="card-header"><span>余额</span></div>
                <el-button type="text" @click="handleReset">重置</el-button>
              </div>
              <ul>
                <li>
                  最高：
                  <span class="mark-num" @click="handleFilteByTypeAndNum('余额(元)', moneyCount.maxBalanceStat)">
                    {{ moneyCount.maxBalanceStat || '-' }}
                  </span>
                  元
                </li>
                <li>
                  最低：
                  <span class="mark-num" @click="handleFilteByTypeAndNum('余额(元)', moneyCount.minBalanceStat)">
                    {{ moneyCount.minBalanceStat || '-' }}
                  </span>
                  元
                </li>
                <li>中位数：{{ moneyCount.medianBalance || '-' }} 元</li>
              </ul>
            </el-card>
          </div>
        </div>
        <div class="other-statistics">
          <div class="statistics" style="width: 100%">
            <el-card class="box-card" style="width: 100%">
              <div slot="header" class="clearfix">
                <div class="card-header">
                  <el-icon size="14" style="margin-right: 4px">
                    <Tickets />
                  </el-icon>
                  <span>交易类型统计</span>
                </div>
                <el-button type="text" @click="handleReset">重置</el-button>
              </div>
              <ul style="display: flex; flex-direction: row">
                <li v-for="(count, type) in transactionStats" :key="type" style="margin-right: 20px">
                  {{ type }}:
                  <span class="mark-num" sytle="margin-right: 20px;" @click="handleFilteByType(type)">
                    {{ count }} 笔
                  </span>
                </li>
              </ul>
            </el-card>
          </div>
        </div>
        <div class="charts">
          <div ref="pieChart" class="chart"></div>
          <div ref="barChart" class="chart"></div>
        </div>
      </div>
    </div>
    <div v-else class="bottom" style="height: 100%; display: flex; justify-content: center; align-items: center">
      <el-empty description="请上传 Excel 文件" style="width: 100%; height: 100%" />
    </div>
  </div>
</template>

<script>
import * as XLSX from 'xlsx'

import * as echarts from 'echarts'

// import EXCEL_DATA from './EXCEL_DATA'

import { Loading } from 'element-ui'

export default {
  name: 'importExcelAndAnalyze',
  data() {
    return {
      excelData: [], // 用于存储解析后的 Excel 数据
      tableData: [], // 用于存储转换后的表格数据
      filteredTableData: [], // 用于存储过滤后的表格数据
      transactionStats: {}, // 用于存储交易类型统计结果
      filter: {
        minNum: null, // 最小余额
        maxNum: null, // 最大余额
      },
      charts: [], // 存储图表实例
      moneyCount: {
        maxIncome: 0, // 最高收入
        minIncome: 0, // 最低收入
        maxExpense: 0, // 最高支出
        minExpense: 0, // 最低支出
        maxBalanceStat: 0, // 最高余额
        minBalanceStat: 0, // 最低余额
      },
      contentByTips: '请按照模版内容填写数据',
    }
  },
  mounted() {
    // 模拟数据，实际使用时可以删除
    // this.excelData = EXCEL_DATA
    // this.tableData = this.excelData.slice(1).map((row) => {
    //   const rowData = {}
    //   row.forEach((cell, index) => {
    //     rowData[`col_${index}`] = cell
    //   })
    //   return rowData
    // })
    // this.filteredTableData = [...this.tableData];
  },
  methods: {
    handleFileUpload(event) {
      Loading.service({
        lock: true,
        text: '正在解析 Excel 文件...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)',
      })

      const file = event.target.files[0]
      if (!file) return

      const reader = new FileReader()
      reader.onload = e => {
        const data = new Uint8Array(e.target.result)
        const workbook = XLSX.read(data, { type: 'array' })

        // 假设读取第一个工作表
        const firstSheetName = workbook.SheetNames[0]
        const worksheet = workbook.Sheets[firstSheetName]

        // 将工作表转换为 JSON 数据
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 })
        this.excelData = jsonData

        // 转换为 el-table 可用的数据格式
        this.tableData = this.excelData.slice(1).map(row => {
          const rowData = {}
          row.forEach((cell, index) => {
            rowData[`col_${index}`] = cell
          })
          return rowData
        })

        // 初始化过滤后的数据
        this.filteredTableData = [...this.tableData]

        // 按交易类型统计
        this.calculateTransactionStats()
        // 初始化图表
        this.$nextTick(() => {
          this.initPieChart()
          this.initBarChart()
          setTimeout(() => {
            Loading.service().close()
          }, 800)
        })
        // 计算收入/支出/余额统计
        this.calculateFinancialStats()
      }
      reader.readAsArrayBuffer(file)
    },
    calculateTransactionStats() {
      // 找到“交易类型”列的索引
      const typeIndex = this.excelData[0].indexOf('交易类型')
      if (typeIndex === -1) {
        this.transactionStats = {}
        return
      }

      // 按交易类型分组统计
      const stats = {}
      this.excelData.slice(1).forEach(row => {
        const type = row[typeIndex]
        if (type) {
          stats[type] = (stats[type] || 0) + 1
        }
      })

      this.transactionStats = stats
    },
    calculateFinancialStats() {
      const incomeIndex = this.excelData[0].indexOf('收入(元)')
      const expenseIndex = this.excelData[0].indexOf('支出(元)')
      const balanceIndex = this.excelData[0].indexOf('余额(元)')

      if (incomeIndex === -1 || expenseIndex === -1 || balanceIndex === -1) {
        this.moneyCount.maxIncome =
          this.moneyCount.minIncome =
          this.moneyCount.maxExpense =
          this.moneyCount.minExpense =
          this.moneyCount.maxBalanceStat =
          this.moneyCount.minBalanceStat =
            0
        this.moneyCount.medianIncome = this.moneyCount.medianExpense = this.moneyCount.medianBalance = 0
        return
      }

      const incomes = this.excelData.slice(1).map(row => parseFloat(row[incomeIndex]) || 0)
      const expenses = this.excelData.slice(1).map(row => parseFloat(row[expenseIndex]) || 0)
      const balances = this.excelData.slice(1).map(row => parseFloat(row[balanceIndex]) || 0)

      this.moneyCount.maxIncome = Math.max(...incomes)
      this.moneyCount.minIncome = Math.min(...incomes)
      this.moneyCount.maxExpense = Math.max(...expenses)
      this.moneyCount.minExpense = Math.min(...expenses)
      this.moneyCount.maxBalanceStat = Math.max(...balances)
      this.moneyCount.minBalanceStat = Math.min(...balances)

      this.moneyCount.medianIncome = this.calculateMedian(incomes)
      this.moneyCount.medianExpense = this.calculateMedian(expenses)
      this.moneyCount.medianBalance = this.calculateMedian(balances)
    },
    calculateMedian(arr) {
      const sorted = arr.filter(num => !isNaN(num)).sort((a, b) => a - b)
      const len = sorted.length
      if (len === 0) return 0
      const mid = Math.floor(len / 2)
      return len % 2 === 0 ? (sorted[mid - 1] + sorted[mid]) / 2 : sorted[mid]
    },
    filterByBalance(type) {
      // 找到“余额(元)”列的索引
      const typeIndex = this.excelData[0].indexOf(type)
      if (typeIndex === -1) {
        this.filteredTableData = [...this.tableData]
        return
      }

      // 根据输入的最小值和最大值过滤数据
      const result = this.tableData.filter((row, rowIndex) => {
        const balance = parseFloat(this.excelData[rowIndex + 1][typeIndex]) || 0
        return (
          (this.filter.minNum === null || balance >= this.filter.minNum) &&
          (this.filter.maxNum === null || balance <= this.filter.maxNum)
        )
      })

      if (result.length === 0) {
        this.$message({
          message: '没有符合条件的数据',
          type: 'warning',
        })
        return
      } else {
        this.filteredTableData = result
      }
    },
    handleReset() {
      this.filter.minNum = null
      this.filter.maxNum = null
      this.filteredTableData = [...this.tableData]
    },
    handleFilteByType(type) {
      // 找到“交易类型”列的索引
      const typeIndex = this.excelData[0].indexOf('交易类型')
      if (typeIndex === -1) {
        this.filteredTableData = [...this.tableData]
        return
      }

      // 根据交易类型过滤数据
      this.filteredTableData = this.tableData.filter((row, rowIndex) => {
        const rowType = this.excelData[rowIndex + 1][typeIndex]
        return rowType === type
      })
    },
    handleFilteByTypeAndNum(type, num) {
      const typeIndex = this.excelData[0].indexOf(type)
      if (typeIndex === -1) {
        this.filteredTableData = [...this.tableData]
        return
      }
      this.filteredTableData = this.tableData.filter((row, rowIndex) => {
        const rowNum = this.excelData[rowIndex + 1][typeIndex]
        return rowNum === num
      })
    },
    downloadTemplate() {
      // 定义固定表头
      const headers = ['交易日期', '交易类型', '摘要说明', '收入(元)', '支出(元)', '余额(元)', '对方账户', '备注']
      const data = [headers] // 模板数据，只有表头

      // 创建工作簿和工作表
      const worksheet = XLSX.utils.aoa_to_sheet(data)
      const workbook = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(workbook, worksheet, '模板')

      // 导出 Excel 文件
      const excelBuffer = XLSX.write(workbook, {
        bookType: 'xlsx',
        type: 'array',
      })
      const blob = new Blob([excelBuffer], { type: 'application/octet-stream' })

      // 创建下载链接
      const link = document.createElement('a')
      link.href = URL.createObjectURL(blob)
      link.download = '模板.xlsx'
      link.click()

      // 释放 URL 对象
      URL.revokeObjectURL(link.href)
    },
    initPieChart() {
      const pieChart = echarts.init(this.$refs.pieChart)
      const option = {
        title: { text: '交易类型占比', left: 'center' },
        series: [
          {
            type: 'pie',
            radius: '50%',
            // data: [
            //   { value: 1048, name: '项目一' },
            //   { value: 735, name: '项目二' },
            //   { value: 580, name: '项目三' },
            // ],
            data: Object.keys(this.transactionStats).map(type => {
              return {
                value: this.transactionStats[type],
                name: type,
              }
            }),
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)',
              },
            },
            label: {
              formatter: '{b}: {c}笔 ({d}%)',
            },
          },
        ],
      }
      pieChart.setOption(option)
      this.charts.push(pieChart) // 保存实例
    },
    initBarChart() {
      const barChart = echarts.init(this.$refs.barChart)
      const option = {
        title: { text: '交易类型分布', left: 'center' },
        xAxis: {
          type: 'category',
          // data: ['一月', '二月', '三月', '四月']
          data: Object.keys(this.transactionStats),
        },
        yAxis: { type: 'value' },
        series: [
          {
            // data: [120, 200, 150, 80],
            data: Object.values(this.transactionStats),
            type: 'bar',
          },
        ],
      }
      barChart.setOption(option)
      this.charts.push(barChart) // 保存实例
    },
  },
}
</script>

<style scoped>
/* 可根据需要调整样式 */
.import-excel {
  width: 100%;
  height: 100%;
  padding: 10px;
  box-sizing: border-box;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
}

.top {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding: 10px 0;
}

.top > div {
  margin-right: 20px;
}

.bottom {
  width: 100%;
  height: 100%;
  flex: 1;
  overflow: hidden;
  display: flex;
  flex-direction: row;
}

.b-left {
  width: 65%;
  height: 100%;
  overflow: auto;
  padding-right: 20px;
}

.b-right {
  width: 35%;
  height: 100%;
  overflow: auto;
}

.filter {
  display: flex;
  align-items: center;
}

/* NOTE: 统计部分 */
.all-statistics {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 20px;
}

.statistics {
  font-size: 14px;
  width: 30%;
}

.statistics ul {
  list-style: none;
  padding: 0;
}

.statistics li {
  margin: 5px 0;
  font-size: 13px;
}

/* NOTE: 其他统计 */
.other-statistics {
  margin-bottom: 20px;
}

/* NOTE: 图表部分 */
.charts {
  width: 100%;
  /* height: 100%; */
}

.charts .chart {
  width: 100%;
  height: 300px;
}

.mark-num {
  color: #409eff;
  cursor: pointer;
}

.clearfix {
  display: flex;
  justify-content: space-between;
}

.card-header {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
</style>
