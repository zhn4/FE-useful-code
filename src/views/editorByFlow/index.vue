<template>
  <div class="page">
    <div class="left-part">
      <editorByFlow
        :nodeData="allNodes"
        @renderAgain="renderAgain"
        @generateLinks="generateLinks"
        @moveTop="moveTop"
        @moveBottom="moveBottom"
      />
    </div>
    <div class="right-part" style="width: 100%; height: 100%" ref="parentContainerRef">
      <div ref="lineChart" class="chart"></div>
      <el-dialog :title="currentName" :visible.sync="dialogVisible" width="600px">
        <el-form ref="form" :model="currentNode" label-width="120px">
          <el-form-item label="业务流程说明：">
            <span>{{ currentNode?.desc || null }}</span>
          </el-form-item>
          <el-form-item label="工作时效：">
            <span>{{ currentNode?.workTime || null }}</span>
          </el-form-item>
          <el-form-item label="所需上传附件：">
            <span>{{ currentNode?.file || null }}</span>
          </el-form-item>
          <el-form-item label="跳转链接：">
            <el-button v-if="currentNode?.routePath" type="primary" @click="goToPage(currentNode)">
              跳转该页面
            </el-button>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="dialogVisible = false">关闭</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts'

// import { allNodes, allLinks } from '../testPage/testData.js'

import editorByFlow from './editorByFlow.vue'

