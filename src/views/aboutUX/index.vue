<template>
  <div class="custom-page">
    <div class="custom-content">
      <div class="custom-btns">
        <el-button type="primary" @click="onOpenDialog">弹窗</el-button>
        <el-button type="primary" @click="onOpenDrawer">抽屉</el-button>
      </div>
      <div>
        <h2>弹窗</h2>
        <ul>
          <li>表单填写字段保持在5个及以内</li>
          <li>考虑到不同设备的尺寸，且这个弹窗组件的四周有极大旷量</li>
          <li>应该是轻便、清爽的感觉</li>
        </ul>
        <h2>抽屉</h2>
        <ul>
          <li>表单填写字段大于5个及更多复杂填写内容</li>
          <li>可以用尽页面高度，不要担心设备尺寸</li>
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
      visibleByDialog: false,
      visibleByDrawer: false,
    }
  },
  methods: {
    onOpenDialog() {
      this.visibleByDialog = true
    },
    onOpenDrawer() {
      this.visibleByDrawer = true
    },
  },
}
</script>
