<template>
  <div class="custom-page">
    <div class="custom-search-bar">
      <el-form ref="formRef" :model="form" label-width="80px" :inline="true">
        <el-form-item label="关键字" prop="keyWord">
          <el-input v-model="form.keyWord" placeholder="关键字" clearable></el-input>
        </el-form-item>
        <el-form-item label="名字" prop="name">
          <el-input v-model="form.name" placeholder="名字" clearable></el-input>
        </el-form-item>
        <el-form-item label="年度" prop="year">
          <el-input v-model="form.year" placeholder="年度" clearable></el-input>
        </el-form-item>
        <el-form-item label="创建人" prop="creator">
          <el-input v-model="form.creator" placeholder="创建人" clearable></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-button type="text" @click="onTriggerBySearchBar">{{ isSmallSearchBar ? '展开' : '收起' }}</el-button>
          <el-button type="primary" @click="onSearch" :loading="loading" icon="el-icon-search">查询</el-button>
          <el-button @click="onReset" :loading="loading" icon="el-icon-refresh-right">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="custom-content">
      <div class="custom-btns">
        <el-button type="primary" @click="onOpenDialog">编辑弹窗</el-button>
        <el-button type="primary" @click="onOpenDrawer">编辑抽屉</el-button>
        <el-button type="danger" :disabled="multipleSelection.length === 0" @click="onDeleteBatch">批量删除</el-button>
        <el-button type="warning" @click="onTips" icon="el-icon-warning">业务说明</el-button>
      </div>
      <el-table
        :data="tableData"
        border
        style="width: 100%"
        height="100%"
        v-loading="loading"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" align="center"></el-table-column>
        <el-table-column type="index" label="序号" width="55" align="center" fixed></el-table-column>
        <el-table-column prop="data" label="名称" width="180" align="center"></el-table-column>
        <el-table-column prop="data" label="年度" width="180" align="center"></el-table-column>
        <el-table-column prop="data" label="创建人" width="180" align="center"></el-table-column>
        <el-table-column prop="data" label="创建时间" width="180" align="center"></el-table-column>
        <el-table-column prop="longStr" label="长文本" min-width="320" align="left"></el-table-column>
        <el-table-column prop="desc" label="备注" width="220" align="center"></el-table-column>
        <el-table-column fixed="right" label="操作" width="220" align="left">
          <template slot-scope="scope">
            <el-button type="text" @click="onCheck">查看</el-button>
            <el-button v-if="scope.$index % 2 === 0" type="text">展示按钮1</el-button>
            <el-button v-if="scope.$index % 3 === 0" type="text">展示按钮2</el-button>
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

    <dialogByUX :visible.sync="visibleByDialog" />

    <drawerByUX :visible.sync="visibleByDrawer" />

    <el-dialog title="提示" :visible.sync="visibleByCheck" width="30%">
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="visibleByCheck = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import dialogByUX from './components/dialogByUX.vue'
import drawerByUX from './components/drawerByUX.vue'

export default {
  name: 'listPage',
  components: {
    dialogByUX,
    drawerByUX,
  },
  data() {
    return {
      loading: false,
      form: {
        keyWord: '',
        name: '',
        year: '',
        creator: '',
      },
      tableData: [],
      pageNum: 1,
      pageSize: 10,
      pageSizes: [10, 25, 50, 100],
      total: 0,
      visibleByDialog: false,
      visibleByDrawer: false,
      visibleByCheck: false,
      multipleSelection: [],
      isSmallSearchBar: false,
    }
  },
  mounted() {
    this.onSearch()
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    fetchData() {
      this.loading = true
      if (this.tableData.length === 0) {
        let i = 0
        while (i < 20) {
          i++
          this.tableData.push({
            data: `fake-data-${i}`,
            longStr:
              i % 2 === 0
                ? `这是一个长文本测试，长文本测试, 长文本测试, 长文本测试长文本测试长文本测试长文本测试，长文本测试-${i}`
                : `这是一个短文本测试-${i}`,
            desc: `时间戳：${new Date().getTime().toString()}`,
          })
        }
      }
      // 模拟发送请求
      setTimeout(() => {
        this.loading = false
      }, 800)
    },
    onSearch() {
      this.fetchData()
    },
    onReset() {
      this.$refs.formRef.resetFields()
      this.fetchData()
      // 模拟空数据
      this.tableData = []
    },
    onCheck() {
      this.visibleByCheck = true
    },
    onDelete() {
      this.$confirm('是否确认删除该条数据？', '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
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
    handleSizeChange(val) {},
    handleCurrentChange(val) {},
    onDeleteBatch() {
      this.$confirm(`是否确认删除 ${this.multipleSelection.length} 条数据？`, '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
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
    onOpenDialog() {
      this.visibleByDialog = true
    },
    onOpenDrawer() {
      this.visibleByDrawer = true
    },
    onTips() {
      this.visibleByCheck = true
    },
    onTriggerBySearchBar() {
      this.isSmallSearchBar = !this.isSmallSearchBar

      let blackList = [`name`, `year`, `creator`]
      this.$triggerBySearchBar(`formRef`, blackList)
    },
  },
}
</script>