export default {
  name: 'flowByGraph',
  components: { editorByFlow },
  data() {
    return {
      charts: {}, // 存储图表实例
      dialogVisible: false,
      currentNode: {
        main: false,
        desc: ``,
        workTime: ``,
        file: ``,
        routePath: ``,
      }, // 当前点击的节点
      currentName: '',
      allNodes: [], // 节点
      allLinks: [], // 连接线
    }
  },
  mounted() {
    // this.initLineChart()
  },
  methods: {
    initLineChart() {
      const lineChart = echarts.init(this.$refs.lineChart)

      // 计算可见节点的边界（基于 allNodes 的 x/y）
      const nodes = this.allNodes.filter(n => !n.hidden)
      const padding = 80 // 边距，按需调整
      const xs = nodes.map(n => n.x || 0)
      const ys = nodes.map(n => n.y || 0)
      const minX = Math.min(...xs)
      const maxX = Math.max(...xs)
      const minY = Math.min(...ys)
      const maxY = Math.max(...ys)

      const neededWidth = Math.max(800, Math.ceil(maxX - minX + padding * 2))
      const neededHeight = Math.max(600, Math.ceil(maxY - minY + padding * 2))

      // 把容器大小设置为所需画布尺寸，父容器显示滚动
      const container = this.$refs.lineChart
      // 直接使用父级DOM的宽度
      const parentContainerRef = this.$refs.parentContainerRef
      container.style.width = parentContainerRef.getBoundingClientRect().width - 20 + 'px'
      // container.style.width = neededWidth + 'px'
      container.style.height = neededHeight + 'px'
      // 父容器（外层）允许滚动，确保父容器存在且为视口大小
      if (container.parentElement) {
        container.parentElement.style.overflow = 'auto'
      }
      // 让 echarts 重新计算尺寸
      lineChart.resize()

      // 为了把原来基于坐标的布局放到带 padding 的画布中，做平移偏移
      const offsetX = padding - minX
      const offsetY = padding - minY
      const nodesForRender = nodes.map(n => ({
        ...n,
        x: (n.x || 0) + offsetX,
        y: (n.y || 0) + offsetY,
      }))

      // links 仍然保留原有连接关系（如果有 hidden 标记不需过滤）
      // 不再因为 node.hidden 而过滤连接：
      // - 连接仍然保留（前提：source/target 在 allNodes 中存在）
      // - 通过 coords 将连接点平移到与 nodesForRender 相同的画布坐标（即应用 offsetX/offsetY）
      const linksForRender = this.allLinks
        .map(l => {
          const sAll = this.allNodes.find(n => n.id === l.source)
          const tAll = this.allNodes.find(n => n.id === l.target)
          if (!sAll || !tAll) return null
          // 计算两端在渲染画布中的坐标（即原始坐标 + offset）
          const sCoord = [(sAll.x || 0) + offsetX, (sAll.y || 0) + offsetY]
          const tCoord = [(tAll.x || 0) + offsetX, (tAll.y || 0) + offsetY]
          return {
            ...l,
            // 指定 coords 确保连线连到计算后的点（即便节点被 hidden，不会因找不到节点而丢弃连线）
            coords: [sCoord, tCoord],
          }
        })
        .filter(Boolean)

      // 渲染 option（保持你原有样式）
      const option = {
        // title: {
        //   text: '简单的流程图，使用 Graph 图表',
        //   left: 'center',
        // },
        graphic: this.renderGridGraphic ? this.renderGridGraphic() : undefined,
        series: [
          {
            type: 'graph',
            layout: 'none',
            // 注意：symbolSize 可保持 per-node 设置，或使用全局默认
            roam: true,
            // 设置最大、最小缩放范围
            scaleLimit: {
              min: 1,
              max: 1.8,
            },
            label: {
              show: true,
              fontSize: 14,
              color: '#FFF',
              formatter: '{b}',
            },
            symbol: 'rect',
            edgeSymbol: ['none', 'none'],
            edgeLabel: { fontSize: 12 },
            data: nodesForRender,
            links: linksForRender,
          },
        ],
      }

      lineChart.setOption(option)
      this.charts = lineChart

      const vm = this
      lineChart.on('click', function (params) {
        if (params.dataType === 'node') {
          vm.handleNodeClick(params)
        }
      })
    },
    // 点击节点的处理函数
    handleNodeClick(params) {
      this.currentName = params.name || `流程说明`
      if (params.data && params.data.extraData && params.data.extraData.main === false) {
        this.currentNode = params.data.extraData
        this.dialogVisible = true
      } else {
        this.currentNode = null
      }
      if (params.data && params.data.extraData && params.data.extraData.main === true) {
        this.allNodes.forEach(item => {
          if (item.id.match(`${params.data.id}-`)) {
            item.hidden = !item.hidden
          }
        })
        const childrenCount = this.allNodes.filter(item => item.id.match(`${params.data.id}-`)).length
        const currentNodeIndex = this.allNodes.findIndex(item => item.id === params.data.id)
        if (this.allNodes[currentNodeIndex].name.includes('(')) {
          this.allNodes[currentNodeIndex].name = this.allNodes[currentNodeIndex].name.split('(')[0]
        } else {
          this.allNodes[currentNodeIndex].name = `${this.allNodes[currentNodeIndex].name}(${childrenCount})`
        }
        this.charts.setOption({
          series: [
            {
              data: this.allNodes.filter(item => !item.hidden),
              // links: visibleLinks,
            },
          ],
        })
      }
      // NOTE: 暂时不用这个高亮
      // if (this.charts) {
      //   this.dialogVisible = true
      //   this.charts.dispatchAction({
      //     type: 'highlight',
      //     seriesIndex: params.seriesIndex,
      //     dataIndex: params.dataIndex,
      //   })
      //   // 取消高亮（2秒后）
      //   setTimeout(() => {
      //     this.charts.dispatchAction({
      //       type: 'downplay',
      //       seriesIndex: params.seriesIndex,
      //       dataIndex: params.dataIndex,
      //     })
      //   }, 2000)
      // }
    },
    goToPage(node) {
      if (node && node.routePath) {
        const routeUrl = this.$router.resolve({ path: node.routePath }).href
        window.open(routeUrl, '_blank')
      }
    },
    renderAgain(rawData) {
      console.log(rawData)
      console.log(this.charts)
      if (this.charts.dispose) {
        console.log('销毁图表实例')
        this.charts.dispose()
      }
      this.allNodes = this.rebuildAllNodesData(rawData.allNodes)
      this.allLinks = rawData.allLinks
      console.log(`接收到的数据`)
      console.log(rawData)

      setTimeout(() => {
        this.initLineChart()
      }, 800)
    },
    rebuildAllNodesData(nodes) {
      return nodes.map(node => {
        // 根据节点类型选择渐变色
        const mainGradient = new echarts.graphic.LinearGradient(0, 0, 1, 0, [
          { offset: 0, color: '#ffffff' },
          { offset: 0.25, color: '#409EFF' },
          { offset: 0.5, color: '#409EFF' },
          { offset: 0.75, color: '#409EFF' },
          { offset: 1, color: '#ffffff' },
        ])
        const childGradient = new echarts.graphic.LinearGradient(0, 0, 1, 0, [
          { offset: 0, color: '#ffffff' },
          { offset: 0.5, color: '#79BBFF' },
          { offset: 1, color: '#ffffff' },
        ])

        // 根据节点属性选配色（可自定义逻辑）
        const gradient = node.extraData && node.extraData.main ? mainGradient : childGradient

        function getSymbolWidth(name, fontSize = 14, padding = 20) {
          return name.length * fontSize + padding
        }

        // TODO: 保留 start
        // 计算符号宽度
        const width = getSymbolWidth(node.name || '')
        // 依据 id 末尾数字判断奇偶：仅当 id 存在尾数时生效
        // - 有尾数：奇数 -> 把矩形向左偏移（连接点落在右边）；偶数 -> 向右偏移（连接点落在左边）
        // - 无尾数：保持不变（连接点在中心）
        const idStr = (node.id || '').toString()
        const m = idStr.match(/(\d+)$/)
        let offsetX = 0
        if (m) {
          const num = parseInt(m[1], 10)
          const isOdd = num % 2 === 1
          offsetX = isOdd ? -Math.floor(width / 2) : Math.floor(width / 2)
        } else {
          offsetX = 0
        }
        // TODO: 保留 end

        return {
          ...node,
          symbolSize: [width, 30], // 宽随文字
          // 通过 symbolOffset 调整矩形的可视中心，从而改变连线落点（连线仍连到 node.x/node.y）
          symbolOffset: [offsetX, 0],
          itemStyle: {
            color: gradient,
            // 可加圆角（仅在 symbol 为 rect 时生效）
            borderColor: '#b3d8ff',
            borderWidth: 1,
            shadowColor: 'rgba(0,0,0,0.15)',
            shadowBlur: 6,
          },
          label: {
            show: true,
            color: '#000', // 白色文字，确保在渐变上可读
            fontSize: 14,
            formatter: '{b}',
            fontWeight: 'bolder',
          },
        }
      })
    },
    generateLinks(links) {
      this.allLinks = links.map(link => ({
        ...link,
        lineStyle: {
          width: 1,
          // curveness: 0.2, // 曲线弯曲度
          color: '#2590ff',
        },
      }))
    },
    moveTop() {
      this.moveNode(this.selectedNode, -1)
    },
    moveBottom() {
      this.moveNode(this.selectedNode, 1)
    },
    moveNode(node, direction) {},
  },
}
</script>

<style lang="less" scoped>
.page {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
}
.left-part {
  // width: 400px;
  width: 50%;
  border-right: 1px solid #e0e0e0;
  height: 100%;
}
.right-part {
  flex: 1;
  height: 100%;
}
.chart {
  width: 100%;
  height: 100%;
}
</style>
