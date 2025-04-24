<template>
  <el-form :model="form" ref="smallTableRef">
    <el-table :data="tableData" style="width: 100%;" border>
      <el-table-column prop="label" label="选项值" align="center">
        <template slot-scope="scope">
          <el-form-item :prop="`tableData.${scope.$index}.label`" :rules="rules.label">
            <el-input v-model.trim="scope.row.label" placeholder="请输入" />
          </el-form-item>
        </template>
      </el-table-column>
      <el-table-column prop="value" label="选项值编码" align="center" width="120">
        <template slot-scope="scope">
          <el-form-item :prop="`tableData.${scope.$index}.value`" :rules="rules.value">
            <el-input v-model.trim="scope.row.value" placeholder="请输入" disabled />
          </el-form-item>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="120">
        <template slot-scope="scope">
          <el-button type="text" style="color: red;" @click="onDeleteByOptions(scope.$index)">删除</el-button>
          <el-button type="text" @click="onMoveTopByItem(scope.$index)" :disabled="scope.$index === 0">上移</el-button>
          <el-button type="text" @click="onMoveBottomByItem(scope.$index)"
            :disabled="scope.$index === form.tableData.length - 1">下移</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-form>
</template>

<script>
export default {
  name: 'smallTable',
  props: {
    tableData: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      rules: {
        label: [
          {
            required: true,
            message: '请输入选项值',
            trigger: 'blur'
          },
        ],
        value: [
          {
            required: true,
            message: '请输入问题编码',
            trigger: 'blur',
          },
        ],
      }
    }
  },
  computed: {
    // NOTE: 为了实现这里的表单校验生效，需要把数组变成一个对象
    form() {
      return {
        tableData: this.tableData,
      }
    }
  },
  methods: {
    onDeleteByOptions(index) {
      this.tableData.splice(index, 1)
      this.$refs['smallTableRef'].clearValidate()
    },
    onMoveTopByItem(index) {
      if (index > 0) {
        const item = this.form.tableData[index]
        this.form.tableData.splice(index, 1)
        this.form.tableData.splice(index - 1, 0, item)
      }
    },
    onMoveBottomByItem(index) {
      if (index < this.form.tableData.length - 1) {
        const item = this.form.tableData[index]
        this.form.tableData.splice(index, 1)
        this.form.tableData.splice(index + 1, 0, item)
      }
    },
  }
}
</script>

<style lang="less" scoped>
.el-table {
  ::v-deep .el-table__cell {
    padding: 4px 0 !important;
  }
}
</style>