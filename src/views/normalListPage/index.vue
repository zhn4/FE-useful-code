<template>
  <div class="custom-page">
    <div class="custom-search-bar">
      <el-form ref="formRef" :model="form" label-width="80px" :inline="true">
        <el-form-item label="任务名称" prop="name">
          <el-input v-model="form.name" placeholder="任务名称" clearable></el-input>
        </el-form-item>
        <el-form-item label="归档时间" prop="time">
          <el-date-picker
            v-model="form.time"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSearch" :loading="loading" icon="el-icon-search">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button @click="onReset" :loading="loading" icon="el-icon-refresh-right">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="custom-content">
      <div class="custom-btns">
        <el-button type="primary" @click="onClickFunction">独立功能</el-button>
        <el-button type="primary" plain @click="onDeleteBatch">批量删除</el-button>
      </div>
      <el-table :data="tableData" border style="width: 100%" height="100%">
        <el-table-column type="selection" width="55" align="center"></el-table-column>
        <el-table-column type="index" label="序号" width="55" align="center"></el-table-column>
        <el-table-column prop="date" label="名称" width="180" align="center"></el-table-column>
        <el-table-column prop="date" label="年度" width="180" align="center"></el-table-column>
        <el-table-column prop="date" label="创建人" width="180" align="center"></el-table-column>
        <el-table-column prop="date" label="创建时间" width="180" align="center"></el-table-column>
        <el-table-column prop="desc" label="备注" align="center"></el-table-column>
        <el-table-column fixed="right" label="操作" width="100" align="center">
          <template slot-scope="scope">
            <el-button type="text" @click="onCheck">查看</el-button>
            <el-button type="text" @click="onDelete" style="color: red">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="custom-pagination">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageNum"
        :page-sizes="pageSizes"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NormalListPage',
  data() {
    return {
      loading: false,
      form: {
        name: '',
        time: [],
      },
      tableData: [],
      pageNum: 1,
      pageSize: 10,
      pageSizes: [10, 25, 50, 100],
      total: 0,
    }
  },
  mounted() {
    let i = 0
    while (i < 50) {
      i++
      this.tableData.push({
        date: `fake-data-${i}`,
        desc: `备注： 看看时间 ${new Date()}`,
      })
    }
  },
  methods: {
    fetchData() {
      this.loading = true
      // 模拟发送请求
      setTimeout(() => {
        this.loading = false
      }, 300)
    },
    onSearch() {
      this.fetchData()
    },
    onReset() {
      this.$refs.formRef.resetFields()
      this.fetchData()
    },
    onCheck() {},
    onDelete() {},
    handleSizeChange(val) {},
    handleCurrentChange(val) {},
    onDeleteBatch() {},
    onClickFunction() {},
  },
}
</script>
