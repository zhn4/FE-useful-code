<template>
  <div class="map-container">
    <div ref="chinaMap" class="map"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts'
import '@/assets/map/china' // 引入中国地图数据

export default {
  name: 'ChinaMap',
  mounted() {
    this.initChinaMap()
    window.addEventListener('resize', this.handleResize) // 监听窗口尺寸变化
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize) // 移除监听
    if (this.chart) {
      this.chart.dispose() // 销毁图表实例
    }
  },
  methods: {
    initChinaMap() {
      this.chart = echarts.init(this.$refs.chinaMap)
      const option = {
        title: {
          text: '中国地图示例',
          left: 'center',
        },
        tooltip: {
          trigger: 'item',
          formatter: '{b}: {c}', // 显示省份名称和数据
        },
        visualMap: {
          min: 0,
          max: 1000,
          left: 'left',
          top: 'bottom',
          text: ['高', '低'], // 文本，默认为数值范围
          // inRange: {
          //   color: ['#e0ffff', '#006edd'], // 颜色范围
          // },
          show: true,
        },
        series: [
          {
            name: '数据',
            type: 'map',
            map: 'china', // 地图类型
            roam: true, // 是否允许缩放和平移
            label: {
              show: true, // 显示省份名称
            },
            data: [
              // { name: '北京', value: 500 },
              // { name: '上海', value: 300 },
              // { name: '广东', value: 800 },
              // { name: '浙江', value: 600 },
              // { name: '四川', value: 400 },
              { name: '北京', value: Math.round(Math.random() * 1000) },
              { name: '天津', value: Math.round(Math.random() * 1000) },
              { name: '上海', value: Math.round(Math.random() * 1000) },
              { name: '重庆', value: Math.round(Math.random() * 1000) },
              { name: '河北', value: Math.round(Math.random() * 1000) },
              { name: '河南', value: Math.round(Math.random() * 1000) },
              { name: '云南', value: Math.round(Math.random() * 1000) },
              { name: '辽宁', value: Math.round(Math.random() * 1000) },
              { name: '黑龙江', value: Math.round(Math.random() * 1000) },
              { name: '湖南', value: Math.round(Math.random() * 1000) },
              { name: '安徽', value: Math.round(Math.random() * 1000) },
              { name: '山东', value: Math.round(Math.random() * 1000) },
              { name: '新疆', value: Math.round(Math.random() * 1000) },
              { name: '江苏', value: Math.round(Math.random() * 1000) },
              { name: '浙江', value: Math.round(Math.random() * 1000) },
              { name: '江西', value: Math.round(Math.random() * 1000) },
              { name: '湖北', value: Math.round(Math.random() * 1000) },
              { name: '广西', value: Math.round(Math.random() * 1000) },
              { name: '甘肃', value: Math.round(Math.random() * 1000) },
              { name: '山西', value: Math.round(Math.random() * 1000) },
              { name: '内蒙古', value: Math.round(Math.random() * 1000) },
              { name: '陕西', value: Math.round(Math.random() * 1000) },
              { name: '吉林', value: Math.round(Math.random() * 1000) },
              { name: '福建', value: Math.round(Math.random() * 1000) },
              { name: '贵州', value: Math.round(Math.random() * 1000) },
              { name: '广东', value: Math.round(Math.random() * 1000) },
              { name: '青海', value: Math.round(Math.random() * 1000) },
              { name: '西藏', value: Math.round(Math.random() * 1000) },
              { name: '四川', value: Math.round(Math.random() * 1000) },
              { name: '宁夏', value: Math.round(Math.random() * 1000) },
              { name: '海南', value: Math.round(Math.random() * 1000) },
              { name: '台湾', value: Math.round(Math.random() * 1000) },
              { name: '香港', value: Math.round(Math.random() * 1000) },
              { name: '澳门', value: Math.round(Math.random() * 1000) },
            ],
          },
        ],
      }
      this.chart.setOption(option)
    },
    handleResize() {
      if (this.chart) {
        this.chart.resize() // 调整图表大小
      }
    },
  },
}
</script>

<style scoped>
.map-container {
  width: 100%;
  height: 100%;
}

.map {
  width: 100%;
  /* 设置地图高度 */
  /* height: 600px; */
  height: 100%;
}
</style>
