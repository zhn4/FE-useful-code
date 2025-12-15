<template>
  <div class="layout">
    <div class="top">top</div>
    <div class="bottom">
      <div class="left">left</div>
      <div class="right">
        <div class="content">
          <div class="cards">
            <template v-for="i in list">
              <div class="card" :key="i.id">
                <div class="cover">封面</div>
                <div class="title">title</div>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'classicLayout',
  data() {
    return {
      list: [],
    }
  },
  created() {
    for (let i = 0; i < 40; i++) {
      this.list.push({
        id: i,
        title: `title ${i}`,
      })
    }
  },
}
</script>

<style lang="less" scoped>
.layout {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  height: 100%;
  // gap: 10px;
  text-align: center;
  .top {
    // flex: 1;
    width: 100%;
    height: 60px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    // background-color: red;
    overflow: hidden;
    flex-shrink: 0;
  }
  .bottom {
    flex: 1;
    width: 100%;
    height: calc(100% - 60px);
    // background-color: blue;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
    .left {
      width: 250px;
      height: 100%;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
      overflow: hidden;
      flex-shrink: 0;
    }
    .right {
      flex: 1;
      height: 100%;
      overflow: hidden;
    }
    .content {
      width: 100%;
      height: 100%;
      overflow: auto;
      padding: 20px;
      box-sizing: border-box;
    }
  }
}

.cards {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 20px;
  .card {
    width: 250px;
    border: 1px solid #eee;
    padding: 10px;
    border-radius: 4px;
    box-sizing: border-box;
  }
  .cover {
    width: 100%;
    height: 150px;
    background-color: #ddd;
    border-radius: 4px;
    overflow: hidden;
  }
}
</style>
