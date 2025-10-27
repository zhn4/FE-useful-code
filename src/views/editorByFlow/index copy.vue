<template>
  <div class="page">
    <div class="type-badges">
      <span
        v-for="opt in options"
        :key="opt.value"
        :style="{
          background: opt.bg,
          color: opt.color,
          padding: '6px 10px',
          borderRadius: '12px',
          marginRight: '8px',
          display: 'inline-block',
        }"
      >
        {{ opt.label }}
      </span>
    </div>
    <div class="list">
      <div
        v-for="(item, index) in list"
        :key="index"
        class="card"
        :style="{
          background: typeColor[item.type].bg,
          color: typeColor[item.type].color,
          padding: '6px 10px',
          borderRadius: '12px',
          marginRight: '8px',
          display: 'inline-block',
        }"
      >
        <div>{{ payType[item.payType] }} {{ formatMoney(item.amount) }} {{ typeColor[item.type].label }}</div>
        <div class="remark">{{ item.remark }}</div>
      </div>
    </div>
  </div>
</template>

<script>
const PAY_TYPE = {
  1: '支出',
  2: '收入',
}

// const TYPE_LIST = [
//   { label: '饮食', value: 'food' },
//   { label: '住宿', value: 'accommodation' },
//   { label: '交通', value: 'traffic' },
//   { label: '购物', value: 'shopping' },
//   { label: '医疗', value: 'medical' },
//   { label: '教育', value: 'education' },
//   { label: '娱乐', value: 'entertainment' },
//   { label: '其他', value: 'other' },
// ]

// 颜色映射：主色（color）与浅背景色（bg）
const TYPE_COLOR = {
  food: { color: '#FF7043', bg: '#FFF3E9', label: '饮食' }, // 橙红 - 饮食
  accommodation: { color: '#26A69A', bg: '#E8F6F3', label: '住宿' }, // 青绿色 - 住宿
  traffic: { color: '#42A5F5', bg: '#EAF6FF', label: '交通' }, // 天蓝 - 交通
  shopping: { color: '#AB47BC', bg: '#F5EAF9', label: '购物' }, // 紫色 - 购物
  medical: { color: '#EC407A', bg: '#FFF0F6', label: '医疗' }, // 粉红 - 医疗
  education: { color: '#5C6BC0', bg: '#EEF0FA', label: '教育' }, // 靛蓝 - 教育
  entertainment: { color: '#FFCA28', bg: '#FFF9E6', label: '娱乐' }, // 琥珀 - 娱乐
  other: { color: '#90A4AE', bg: '#F3F6F8', label: '其他' }, // 灰色 - 其他
}

export default {
  name: 'testPage',
  data() {
    return {
      list: [
        {
          payType: 1,
          type: 'food',
          amount: 50,
          remark: '聚餐AA',
        },
        {
          payType: 1,
          type: 'traffic',
          amount: 5,
          remark: '地铁',
        },
        {
          payType: 2,
          type: 'other',
          amount: 100,
          remark: '朋友转账',
        },
      ],
      payType: PAY_TYPE,
      // options: TYPE_LIST.map(t => ({
      //   ...t,
      //   color: TYPE_COLOR[t.value]?.color || '#999',
      //   bg: TYPE_COLOR[t.value]?.bg || '#fff',
      // })),
      typeColor: TYPE_COLOR,
      options: Object.entries(TYPE_COLOR).map(([value, { color, bg, label }]) => ({
        value,
        label,
        color,
        bg,
      })),
    }
  },
  mounted() {},
  methods: {
    // 将价格格式化为保留两位小数的字符串
    formatMoney(value) {
      const num = Number(value)
      if (!isFinite(num)) return '0.00'
      return num.toFixed(2)
    },
  },
}
</script>

<style lang="less" scoped>
.page {
  width: 100%;
  height: 100%;
  padding: 20px;
  box-sizing: border-box;
}

.list {
  display: flex;
  flex-direction: column;
}

.card {
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  padding: 10px 20px;
  margin-bottom: 20px;
  line-height: 1;
}

.remark {
  color: #999;
}
</style>
