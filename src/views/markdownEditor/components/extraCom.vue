<template>
  <div class="md-editor-btns">
    <el-button type="primary" @click="onLoad" size="small">加载</el-button>
    <el-button type="success" @click="onSave" size="small">暂存</el-button>

    <el-dialog :visible.sync="dialogVisible" width="800px">
      <el-table :data="tableData" style="width: 100%" board height="500px">
        <el-table-column prop="title" label="标题" width="180"> </el-table-column>
        <el-table-column prop="createdTime" label="创建时间" width="180"> </el-table-column>
        <el-table-column prop="updatedTime" label="更新时间" width="180"> </el-table-column>
        <el-table-column prop="content" label="内容" width="180"> </el-table-column>
        <el-table-column label="操作" width="180">
          <template slot-scope="scope">
            <el-button type="text" @click="onLoadItem(scope.row)">加载</el-button>
          </template>
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">关闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'extraCom',
  props: {
    currentData: {
      type: String,
      default: ``,
    },
  },
  data() {
    return {
      dialogVisible: false,
      tableData: [],
    }
  },
  methods: {
    onLoad() {
      this.tableData = JSON.parse(localStorage.getItem('markdownData'))
      this.dialogVisible = true
    },
    onSave() {
      // if (this.title) {
      const now = new Date().toLocaleString()
      const newItem = {
        id: Date.now(),
        title: `${now}-的数据`,
        content: `${this.currentData}`,
        createdTime: now,
        updatedTime: now,
      }
      this.tableData.push(newItem)
      localStorage.setItem('markdownData', JSON.stringify(this.tableData))
      this.dialogVisible = false
      this.$message.success('暂存成功')
      // }
    },
    onLoadItem(row) {
      this.$emit('handleLoadData', row)
    },
  },
}
</script>

<style lang="less" scoped>
.md-editor-btns {
  position: absolute;
  top: 24px;
  right: 24px;
  text-align: right;
}
::v-deep .el-table td.el-table__cell div {
  white-space: nowrap;
}
</style>
