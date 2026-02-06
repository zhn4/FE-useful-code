<template>
  <div class="app-content">
    <div class="btns">
      <div>
        <ul>
          <li>编辑模式：dbclick 编辑节点内容</li>
          <li>非编辑模式：单击弹窗</li>
        </ul>
      </div>
      <div>
        <el-button type="primary" @click="onCheckJSON">查看JSON数据</el-button>
      </div>
      <div>
        <el-button type="primary" @click="onTriggerByLine(`blueArrow`)">蓝色+箭头</el-button>
        <el-button type="primary" @click="onTriggerByLine(`grayLarge`)">灰-粗</el-button>
        <el-button type="primary" @click="onTriggerByLine(`graySmall`)">灰-细</el-button>
      </div>
      <div>
        <el-switch
          v-model="isEditMode"
          active-text="编辑模式"
          inactive-text="查看模式"
          active-color="#13ce66"
          inactive-color="#ff4949"
        ></el-switch>
      </div>
      <div>
        <el-button type="primary" @click="onTriggerIsEdgeWithArrow">带箭头线</el-button>
        <el-button type="primary" @click="onTriggerIsEdgeWithArrow">普通线</el-button>
      </div>
      <div>
        <el-button type="primary" @click="onSave">保存数据</el-button>
        <el-button type="primary" @click="onLoadBylocalStorage">载入数据</el-button>
      </div>
    </div>

    <el-drawer title="我是标题" :visible.sync="visible" append-to-body>
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="节点名称：">
          <el-input v-model="form.label"></el-input>
        </el-form-item>
        <el-form-item label="颜色：">
          <el-color-picker v-model="form.color"></el-color-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onConfirm">确认</el-button>
          <el-button @click="onCancel">取消</el-button>
        </el-form-item>
      </el-form>
    </el-drawer>

    <el-dialog
      ref="dialogRef"
      :title="currentTitle"
      :visible.sync="dialogVisible"
      width="660px"
      :modal="false"
      append-to-body
      v-draggable-dialog
      :style="dialogStyle"
      @opened="onOpened"
    >
      <div slot="title" class="modify-dialog-title">{{ currentTitle }}</div>
      <div>
        <el-form ref="formByDetalRef" :model="formByProcess" label-width="140px">
          <el-row>
            <el-col :span="12">
              <el-form-item label="xx视方式：">
                <span class="value">{{ formByProcess.prop01 }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="xx组：">
                <span class="value">{{ formByProcess.prop02 }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="x长：">
                <span class="value">{{ formByProcess.prop03 }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="xx员：">
                <span class="value">{{ formByProcess.prop04 }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="xxx员：">
                <span class="value">{{ formByProcess.prop05 }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="xx人员：">
                <span class="value">{{ formByProcess.prop06 }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="xx时间：">
                <span class="value">{{ formByProcess.prop07 }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="任务进度：">
                <span class="value">{{ formByProcess.prop08 }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="工作时效性要求：">
                <span class="value">{{ formByProcess.prop09 }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="上传资料清单：">
                <span class="value">{{ formByProcess.prop10 }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="跳转链接：">
                <el-button type="text" @click="goToPath(formByProcess.prop12)">{{ formByProcess.prop11 }}</el-button>
                <!-- <span class="value">{{ formByProcess.prop11 }}</span> -->
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <!-- <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span> -->
    </el-dialog>

    <el-drawer title="JSON数据" :visible.sync="visibleByJSON" size="800px" append-to-body>
      <JsonEditorVue v-model="dataByJSON" class="jse-theme-dark" />
    </el-drawer>

    <div class="side-part" id="stencil">side</div>
    <div id="container" ref="containerRef"></div>
  </div>
</template>

<script>
import {
  Clipboard,
  Graph,
  History,
  Keyboard,
  Selection,
  // Shape,
  Snapline,
  Stencil,
  Transform,
  // Scroller,
  Node,
  Edge,
} from '@antv/x6'

import nodeData from './nodeData.js'

import 'vanilla-jsoneditor/themes/jse-theme-dark.css'

import JsonEditorVue from 'json-editor-vue'

import {
  TreeNode,
  TreeNodeRound,
  TreeNodeSmall,
  TreeEdge,
  TreeEdgeBlueArrow,
  TreeEdgeGrayLarge,
} from '../config/customNode.js'

// 注册
Node.registry.register('tree-node', TreeNode, true)
Node.registry.register('tree-node-round', TreeNodeRound, true)
Node.registry.register('tree-node-small', TreeNodeSmall, true)

Edge.registry.register('tree-edge', TreeEdge, true)
Edge.registry.register('tree-edge-blue-arrow', TreeEdgeBlueArrow, true)
Edge.registry.register('tree-edge-gray-large', TreeEdgeGrayLarge, true)

export default {
  name: 'AntvPage',
  components: {
    JsonEditorVue,
  },
  data() {
    return {
      graphObj: null,
      visible: false,
      form: {
        label: '',
        color: '',
      },
      currentNode: null,
      isEdgeWithArrow: true, // 连接线是否带箭头
      isEditMode: false, // 是否编辑模式
      dialogVisible: false,
      formByProcess: {
        prop01: `常规xx`,
        prop02: `第一xx组`,
        prop03: `诸葛亮`,
        prop04: `赵云`,
        prop05: `周瑜`,
        prop06: `刘备、张飞、关羽`,
        prop07: `2027年4月21日-2027年9月12日`,
        prop08: `进行中`,
        prop09: `2026.06.15 前完成`,
        prop10: ``,
        prop11: ``,
        prop12: ``,
      },
      dialogStyle: {
        position: 'fixed',
        top: '0px',
        left: '0px',
        margin: '0', // 覆盖 Element 默认 margin: auto
      },
      currentTitle: ``,
      lineType: ``,
      visibleByJSON: false,
      dataByJSON: ``,
      collapsed: false,
    }
  },
  mounted() {
    let graphContainer = this.$refs.containerRef

    console.log(`graph width => ${graphContainer.clientWidth}`)
    console.log(`graph height => ${graphContainer.clientHeight}`)

    this.initGraph(graphContainer.clientWidth, graphContainer.clientHeight)

    setTimeout(() => {
      if (localStorage.getItem(`x6JSON`)) {
        console.log(`加载缓存数据`)
        this.onLoadBylocalStorage()
      } else {
        console.log(`加载默认数据`)
        this.onLoadByDefaultData()
      }
    }, 800)
  },
  methods: {
    // 注册画布
    initGraph(containerWidth = 800, containerHeight = 800) {
      const graph = new Graph({
        container: document.getElementById('container'),
        width: containerWidth,
        height: containerHeight,
        autoResize: true, // 画布自动缩放
        background: {
          color: '#F2F7FA', // 设置画布背景颜色
        },
        grid: {
          size: 10, // 网格大小 10px
          visible: true, // 绘制网格，默认绘制 dot 类型网格
        },
        interacting: true, // NOTE: 是否禁用交互（拖拽、调整、连接等）
        panning: {
          enable: true, // 是否平移
          modifiers: ['alt', 'ctrl'],
        },
        mousewheel: {
          enabled: true, // 是否鼠标缩放（滚轮缩放）
          minScale: 0.2,
          maxScale: 1.5,
        },
        // selecting: true, // 是否禁用多选（包括框选和 Shift/Ctrl 多选）
        magnetThreshold: 0, // 节点端口不可交互（可选，加强防护），磁吸阈值设为 0，禁用吸附
        connecting: {
          // 🔗 5. 禁用自动连线（防止从端口拖出新连线）
          allowBlank: false, // 连到空白处
          allowNode: true, // 连到节点
          allowEdge: true, // 连到边
          allowLoop: true, // 禁止自环
          validateMagnet() {
            return true
          }, // 所有磁吸点可连接
          router: {
            name: 'manhattan', // 折线
            // args: { padding: 20 },
          },
          connector: {
            name: 'rounded', //圆角
            args: { radius: 8 },
          },
          anchor: 'center',
          connectionPoint: 'anchor',
          snap: {
            radius: 20,
          },
          // NOTE: 这里设计成闭包，根据isEdgeWithArrow的值来判断是否带有箭头
          createEdge: () => {
            let lineConfig = null
            let edgeObj = {}
            switch (this.lineType) {
              case `blueArrow`:
                lineConfig = {
                  customMark: `blueArrow`,
                  stroke: '#2590FF',
                  strokeWidth: 4,
                  targetMarker: {
                    name: 'block', // 箭头样式为实心块
                    width: 6,
                    height: 12,
                  },
                }
                edgeObj = new TreeEdgeBlueArrow({
                  attrs: {
                    test123: lineConfig.customMark,
                    line: lineConfig,
                  },
                  zIndex: 0,
                })
                break
              case `grayLarge`:
                lineConfig = {
                  customMark: `grayLarge`,
                  stroke: '#6584A4',
                  strokeWidth: 2,
                  targetMarker: null,
                }
                edgeObj = new TreeEdgeGrayLarge({
                  attrs: {
                    test123: lineConfig.customMark,
                    line: lineConfig,
                  },
                  zIndex: 0,
                })
                break
              case `graySmall`:
                lineConfig = {
                  customMark: `graySmall`,
                  stroke: '#6584A4',
                  strokeWidth: 1,
                  targetMarker: null,
                }
                edgeObj = new TreeEdge({
                  attrs: {
                    test123: lineConfig.customMark,
                    line: lineConfig,
                  },
                  zIndex: 0,
                })
                break
              default:
                lineConfig = {
                  customMark: `blueArrow`,
                  stroke: '#2590FF',
                  strokeWidth: 4,
                  targetMarker: {
                    name: 'block', // 箭头样式为实心块
                    width: 6,
                    height: 12,
                  },
                }
                edgeObj = new TreeEdgeBlueArrow({
                  attrs: {
                    test123: lineConfig.customMark,
                    line: lineConfig,
                  },
                  zIndex: 0,
                })
                break
            }
            return edgeObj
            // return new Shape.Edge({
            //   attrs: {
            //     test123: lineConfig.customMark,
            //     line: lineConfig,
            //   },
            //   zIndex: 0,
            // })
          },
        },
      })

      this.initPlugin(graph)
      this.initKeyBoardAndEvent(graph)
      this.initNodePorts(graph)
      this.initNodeEvent(graph)
      this.initNode()
      this.initStencil(graph)

      // // NOTE: 纯展示模式 start
      // // this.initPlugin(graph)
      // this.initKeyBoardAndEvent(graph)
      // // this.initNodePorts(graph)
      // this.initNodeEvent(graph)
      // this.initNode()
      // // this.initStencil(graph)
      // // NOTE: 纯展示模式 end

      this.graphObj = graph
    },
    // 使用插件
    initPlugin(graph) {
      graph
        .use(
          new Transform({
            resizing: true, // 尺寸缩放
            rotating: true, // 旋转
          }),
        )
        .use(
          new Selection({
            multiple: true, // 是否启用点击多选，启用后按住 ctrl 或 command 键点击节点实现多选
            rubberband: true, // 是否启用框选节点功能
            showNodeSelectionBox: true, // 是否显示节点的选择框
          }),
        )
        .use(new Snapline())
        .use(new Keyboard())
        .use(new Clipboard())
        .use(new History())
      // .use(
      //   new Scroller({
      //     pannable: false, // 是否启用画布平移能力（在空白位置按下鼠标后拖动平移画布）
      //     pageVisible: false, // 是否分页，会展示分割线
      //     pageBreak: false, // 是否显示分页符
      //   }),
      // )
    },
    // 注册快捷键与事件
    initKeyBoardAndEvent(graph) {
      graph.bindKey(['meta+c', 'ctrl+c'], () => {
        const cells = graph.getSelectedCells()
        if (cells.length) {
          graph.copy(cells)
        }
        return false
      })
      graph.bindKey(['meta+x', 'ctrl+x'], () => {
        const cells = graph.getSelectedCells()
        if (cells.length) {
          graph.cut(cells)
        }
        return false
      })
      graph.bindKey(['meta+v', 'ctrl+v'], () => {
        if (!graph.isClipboardEmpty()) {
          const cells = graph.paste({ offset: 32 })
          graph.cleanSelection()
          graph.select(cells)
        }
        return false
      })

      // undo redo
      graph.bindKey(['meta+z', 'ctrl+z'], () => {
        if (graph.canUndo()) {
          graph.undo()
        }
        return false
      })
      graph.bindKey(['meta+shift+z', 'ctrl+shift+z'], () => {
        if (graph.canRedo()) {
          graph.redo()
        }
        return false
      })

      // select all
      graph.bindKey(['meta+a', 'ctrl+a'], () => {
        const nodes = graph.getNodes()
        if (nodes) {
          graph.select(nodes)
        }
      })

      // delete
      graph.bindKey('backspace', () => {
        const cells = graph.getSelectedCells()
        if (cells.length) {
          graph.removeCells(cells)
        }
      })

      // zoom
      graph.bindKey(['ctrl+1', 'meta+1'], () => {
        const zoom = graph.zoom()
        if (zoom < 1.5) {
          graph.zoom(0.1)
        }
      })
      graph.bindKey(['ctrl+2', 'meta+2'], () => {
        const zoom = graph.zoom()
        if (zoom > 0.5) {
          graph.zoom(-0.1)
        }
      })
    },
    // 控制连接桩显示/隐藏
    initNodePorts(graph) {
      const showPorts = (ports, show) => {
        for (let i = 0, len = ports.length; i < len; i += 1) {
          ports[i].style.visibility = show ? 'visible' : 'hidden'
        }
      }
      graph.on('node:mouseenter', () => {
        const container = document.getElementById('container')
        const ports = container.querySelectorAll('.x6-port-body')
        showPorts(ports, true)
      })
      graph.on('node:mouseleave', () => {
        const container = document.getElementById('container')
        const ports = container.querySelectorAll('.x6-port-body')
        showPorts(ports, false)
      })
    },
    // 节点事件监听
    initNodeEvent(graph) {
      // graph.on('node:contextmenu', ({ e, x, y, node, view }) => {
      //   console.log('node:contextmenu', e, x, y, node, view)
      //   this.visible = true
      //   this.currentNode = node
      //   this.form.label = node.label
      //   // node.setAttrs({
      //   //   label: {
      //   //     text: '新文本',
      //   //   },
      //   // })
      // })
      graph.on('node:click', ({ e, x, y, node, view }) => {
        console.log('node:click', e, x, y, node, view)
        if (this.isEditMode) {
          console.log(`%c------编辑模式，单击节点，没有操作------`, `color: gold; background: #333;`)
        } else {
          console.log(`%c------非编辑模式，单击节点，编辑数据------`, `color: gold; background: #333;`)
          console.log(node)
          if (node.shape === 'custom-rect') {
            return
          }
          this.currentTitle = node.attrs.label.text
          this.handleOpenDialog(e)
        }
      })
      // 测试双击编辑 attrs 的数据
      graph.on('node:dblclick', ({ e, x, y, node, view }) => {
        console.log('node:dblclick', e, x, y, node, view)
        if (this.isEditMode) {
          console.log(`%c------编辑模式，dbclick 节点，编辑数据------`, `color: pink; background: #333;`)
          this.currentNode = node
          this.form.label = node.label
          this.form.color = node.attrs.body.fill
          this.visible = true
        }
      })

      graph.on('node:collapse', ({ node }) => {
        console.log('点击node')
        console.log(node)
        // if (node.shape === 'custom-rect') {
        //   return false
        // }
        node.toggleCollapse()
        const collapsed = node.isCollapsed()
        const run = pre => {
          const succ = graph.getSuccessors(pre, { distance: 1 })
          // console.log('succ', succ)
          if (succ) {
            succ
              .filter(x => x.shape === 'custom-rect-small')
              .forEach(node => {
                node.toggleVisible(!collapsed)
                if (!node.isCollapsed()) {
                  run(node)
                }
              })
            // succ.forEach(node => {
            //   node.toggleVisible(!collapsed)
            //   if (!node.isCollapsed()) {
            //     run(node)
            //   }
            // })
          }
        }
        run(node)
      })
    },
    // 初始化节点
    initNode() {
      const ports = {
        groups: {
          top: {
            position: 'top',
            attrs: {
              circle: {
                r: 4,
                magnet: true,
                stroke: '#5F95FF',
                strokeWidth: 1,
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
                stroke: '#5F95FF',
                strokeWidth: 1,
                fill: '#fff',
                style: {
                  visibility: 'hidden',
                },
              },
            },
          },
          bottom: {
            position: 'bottom',
            attrs: {
              circle: {
                r: 4,
                magnet: true,
                stroke: '#5F95FF',
                strokeWidth: 1,
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
                stroke: '#5F95FF',
                strokeWidth: 1,
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
            group: 'top',
          },
          {
            group: 'right',
          },
          {
            group: 'bottom',
          },
          {
            group: 'left',
          },
        ],
      }

      // NOTE: 注册方形节点
      Graph.registerNode(
        'custom-rect',
        {
          inherit: 'rect',
          width: 120,
          height: 40,
          leaf: false,
          attrs: {
            label: {
              text: '方形节点',
              fill: '#FFF',
            },
            body: {
              rx: 4,
              ry: 4,
              strokeWidth: 1,
              stroke: '#2590FF', // 边框颜色
              fill: '#2590FF', // 填充色
            },
            text: {
              fontSize: 16,
              fill: '#FFF',
            },
          },
          ports: { ...ports },
        },
        true,
      )
      // NOTE: 注册圆形节点
      Graph.registerNode(
        'custom-circle',
        {
          inherit: 'circle',
          width: 120,
          height: 120,
          attrs: {
            label: {
              text: '圆形节点',
              fill: '#FFF',
            },
            body: {
              strokeWidth: 1,
              stroke: 'transparent',
              // fill: '#1681F1',
              fill: {
                // 预设渐变填充
                type: 'radialGradient', // 径向渐变更适合圆形
                attrs: {
                  cx: '30%',
                  cy: '25%',
                  r: '75%',
                  fx: '30%',
                  fy: '25%',
                },
                stops: [
                  { offset: '0%', color: '#F2FAFF' },
                  { offset: '100%', color: '#1681F1' },
                ],
              },
            },
            text: {
              fontSize: 16,
              fill: '#FFF',
            },
          },
          ports: { ...ports },
        },
        true,
      )
      // NOTE: 注册方形节点
      Graph.registerNode(
        'custom-rect-small',
        {
          inherit: 'rect',
          width: 128,
          height: 20,
          attrs: {
            label: {
              text: '方形细长节点',
              fill: '#FFF',
            },
            body: {
              rx: 4,
              ry: 4,
              strokeWidth: 1,
              stroke: '#2590FF',
              fill: '#2590FF',
            },
            text: {
              fontSize: 12,
              fill: '#262626',
            },
          },
          ports: { ...ports },
        },
        true,
      )
    },
    // 初始化节点工具栏
    initStencil(graph) {
      const stencil = new Stencil({
        title: '工具栏',
        target: graph,
        stencilGraphWidth: 260,
        stencilGraphHeight: 300,
        // stencilGraphOptions: { panning: true },
        collapsable: false,
        groups: [
          {
            title: '基础流程图',
            name: 'group1',
          },
          // {
          //   title: '系统设计图',
          //   name: 'group2',
          //   graphHeight: 250,
          //   layoutOptions: {
          //     rowHeight: 70,
          //   },
          // },
        ],
        layoutOptions: {
          columns: 1,
          columnWidth: 200,
          rowHeight: 100,
        },
      })

      document.getElementById('stencil')?.appendChild(stencil.container)

      const square = graph.createNode({
        shape: 'custom-rect',
        label: '方形节点',
      })

      const round = graph.createNode({
        shape: 'custom-circle',
        label: '圆形节点',
      })

      const squareBySmall = graph.createNode({
        shape: 'custom-rect-small',
        label: '方形细长节点',
      })

      stencil.load([square, round, squareBySmall], 'group1')
    },
    onSave() {
      let data = this.graphObj.toJSON()
      let data2 = this.graphObj.parseJSON(data)
      localStorage.setItem(`x6JSON`, JSON.stringify(data2))
      this.$message.success(`保存成功`)
    },
    onLoadBylocalStorage() {
      let cache = localStorage.getItem(`x6JSON`)
      let jsonData = JSON.parse(cache)
      this.handleJSONdata(jsonData)
    },
    onLoadByDefaultData() {
      this.handleJSONdata(nodeData)
    },
    handleJSONdata(curNodeData) {
      let currentData = {
        nodes: [],
        edges: [],
      }
      // 节点、线，分类
      curNodeData.forEach(x => {
        if (
          x.shape !== 'edge' &&
          x.shape !== 'tree-edge' &&
          x.shape !== 'tree-edge-blue-arrow' &&
          x.shape !== 'tree-edge-gray-large'
        ) {
          currentData.nodes.push(x)
        } else {
          currentData.edges.push(x)
        }
      })
      // 编辑模式，直接加载数据，不需要折叠展开功能
      if (this.isEditMode) {
        this.graphObj.fromJSON(currentData) // 渲染元素
        this.graphObj.zoomTo(0.5) // 缩放0.5倍
        this.graphObj.centerContent() // 居中显示
        return
      }

      const nodes = currentData.nodes.map(({ leaf, ...metadata }) => {
        // console.log(`查看节点数据`)
        // console.log(leaf)
        // console.log(metadata)
        // console.log(metadata.shape)
        // const node = new TreeNode(metadata)
        let node = null
        if (metadata.shape === 'custom-circle') {
          node = new TreeNodeRound(metadata)
        } else if (metadata.shape === 'custom-rect-small') {
          node = new TreeNodeSmall(metadata)
        } else if (metadata.shape === 'custom-rect') {
          node = new TreeNode(metadata)
        }
        if (leaf) {
          node.toggleButtonVisibility(leaf === false)
        }
        return node
      })
      console.log('----------')
      const edges = currentData.edges.map(edge => {
        // console.log(`edge`)
        // console.log(edge)
        let curEdge = new TreeEdge({
          source: edge.source,
          target: edge.target,
        })
        if (edge.shape) {
          if (edge.shape === `tree-edge-blue-arrow`) {
            curEdge = new TreeEdgeBlueArrow({
              source: edge.source,
              target: edge.target,
            })
          } else if (edge.shape === `tree-edge-gray-large`) {
            curEdge = new TreeEdgeGrayLarge({
              source: edge.source,
              target: edge.target,
            })
          }
        }
        return curEdge
      })
      console.log(curNodeData, 'curNodeData==================================')

      this.graphObj.resetCells([...nodes, ...edges])
      this.graphObj.zoomTo(0.5)
      this.graphObj.centerContent() // 居中显示
    },
    onConfirm() {
      this.currentNode.setAttrs({
        label: {
          text: this.form.label,
        },
        body: {
          fill: this.form.color,
          stroke: this.form.color,
        },
      })
      this.visible = false
    },
    onCancel() {
      this.visible = false
    },
    onTriggerIsEdgeWithArrow() {
      this.isEdgeWithArrow = !this.isEdgeWithArrow
      this.$message.success(this.isEdgeWithArrow ? '当前为带箭头连线模式' : '当前为普通连线模式')
    },
    handleOpenDialog(event) {
      const { clientX, clientY } = event
      // 设置 dialog 出现在鼠标右侧（偏移 10px 避免遮挡）
      const left = clientX + 10
      const top = clientY - 250

      // 边界保护：防止超出视窗
      const maxWidth = window.innerWidth - 300 // 300 是 dialog width
      const maxHeight = window.innerHeight - 200 // 预估高度

      this.dialogStyle.left = Math.min(left, maxWidth) + 'px'
      this.dialogStyle.top = Math.min(top, maxHeight) + 'px'
      this.dialogVisible = true
    },
    onOpened() {
      // 确保 dialog 使用 fixed 定位（有时 Element 会重置）
      const dialog = this.$el.querySelector('.mouse-position-dialog')
      if (dialog) {
        dialog.style.position = 'fixed'
        dialog.style.margin = '0'
      }
    },
    onTriggerByLine(lineType) {
      this.lineType = lineType
    },
    onCheckJSON() {
      // this.visibleByJSON = true
      let cache = localStorage.getItem(`x6JSON`)
      if (!cache) {
        this.$message.error(`没有缓存数据，直接读取当前数据`)
        this.dataByJSON = currentData
        this.visibleByJSON = true
        return
      }
      let jsonData = JSON.parse(cache)
      let currentData = {
        nodes: [],
        edges: [],
      }
      console.log(currentData)
      jsonData.forEach(x => {
        if (x.shape !== 'edge') {
          currentData.nodes.push(x)
        } else {
          currentData.edges.push(x)
        }
      })
      this.dataByJSON = currentData
      this.visibleByJSON = true
    },
  },
}
</script>

<style lang="less" scoped>
.app-content {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
}

.side-part {
  width: 260px;
  height: 100%;
  border-right: 1px solid #ccc;
  padding: 10px;
  box-sizing: border-box;
  overflow: hidden;
  position: relative;
}

#container {
  width: 100%;
  height: 100%;
  padding: 20px;
  box-sizing: border-box;
}

.btns {
  z-index: 101;
  & > div {
    margin-bottom: 20px;
  }
  & > div:last-of-type {
    margin-bottom: 0;
  }
}

.value {
  color: #333;
}

.modify-dialog-title {
  font-size: 16px;
  color: #2590ff;
  text-align: left;
  line-height: 16px;
  font-weight: 700;
}
</style>
