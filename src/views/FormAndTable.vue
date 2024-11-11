<template>
  <div>
    <el-form ref="formTableRef" :model="form" :rules="rules">
      <!-- 普通表单渲染 -->
      <el-form-item prop="keyword" label="关键字">
        <el-input v-model="form.keyword" maxlength="20" placeholder="请输入关键字" />
      </el-form-item>
      <!-- 动态可编辑表格 -->
      <el-table :data="form.tableData" border style="width: 100%">
        <el-table-column prop="name" label="名字" align="center">
          <template slot-scope="scope">
            <el-form-item :prop="`tableData.${scope.$index}.name`" :rules="rules.name">
              <el-input v-model.trim="scope.row.name" maxlength="20" placeholder="请输入" />
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column prop="age" label="年龄" align="center">
          <template slot-scope="scope">
            <el-form-item :prop="`tableData.${scope.$index}.age`" :rules="rules.age">
              <el-input v-model.number="scope.row.age" placeholder="请输入" />
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column prop="desc" label="描述" align="center">
          <template slot-scope="scope">
            <el-form-item :prop="`tableData.${scope.$index}.desc`" :rules="rules.desc">
              <el-input v-model="scope.row.desc" maxlength="20" placeholder="请输入" />
            </el-form-item>
          </template>
        </el-table-column>
      </el-table>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
/**
 * Description
 * @param {any} rule
 * @param {any} value
 * @param {any} callback
 * @returns {any}
 */
var checkAge = (rule, value, callback) => {
  if (!value) {
    return callback(new Error('年龄不能为空'))
  }
  setTimeout(() => {
    if (!Number.isInteger(Number(value))) {
      callback(new Error('请输入数字值'))
    } else {
      if (value < 18) {
        callback(new Error('必须年满18岁'))
      } else {
        callback()
      }
    }
  }, 300)
}

export default {
  name: 'FormAndTable',
  data() {
    return {
      form: {
        // 可加入普通的表单
        keyword: '',
        tableData: [
          {
            name: '胡一刀',
            age: '28',
            desc: '用刀的',
          },
          {
            name: '苗人凤',
            age: '',
            desc: '用剑的',
          },
          {
            name: '田归农',
            age: '44',
            desc: '',
          },
        ],
      },
      rules: {
        keyword: [
          {
            required: true,
            message: '请输入关键字',
            trigger: 'blur',
          },
        ],
        name: [
          {
            required: true,
            message: '请输入名字',
            trigger: 'blur',
          },
          {
            min: 3,
            max: 5,
            message: '长度在 3 到 5 个字符',
            trigger: 'blur',
          },
        ],
        age: [{ validator: checkAge, trigger: 'blur' }],
        desc: [
          {
            required: true,
            message: '请输入描述',
            trigger: 'blur',
          },
          {
            min: 1,
            max: 20,
            message: '长度在 1 到 20 个字符',
            trigger: 'blur',
          },
        ],
      },
    }
  },
  methods: {
    onSubmit() {
      console.log('submit!')
      this.$refs['formTableRef'].validate((valid) => {
        console.log(valid)
        if (valid) {
          this.$message.success('数据完整')
        }else {
          this.$message.error('数据不完整')
        }
      })
    },
  },
}
</script>
