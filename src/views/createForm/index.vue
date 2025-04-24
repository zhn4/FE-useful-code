<template>
  <div class="create-form">
    <h2>创建调查问卷</h2>
    <div class="main">
      <el-form ref="formTableRef" :model="form" :rules="rules" style="height: 100%;">
        <el-table :data="form.tableData" border style="width: 100%" height="100%">
          <el-table-column prop="txt" label="问题内容" align="center">
            <template slot-scope="scope">
              <el-form-item :prop="`tableData.${scope.$index}.txt`" :rules="rules.txt">
                <el-input v-model.trim="scope.row.txt" maxlength="20" placeholder="请输入" />
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column prop="txtCode" label="问题编码" align="center" width="100">
            <template slot-scope="scope">
              <el-form-item :prop="`tableData.${scope.$index}.txtCode`" :rules="rules.txtCode">
                <el-input v-model.trim="scope.row.txtCode" placeholder="请输入" disabled />
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column prop="type" label="类型" align="center" width="120">
            <template slot-scope="scope">
              <el-form-item :prop="`tableData.${scope.$index}.type`" :rules="rules.type">
                <el-select v-model="scope.row.type" placeholder="请选择活动区域">
                  <el-option label="填空题" value="textarea"></el-option>
                  <el-option label="单选题" value="radio"></el-option>
                  <el-option label="多选题" value="checkbox"></el-option>
                </el-select>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column prop="isRequired" label="是否必填" align="center" width="80">
            <template slot-scope="scope">
              <el-switch v-model="scope.row.isRequired" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
            </template>
          </el-table-column>
          <el-table-column prop="typeOptions" label="选项配置" align="center" width="420">
            <template slot-scope="scope">
              <template v-if="scope.row.type === 'radio' || scope.row.type === 'checkbox'">
                <!-- 选项配置表格中表格 -->
                <!-- {{ scope.row.typeOptions }} -->
                <SmallTable :table-data="scope.row.typeOptions" :key="`smallTable-${scope.$index}`" />
                <el-button type="text" @click="onOptionsAdd(scope.$index)">增加选项</el-button>
              </template>
              <span v-else>无</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="80">
            <template slot-scope="scope">
              <div class="btns">
                <el-button type="text" @click="onMoveTopByItem(scope.$index)" icon="el-icon-top"
                  :disabled="scope.$index === 0">上移</el-button>
                <el-button type="text" style="color: red;" @click="onDeleteByItem(scope.$index)"
                  icon="el-icon-delete">删除</el-button>
                <el-button type="text" @click="onMoveBottomByItem(scope.$index)" icon="el-icon-bottom"
                  :disabled="scope.$index === form.tableData.length - 1">下移</el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </el-form>

      <el-drawer title="预览" :visible.sync="drawerVisible" size="500px">
        <div style="padding: 0 20px;">
          <el-form ref="reviewFormRef" :model="formConstrator" :rules="rulesConstrator" label-position="top"
            label-width="80px">
            <template v-for="(ques, index) in form.tableData">
              <el-form-item :label="ques.txt" :prop="ques.txtCode" :key="index">
                <template v-if="ques.type === 'textarea'">
                  <el-input type="textarea" :rows="4" v-model="formConstrator[ques.txtCode]"
                    placeholder="请输入"></el-input>
                </template>
                <template v-if="ques.type === 'radio'">
                  <el-radio-group v-model="formConstrator[ques.txtCode]">
                    <el-radio v-for="(option, i) in ques.typeOptions || []" :key="i" :label="option.value">{{
                      option.label
                    }}</el-radio>
                  </el-radio-group>
                </template>
                <template v-if="ques.type === 'checkbox'">
                  <el-checkbox-group v-model="formConstrator[ques.txtCode]">
                    <el-checkbox v-for="(option, i) in ques.typeOptions || []" :key="i" :label="option.value">{{
                      option.label
                    }}</el-checkbox>
                  </el-checkbox-group>
                </template>
              </el-form-item>
            </template>
            <el-form-item>
              <el-button type="primary" @click="onSubmitByTest">校验测试</el-button>
              <el-button type="danger" @click="onCloseDrawer">关闭</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-drawer>
    </div>
    <div style="width: 100%; text-align: center; margin: 10px 0;">
      <el-button type="primary" @click="onAddByQuestion">新建问题</el-button>
      <el-button type="warning" @click="onReview">预览</el-button>
    </div>
  </div>
</template>

<script>
import SmallTable from './components/smallTable.vue'

export default {
  name: 'createForm',
  components: {
    SmallTable,
  },
  data() {
    return {
      form: {
        tableData: [
          {
            txt: '问题1',
            txtCode: 'txt1',
            type: 'textarea',
            isRequired: false,
            typeOptions: [],
          },
          {
            txt: '问题2',
            txtCode: 'txt2',
            type: 'radio',
            isRequired: true,
            typeOptions: [
              {
                label: '选项1',
                value: 'option1',
              },
              {
                label: '选项2',
                value: 'option2',
              },
            ]
          },
          {
            txt: '问题3',
            txtCode: 'txt3',
            type: 'checkbox',
            isRequired: false,
            typeOptions: [
              {
                label: '选项1',
                value: 'option1',
              },
              {
                label: '选项2',
                value: 'option2',
              },
              {
                label: '选项3',
                value: 'option3',
              },
            ]
          },
        ],
      },
      rules: {
        txt: [
          {
            required: true,
            message: '请输入问题',
            trigger: 'blur',
          },
        ],
        txtCode: [
          {
            required: true,
            message: '请输入问题编码',
            trigger: 'blur',
          },
        ],
        type: [
          {
            required: true,
            message: '请选择类型',
            trigger: 'blur',
          },
        ],
      },
      formConstrator: {},
      rulesConstrator: {},
      drawerVisible: false,
    }
  },
  methods: {
    onOptionsAdd(index) {
      this.form.tableData[index].typeOptions.push({
        label: `选项${this.form.tableData[index].typeOptions.length + 1}`,
        value: `option${this.form.tableData[index].typeOptions.length + 1}`,
      })
    },
    onDeleteByItem(index) {
      this.form.tableData.splice(index, 1)
      this.$refs['formTableRef'].clearValidate()
    },
    onAddByQuestion() {
      const newItem = {
        txt: `问题${this.form.tableData.length + 1}`,
        txtCode: `txt${this.form.tableData.length + 1}`,
        type: 'textarea',
        isRequired: false,
        typeOptions: [],
      }
      this.form.tableData.push(newItem)
    },
    onReview() {
      this.form.tableData.forEach(item => {
        this.$set(this.formConstrator, item.txtCode, item.type === 'checkbox' ? [] : '')
        this.$set(this.rulesConstrator, item.txtCode, [
          {
            required: item.isRequired,
            message: '请输入或选择',
            trigger: 'blur',
          },
        ])
      })
      this.drawerVisible = true
    },
    onSubmitByTest() {
      this.$refs['reviewFormRef'].validate(valid => {
        if (valid) {
          this.$message.success('校验成功，问卷可提交')
        } else {
          this.$message.error('请填写完整')
          return false
        }
      })
    },
    onCloseDrawer() {
      this.drawerVisible = false
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
.create-form {
  height: 100%;
  width: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;

  .main {
    flex: 1;
    overflow: auto;
  }

  .btns {
    .el-button+.el-button {
      margin: 0;
    }
  }
}
</style>
