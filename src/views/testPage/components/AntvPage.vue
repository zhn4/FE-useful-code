<template>
  <div class="app-content">
    <div class="btns">
      <div>
        编辑模式
        <el-switch v-model="isEditMode" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
      </div>
      <div>
        <el-button type="primary" @click="onTriggerIsEdgeWithArrow">带箭头线</el-button>
        <el-button type="primary" @click="onTriggerIsEdgeWithArrow">普通线</el-button>
      </div>
      <div>
        <el-button type="primary" @click="onSave">保存数据</el-button>
        <el-button type="primary" @click="onLoad">载入数据</el-button>
      </div>
    </div>

    <el-drawer title="我是标题" :visible.sync="visible">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="节点名称">
          <el-input v-model="form.label"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onConfirm">确认</el-button>
          <el-button @click="onCancel">取消</el-button>
        </el-form-item>
      </el-form>
    </el-drawer>

    <el-dialog
      ref="dialogRef"
      :visible.sync="dialogVisible"
      width="660px"
      :modal="false"
      append-to-body
      v-draggable-dialog
      :style="dialogStyle"
      @opened="onOpened"
    >
      <div>
        <el-form ref="formByDetalRef" :model="formByProcess" label-width="140px">
          <el-row>
            <el-col :span="12">
              <el-form-item label="巡视方式：">
                <span class="value">{{ formByProcess.prop01 }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="巡视组：">
                <span class="value">{{ formByProcess.prop02 }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="组长：">
                <span class="value">{{ formByProcess.prop03 }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="联络员：">
                <span class="value">{{ formByProcess.prop04 }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="副联络员：">
                <span class="value">{{ formByProcess.prop05 }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="巡视人员：">
                <span class="value">{{ formByProcess.prop06 }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="巡视时间：">
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
                <span class="value">{{ formByProcess.prop11 }}</span>
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

    <div class="side-part" id="stencil">side</div>
    <div id="container" ref="containerRef"></div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
// import { Graph, Stencil } from '@antv/x6'
import { Clipboard, Graph, History, Keyboard, Selection, Shape, Snapline, Stencil, Transform } from '@antv/x6'

const nodeData = {
  nodes: [
    {
      id: 'node1',
      shape: 'rect',
      x: 40,
      y: 40,
      width: 100,
      height: 40,
      label: 'hello',
      attrs: {
        // body 是选择器名称，选中的是 rect 元素
        body: {
          stroke: '#8f8f8f',
          strokeWidth: 1,
          fill: '#fff',
          rx: 6,
          ry: 6,
        },
      },
    },
    {
      id: 'node2',
      shape: 'rect',
      x: 160,
      y: 180,
      width: 100,
      height: 40,
      label: 'world',
      attrs: {
        body: {
          stroke: '#8f8f8f',
          strokeWidth: 1,
          fill: '#fff',
          rx: 6,
          ry: 6,
        },
      },
    },
  ],
  edges: [
    {
      shape: 'edge',
      source: 'node1',
      target: 'node2',
      label: 'x6',
      attrs: {
        // line 是选择器名称，选中的边的 path 元素
        line: {
          stroke: '#8f8f8f',
          strokeWidth: 1,
        },
      },
    },
  ],
}

export default defineComponent({
  name: 'AntvPage',
  data() {
    return {
      graphObj: null,
      visible: false,
      form: {
        label: '',
      },
      currentNode: null,
      isEdgeWithArrow: true, // 连接线是否带箭头
      isEditMode: true, // 是否编辑模式
      dialogVisible: false,
      formByProcess: {
        prop01: `常规巡视`,
        prop02: `第一巡视组`,
        prop03: `何泽彬`,
        prop04: `姜明凯`,
        prop05: `陈一`,
        prop06: `张伟、李明、王芳、赵丽`,
        prop07: `2027年4月21日-2027年9月12日`,
        prop08: `进行中`,
        prop09: `2026.06.15 前完成`,
        prop10: ``,
        prop11: ``,
      },
      dialogStyle: {
        position: 'fixed',
        top: '0px',
        left: '0px',
        margin: '0', // 覆盖 Element 默认 margin: auto
      },
    }
  },
  mounted() {
    this.initGraph(this.$refs.containerRef.clientWidth, this.$refs.containerRef.clientHeight)
    console.log(this.$refs.containerRef.clientWidth)
    console.log(this.$refs.containerRef.clientHeight)
  },
  methods: {
    initGraph(containerWidth = 800, containerHeight = 800) {
      // 注册画布
      const graph = new Graph({
        container: document.getElementById('container'),
        width: containerWidth,
        height: containerHeight,
        // 设置画布背景颜色
        background: {
          color: '#F2F7FA',
        },
        grid: {
          size: 10, // 网格大小 10px
          visible: true, // 绘制网格，默认绘制 dot 类型网格
        },
        panning: {
          enabled: true, // 允许平移
        },
        mousewheel: {
          enabled: true, // 鼠标滚轮缩放
          modifiers: ['ctrl', 'meta'],
        },
        connecting: {
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
          allowBlank: false,
          snap: {
            radius: 20,
          },
          // NOTE: 这里设计成闭包，根据isEdgeWithArrow的值来判断是否带有箭头
          createEdge: () => {
            return new Shape.Edge({
              attrs: {
                line: {
                  stroke: '#A2B1C3',
                  // stroke: '#000',
                  strokeWidth: 2,
                  targetMarker: this.isEdgeWithArrow
                    ? {
                        name: 'block', // 箭头样式为实心块
                        width: 12,
                        height: 8,
                      }
                    : null,
                },
              },
              zIndex: 0,
            })
          },
        },
      })

      this.initPlugin(graph)

      this.initKeyBoardAndEvent(graph)

      this.initPorts(graph)

      // NOTE: 初始化图形
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
          attrs: {
            label: {
              text: '方形节点',
              fill: '#333',
            },
            body: {
              rx: 8,
              ry: 8,
              strokeWidth: 1,
              stroke: '#5F95FF',
              fill: '#EFF4FF',
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
              fill: '#333',
            },
            body: {
              strokeWidth: 1,
              stroke: '#5F95FF',
              fill: '#EFF4FF',
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
      // NOTE: 注册方形节点
      Graph.registerNode(
        'custom-rect',
        {
          inherit: 'rect',
          width: 120,
          height: 30,
          attrs: {
            label: {
              text: '方形细长节点',
              fill: '#333',
            },
            body: {
              rx: 8,
              ry: 8,
              strokeWidth: 1,
              stroke: '#5F95FF',
              fill: '#EFF4FF',
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

      // #region 初始化 stencil
      const stencil = new Stencil({
        title: '流程图',
        target: graph,
        stencilGraphWidth: 200,
        stencilGraphHeight: 800,
        stencilGraphOptions: { panning: true },
        collapsable: true,
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
      // #endregion

      const square = graph.createNode({
        shape: 'custom-rect',
        label: '方形节点',
        // attrs: {
        //   body: {
        //     rx: 20,
        //     ry: 26,
        //   },
        // },
      })

      const round = graph.createNode({
        shape: 'custom-circle',
        label: '圆形节点',
        // attrs: {
        //   body: {
        //     rx: 20,
        //     ry: 26,
        //   },
        // },
      })

      const squareBySmall = graph.createNode({
        shape: 'custom-rect',
        label: '方形细长节点',
        // attrs: {
        //   body: {
        //     rx: 20,
        //     ry: 26,
        //   },
        // },
      })

      stencil.load([square, round, squareBySmall], 'group1')

      // graph.fromJSON(nodeData) // 渲染元素
      // graph.centerContent() // 居中显示

      this.graphObj = graph
    },
    // 使用插件
    initPlugin(graph) {
      graph
        .use(
          new Transform({
            resizing: true,
            rotating: true,
          }),
        )
        .use(
          new Selection({
            rubberband: true,
            showNodeSelectionBox: true,
          }),
        )
        .use(new Snapline())
        .use(new Keyboard())
        .use(new Clipboard())
        .use(new History())
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
    initPorts(graph) {
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
          console.log(`编辑模式，单击节点，编辑数据`)
        } else {
          console.log(`非编辑模式，单击节点，查看流程数据`)
          this.handleOpenDialog(e)
        }
      })

      graph.on('node:dblclick', ({ e, x, y, node, view }) => {
        console.log('node:dblclick', e, x, y, node, view)
        this.visible = true
        this.currentNode = node
        this.form.label = node.label
        // node.setAttrs({
        //   label: {
        //     text: '新文本',
        //   },
        // })
      })
    },
    onSave() {
      // const graph = Graph.getInstanceById('container')
      // const data = graph.toJSON()
      // console.log('保存数据:', data)
      let data = this.graphObj.toJSON()
      console.log(data)
      let data2 = this.graphObj.parseJSON(data)
      console.log(data2)
      // console.log(this.graphObj.parseJSON(data))
      // let jsonData = this.graphObj.toJSON()
      localStorage.setItem(`x6JSON`, JSON.stringify(data2))
      this.$message.success(`保存成功`)
    },
    onLoad() {
      let cache = localStorage.getItem(`x6JSON`)
      let jsonData = JSON.parse(cache)
      let currentData = {
        nodes: [],
        edges: [],
      }
      jsonData.forEach(x => {
        if (x.shape !== 'edge') {
          currentData.nodes.push(x)
        } else {
          currentData.edges.push(x)
        }
      })
      this.graphObj.fromJSON(currentData) // 渲染元素
      this.graphObj.centerContent() // 居中显示
    },
    onConfirm() {
      // this.currentNode.setProp('label', this.form.label)
      this.currentNode.setAttrs({
        label: {
          text: this.form.label,
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
  },
})
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
  width: 200px;
  height: 100%;
  border-right: 1px solid #ccc;
  padding: 10px;
  box-sizing: border-box;
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
</style>
