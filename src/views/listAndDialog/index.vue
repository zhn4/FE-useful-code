<template>
  <div>
    <el-button type="primary" @click="onOpen">打开 Dialog</el-button>
    <DialogByCustom :visible.sync="dialogVisible" />
  </div>
</template>

<script>
import DialogByCustom from './components/DialogByCustom'

export default {
  name: 'ListAndDialog',
  components: {
    DialogByCustom,
  },
  data() {
    return {
      dialogVisible: false,
    }
  },
  methods: {
    onOpen() {
      this.dialogVisible = true
    },
  },
}
</script>
