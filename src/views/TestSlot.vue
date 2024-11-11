<template>
  <div class="custom-page">
    <Parent ref="parentRef" @emitTrigger="onSubmit">
      <template slot="customSlot">
        <div class="children">
          <h3 style="color: red">{{ title }}</h3>
          <el-form :model="form" :rules="rules" ref="formRef">
            <el-form-item label="名称" prop="name">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="warning" @click="onSubmitByParent">父组件提交反射</el-button>
              <el-button type="primary" @click="onSubmit">提交</el-button>
            </el-form-item>
          </el-form>
        </div>
      </template>
    </Parent>
  </div>
</template>

<script>
import Parent from './Parent.vue'

export default {
  name: 'TestSlot',
  components: {
    Parent,
  },
  data() {
    return {
      title: '红色框是插入的 HTML',
      form: {
        name: '',
      },
      rules: {
        name: [
          {
            required: true,
            message: '请输入名字',
            trigger: 'blur',
          },
          {
            min: 3,
            max: 8,
            message: '长度在 3 到 8 个字符',
            trigger: 'blur',
          },
        ],
      },
    }
  },
  methods: {
    onSubmit(val) {
      console.log(val)
      this.$refs.formRef.validate((valid) => {
        if (valid) {
          this.handleSubmit()
        } else {
          this.$message.error('请填写完整数据')
        }
      })
    },
    handleSubmit() {
      console.log(
        '%c => handleSubmit 业务提交逻辑',
        'color: white; background-color: #409EFF; font-size: 16px; font-weight: bold;',
      )
      let currentData = { ...this.form }
      console.log(currentData)
      console.log('======')
    },
    onSubmitByParent() {
      console.log('%c step1 插槽内容调用父组件方法', 'color: #333; background-color: gold;')
      let currentData = { ...this.form }
      this.$refs.parentRef.handleGetSlotData(currentData)
    },
  },
}
</script>

<style lang="less" scoped>
.page {
  height: 100%;
}

.children {
  border: 4px solid red;
  background-color: white;
  padding: 10px;
  margin: 10px;
}
</style>
