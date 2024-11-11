<template>
  <div>
    <h1>render</h1>
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
      <h1>动态</h1>
      <el-table :data="form.tableData" border style="width: 100%">
        <template v-for="(item, index) in form.tableHeader">
          <el-table-column :prop="item.prop" :label="item.name" :key="`${item.prop}-${item.index}`" align="center">
            <template slot-scope="scope">
              <el-form-item :prop="`tableData.${scope.$index}.${item.prop}`">
                <el-input v-model.trim="scope.row[item.prop]" maxlength="20" placeholder="请输入" />
                <template v-if="item.renderAnything()">
                  <div v-html="item.renderAnything()"></div>
                  <!-- {{ item.renderAnything() }} -->
                </template>
              </el-form-item>
            </template>
          </el-table-column>
        </template>
      </el-table>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

import { h } from 'vue'

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
  name: 'FormAndTableRender',
  data() {
    return {
      form: {
        // 可加入普通的表单
        keyword: '',
        tableHeader: [
          {
            prop: 'name',
            name: '名字',
            rules: [],
            maxlength: 20,
            isEditItem: true, // 是否编辑格子
            renderAnything: () => { // 自定义渲染函数
              // function renderHTML() {
              //   return `
              //     <el-select v-model="value" placeholder="请选择">
              //       <el-option
              //         v-for="item in options"
              //         :key="item.value"
              //         :label="item.label"
              //         :value="item.value">
              //       </el-option>
              //     </el-select>
              //   `
              // }
              const renderHTML = () => {
                return `<div>渲染普通 HTML</div>`
              }
              return renderHTML()
            },
            // type: 'text',
            // options: () => {
            //   // return getOptions() // 返回数据
            // }
          },
          {
            prop: 'age',
            name: '年龄',
            rules: [],
            maxlength: null,
            isEditItem: false,
            renderAnything: () => false
          },
        ],
        tableData: [
          {
            name: '胡一刀',
            age: '28',
            desc: '用刀的',
          },
          {
            name: '苗人凤',
            age: '40',
            desc: '用剑的',
          },
          {
            name: '田归农',
            age: '44',
            desc: '菜',
          },
        ],
      },
      rules: {
        keyword: [
          {
            required: true,
            message: '请输入关键字',
            trigger: 'blur'
          },
        ],
        name: [
          {
            required: true,
            message: '请输入名字',
            trigger: 'blur'
          },
          {
            min: 3,
            max: 5,
            message: '长度在 3 到 5 个字符',
            trigger: 'blur'
          }
        ],
        age: [
          { validator: checkAge, trigger: 'blur' }
        ],
        desc: [
          {
            required: true,
            message: '请输入描述',
            trigger: 'blur'
          },
          {
            min: 1,
            max: 20,
            message: '长度在 1 到 20 个字符',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    onSubmit() {
      console.log('submit!')
      this.$refs['formTableRef'].validate(val => {
        console.log(val)
      })
    },
  }
}
</script>