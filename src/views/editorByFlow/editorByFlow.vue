<template>
  <div class="form-part">
    <div class="editor-part">
      <div style="text-align: right; margin-bottom: 10px">
        <el-row :gutter="20">
          <el-col :span="2">
            <el-statistic :value="countByMainNode" title="主节点"></el-statistic>
          </el-col>
          <el-col :span="2">
            <el-statistic :value="countByChildNode" title="子节点"></el-statistic>
          </el-col>
          <el-col :span="2">
            <el-statistic :value="this.form.listData.length || 0" title="合计"></el-statistic>
          </el-col>
          <el-col :span="18">
            <el-button type="primary" @click="handleRender">渲染</el-button>
            <el-button type="success" @click="handleGenerateLinksByAll">生成连接线(debug)</el-button>
            <el-button @click="onAddNode">新增节点</el-button>
            <!-- <el-button type="warning" @click="exportToJson">导出JSON</el-button> -->
            <el-button type="primary" @click="onCheckJson">查看JSON</el-button>
          </el-col>
        </el-row>
        <span></span>
      </div>
      <div class="table-part">
        <el-form ref="form" :model="form" size="mini" label-width="60px" style="height: 100%">
          <el-table :data="form.listData" border style="width: 100%" height="100%" size="mini">
            <el-table-column type="index" label="序号" align="center" width="50" />

            <el-table-column prop="name" label="基础信息" align="center">
              <template slot-scope="scope">
                <el-form-item :prop="`listData.${scope.$index}.name`" label="名字">
                  <el-input v-model.trim="scope.row.name" placeholder="请输入" />
                </el-form-item>
                <el-form-item :prop="`listData.${scope.$index}.id`" label="id">
                  <el-input v-model.trim="scope.row.id" placeholder="请输入" />
                </el-form-item>
                <el-form-item :prop="`listData.${scope.$index}.x`" label="x">
                  <el-input type="number" v-model.trim="scope.row.x" placeholder="请输入" />
                </el-form-item>
                <el-form-item :prop="`listData.${scope.$index}.y`" label="y">
                  <el-input type="number" v-model.trim="scope.row.y" placeholder="请输入" />
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column prop="name" label="扩展信息" align="center">
              <template slot-scope="scope">
                <el-form-item :prop="`listData.${scope.$index}.extraData.main`" label="主节点" align="left">
                  <el-switch
                    v-model="scope.row.extraData.main"
                    active-color="#13ce66"
                    inactive-color="#ff4949"
                  ></el-switch>
                </el-form-item>
                <el-form-item :prop="`listData.${scope.$index}.extraData.desc`" label="描述">
                  <el-input
                    type="textarea"
                    v-model.trim="scope.row.extraData.desc"
                    placeholder="请输入"
                    rows="4"
                    resize="none"
                  />
                </el-form-item>
                <el-form-item :prop="`listData.${scope.$index}.extraData.workTime`" label="时间">
                  <el-input v-model.trim="scope.row.extraData.workTime" placeholder="请输入" />
                </el-form-item>
                <el-form-item :prop="`listData.${scope.$index}.extraData.file`" label="文件">
                  <el-input
                    type="textarea"
                    v-model.trim="scope.row.extraData.file"
                    placeholder="请输入"
                    rows="2"
                    resize="none"
                  />
                </el-form-item>
                <el-form-item :prop="`listData.${scope.$index}.extraData.routePath`" label="路由">
                  <el-input v-model.trim="scope.row.extraData.routePath" placeholder="请输入" />
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center" width="80">
              <template slot-scope="scope">
                <el-button type="text" style="color: red">删除</el-button>
                <!-- <template v-if="scope.row.extraData.main">
                  <el-button type="text">增加子节点</el-button>
                </template> -->
                <el-button type="text" @click="onMoveTop(scope.row.$index)">上移</el-button>
                <el-button type="text" @click="onMoveBottom(scope.row.$index)">下移</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-form>
      </div>
    </div>
    <el-drawer title="提示" :visible.sync="visibleDialog" size="800px">
      <json-viewer :value="form.listData" :expand-depth="1" copyable boxed sort></json-viewer>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="visibleDialog = false">关闭</el-button>
      </span>
    </el-drawer>
  </div>
</template>

<script>
// import { allNodes, allLinks } from '../testPage/testData.js'

