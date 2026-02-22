<template>
  <div class="parent">
    <h1>parent 父级组件</h1>
    <div style="margin-bottom: 20px">
      父级组件，获取插槽内数据的方法：
      <el-button type="danger" @click="useParentObject">$parent</el-button>
      <el-button type="success" @click="useEmitMethod">$emit</el-button>
    </div>
    <h2 style="color: blue">蓝色框内是插槽内容</h2>
    <div class="slot-part">
      <slot name="customSlot" ref="parentSlotRef"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ParentComponent',
  methods: {
    useParentObject() {
      console.log('%c $parent 调用', 'color: white; background-color: red; font-size: 16px;')
      this.$parent.onSubmit() // 获取父级实例，可以看到slot里的组件实例方法
    },
    useEmitMethod() {
      console.log('%c $emt 调用', 'color: white; background-color: green;  font-size: 16px;')
      this.$emit('emitTrigger', {
        msg: '父级组件，使用 $emit 调用插槽内容方法',
      })
    },
    handleGetSlotData(data) {
      console.log('%c step2 父组件接收插槽内容的数据', 'color: gold; background-color: #333; font-size: 16px;')
      console.log(data)
    },
  },
}
</script>

<style lang="css" scoped>
.parent {
  padding: 20px;
  height: 100%;
  background-color: rgb(255, 235, 180);
}

.slot-part {
  border: 4px solid blue;
  padding: 10px;
}
</style>
