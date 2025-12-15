<template>
  <div class="container">
    <!-- <header>
      <h1>Element UI 三栏布局示例</h1>
      <p class="description">左侧和中间为目录树，右侧为数据表格</p>
    </header> -->

    <div class="layout-container">
      <!-- <div id="app"> -->
      <el-row :gutter="20" style="height: 100%">
        <el-col :xs="24" :sm="8" :md="6">
          <div class="panel">
            <!-- <div class="panel-header">系统目录</div> -->
            <div class="panel-body">
              <div class="tree-container">
                <el-tree
                  :data="leftTreeData"
                  :props="defaultProps"
                  @node-click="handleLeftNodeClick"
                  :highlight-current="true"
                  node-key="id"
                  :default-expanded-keys="[1, 2]"
                ></el-tree>
              </div>
            </div>
          </div>
        </el-col>

        <el-col :xs="24" :sm="8" :md="6">
          <div class="panel">
            <!-- <div class="panel-header">文件目录</div> -->
            <div class="panel-body">
              <div class="tree-container">
                <el-tree
                  :data="middleTreeData"
                  :props="defaultProps"
                  @node-click="handleMiddleNodeClick"
                  :highlight-current="true"
                  node-key="id"
                  :default-expanded-keys="[10, 11]"
                ></el-tree>
              </div>
            </div>
          </div>
        </el-col>

        <el-col :xs="24" :sm="8" :md="12">
          <!-- <div class="panel"> -->
          <!-- <div class="panel-header">数据表格</div> -->
          <!-- <div class="panel-body"> -->
          <!-- <div class="table-container"> -->
          <el-table :data="tableData" stripe border style="width: 100%" height="100%">
            <el-table-column prop="name" label="文件名" width="180"></el-table-column>
            <el-table-column prop="type" label="类型" width="100"></el-table-column>
            <el-table-column prop="size" label="大小" width="100"></el-table-column>
            <el-table-column prop="modified" label="修改日期" width="180"></el-table-column>
            <el-table-column prop="owner" label="所有者" width="120"></el-table-column>
            <el-table-column label="操作" width="120" fixed="right">
              <template slot-scope="scope">
                <el-button type="text" size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                <el-button type="text" size="mini" @click="handleDelete(scope.$index, scope.row)" style="color: red">
                  删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <!-- </div> -->
          <!-- </div> -->
          <!-- </div> -->
        </el-col>
      </el-row>
      <!-- </div> -->
    </div>

    <!-- <div class="info-panel">
      <h3>实现说明</h3>
      <p>此布局使用Element UI的栅格系统和组件实现：</p>
      <div class="code-block">
        &lt;el-row :gutter="20"&gt;
        <br />
        &nbsp;&nbsp;&lt;el-col :xs="24" :sm="8" :md="6"&gt;
        <span class="highlight">// 左侧目录树</span>
        &lt;/el-col&gt;
        <br />
        &nbsp;&nbsp;&lt;el-col :xs="24" :sm="8" :md="6"&gt;
        <span class="highlight">// 中间目录树</span>
        &lt;/el-col&gt;
        <br />
        &nbsp;&nbsp;&lt;el-col :xs="24" :sm="8" :md="12"&gt;
        <span class="highlight">// 右侧表格</span>
        &lt;/el-col&gt;
        <br />
        &lt;/el-row&gt;
      </div>
      <p>关键点：</p>
      <ul>
        <li>
          使用
          <span class="highlight">el-row</span>
          和
          <span class="highlight">el-col</span>
          创建响应式布局
        </li>
        <li>
          使用
          <span class="highlight">el-tree</span>
          组件实现目录树
        </li>
        <li>
          使用
          <span class="highlight">el-table</span>
          组件实现数据表格
        </li>
        <li>添加了响应式设计，在不同屏幕尺寸下自动调整布局</li>
      </ul>
    </div> -->
  </div>
</template>

