<template>
  <div class="custom-page">
    <div class="index">
      <div>
        <h2>表单相关</h2>
        <aboutForm />
      </div>
      <div class="other">
        <h2>非表单相关</h2>
        <aboutOther />
      </div>
    </div>
  </div>
</template>

<script>
import aboutForm from './aboutForm.vue'
import aboutOther from './aboutOther.vue'

export default {
  name: 'RegList',
  components: {
    aboutForm,
    aboutOther,
  },
}
</script>

<style lang="less" scoped>
.index {
  display: flex;
  width: 100%;
  height: 100%;
  .other {
    flex: 1;
    margin-left: 20px;
  }
}
</style>
