<template>
  <div>
    <div class="custom-header">
      <el-button type="primary">导出意见汇总表</el-button>
      <el-button>返回</el-button>
    </div>
    <div class="part">
      <div class="custom-title">任务基本信息</div>
      <div>
        内容
      </div>
    </div>
    <div class="part">
      <div class="custom-title">意见汇总表</div>
      <div class="all-info">
        <template v-for="(i, index) in infos">
          <div class="info" :style="`background-color: ${i.color};`" :key="index">
            <div class="logo">
              <i :class="i.icon"></i>
            </div>
            <div class="total">{{ i.total }} {{ i.unit }}</div>
            <div class="title">{{ i.title }}</div>
          </div>
        </template>
      </div>
      <div class="list">
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column prop="date" label="序号" width="180" align="center">
          </el-table-column>
          <el-table-column prop="date" label="组织机构" width="180" align="center">
          </el-table-column>
          <el-table-column prop="date" label="意见提交时间" width="180" align="center">
          </el-table-column>
          <el-table-column prop="date" label="原权责事项" width="180" align="center">
          </el-table-column>
          <el-table-column prop="date" label="修订意见" width="180" align="center">
          </el-table-column>
          <el-table-column prop="date" label="原内容" width="180" align="center">
          </el-table-column>
          <el-table-column prop="date" label="修订依据及理由" width="180" align="center">
          </el-table-column>
          <el-table-column prop="date" label="意见提出部门" width="180" align="center">
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'commentDetails',
  data() {
    return {
      infos: [
        {
          icon: 'el-icon-chat-dot-round',
          total: 12,
          unit: '条',
          title: '意见总数',
          color: '#3899ff',
        },
        {
          icon: 'el-icon-chat-dot-round',
          total: 22,
          unit: '条',
          title: '修订部门',
          color: '#50bc72',
        },
        {
          icon: 'el-icon-chat-round',
          total: 23,
          unit: '个',
          title: '未修订部门',
          color: '#f8ac2e',
        },
      ],
      tableData: [],
    }
  },
  methods: {

  },
}
</script>

<style lang="less" scoped>
.all-info {
  display: flex;
  margin-bottom: 20px;

  .info {
    width: 250px;
    padding: 10px;
    box-sizing: border-box;
    border-radius: 6px;
    margin-right: 14px;
    color: white;
    display: flex;
    place-items: center;

    .logo {
      width: 30px;
      height: 30px;
      font-size: 26px;
      overflow: hidden;
      margin-right: 10px;
    }

    .total {
      font-size: 20px;
    }

    .title {
      font-size: 14px;
      flex: 1;
      text-align: right;
    }
  }
}</style>