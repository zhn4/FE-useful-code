<template>
  <div class="ele-com-gen-page">
    <!-- 左侧：组件选择 -->
    <div class="left-panel">
      <el-menu :default-active="selectedComponent" @select="handleSelect" class="component-menu">
        <el-menu-item v-for="item in componentList" :key="item.name" :index="item.name">
          {{ item.label }}
        </el-menu-item>
      </el-menu>
    </div>
    <!-- 右侧：属性与代码 -->
    <div class="right-panel">
      <!-- 组件预览区域 -->
      <div class="preview-panel">
        <h3>组件预览</h3>
        <component :is="currentConfig.name" v-bind="previewProps">
          <template v-if="currentConfig.name === 'el-button'">
            {{ currentConfig.attrs.find(a => a.prop === 'label')?.value }}
          </template>
        </component>
      </div>
      <div class="attr-panel">
        <h3>属性设置</h3>
        <el-form v-if="currentConfig" label-width="90px">
          <el-form-item v-for="attr in currentConfig.attrs" :key="attr.prop" :label="attr.label">
            <el-input v-if="attr.type === 'input'" v-model="attr.value" />
            <el-switch v-else-if="attr.type === 'switch'" v-model="attr.value" />
            <el-select v-else-if="attr.type === 'select'" v-model="attr.value">
              <el-option v-for="opt in attr.options" :key="opt" :label="opt" :value="opt" />
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <div class="code-panel">
        <h3>生成代码</h3>
        <pre>{{ generatedCode }}</pre>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EleComGen',
  data() {
    return {
      componentList: [
        {
          name: 'el-input',
          label: '输入框',
          attrs: [
            { prop: 'placeholder', label: '占位符', type: 'input', value: '请输入内容' },
            { prop: 'disabled', label: '禁用', type: 'switch', value: false },
          ],
        },
        {
          name: 'el-button',
          label: '按钮',
          attrs: [
            {
              prop: 'type',
              label: '类型',
              type: 'select',
              value: 'primary',
              options: ['primary', 'success', 'warning', 'danger', 'info'],
            },
            { prop: 'disabled', label: '禁用', type: 'switch', value: false },
            { prop: 'label', label: '按钮文本', type: 'input', value: '按钮' },
          ],
        },
      ],
      selectedComponent: 'el-input',
    }
  },
  computed: {
    currentConfig() {
      return this.componentList.find(item => item.name === this.selectedComponent)
    },
    previewProps() {
      if (!this.currentConfig) return {}
      const props = {}
      this.currentConfig.attrs.forEach(attr => {
        if (attr.prop !== 'label') props[attr.prop] = attr.value
      })
      return props
    },
    generatedCode() {
      if (!this.currentConfig) return ''
      const tag = this.currentConfig.name
      const attrs = this.currentConfig.attrs
        .filter(attr => attr.prop !== 'label')
        .map(attr => {
          if (attr.type === 'switch') {
            return attr.value ? `${attr.prop}` : ''
          }
          if (attr.type === 'select' || attr.type === 'input') {
            return attr.value ? `${attr.prop}="${attr.value}"` : ''
          }
          return ''
        })
        .filter(Boolean)
        .join(' ')
      const labelAttr = this.currentConfig.attrs.find(a => a.prop === 'label')
      const inner = labelAttr ? labelAttr.value : ''
      return `<${tag} ${attrs}>${inner}</${tag}>`
    },
  },
  methods: {
    handleSelect(name) {
      this.selectedComponent = name
    },
  },
}
</script>

<style scoped>
.ele-com-gen-page {
  display: flex;
  height: 100%;
  background: #f8faff;
}
.left-panel {
  width: 200px;
  background: #fff;
  border-right: 1px solid #e3e8ee;
  padding: 16px 0;
}
.right-panel {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 24px;
}
.preview-panel {
  background: #fff;
  border-radius: 6px;
  padding: 16px;
  margin-bottom: 24px;
  min-height: 80px;
}
.attr-panel {
  background: #fff;
  border-radius: 6px;
  padding: 16px;
  margin-bottom: 24px;
}
.code-panel {
  background: #222;
  color: #fff;
  border-radius: 6px;
  padding: 16px;
  font-size: 14px;
  min-height: 120px;
}
</style>
