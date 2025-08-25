<template>
  <div id="app">
    <!-- <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </nav> -->
    <div v-if="$route.path !== '/'" class="back-btn">
      <el-button type="primary" @click="onCode">查看源码</el-button>
      <el-button type="primary" @click="onBack">返回</el-button>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  methods: {
    onBack() {
      this.$router.push({
        path: '/',
      })
    },
    onCode() {
      const path = `https://github.com/zhn4/FE-useful-code/tree/master/src/views`
      window.open(`${path}/${this.$route.name}`, '_blank')
    },
  },
}
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.back-btn {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 101;
}
</style>
