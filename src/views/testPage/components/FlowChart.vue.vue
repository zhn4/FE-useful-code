<template>
  <div class="app">
    <div class="app-content">
      <div class="app-sidebar" ref="stencilContainer"></div>
      <div class="app-graph" ref="graphContainer"></div>
      <div class="app-toolbar" ref="toolbarContainer"></div>
    </div>
  </div>
</template>

<script>
import { Graph, Addon } from '@antv/x6'
// import '@antv/x6-vue-shape'

// 注册自定义节点组件
const CustomNodeComponent = {
  template: `
    <div class="custom-node" :style="{ width: size.width + 'px', height: size.height + 'px' }">
      <div class="header" :style="{ backgroundColor: color }">{{ data.label }}</div>
      <div class="content">{{ data.content }}</div>
    </div>
  `,
  props: ['node'],
  computed: {
    size() {
      return this.node.size()
    },
    data() {
      return this.node.data
    },
    color() {
      switch (this.data.type) {
        case 'start':
          return '#52c41a'
        case 'end':
          return '#ff4d4f'
        case 'process':
          return '#1890ff'
        case 'decision':
          return '#faad14'
        default:
          return '#1890ff'
      }
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.node.setProp('attrs/.content', { text: this.data.content })
    })
  },
}

export default {
  name: 'FlowchartDemo',
  data() {
    return {
      graph: null,
      stencil: null,
      toolbar: null,
    }
  },
  mounted() {
    this.initGraph()
    this.initStencil()
    this.initToolbar()
    this.addDefaultNodes()
  },
  beforeDestroy() {
    if (this.graph) {
      this.graph.dispose()
    }
    if (this.stencil) {
      this.stencil.dispose()
    }
    if (this.toolbar) {
      this.toolbar.dispose()
    }
  },
  methods: {
    initGraph() {
      const container = this.$refs.graphContainer
      if (!container) return

      this.graph = new Graph({
        container,
        width: 800,
        height: 600,
        grid: {
          size: 10,
          visible: true,
          type: 'mesh',
          args: {
            color: '#cccccc',
            thickness: 1,
          },
        },
        scroller: true,
        mousewheel: {
          enabled: true,
          factor: 1.05,
          maxScale: 1.5,
          minScale: 0.5,
        },
        minimap: {
          enabled: true,
          container: document.body,
        },
        interacting: {
          nodeMovable: true,
          arrowheadMovable: true,
          edgeMovable: true,
          vertexMovable: true,
          vertexAddable: true,
          vertexDeletable: true,
        },
        connecting: {
          router: 'manhattan',
          connector: 'rounded',
          anchor: 'center',
          connectionPoint: 'anchor',
          allowBlank: false,
          allowLoop: false,
          highlight: true,
          snap: {
            radius: 20,
          },
          createEdge() {
            return new Graph.DataUriEdge({
              attrs: {
                line: {
                  stroke: '#A2C8EC',
                  strokeWidth: 2,
                  targetMarker: {
                    name: 'classic',
                    size: 8,
                  },
                },
              },
              zIndex: 0,
            })
          },
          validateConnection({ sourceMagnet, targetMagnet }) {
            if (!sourceMagnet || !targetMagnet) {
              return false
            }
            if (sourceMagnet.getAttribute('port-group') === 'out' && targetMagnet.getAttribute('port-group') === 'in') {
              return true
            }
            return false
          },
        },
        highlighting: {
          magnetAdsorbed: {
            name: 'stroke',
            args: {
              attrs: {
                fill: '#5F95FF',
                stroke: '#5F95FF',
              },
            },
          },
        },
      })

      // 添加键盘快捷键
      this.graph.bindKey(['ctrl+c', 'cmd+c'], () => {
        const cells = this.graph.getSelectedCells()
        if (cells.length) {
          this.graph.copy(cells)
        }
        return false
      })

      this.graph.bindKey(['ctrl+v', 'cmd+v'], () => {
        if (!this.graph.isClipboardEmpty()) {
          const cells = this.graph.paste({ offset: 32 })
          this.graph.cleanSelection()
          this.graph.select(cells)
        }
        return false
      })

      this.graph.on('blank:dblclick', () => {
        this.graph.cleanSelection()
      })
    },

    initStencil() {
      const container = this.$refs.stencilContainer
      if (!container) return

      this.stencil = new Addon.Stencil({
        title: '流程节点',
        target: this.graph,
        stencilGraphWidth: 200,
        stencilGraphHeight: 600,
        collapsable: true,
        groups: [
          {
            name: 'basic',
            title: '基础节点',
            graphHeight: 180,
            layoutOptions: {
              columns: 2,
              columnWidth: 80,
            },
          },
          {
            name: 'custom',
            title: '自定义节点',
            graphHeight: 220,
            layoutOptions: {
              columns: 1,
              columnWidth: 160,
            },
          },
        ],
        layoutOptions: {
          columns: 2,
          columnWidth: 80,
          rowHeight: 55,
        },
      })

      container.appendChild(this.stencil.container)

      // 基础节点
      const basicNodes = [
        {
          id: 'start-node',
          width: 60,
          height: 60,
          attrs: {
            body: {
              rx: 30,
              ry: 30,
              fill: '#52c41a',
              stroke: '#389e0d',
            },
          },
          markup: [
            {
              tagName: 'ellipse',
              selector: 'body',
            },
            {
              tagName: 'text',
              selector: 'label',
            },
          ],
          label: '开始',
          ports: {
            groups: {
              in: {
                position: 'top',
                attrs: {
                  circle: {
                    r: 4,
                    magnet: true,
                    stroke: '#31d0c6',
                    strokeWidth: 2,
                    fill: '#fff',
                    style: {
                      visibility: 'hidden',
                    },
                  },
                },
              },
              out: {
                position: 'bottom',
                attrs: {
                  circle: {
                    r: 4,
                    magnet: true,
                    stroke: '#31d0c6',
                    strokeWidth: 2,
                    fill: '#fff',
                    style: {
                      visibility: 'hidden',
                    },
                  },
                },
              },
            },
            items: [
              {
                group: 'in',
              },
              {
                group: 'out',
              },
            ],
          },
        },
        {
          id: 'end-node',
          width: 60,
          height: 60,
          attrs: {
            body: {
              rx: 30,
              ry: 30,
              fill: '#ff4d4f',
              stroke: '#d32029',
            },
          },
          markup: [
            {
              tagName: 'ellipse',
              selector: 'body',
            },
            {
              tagName: 'text',
              selector: 'label',
            },
          ],
          label: '结束',
          ports: {
            groups: {
              in: {
                position: 'top',
                attrs: {
                  circle: {
                    r: 4,
                    magnet: true,
                    stroke: '#31d0c6',
                    strokeWidth: 2,
                    fill: '#fff',
                    style: {
                      visibility: 'hidden',
                    },
                  },
                },
              },
            },
            items: [
              {
                group: 'in',
              },
            ],
          },
        },
        {
          id: 'process-node',
          width: 80,
          height: 40,
          attrs: {
            body: {
              fill: '#1890ff',
              stroke: '#177ddc',
            },
          },
          label: '处理',
          ports: {
            groups: {
              in: {
                position: 'top',
                attrs: {
                  circle: {
                    r: 4,
                    magnet: true,
                    stroke: '#31d0c6',
                    strokeWidth: 2,
                    fill: '#fff',
                    style: {
                      visibility: 'hidden',
                    },
                  },
                },
              },
              out: {
                position: 'bottom',
                attrs: {
                  circle: {
                    r: 4,
                    magnet: true,
                    stroke: '#31d0c6',
                    strokeWidth: 2,
                    fill: '#fff',
                    style: {
                      visibility: 'hidden',
                    },
                  },
                },
              },
            },
            items: [
              {
                group: 'in',
              },
              {
                group: 'out',
              },
            ],
          },
        },
        {
          id: 'decision-node',
          width: 60,
          height: 60,
          angle: 45,
          attrs: {
            body: {
              fill: '#faad14',
              stroke: '#d48806',
            },
          },
          markup: [
            {
              tagName: 'polygon',
              selector: 'body',
            },
            {
              tagName: 'text',
              selector: 'label',
            },
          ],
          label: '决策',
          ports: {
            groups: {
              in: {
                position: 'top',
                attrs: {
                  circle: {
                    r: 4,
                    magnet: true,
                    stroke: '#31d0c6',
                    strokeWidth: 2,
                    fill: '#fff',
                    style: {
                      visibility: 'hidden',
                    },
                  },
                },
              },
              out: {
                position: 'bottom',
                attrs: {
                  circle: {
                    r: 4,
                    magnet: true,
                    stroke: '#31d0c6',
                    strokeWidth: 2,
                    fill: '#fff',
                    style: {
                      visibility: 'hidden',
                    },
                  },
                },
              },
              left: {
                position: 'left',
                attrs: {
                  circle: {
                    r: 4,
                    magnet: true,
                    stroke: '#31d0c6',
                    strokeWidth: 2,
                    fill: '#fff',
                    style: {
                      visibility: 'hidden',
                    },
                  },
                },
              },
              right: {
                position: 'right',
                attrs: {
                  circle: {
                    r: 4,
                    magnet: true,
                    stroke: '#31d0c6',
                    strokeWidth: 2,
                    fill: '#fff',
                    style: {
                      visibility: 'hidden',
                    },
                  },
                },
              },
            },
            items: [
              {
                group: 'in',
              },
              {
                group: 'out',
              },
              {
                group: 'left',
              },
              {
                group: 'right',
              },
            ],
          },
        },
      ]

      // 自定义节点
      const customNodes = [
        {
          id: 'custom-start',
          shape: 'vue-shape',
          component: CustomNodeComponent,
          data: {
            type: 'start',
            label: '开始',
            content: '流程开始',
          },
          width: 120,
          height: 60,
          ports: {
            groups: {
              out: {
                position: 'bottom',
                attrs: {
                  circle: {
                    r: 4,
                    magnet: true,
                    stroke: '#31d0c6',
                    strokeWidth: 2,
                    fill: '#fff',
                    style: {
                      visibility: 'hidden',
                    },
                  },
                },
              },
            },
            items: [
              {
                group: 'out',
              },
            ],
          },
        },
        {
          id: 'custom-process',
          shape: 'vue-shape',
          component: CustomNodeComponent,
          data: {
            type: 'process',
            label: '处理',
            content: '执行操作',
          },
          width: 120,
          height: 60,
          ports: {
            groups: {
              in: {
                position: 'top',
                attrs: {
                  circle: {
                    r: 4,
                    magnet: true,
                    stroke: '#31d0c6',
                    strokeWidth: 2,
                    fill: '#fff',
                    style: {
                      visibility: 'hidden',
                    },
                  },
                },
              },
              out: {
                position: 'bottom',
                attrs: {
                  circle: {
                    r: 4,
                    magnet: true,
                    stroke: '#31d0c6',
                    strokeWidth: 2,
                    fill: '#fff',
                    style: {
                      visibility: 'hidden',
                    },
                  },
                },
              },
            },
            items: [
              {
                group: 'in',
              },
              {
                group: 'out',
              },
            ],
          },
        },
        {
          id: 'custom-decision',
          shape: 'vue-shape',
          component: CustomNodeComponent,
          data: {
            type: 'decision',
            label: '决策',
            content: '条件判断',
          },
          width: 120,
          height: 60,
          ports: {
            groups: {
              in: {
                position: 'top',
                attrs: {
                  circle: {
                    r: 4,
                    magnet: true,
                    stroke: '#31d0c6',
                    strokeWidth: 2,
                    fill: '#fff',
                    style: {
                      visibility: 'hidden',
                    },
                  },
                },
              },
              yes: {
                position: 'left',
                attrs: {
                  circle: {
                    r: 4,
                    magnet: true,
                    stroke: '#31d0c6',
                    strokeWidth: 2,
                    fill: '#fff',
                    style: {
                      visibility: 'hidden',
                    },
                  },
                },
              },
              no: {
                position: 'right',
                attrs: {
                  circle: {
                    r: 4,
                    magnet: true,
                    stroke: '#31d0c6',
                    strokeWidth: 2,
                    fill: '#fff',
                    style: {
                      visibility: 'hidden',
                    },
                  },
                },
              },
            },
            items: [
              {
                group: 'in',
              },
              {
                group: 'yes',
              },
              {
                group: 'no',
              },
            ],
          },
        },
      ]

      this.stencil.load(basicNodes, 'basic')
      this.stencil.load(customNodes, 'custom')
    },

    // initToolbar() {
    //   const container = this.$refs.toolbarContainer
    //   if (!container) return

    //   this.toolbar = new Addon.Toolbar({
    //     container,
    //     items: [
    //       {
    //         type: 'button',
    //         name: 'undo',
    //         args: { text: '撤销' },
    //       },
    //       {
    //         type: 'button',
    //         name: 'redo',
    //         args: { text: '重做' },
    //       },
    //       {
    //         type: 'separator',
    //       },
    //       {
    //         type: 'button',
    //         name: 'copy',
    //         args: { text: '复制' },
    //       },
    //       {
    //         type: 'button',
    //         name: 'paste',
    //         args: { text: '粘贴' },
    //       },
    //       {
    //         type: 'separator',
    //       },
    //       {
    //         type: 'button',
    //         name: 'delete',
    //         args: { text: '删除' },
    //       },
    //       {
    //         type: 'separator',
    //       },
    //       {
    //         type: 'button',
    //         name: 'zoom-in',
    //         args: { text: '放大' },
    //       },
    //       {
    //         type: 'button',
    //         name: 'zoom-out',
    //         args: { text: '缩小' },
    //       },
    //       {
    //         type: 'button',
    //         name: 'reset-zoom',
    //         args: { text: '重置' },
    //       },
    //     ],
    //   })

    //   this.toolbar.on('action:click', ({ name }) => {
    //     switch (name) {
    //       case 'undo':
    //         this.graph.undo()
    //         break
    //       case 'redo':
    //         this.graph.redo()
    //         break
    //       case 'copy':
    //         const cells = this.graph.getSelectedCells()
    //         if (cells.length) {
    //           this.graph.copy(cells)
    //         }
    //         break
    //       case 'paste':
    //         if (!this.graph.isClipboardEmpty()) {
    //           const cells = this.graph.paste({ offset: 32 })
    //           this.graph.cleanSelection()
    //           this.graph.select(cells)
    //         }
    //         break
    //       case 'delete':
    //         const selectedCells = this.graph.getSelectedCells()
    //         this.graph.removeCells(selectedCells)
    //         break
    //       case 'zoom-in':
    //         this.graph.zoom(0.1)
    //         break
    //       case 'zoom-out':
    //         this.graph.zoom(-0.1)
    //         break
    //       case 'reset-zoom':
    //         this.graph.resetZoom()
    //         break
    //     }
    //   })
    // },

    addDefaultNodes() {
      const startNode = this.graph.createNode({
        id: 'start',
        shape: 'circle',
        width: 60,
        height: 60,
        attrs: {
          body: {
            rx: 30,
            ry: 30,
            fill: '#52c41a',
            stroke: '#389e0d',
          },
          text: {
            text: '开始',
            fill: '#ffffff',
            fontSize: 12,
            fontWeight: 'bold',
          },
        },
        position: { x: 100, y: 100 },
        ports: {
          groups: {
            out: {
              position: 'bottom',
              attrs: {
                circle: {
                  r: 4,
                  magnet: true,
                  stroke: '#31d0c6',
                  strokeWidth: 2,
                  fill: '#fff',
                  style: {
                    visibility: 'hidden',
                  },
                },
              },
            },
          },
          items: [
            {
              group: 'out',
            },
          ],
        },
      })

      const processNode = this.graph.createNode({
        id: 'process',
        shape: 'rect',
        width: 80,
        height: 40,
        attrs: {
          body: {
            fill: '#1890ff',
            stroke: '#177ddc',
          },
          text: {
            text: '处理',
            fill: '#ffffff',
            fontSize: 12,
          },
        },
        position: { x: 120, y: 200 },
        ports: {
          groups: {
            in: {
              position: 'top',
              attrs: {
                circle: {
                  r: 4,
                  magnet: true,
                  stroke: '#31d0c6',
                  strokeWidth: 2,
                  fill: '#fff',
                  style: {
                    visibility: 'hidden',
                  },
                },
              },
            },
            out: {
              position: 'bottom',
              attrs: {
                circle: {
                  r: 4,
                  magnet: true,
                  stroke: '#31d0c6',
                  strokeWidth: 2,
                  fill: '#fff',
                  style: {
                    visibility: 'hidden',
                  },
                },
              },
            },
          },
          items: [
            {
              group: 'in',
            },
            {
              group: 'out',
            },
          ],
        },
      })

      const decisionNode = this.graph.createNode({
        id: 'decision',
        shape: 'polygon',
        width: 60,
        height: 60,
        angle: 45,
        attrs: {
          body: {
            fill: '#faad14',
            stroke: '#d48806',
          },
          text: {
            text: '决策',
            fill: '#000000',
            fontSize: 10,
          },
        },
        position: { x: 130, y: 300 },
        ports: {
          groups: {
            in: {
              position: 'top',
              attrs: {
                circle: {
                  r: 4,
                  magnet: true,
                  stroke: '#31d0c6',
                  strokeWidth: 2,
                  fill: '#fff',
                  style: {
                    visibility: 'hidden',
                  },
                },
              },
            },
            yes: {
              position: 'left',
              attrs: {
                circle: {
                  r: 4,
                  magnet: true,
                  stroke: '#31d0c6',
                  strokeWidth: 2,
                  fill: '#fff',
                  style: {
                    visibility: 'hidden',
                  },
                },
              },
            },
            no: {
              position: 'right',
              attrs: {
                circle: {
                  r: 4,
                  magnet: true,
                  stroke: '#31d0c6',
                  strokeWidth: 2,
                  fill: '#fff',
                  style: {
                    visibility: 'hidden',
                  },
                },
              },
            },
          },
          items: [
            {
              group: 'in',
            },
            {
              group: 'yes',
            },
            {
              group: 'no',
            },
          ],
        },
      })

      const endNode = this.graph.createNode({
        id: 'end',
        shape: 'circle',
        width: 60,
        height: 60,
        attrs: {
          body: {
            rx: 30,
            ry: 30,
            fill: '#ff4d4f',
            stroke: '#d32029',
          },
          text: {
            text: '结束',
            fill: '#ffffff',
            fontSize: 12,
            fontWeight: 'bold',
          },
        },
        position: { x: 100, y: 400 },
        ports: {
          groups: {
            in: {
              position: 'top',
              attrs: {
                circle: {
                  r: 4,
                  magnet: true,
                  stroke: '#31d0c6',
                  strokeWidth: 2,
                  fill: '#fff',
                  style: {
                    visibility: 'hidden',
                  },
                },
              },
            },
          },
          items: [
            {
              group: 'in',
            },
          ],
        },
      })

      this.graph.addNode(startNode)
      this.graph.addNode(processNode)
      this.graph.addNode(decisionNode)
      this.graph.addNode(endNode)

      // 添加连线
      this.graph.addEdge({
        source: { cell: 'start', port: 'out' },
        target: { cell: 'process', port: 'in' },
        attrs: {
          line: {
            stroke: '#A2C8EC',
            strokeWidth: 2,
            targetMarker: {
              name: 'classic',
              size: 8,
            },
          },
        },
      })

      this.graph.addEdge({
        source: { cell: 'process', port: 'out' },
        target: { cell: 'decision', port: 'in' },
        attrs: {
          line: {
            stroke: '#A2C8EC',
            strokeWidth: 2,
            targetMarker: {
              name: 'classic',
              size: 8,
            },
          },
        },
      })

      this.graph.addEdge({
        source: { cell: 'decision', port: 'yes' },
        target: { cell: 'end', port: 'in' },
        attrs: {
          line: {
            stroke: '#A2C8EC',
            strokeWidth: 2,
            targetMarker: {
              name: 'classic',
              size: 8,
            },
          },
        },
      })

      this.graph.addEdge({
        source: { cell: 'decision', port: 'no' },
        target: { cell: 'process', port: 'in' },
        attrs: {
          line: {
            stroke: '#A2C8EC',
            strokeWidth: 2,
            targetMarker: {
              name: 'classic',
              size: 8,
            },
          },
        },
      })
    },
  },
}
</script>

<style scoped>
.app {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
}

.app-content {
  display: flex;
  flex: 1;
  overflow: hidden;
}

.app-sidebar {
  width: 200px;
  border-right: 1px solid #e8e8e8;
  background-color: #fafafa;
  overflow-y: auto;
}

.app-graph {
  flex: 1;
  background-color: #f5f5f5;
  overflow: hidden;
}

.app-toolbar {
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 1000;
  background: white;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  padding: 4px;
}

.custom-node {
  border: 1px solid #ccc;
  border-radius: 4px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.custom-node .header {
  padding: 8px;
  color: white;
  text-align: center;
  font-weight: bold;
  font-size: 12px;
}

.custom-node .content {
  flex: 1;
  padding: 8px;
  font-size: 10px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
