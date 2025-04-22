<template>
  <div class="main">
    <div class="left">
      <el-menu
        class="el-menu-vertical-demo"
        :class="{ 'not-actived': loading }"
        @select="handleSelect"
        :default-active="activeItem"
      >
        <el-menu-item v-for="item in items" :key="item.id" :index="item.id.toString()">
          {{ item.name }}
        </el-menu-item>
      </el-menu>
    </div>
    <div class="right" v-loading="loading">
      <div v-if="selectedItem">
        <h3>详情</h3>
        <p>名称: {{ selectedItem.name }}</p>
        <p>描述: {{ selectedItem.description }}</p>
      </div>
      <div v-else>
        <p>请选择左侧列表中的一项查看详情。</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LeftRight',
  components: {},
  data() {
    return {
      items: [],
      activeItem: '1',
      selectedItem: null,
      loading: false,
    }
  },
  created() {
    this.selectedItem = this.items[0]
  },
  mounted() {
    let i = 0
    while (i < 20) {
      this.items.push({ id: i, name: `项目${i + 1}`, description: `这是项目${i + 1}的描述` })
      i++
    }
    this.$nextTick(() => {
      this.activeItem = this.items[0].id.toString()
      this.selectedItem = this.items[0]
    })
    document.querySelector('.image-loader').classList.add('loading')
  },
  methods: {
    handleSelect(index) {
      if (this.loading) {
        return this.$message.error('正在加载中，请稍后再试')
      }
      this.loading = true
      this.selectedItem = this.items.find((item) => item.id.toString() === index) || null
      setTimeout(() => {
        this.loading = false
      }, 400)
    },
  },
}
</script>

<style scoped>
.main {
  display: flex;
  height: 100%;
}

.left {
  width: 200px;
  border-right: 1px solid #dcdfe6;
  padding: 10px 0;
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 1px;
  }
  &::-webkit-scrollbar-thumb {
    /* background-color: #dcdfe6; */
    background-color: transparent;
    border-radius: 4px;
  }
}

.right {
  flex: 1;
  padding: 10px;
}

.not-actived {
  pointer-events: none;
  opacity: 0.5;
}
</style>
