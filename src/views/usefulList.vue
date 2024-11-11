<template>
  <el-table :data="tableData" style="width: 800px" border>
    <el-table-column label="名字">
      <template slot-scope="scope">
        <span>{{ scope.row.meta ? scope.row.meta.name : '' }}</span>
      </template>
    </el-table-column>
    <el-table-column prop="name" label="name" />
    <el-table-column prop="path" label="path" />
    <el-table-column label="操作" width="120px">
      <template slot-scope="scope">
        <el-button type="text" @click="onOpen(scope.row)">打开</el-button>
      </template>
    </el-table-column>
  </el-table>
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
