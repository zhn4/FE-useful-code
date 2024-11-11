<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="测试标签1" name="first">
      <div class="custom-page">
        <div class="custom-search-bar">
          <el-form :model="form" inline ref="formRef">
            <el-form-item label="名字" prop="name">
              <el-input v-model="form.name" placeholder="名字"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSearch">查询</el-button>
              <el-button @click="onReset">重置</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="custom-content">
          <div class="custom-btns">
            <el-button type="primary">功能</el-button>
          </div>
          <div class="custom-list">
            <el-table :data="tableData" border stripe style="width: 100%" height="100%">
              <el-table-column prop="date" label="日期" width="180"> </el-table-column>
              <el-table-column prop="name" label="姓名" width="180"> </el-table-column>
              <el-table-column prop="address" label="地址"> </el-table-column>
            </el-table>
          </div>
        </div>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageNum"
          :page-sizes="pageSizes"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          class="custom-pagination"
        >
        </el-pagination>
      </div>
    </el-tab-pane>
    <el-tab-pane label="测试标签2" name="second">配置管理</el-tab-pane>
  </el-tabs>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: '',
      },
      pageNum: 1,
      pageSize: 10,
      pageSizes: [10, 30, 50, 100],
      total: 0,
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄',
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄',
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄',
        },
      ],
      activeName: 'first',
    }
  },
  mounted() {
    let i = 0
    while (i < 50) {
      i++
      this.tableData.push({
        date: new Date().getTime().toString(),
        name: `测试用户-${i}`,
        address: '测试地址',
      })
    }
  },
  methods: {
    onSearch() {
      console.log('search')
    },
    onReset() {
      console.log('reset')
      this.$refs['formRef'].resetFields()
    },
    handleSizeChange(val) {
      console.log('pageSize', val)
    },
    handleCurrentChange(val) {
      console.log('pageNun', val)
    },
  },
}
</script>

<style lang="less" scoped>
/deep/ .el-tabs__content {
  // 这里减去的是 tab 的头部跟 padding 的距离
  height: calc(100vh - 40px - 15px);
  overflow: hidden;
}

/deep/ .el-tab-pane {
  height: 100%;
}
</style>
