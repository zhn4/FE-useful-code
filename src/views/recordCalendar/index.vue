<template>
  <div class="record-calendar">
    <h1>内容记录日历</h1>
    <el-row :gutter="20">
      <el-col :span="16">
        <div class="calendar-container">
          <el-calendar v-model="currentDate" @panel-change="handlePanelChange">
            <template #dateCell="{ data }">
              <div class="calendar-day" @click="selectDate(data.day)">
                <div class="day-number">{{ data.day.split('-')[2] }}</div>
                <div class="day-content">
                  <span v-if="records[data.day]" class="record-indicator">●</span>
                </div>
              </div>
            </template>
          </el-calendar>
        </div>
        <div class="grid-content bg-purple"></div>
      </el-col>
      <el-col :span="8">
        <div class="record-panel" v-if="selectedDate">
          <h2>记录详情 - {{ selectedDate }}</h2>
          <el-input type="textarea" v-model="currentRecord" placeholder="在此输入您的记录内容..." :rows="6"></el-input>
          <div class="record-actions">
            <el-button type="primary" @click="saveRecord">保存记录</el-button>
            <el-button @click="clearRecord">清空记录</el-button>
          </div>
          <div class="record-history" v-if="records[selectedDate]">
            <h3>历史记录</h3>
            <div class="record-item">
              <p>{{ records[selectedDate] }}</p>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'recordCalendar',
  data() {
    return {
      currentDate: new Date(),
      selectedDate: '',
      currentRecord: '',
      records: {},
    }
  },
  methods: {
    handlePanelChange(date) {
      this.currentDate = date
    },

    selectDate(date) {
      this.selectedDate = date
      this.currentRecord = this.records[date] || ''
    },

    saveRecord() {
      if (this.selectedDate && this.currentRecord.trim()) {
        this.$set(this.records, this.selectedDate, this.currentRecord)
        this.$message.success('记录保存成功')
      } else {
        this.$message.warning('请输入记录内容')
      }
    },

    clearRecord() {
      if (this.selectedDate && this.records[this.selectedDate]) {
        this.$delete(this.records, this.selectedDate)
        this.currentRecord = ''
        this.$message.success('记录已清空')
      }
    },
  },
  mounted() {
    // 模拟从本地存储加载记录
    const savedRecords = localStorage.getItem('calendarRecords')
    if (savedRecords) {
      this.records = JSON.parse(savedRecords)
    }
    this.selectedDate = this.currentDate.toISOString().split('T')[0]
  },
  watch: {
    records: {
      handler(newRecords) {
        localStorage.setItem('calendarRecords', JSON.stringify(newRecords))
      },
      deep: true,
    },
  },
}
</script>

<style scoped>
.record-calendar {
  /* max-width: 1200px; */
  /* margin: 0 auto; */

  padding: 20px;
}

.calendar-container {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-bottom: 20px;
}

.calendar-day {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;
}

.day-number {
  font-size: 16px;
  font-weight: normal;
}

.day-content {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.record-indicator {
  color: #409eff;
  font-size: 18px;
}

.record-panel {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  padding: 20px;
}

.record-actions {
  margin: 15px 0;
  display: flex;
  gap: 10px;
}

.record-history {
  margin-top: 20px;
  padding-top: 15px;
  border-top: 1px solid #eee;
}

.record-item {
  background: #f5f7fa;
  padding: 15px;
  border-radius: 4px;
  margin-top: 10px;
}
</style>
