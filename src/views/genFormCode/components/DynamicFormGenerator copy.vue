<template>
  <div class="dynamic-form-container">
    <h2 v-if="formConfig.formTitle">{{ formConfig.formTitle }}</h2>
    
    <el-form 
      ref="dynamicForm"
      :model="formData"
      :rules="formRules"
      label-width="120px"
      label-position="right"
    >
      <el-row :gutter="20">
        <template v-for="(item, index) in formConfig.formItems">
          <!-- 文本输入框 -->
          <el-col :key="index" :span="item.span || 24">
            <el-form-item 
              :label="item.label" 
              :prop="item.prop"
            >
              <el-input
                v-if="item.type === 'input' || item.type === 'textarea'"
                v-model="formData[item.prop]"
                :type="item.type === 'textarea' ? 'textarea' : 'text'"
                :placeholder="item.placeholder || `请输入${item.label}`"
                :rows="item.rows || 2"
                clearable
              />
              
              <!-- 下拉选择框 -->
              <el-select
                v-else-if="item.type === 'select'"
                v-model="formData[item.prop]"
                :placeholder="item.placeholder || `请选择${item.label}`"
                style="width: 100%"
                clearable
              >
                <el-option
                  v-for="opt in item.options"
                  :key="opt.value"
                  :label="opt.label"
                  :value="opt.value"
                />
              </el-select>
              
              <!-- 单选框 -->
              <el-radio-group
                v-else-if="item.type === 'radio'"
                v-model="formData[item.prop]"
              >
                <el-radio
                  v-for="opt in item.options"
                  :key="opt.value"
                  :label="opt.value"
                >
                  {{ opt.label }}
                </el-radio>
              </el-radio-group>
              
              <!-- 日期选择器 -->
              <el-date-picker
                v-else-if="item.type === 'date-picker'"
                v-model="formData[item.prop]"
                :type="item.dateType || 'date'"
                :placeholder="item.placeholder || `请选择${item.label}`"
                :format="item.format || 'yyyy-MM-dd'"
                :value-format="item.format || 'yyyy-MM-dd'"
                style="width: 100%"
              />
              
              <!-- 开关 -->
              <el-switch
                v-else-if="item.type === 'switch'"
                v-model="formData[item.prop]"
                :active-value="item.activeValue !== undefined ? item.activeValue : true"
                :inactive-value="item.inactiveValue !== undefined ? item.inactiveValue : false"
              />
            </el-form-item>
          </el-col>
        </template>
      </el-row>
      
      <!-- 表单按钮 -->
      <el-form-item>
        <el-button
          v-for="(btn, btnIndex) in formConfig.formButtons"
          :key="btnIndex"
          :type="btn.type"
          @click="handleButtonEvent(btn.event)"
        >
          {{ btn.text }}
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'DynamicFormGenerator',
  props: {
    formConfig: {
      type: Object,
      required: true,
      validator: (value) => {
        return value.formName && Array.isArray(value.formItems)
      }
    },
    initialData: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    // 初始化表单数据
    const initFormData = {}
    this.formConfig.formItems.forEach(item => {
      initFormData[item.prop] = this.initialData[item.prop] || null
    })
    
    // 提取验证规则
    const initFormRules = {}
    this.formConfig.formItems.forEach(item => {
      if (item.rules) {
        initFormRules[item.prop] = item.rules
      }
    })
    
    return {
      formData: initFormData,
      formRules: initFormRules
    }
  },
  methods: {
    // 处理按钮事件
    handleButtonEvent(eventType) {
      switch (eventType) {
        case 'submit':
          this.handleSubmit()
          break
        case 'reset':
          this.handleReset()
          break
        default:
          this.$emit(eventType, this.formData)
      }
    },
    
    // 表单提交
    handleSubmit() {
      this.$refs.dynamicForm.validate(valid => {
        if (valid) {
          this.$emit('submit', this.formData)
        } else {
          this.$message.error('请检查表单填写是否正确')
          return false
        }
      })
    },
    
    // 表单重置
    handleReset() {
      this.$refs.dynamicForm.resetFields()
      this.$emit('reset')
    },
    
    // 获取表单数据
    getFormData() {
      return { ...this.formData }
    },
    
    // 设置表单数据
    setFormData(data) {
      Object.keys(data).forEach(key => {
        if (this.formData.hasOwnProperty(key)) {
          this.formData[key] = data[key]
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.dynamic-form-container {
  padding: 20px;
  background: #fff;
  border-radius: 4px;
  
  h2 {
    margin-bottom: 20px;
    font-size: 18px;
    color: #333;
  }
  
  .el-form-item {
    margin-bottom: 22px;
  }
}
</style>