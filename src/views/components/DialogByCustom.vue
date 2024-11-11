<template>
  <el-dialog title="提示" :visible.sync="isShow" width="30%">
    <span>这是一段信息</span>
    <span slot="footer" class="dialog-footer">
      <el-button @click="onClose">取 消</el-button>
      <el-button type="primary" @click="onConfirm">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: 'DialogByCustom',
  props: {
    visible: {
      require: true,
      type: Boolean,
      default: false,
    },
  },
  computed: {
    isShow: {
      get() {
        return this.visible
      },
      set(val) {
        this.$emit('update:visible', val)
      },
    },
  },
  methods: {
    onClose() {
      this.isShow = false
    },
    onConfirm() {
      // TODO: 自己处理
    },
  },
}
</script>
