<template>
  <div class="custom-page">
    <div class="custom-content">
      <el-table :data="tableData" style="width: 100%" border>
        <el-table-column prop="name" label="名称" width="180" />
        <el-table-column prop="description" label="描述" />
        <el-table-column label="操作" width="120">
          <template #default="scope">
            <el-button size="small" @click="handleEdit(scope.row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-drawer :visible.sync="drawerVisible" title="编辑数据" size="600px">
      <el-form :model="currentRow" ref="formRef">
        <el-form-item label="键" prop="name">
          <el-input v-model="currentRow.name" />
        </el-form-item>
        <el-form-item label="描述" prop="desc">
          <el-input v-model="currentRow.desc" />
        </el-form-item>
        <el-form-item label="动态属性">
          <el-form :data="currentRow.dynamicProps">
            <el-table :data="currentRow.dynamicProps">
              <el-table-column label="键">
                <template slot-scope="scope">
                  <el-form-item :prop="`currentRow.dynamicProps.${scope.$index}.customKey`">
                    <el-input v-model.trim="scope.row.customKey" maxlength="20" placeholder="请输入" />
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column label="值">
                <template slot-scope="scope">
                  <el-form-item :prop="`currentRow.dynamicProps.${scope.$index}.customValue`">
                    <el-input v-model.trim="scope.row.customValue" maxlength="20" placeholder="请输入" />
                  </el-form-item>
                </template>
              </el-table-column>
              <!-- <el-table-column prop="value">
                <template slot-scope="scope">
                  <el-form-item v-for="(item, key) in currentRow.dynamicProps" :key="key" :label="`item-${key}`">
                    <el-input v-model="currentRow.dynamicProps[item.key]" placeholder="键" />
                    <el-input v-model="currentRow.dynamicProps[item.value]" placeholder="值" />
                  </el-form-item>
                </template>
              </el-table-column> -->
            </el-table>
          </el-form>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="addProperty">添加属性</el-button>
        </el-form-item>
      </el-form>
      <div style="text-align: right; margin-top: 20px">
        <el-button @click="drawerVisible = false">取消</el-button>
        <el-button type="primary" @click="saveChanges">保存</el-button>
      </div>
    </el-drawer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        { name: '示例1', desc: '描述123', dynamicProps: [] },
        { name: '示例2', desc: '描述123456', dynamicProps: [] },
      ],
      drawerVisible: false,
      currentRow: {},
    }
  },
  methods: {
    handleEdit(row) {
      this.currentRow = { ...row }
      this.drawerVisible = true
    },
    addProperty() {
      // const newKey = `属性${Object.keys(this.currentRow).length + 1}`
      // this.$set(this.currentRow, newKey, '')
      this.currentRow.dynamicProps.push({
        customKey: `键${Object.keys(this.currentRow.dynamicProps).length + 1}`,
        customValue: `值${Object.keys(this.currentRow.dynamicProps).length + 1}`,
      })
    },
    saveChanges() {
      // const index = this.tableData.findIndex(item => item.name === this.currentRow.name)
      // if (index !== -1) {
      //   this.$set(this.tableData, index, { ...this.currentRow })
      // }
      console.log(this.currentRow)
      this.drawerVisible = false
    },
  },
}
</script>

<style scoped>
.el-drawer__body {
  padding: 20px;
}
</style>
