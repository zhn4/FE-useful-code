<template>
  <el-card class="card" :class="calcTimeUp(item.deadline) ? 'time-up' : 'not-yet'">
    <div class="title">
      {{ item.title }}
    </div>
    <div class="deadline">
      <div>{{ ' 截止日期: ' + formatTimestamp(item.deadline) }}</div>
      <div class="del-btn">删除</div>
    </div>
  </el-card>
</template>

<script>
export default {
  name: 'CardItem',
  props: {
    item: {
      type: Object,
      required: true,
      default: () => ({
        id: '',
        title: '',
        deadline: null,
      }),
    },
  },
  methods: {
    // formatTimestamp(timestamp) {
    //   const date = new Date(timestamp)
    //   return date.toLocaleDateString() + ' ' + date.toLocaleTimeString()
    // },
    formatTimestamp(ts) {
      if (!ts) return ''
      const date = new Date(ts)
      const y = date.getFullYear()
      const m = String(date.getMonth() + 1).padStart(2, '0')
      const d = String(date.getDate()).padStart(2, '0')
      const h = String(date.getHours()).padStart(2, '0')
      const min = String(date.getMinutes()).padStart(2, '0')
      const s = String(date.getSeconds()).padStart(2, '0')
      return `${y}-${m}-${d} ${h}:${min}:${s}`
    },
    calcTimeUp(deadline) {
      if (!deadline) return false
      const now = Date.now()
      return now >= deadline
    },
  },
}
</script>

<style lang="less" scoped>
.card {
  font-size: 14px;
  margin-bottom: 10px;

  .title {
    font-weight: bold;
    margin-bottom: 5px;
  }

  .deadline {
    color: #999;
    font-size: 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .del-btn {
      color: red;
      text-decoration: none !important;
    }
  }
}
// .not-yet {
//   background-color: #f0f8ff; /* Light blue for not yet */
// }

.time-up {
  text-decoration: line-through;

  .title {
    color: #999;
  }
}
</style>