export default {
  name: 'editorByFlow',
  data() {
    return {
      form: {
        listData: [
          {
            name: '第一个',
            id: 'one',
            x: 500,
            y: 0,
            extraData: {
              main: true,
              desc: ``,
              workTime: ``,
              file: ``,
              routePath: ``,
              hidden: false,
            },
          },
          {
            name: '第二个',
            id: 'two',
            x: 500,
            y: 500,
            extraData: {
              main: true,
              desc: ``,
              workTime: ``,
              file: ``,
              routePath: ``,
              hidden: false,
            },
          },
          {
            name: '第二个-1',
            id: 'two-1',
            x: 100,
            y: 500,
            extraData: {
              main: false,
              desc: ``,
              workTime: ``,
              file: ``,
              routePath: ``,
              hidden: false,
            },
          },
          {
            name: '第二个-2',
            id: 'two-2',
            x: 900,
            y: 500,
            extraData: {
              main: false,
              desc: ``,
              workTime: ``,
              file: ``,
              routePath: ``,
              hidden: false,
            },
          },
          {
            name: '第二个-3',
            id: 'two-3',
            x: 100,
            y: 600,
            extraData: {
              main: false,
              desc: ``,
              workTime: ``,
              file: ``,
              routePath: ``,
              hidden: false,
            },
          },
        ],
      },
      allLinks: [],
      visibleDialog: false,
    }
  },
  computed: {
    countByMainNode() {
      return this.form.listData.filter(item => item.extraData.main).length
    },
    countByChildNode() {
      return this.form.listData.filter(item => !item.extraData.main).length
    },
  },
  methods: {
    handleRender() {
      // this.form.listData = JSON.parse(JSON.stringify(this.listData))
      this.handleGenerateLinksByAll()
      this.$emit('renderAgain', {
        allNodes: this.form.listData,
        allLinks: this.allLinks,
      })
    },

    handleGenerateLinksByAll() {
      const mainLinks = this.handleLineByMain(this.form.listData)
      const childrenLinks = this.handleLineByChildren(this.form.listData)

      console.log('展示所有连线')

      mainLinks.forEach(link => {
        console.log(`%c ${link.source} %c -> %c ${link.target}`, 'color: red;', 'color: #333;', 'color: red;')
        // this.allLinks.push(link)
      })
      childrenLinks.forEach(link => {
        console.log(`%c ${link.source} %c-> %c ${link.target}`, 'color: green;', 'color: #333;', 'color: red;')
        // this.allLinks.push(link)
      })
      this.allLinks = [...mainLinks, ...childrenLinks]

      this.$emit('generateLinks', this.allLinks)
    },

    handleLineByMain(nodes) {
      console.log(`%c 主连接线`, 'font-size: 20px; color: red;')
      const mains = nodes
        .filter(n => n.extraData && n.extraData.main)
        .sort((a, b) => {
          // 先按 y 排序（垂直流程），y 相同则按 x 排序
          const dy = (a.y || 0) - (b.y || 0)
          if (dy !== 0) return dy
          return (a.x || 0) - (b.x || 0)
        })
      const links = []
      for (let i = 1; i < mains.length; i++) {
        links.push({
          source: mains[i - 1].id,
          target: mains[i].id,
        })
      }

      console.log(links)
      return links
    },
    handleLineByChildren(nodes) {
      console.log(`%c 子连接线`, 'font-size: 20px; color: orange;')
      console.log(`%c 主节点包括`, 'color: blue;')

      const mainNodes = nodes.filter(item => item.extraData.main === true)
      console.log(mainNodes)
      console.log(`%c --- 根据主节点过滤的数据 start ---`, 'color: blue;')
      let linksByChildren = []
      mainNodes.forEach(mainNodeItem => {
        console.log(`%c 主节点 ${mainNodeItem.name} ${mainNodeItem.id}`, 'color: green;')
        nodes.filter(item => {
          if (item.id.match(`${mainNodeItem.id}-`)) {
            console.log(`%c ${item.name} ${item.id}`, `color: red;`)
            linksByChildren.push({
              source: mainNodeItem.id,
              target: item.id,
            })
          }
        })
        // console.log('------')
      })
      console.log(`%c --- 根据主节点过滤的数据 end ---`, 'color: blue;')
      console.log(linksByChildren)
      return linksByChildren
    },
    onAddNode() {
      const count = this.form.listData.filter(item => item.extraData.main).length
      this.form.listData.push({
        name: `新的节点${count}`,
        id: `newMainNode${count}`,
        x: 500,
        y: count * 500,
        extraData: {
          main: true,
          desc: ``,
          workTime: ``,
          file: ``,
          routePath: ``,
          hidden: false,
        },
      })
    },

    onMoveTop() {
      this.$emit('moveTop', true)
    },
    onMoveBottom() {
      this.$emit('moveBottom', true)
    },
    exportToJson() {
      const dataStr = JSON.stringify(this.form.listData, null, 2)
      const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr)

      const exportFileDefaultName = 'nodeData.json'

      const linkElement = document.createElement('a')
      linkElement.setAttribute('href', dataUri)
      linkElement.setAttribute('download', exportFileDefaultName)
      linkElement.click()
    },
    onCheckJson() {
      this.visibleDialog = true
    },
  },
}
</script>

<style lang="less" scoped>
.editor-part {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.table-part {
  flex: 1;
  height: 100%;
  overflow: hidden;
}
.form-part {
  padding: 10px;
  width: 100%;
  height: 100%;
  overflow: hidden;
  box-sizing: border-box;
}
</style>
