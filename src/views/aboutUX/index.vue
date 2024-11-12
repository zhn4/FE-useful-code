<template>
  <div class="custom-page">
    <div class="custom-search-bar">
      <el-form :model="searchForm" ref="formRef" inline>
        <el-form-item prop="prop1">
          <el-input v-model="searchForm.prop1" placeholder="字段1" clearable></el-input>
        </el-form-item>
        <el-form-item prop="prop2">
          <el-input
            v-model="searchForm.prop2"
            placeholder="假如字段2的label很长"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item prop="prop3">
          <el-input
            v-model="searchForm.prop3"
            placeholder="假如字段3的label很长很长很长很长"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">搜索</el-button>
          <el-button @click="onReset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="custom-content">
      <div class="custom-btns">
        <el-button type="primary" @click="onOpenDialog">弹窗</el-button>
        <el-button type="primary" @click="onOpenDrawer">抽屉</el-button>
      </div>
      <div>
        <h2>搜索栏相关</h2>
        <ul>
          <li>建议不要启用 el-form-item 的 label 属性，使用 placeholder 代替，节省更多空间</li>
          <li>考虑到不同设备尺寸，且每个搜索字段的长度不一问题</li>
          <li>
            统一使用【搜索按钮】触发数据请求，如果涉及多个搜索字段且每个字段改变都绑定触发数据请求，徒增服务器压力，减少服务器压力
          </li>
          <li>每个字段可清空</li>
        </ul>
        <h2>弹窗</h2>
        <ul>
          <li>表单填写字段保持在5个及以内</li>
          <li>考虑到不同设备的尺寸，且这个弹窗组件的四周有极大旷量</li>
          <li>应该是轻便、清爽的感觉</li>
          <li>点击遮罩层可关闭</li>
        </ul>
        <h2>抽屉</h2>
        <ul>
          <li>表单填写字段大于5个及更多复杂填写内容</li>
          <li>可以用尽页面高度，不要担心设备尺寸</li>
          <li>点击遮罩层可关闭</li>
        </ul>
      </div>
    </div>
    <dialogByUX :visible.sync="visibleByDialog" />
    <drawerByUX :visible.sync="visibleByDrawer" />
  </div>
</template>

<script>
import dialogByUX from './components/dialogByUX.vue'
import drawerByUX from './components/drawerByUX.vue'

export default {
  name: 'aboutUX',
  components: {
    dialogByUX,
    drawerByUX,
  },
  data() {
    return {
      searchForm: {
        prop1: '',
        prop2: '',
        prop3: '',
      },
      visibleByDialog: false,
      visibleByDrawer: false,
    }
  },
  methods: {
    onReset() {
      this.$refs['formRef'].resetFields()
    },
    onOpenDialog() {
      this.visibleByDialog = true
    },
    onOpenDrawer() {
      this.visibleByDrawer = true
    },
  },
}
</script>
