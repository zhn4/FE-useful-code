<template>
  <div style="width: 100%; height: 100%">
    <div id="mindMapContainer" style="width: 100%; height: 100%"></div>
  </div>
</template>

<script>
import MindMap from 'simple-mind-map'

let DATA = require('./mind-map-demo.json')

export default {
  name: 'mindMap',
  data() {
    return {
      dialogVisible: false,
      currentStep: null,
      chart: null,
      selectedNodeId: null,
    }
  },
  mounted() {
    setTimeout(() => {
      this.initMindMap()
    }, 300)
  },
  methods: {
    initMindMap() {
      const mindMap = new MindMap({
        el: document.getElementById('mindMapContainer'),
        data: {
          data: {
            text: '根节点',
          },
          children: [],
        },
        editable: false, // 禁止编辑
      })

      setTimeout(() => {
        let data = DATA
        // 如果数据中存在root属性，那么代表是包含配置的完整数据，则使用setFullData方法导入数据
        if (data.root) {
          mindMap.setFullData(data)
        } else {
          // 否则使用setData方法导入
          mindMap.setData(data)
        }
        // 导入数据后有可能新数据渲染在可视区域外了，所以为了更好的体验，可以复位一下视图的变换
        mindMap.view.reset()

        // 动态开启富文本编辑
        // mindMap.removePlugin(RichText)
      }, 300)

      mindMap.on('node_img_dblclick', node => {
        console.log('点击图片')
        console.log(node)
      })
    },
  },
}
</script>

<style>
#mindMapContainer * {
  margin: 0;
  padding: 0;
}
</style>
