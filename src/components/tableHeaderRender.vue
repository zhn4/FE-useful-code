<template>
  <el-table-column v-if="item.children" :label="item.label" align="center" :key="`${item.prop}-${new Date().getTime()}`">
    <template v-for="child in item.children">
      <tableHeaderRender :item="child" :key="`${child.prop}-${new Date().getTime()}`" />
    </template>
  </el-table-column>
  <el-table-column v-else :label="item.label" :prop="item.prop" :key="`${item.prop}-${new Date().getTime()}`" />
</template>

<script>
export default {
  name: 'tableHeaderRender',
  props: {
    item: {
      type: Object,
      default: {},
    }
  },
  data() {
    return {
      test: { name: '123', code: '111' }
    }
  },
  methods: {

  }
}
</script>