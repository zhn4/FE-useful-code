<template>
  <div class="app-container">
    <dynamic-form-generator
      :form-config="userFormConfig"
      :initial-data="initialUserData"
      @submit="handleFormSubmit"
    />
  </div>
</template>

<script>
import DynamicFormGenerator from './components/DynamicFormGenerator'
import userFormConfig from './userFormConfig.js'

export default {
  name: 'UserFormDemo',
  components: { DynamicFormGenerator },
  data() {
    return {
      userFormConfig,
      initialUserData: {
        username: 'testuser',
        role: 'editor',
        enabled: true
      }
    }
  },
  methods: {
    handleFormSubmit(formData) {
      console.log('表单提交数据:', formData)
      // 这里可以调用API提交数据
      this.$message.success('表单提交成功')
    }
  }
}
</script>

<style lang="less" scoped>
.app-container {
  width: 100%;
  height: 100%;
}
</style>