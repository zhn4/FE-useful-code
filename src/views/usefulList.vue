<template>
  <div class="main-container">
    <el-table :data="tableData" style="width: 800px" height="100%" border>
      <el-table-column type="index" label="序号" align="center" />
      <el-table-column label="名字">
        <template slot-scope="scope">
          <span>{{ scope.row.meta ? scope.row.meta.name : '' }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="name" />
      <el-table-column prop="path" label="path" />
      <el-table-column label="操作" width="80px" align="center">
        <template slot-scope="scope">
          <el-button type="text" @click="onOpen(scope.row)">打开</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import routes from '@/router/routes'

export default {
  name: 'usefulList',
  data() {
    return {
      tableData: [],
    }
  },
  mounted() {
    this.tableData = routes.filter((x) => x.meta)
  },
  methods: {
    onOpen(row) {
      this.$router.push(row.path)
    },
  },
}
</script>


<style lang="less" scoped>
.main-container {
  // background-color: #f5f5f5;
  width: 100%;
  height: 100%;
  padding: 20px;
  box-sizing: border-box;
}
</style>