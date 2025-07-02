<template>
  <div class="form-generator-container">
    <!-- 表单展示区域 -->
    <div class="form-preview">
      <h2>{{ formConfig.formTitle || '动态表单' }}</h2>
      <el-form 
        ref="dynamicForm"
        :model="formData"
        :rules="formRules"
        label-width="120px"
      >
        <el-row :gutter="20">
          <template v-for="(item, index) in formConfig.formItems">
            <el-col :key="index" :span="item.span || 24">
              <el-form-item :label="item.label" :prop="item.prop">
                <!-- 文本输入框 -->
                <el-input
                  v-if="item.type === 'input'"
                  v-model="formData[item.prop]"
                  :placeholder="item.placeholder || `请输入${item.label}`"
                  clearable
                />
                
                <!-- 文本域 -->
                <el-input
                  v-else-if="item.type === 'textarea'"
                  v-model="formData[item.prop]"
                  type="textarea"
                  :rows="item.rows || 3"
                  :placeholder="item.placeholder || `请输入${item.label}`"
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
                
                <!-- 复选框 -->
                <el-checkbox-group
                  v-else-if="item.type === 'checkbox'"
                  v-model="formData[item.prop]"
                >
                  <el-checkbox
                    v-for="opt in item.options"
                    :key="opt.value"
                    :label="opt.value"
                  >
                    {{ opt.label }}
                  </el-checkbox>
                </el-checkbox-group>
                
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
                
                <!-- 数字输入框 -->
                <el-input-number
                  v-else-if="item.type === 'number'"
                  v-model="formData[item.prop]"
                  :min="item.min || 0"
                  :max="item.max || 100"
                  :step="item.step || 1"
                  style="width: 100%"
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
            :type="btn.type || 'primary'"
            @click="handleButtonEvent(btn.event)"
          >
            {{ btn.text }}
          </el-button>
        </el-form-item>
      </el-form>
    </div>
    
    <!-- 源码展示区域 -->
    <div class="source-code">
      <h3>生成的表单源码</h3>
      <el-tabs type="border-card">
        <el-tab-pane label="Template">
          <pre><code>{{ generatedTemplateCode }}</code></pre>
        </el-tab-pane>
        <el-tab-pane label="Script">
          <pre><code>{{ generatedScriptCode }}</code></pre>
        </el-tab-pane>
        <el-tab-pane label="Style">
          <pre><code>{{ generatedStyleCode }}</code></pre>
        </el-tab-pane>
      </el-tabs>
    </div>
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
  computed: {
    // 生成模板代码
    generatedTemplateCode() {
      let templateCode = `<template>\n  <el-form ref="form" :model="formData" :rules="formRules" label-width="120px">\n`
      
      this.formConfig.formItems.forEach(item => {
        const label = `    <el-form-item label="${item.label}" prop="${item.prop}">\n`
        let control = ''
        
        switch (item.type) {
          case 'input':
            control = `      <el-input v-model="formData.${item.prop}" placeholder="${item.placeholder || `请输入${item.label}`}" />\n`
            break
          case 'textarea':
            control = `      <el-input v-model="formData.${item.prop}" type="textarea" :rows="${item.rows || 3}" placeholder="${item.placeholder || `请输入${item.label}`}" />\n`
            break
          case 'select':
            const options = item.options.map(opt => 
              `        <el-option label="${opt.label}" value="${opt.value}" />`
            ).join('\n')
            control = `      <el-select v-model="formData.${item.prop}" placeholder="${item.placeholder || `请选择${item.label}`}" style="width: 100%">\n${options}\n      </el-select>\n`
            break
          case 'radio':
            const radios = item.options.map(opt => 
              `        <el-radio label="${opt.value}">${opt.label}</el-radio>`
            ).join('\n')
            control = `      <el-radio-group v-model="formData.${item.prop}">\n${radios}\n      </el-radio-group>\n`
            break
          case 'checkbox':
            const checkboxes = item.options.map(opt => 
              `        <el-checkbox label="${opt.value}">${opt.label}</el-checkbox>`
            ).join('\n')
            control = `      <el-checkbox-group v-model="formData.${item.prop}">\n${checkboxes}\n      </el-checkbox-group>\n`
            break
          case 'date-picker':
            control = `      <el-date-picker v-model="formData.${item.prop}" type="${item.dateType || 'date'}" placeholder="${item.placeholder || `请选择${item.label}`}" style="width: 100%" />\n`
            break
          case 'switch':
            control = `      <el-switch v-model="formData.${item.prop}" />\n`
            break
          case 'number':
            control = `      <el-input-number v-model="formData.${item.prop}" :min="${item.min || 0}" :max="${item.max || 100}" style="width: 100%" />\n`
            break
        }
        
        templateCode += label + control + '    </el-form-item>\n'
      })
      
      // 添加按钮
      templateCode += '    <el-form-item>\n'
      this.formConfig.formButtons.forEach(btn => {
        templateCode += `      <el-button type="${btn.type || 'primary'}" @click="handle${btn.event.charAt(0).toUpperCase() + btn.event.slice(1)}">${btn.text}</el-button>\n`
      })
      templateCode += '    </el-form-item>\n'
      templateCode += '  </el-form>\n</template>'
      
      return templateCode
    },
    
    // 生成脚本代码
    generatedScriptCode() {
      let scriptCode = `<script>\nexport default {\n  data() {\n    return {\n      formData: {\n`
      
      // 添加表单数据
      this.formConfig.formItems.forEach(item => {
        scriptCode += `        ${item.prop}: ${this.getDefaultValue(item)},\n`
      })
      
      scriptCode += `      },\n      formRules: {\n`
      
      // 添加验证规则
      this.formConfig.formItems.forEach(item => {
        if (item.rules && item.rules.length > 0) {
          scriptCode += `        ${item.prop}: [\n`
          item.rules.forEach(rule => {
            scriptCode += `          { ${Object.entries(rule).map(([key, val]) => 
              `${key}: ${typeof val === 'string' ? `'${val}'` : val}`
            ).join(', ')} },\n`
          })
          scriptCode += `        ],\n`
        }
      })
      
      scriptCode += `      }\n    }\n  },\n  methods: {\n`
      
      // 添加方法
      this.formConfig.formButtons.forEach(btn => {
        scriptCode += `    handle${btn.event.charAt(0).toUpperCase() + btn.event.slice(1)}() {\n`
        scriptCode += `      // ${btn.text}逻辑\n`
        scriptCode += `    },\n`
      })
      
      scriptCode += `    submitForm() {\n`
      scriptCode += `      this.$refs.form.validate(valid => {\n`
      scriptCode += `        if (valid) {\n`
      scriptCode += `          // 表单验证通过\n`
      scriptCode += `        }\n`
      scriptCode += `      })\n`
      scriptCode += `    }\n`
      
      scriptCode += `  }\n}\n<${'/'}script>`
      
      return scriptCode
    },
    
    // 生成样式代码
    generatedStyleCode() {
      return `<style lang="less" scoped>\n.el-form {\n  padding: 20px;\n}\n</style>`
    }
  },
  methods: {
    // 获取字段默认值
    getDefaultValue(item) {
      if (this.initialData[item.prop] !== undefined) {
        return typeof this.initialData[item.prop] === 'string' 
          ? `'${this.initialData[item.prop]}'` 
          : this.initialData[item.prop]
      }
      
      switch (item.type) {
        case 'input':
        case 'textarea':
          return "''"
        case 'select':
        case 'radio':
          return item.options && item.options.length > 0 
            ? `'${item.options[0].value}'` 
            : "''"
        case 'checkbox':
          return '[]'
        case 'switch':
          return 'false'
        case 'number':
          return '0'
        default:
          return 'null'
      }
    },
    
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
    }
  }
}
</script>

<style lang="less" scoped>
.form-generator-container {
  display: flex;
  height: 100%;
  
  .form-preview {
    flex: 1;
    padding: 20px;
    overflow-y: auto;
    
    h2 {
      margin-bottom: 20px;
      color: #333;
    }
  }
  
  .source-code {
    flex: 1;
    padding: 20px;
    border-left: 1px solid #ebeef5;
    overflow-y: auto;
    
    h3 {
      margin-bottom: 15px;
      color: #333;
    }
    
    pre {
      background: #f5f7fa;
      padding: 12px;
      border-radius: 4px;
      overflow-x: auto;
      
      code {
        color: #333;
        font-family: 'Courier New', Courier, monospace;
      }
    }
  }
}
</style>