<script>
export default {
  name: 'threeGrid',
  data() {
    return {
      // 左侧树数据
      leftTreeData: [
        {
          id: 1,
          label: '系统设置',
          children: [
            {
              id: 2,
              label: '用户管理',
              children: [
                {
                  id: 3,
                  label: '用户列表',
                },
                {
                  id: 4,
                  label: '角色管理',
                },
              ],
            },
            {
              id: 5,
              label: '系统配置',
              children: [
                {
                  id: 6,
                  label: '基础配置',
                },
                {
                  id: 7,
                  label: '权限设置',
                },
              ],
            },
          ],
        },
        {
          id: 8,
          label: '数据管理',
          children: [
            {
              id: 9,
              label: '数据备份',
            },
          ],
        },
      ],

      // 中间树数据
      middleTreeData: [
        {
          id: 10,
          label: '文档',
          children: [
            {
              id: 11,
              label: '工作文档',
              children: [
                {
                  id: 12,
                  label: '项目计划',
                },
                {
                  id: 13,
                  label: '会议记录',
                },
              ],
            },
            {
              id: 14,
              label: '个人文档',
              children: [
                {
                  id: 15,
                  label: '学习资料',
                },
                {
                  id: 16,
                  label: '笔记',
                },
              ],
            },
          ],
        },
        {
          id: 17,
          label: '图片',
          children: [
            {
              id: 18,
              label: '产品图片',
            },
          ],
        },
      ],

      // 表格数据
      tableData: [
        {
          name: '项目计划书.docx',
          type: '文档',
          size: '2.5MB',
          modified: '2023-10-15 14:30',
          owner: '张三',
        },
        {
          name: '产品原型图.png',
          type: '图片',
          size: '1.8MB',
          modified: '2023-10-14 09:15',
          owner: '李四',
        },
        {
          name: '会议记录.pdf',
          type: '文档',
          size: '850KB',
          modified: '2023-10-13 16:45',
          owner: '王五',
        },
        {
          name: '需求文档.docx',
          type: '文档',
          size: '3.2MB',
          modified: '2023-10-12 11:20',
          owner: '赵六',
        },
        {
          name: '数据备份.zip',
          type: '压缩包',
          size: '15.7MB',
          modified: '2023-10-11 18:00',
          owner: '系统',
        },
        {
          name: '代码库',
          type: '文件夹',
          size: '--',
          modified: '2023-10-10 10:30',
          owner: '开发组',
        },
      ],

      defaultProps: {
        children: 'children',
        label: 'label',
      },
    }
  },
  methods: {
    handleLeftNodeClick(data) {
      this.$message({
        message: `点击了左侧目录: ${data.label}`,
        type: 'info',
      })
    },
    handleMiddleNodeClick(data) {
      this.$message({
        message: `点击了中间目录: ${data.label}`,
        type: 'info',
      })
    },
    handleEdit(index, row) {
      this.$message({
        message: `编辑文件: ${row.name}`,
        type: 'success',
      })
    },
    handleDelete(index, row) {
      this.$confirm(`确定删除文件 "${row.name}" 吗?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          this.tableData.splice(index, 1)
          this.$message({
            type: 'success',
            message: '删除成功!',
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
          })
        })
    },
  },
}
</script>

<style lang="less" scoped>
// * {
//   margin: 0;
//   padding: 0;
//   box-sizing: border-box;
// }

// body {
//   font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB', Arial, sans-serif;
//   background-color: #f5f7fa;
//   color: #333;
//   padding: 20px;
// }

// .container {
//   max-width: 100%;
//   margin: 0 auto;
//   background: white;
//   border-radius: 8px;
//   box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
//   overflow: hidden;
// }

// header {
//   background: linear-gradient(135deg, #409eff 0%, #67c23a 100%);
//   color: white;
//   padding: 20px;
//   text-align: center;
// }

// h1 {
//   font-size: 24px;
//   margin-bottom: 10px;
// }

// .description {
//   font-size: 14px;
//   opacity: 0.9;
// }

::v-deep .el-col {
  height: 100%;
}

.container {
  width: 100%;
  height: 100%;
}

.layout-container {
  width: 100%;
  height: 100%;
  padding: 20px;
  box-sizing: border-box;
}

.el-row {
  margin-bottom: 20px;
  border-radius: 4px;
}

.el-col {
  border-radius: 4px;
}

.panel {
  background: white;
  border-radius: 4px;
  border: 1px solid #ebeef5;
  overflow: hidden;
  height: 100%;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.panel-header {
  padding: 15px 20px;
  border-bottom: 1px solid #ebeef5;
  background-color: #f5f7fa;
  font-weight: bold;
  color: #409eff;
}

.panel-body {
  padding: 20px;
  height: calc(100% - 52px);
  overflow: auto;
}

.tree-container {
  height: 500px;
  overflow-y: auto;
}

.table-container {
  height: 500px;
  overflow-y: auto;
}

.info-panel {
  margin-top: 20px;
  background: white;
  border-radius: 4px;
  padding: 20px;
  border: 1px solid #ebeef5;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.info-panel h3 {
  margin-bottom: 15px;
  color: #409eff;
  border-bottom: 1px solid #ebeef5;
  padding-bottom: 10px;
}

.code-block {
  background: #f5f7fa;
  padding: 15px;
  border-radius: 4px;
  margin-top: 10px;
  font-family: 'Courier New', monospace;
  font-size: 14px;
  line-height: 1.5;
  overflow-x: auto;
}

.highlight {
  color: #e6a23c;
  font-weight: bold;
}

@media (max-width: 768px) {
  .el-col {
    margin-bottom: 20px;
  }
}
</style>
