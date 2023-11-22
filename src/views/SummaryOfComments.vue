<template>
  <div>
    <div class="custom-search-bar">
      <el-form ref="form" :model="form" label-width="80px" :inline="true">
        <el-form-item label="任务名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="归档时间">
          <el-date-picker v-model="form.time" type="daterange" range-separator="至" start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSearch" icon="el-icon-search">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button @click="onReset" icon="el-icon-refresh-right">重置</el-button>
        </el-form-item>
      </el-form>
      <div class="custom-btns">
        <el-button type="primary">导出意见汇总表</el-button>
      </div>
      <div class="custom-comment">
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column prop="date" label="序号" width="180" align="center">
          </el-table-column>
          <el-table-column prop="date" label="单据编号" width="180" align="center">
          </el-table-column>
          <el-table-column prop="date" label="组织机构" width="180" align="center">
          </el-table-column>
          <el-table-column prop="date" label="原公司章程名称" width="180" align="center">
          </el-table-column>
          <el-table-column prop="date" label="任务名称" width="180" align="center">
          </el-table-column>
          <el-table-column prop="date" label="修订年度" width="180" align="center">
          </el-table-column>
          <el-table-column prop="date" label="创建人部门" width="180" align="center">
          </el-table-column>
          <el-table-column prop="date" label="创建人" width="180" align="center">
          </el-table-column>
          <el-table-column prop="date" label="创建时间" width="180" align="center">
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="100" align="center">
            <template slot-scope="scope">
              <el-button type="text" @click="onCheck">查看</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="custom-pager">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageNum"
          :page-sizes="pageSizes" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'summaryOfComments',
  data() {
    return {
      form: {
        name: '',
        time: [],
      },
      tableData: [
        {
          date: '123'
        }
      ],
      pageNum: 1,
      pageSize: 10,
      pageSizes: [10, 25, 50, 100],
      total: 0,
    }
  },
  methods: {
    onSearch() {
      // TODO:
    },
    onReset() {
      // TODO:
    },
    onCheck() {
      // TODO:
    },
    handleSizeChange(val) {
      // TODO:
    },
    handleCurrentChange(val) {
      // TODO:
    }
  },
}
</script>