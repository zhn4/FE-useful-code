<template>
  <div class="menu-router-page">
    <!-- 顶部导航栏 -->
    <div class="header-bar">
      <div class="logo-area">
        <img class="logo" src="https://www.chinasouthernpowergrid.com/logo.png" alt="logo" />
        <div class="title">
          <div class="main-title">中国南方电网</div>
          <div class="sub-title">数字纪检监察一体化应用</div>
        </div>
      </div>
      <div class="nav-icons">
        <div class="nav-item" v-for="item in navList" :key="item.label" @click="onClickTopNav(item)">
          <!-- <img :src="item.icon" class="nav-icon" /> -->
          <img v-if="item.customIcon" :src="item.customIcon" style="width: 16px; height: 16px" />
          <i v-else :class="item.icon"></i>
          <div class="nav-label">{{ item.label }}</div>
        </div>
        <el-button type="primary" size="small" class="big-data-btn">大员特</el-button>
      </div>
      <div class="header-right">
        <el-badge :value="5" class="search-badge">
          <el-input prefix-icon="el-icon-search" placeholder="搜索" size="small" class="search-input" />
        </el-badge>
        <span class="header-link">消息</span>
        <span class="header-link">管理</span>
        <el-avatar size="small" icon="el-icon-user-solid" />
        <span class="header-user">倪海管专</span>
      </div>
    </div>
    <div class="main-content">
      <!-- 左侧菜单 -->
      <div class="side-menu">
        <div v-for="item in menuList" :key="item.label" class="side-menu-item"
          :class="{ active: item.label === curSideItem }" @click="onClickSideNav(item)">
          {{ item.label }}
        </div>
      </div>
      <!-- 中间多级菜单 -->
      <div class="category-panel">
        <div v-for="(cat, idx) in categoryList" :key="idx" class="category-group">
          <div class="category-title">{{ cat.label }}</div>
          <div class="category-list">
            <div v-for="(sub, subIndex) in cat.children" :key="subIndex" class="category-item">
              {{ sub.label }}
            </div>
          </div>
        </div>
      </div>
      <!-- 右侧内容区域（留白） -->
      <div class="content-area"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MenuAndRouter',
  data() {
    return {
      navList: [],
      menuList: [],
      curSideItem: '',
      categoryList: [],
    }
  },
  mounted() {
    this.navList = JSON.parse(localStorage.getItem('menuData'))
  },
  methods: {
    onClickTopNav(item) {
      console.log(item)
      // 处理顶部导航点击事件
      console.log('Clicked nav item:', item)
      // 可以在这里添加路由跳转或其他逻辑
      this.menuList = item.children
    },
    onClickSideNav(item) {
      console.log('Clicked side menu item:', item)
      // 处理侧边菜单点击事件
      // 可以在这里添加路由跳转或其他逻辑
      this.curSideItem = item.label
      this.categoryList = item.children
    },
  },
}
</script>

<style scoped>
.menu-router-page {
  height: 100vh;
  background: #f8faff;
  display: flex;
  flex-direction: column;
}

.header-bar {
  display: flex;
  align-items: center;
  height: 56px;
  background: #fff;
  border-bottom: 1px solid #e3e8ee;
  padding: 0 24px;
  justify-content: space-between;
}

.logo-area {
  display: flex;
  align-items: center;
}

.logo {
  width: 48px;
  height: 48px;
  margin-right: 12px;
}

.title {
  display: flex;
  flex-direction: column;
  white-space: nowrap;
}

.main-title {
  font-weight: bold;
  font-size: 18px;
  color: #2266c6;
}

.sub-title {
  font-size: 14px;
  color: #222;
}

.nav-icons {
  display: flex;
  align-items: center;
  gap: 32px;
  flex: 1;
  justify-content: center;
}

.nav-item {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 0 12px;
  cursor: pointer;
}

.nav-icon {
  width: 60px;
  height: 60px;
}

.nav-label {
  font-size: 14px;
  color: #222;
  margin-top: 4px;
  white-space: nowrap;
}

.big-data-btn {
  margin-left: 24px;
  font-weight: bold;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 16px;
}

.search-input {
  width: 120px;
}

.header-link {
  color: #888;
  margin: 0 8px;
  cursor: pointer;
}

.header-user {
  margin-left: 8px;
  color: #333;
}

.main-content {
  display: flex;
  flex: 1;
  min-height: 0;
}

.side-menu {
  width: 160px;
  background: #fff;
  border-right: 1px solid #e3e8ee;
  padding-top: 16px;
}

.side-menu-item {
  padding: 10px 24px;
  color: #666;
  cursor: pointer;
  font-size: 15px;
  border-left: 3px solid transparent;
  transition: background 0.2s, color 0.2s;
}

.side-menu-item.active {
  background: #eaf3ff;
  color: #2266c6;
  border-left: 3px solid #2266c6;
  font-weight: bold;
}

.category-panel {
  background: #f8fbff;
  padding: 32px 24px;
  min-width: 340px;
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.category-group {
  margin-bottom: 16px;
}

.category-title {
  font-size: 16px;
  color: #3388ff;
  font-weight: bold;
  margin-bottom: 8px;
  border-bottom: 2px solid #e3e8ee;
  padding-bottom: 4px;
  width: 120px;
}

.category-list {
  display: flex;
  gap: 32px;
  margin-top: 8px;
}

.category-item {
  font-size: 15px;
  color: #222;
  font-weight: bold;
  cursor: pointer;
  margin-right: 24px;
  transition: color 0.2s;
}

.category-item:hover {
  color: #3388ff;
}

.content-area {
  flex: 1;
  background: #fff;
}
</style>
