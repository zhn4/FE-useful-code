<template>
  <el-form :model="form" ref="formRef" label-width="120px" style="width: 600px" size="small">
    <template v-for="item in formObj">
      <el-form-item :key="item.label" :prop="item.prop" :label="item.label" :rules="item.rules">
        <el-input type="text" v-model.trim="form[item.prop]"></el-input>
      </el-form-item>
      <el-form-item :label="`${item.label}正则`">
        <el-input type="textarea" :value="item.reg" rows="2" resize="none"> </el-input>
      </el-form-item>
    </template>
    <el-form-item>
      <el-button type="danger" @click="onReset">重置</el-button>
      <el-button type="primary" @click="onSubmit">提交</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
const checkEmail = (rule, value, callback) => {
  let reg = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/
  if (!value) {
    callback(new Error('请输入邮箱地址'))
  } else {
    if (!reg.test(value)) {
      callback(new Error('请输入正确邮箱地址格式'))
    }
  }
}

const checkMobilePhone = (rule, value, callback) => {
  let reg = /^1[3-9]\d{9}$/
  if (!value) {
    callback(new Error('请输入手机号码'))
  } else {
    if (!reg.test(value)) {
      callback(new Error('请输入正确手机号码格式'))
    } else {
      callback()
    }
  }
}

const checkTelephone = (rule, value, callback) => {
  let reg = /\d{3}-\d{8}|\d{4}-\d{7}/
  if (!value) {
    callback(new Error('请输入固话号码'))
  } else {
    if (!reg.test(value)) {
      callback(new Error('请输入正确固话号码格式'))
    } else {
      callback()
    }
  }
}

const checkNumberBy2Point = (rule, value, callback) => {
  let reg = /^\s*-?[1-9]\d*(\.\d{0,2})?\s*$/
  if (value && !value?.match(reg)) {
    callback(new Error('最多小数点后2位'))
  } else {
    callback()
  }
}

export default {
  name: 'aboutForm',
  data() {
    return {
      form: {
        email: '',
        mobilePhone: '',
        telephone: '',
        numberBy2Point: '',
      },
      formObj: [
        {
          prop: 'email',
          label: '邮箱',
          reg: `/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/`,
          rules: [
            {
              required: true,
              message: '请输入邮箱',
              trigger: 'change',
            },
            {
              validator: checkEmail,
              trigger: 'change',
            },
          ],
        },
        {
          prop: 'mobilePhone',
          label: '手机',
          reg: `/^1[3-9]\d{9}$/`,
          rules: [
            {
              required: true,
              message: '请输入手机',
              trigger: 'change',
            },
            {
              validator: checkMobilePhone,
              trigger: 'change',
            },
          ],
        },
        {
          prop: 'telephone',
          label: '固话',
          reg: `/\d{3}-\d{8}|\d{4}-\d{7}/`,
          rules: [
            {
              required: true,
              message: '请输入固话',
              trigger: 'change',
            },
            {
              validator: checkTelephone,
              trigger: 'change',
            },
          ],
        },
        {
          prop: 'numberBy2Point',
          label: '2位小数',
          reg: `/^\s*-?[1-9]\d*(\.\d{0,2})?\s*$/`,
          rules: [
            {
              required: true,
              message: '请输入2位小数',
              trigger: 'change',
            },
            {
              validator: checkNumberBy2Point,
              trigger: 'change',
            },
          ],
        },
      ],
    }
  },
  methods: {
    onReset() {
      this.$refs['formRef'].resetFields()
    },
    onSubmit() {
      this.$refs['formRef'].validate((valid) => {
        if (valid) {
          return this.$message.error('!!!')
        }
      })
    },
  },
}
</script>
