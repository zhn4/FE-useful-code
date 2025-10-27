// ...existing code...
<template>
  <div class="note-page">
    <el-card>
      <div class="row form-row">
        <el-select v-model="form.type" placeholder="类别" style="width: 120px">
          <el-option v-for="t in typeListWithColor" :key="t.value" :label="t.label" :value="t.value">
            <span :style="{ color: t.color }">●</span>
            <span style="margin-left: 6px">{{ t.label }}</span>
          </el-option>
        </el-select>

        <el-input v-model="form.amount" placeholder="金额" style="width: 140px" clearable>
          <template slot="append">¥</template>
        </el-input>

        <el-date-picker
          v-model="form.time"
          type="datetime"
          value-format="timestamp"
          placeholder="时间"
          style="width: 220px"
        ></el-date-picker>

        <el-input v-model="form.remark" placeholder="备注" style="width: 280px" clearable />
        <el-button type="primary" @click="addRecord">添加</el-button>
      </div>

      <div class="row filter-row" style="margin-top: 12px">
        <el-select v-model="filter.type" placeholder="全部类别" clearable style="width: 140px">
          <el-option label="全部" :value="null" />
          <el-option v-for="t in typeList" :key="t.value" :label="t.label" :value="t.value" />
        </el-select>

        <el-date-picker
          v-model="filter.range"
          type="daterange"
          value-format="timestamp"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          style="width: 320px"
        ></el-date-picker>

        <el-input v-model="filter.keyword" placeholder="关键字" clearable style="width: 220px" />

        <el-button @click="resetFilter">重置</el-button>
        <el-button type="primary" @click="exportCsv">导出 CSV</el-button>
        <el-button type="success" @click="saveToLocal">保存本地</el-button>
        <el-button @click="loadFromLocal">从本地载入</el-button>
      </div>

      <div class="summary" style="margin-top: 12px">
        <span>记录数：{{ filteredList.length }}</span>
        <span style="margin-left: 20px">总计：¥ {{ formatMoney(totalAmount) }}</span>
      </div>

      <el-table :data="pagedList" style="width: 100%; margin-top: 12px" stripe>
        <el-table-column prop="type" label="类别" width="100">
          <template slot-scope="{ row }">
            <span :style="{ color: typeColorMap[row.type] }">●</span>
            <span style="margin-left: 6px">{{ row.type }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="amount" label="金额" width="120">
          <template slot-scope="{ row }">¥ {{ formatMoney(row.amount) }}</template>
        </el-table-column>
        <el-table-column prop="remark" label="备注" />
        <el-table-column prop="time" label="时间" width="180">
          <template slot-scope="{ row }">{{ formatTimestamp(row.time) }}</template>
        </el-table-column>
        <el-table-column label="操作" width="160">
          <template slot-scope="{ row }">
            <el-button type="text" @click="editRecord(row)">编辑</el-button>
            <el-button type="text" @click="removeRecord(row.id)" style="color: red">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="pager" style="margin-top: 12px; text-align: right">
        <el-pagination
          background
          layout="prev, pager, next"
          :page-size="pageSize"
          :current-page.sync="page"
          :total="filteredList.length"
        />
      </div>
    </el-card>

    <el-dialog title="编辑记录" :visible.sync="editDialogVisible">
      <el-form label-position="top" :model="editForm">
        <el-form-item label="类别">
          <el-select v-model="editForm.type" placeholder="类别">
            <el-option v-for="t in typeList" :key="t.value" :label="t.label" :value="t.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="金额">
          <el-input v-model="editForm.amount" placeholder="金额" />
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="editForm.remark" />
        </el-form-item>
        <el-form-item label="时间">
          <el-date-picker v-model="editForm.time" type="datetime" value-format="timestamp" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="confirmEdit">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
const TYPE_LIST = [
  { label: '衣', value: '衣' },
  { label: '食', value: '食' },
  { label: '住', value: '住' },
  { label: '行', value: '行' },
  { label: '医', value: '医' },
  { label: '教', value: '教' },
  { label: '其他', value: '其他' },
]

// 颜色映射
const TYPE_COLOR = {
  衣: '#FF7043',
  食: '#26A69A',
  住: '#42A5F5',
  行: '#AB47BC',
  医: '#EC407A',
  教: '#5C6BC0',
  其他: '#90A4AE',
}

const STORAGE_KEY = 'consumptionNoteData_v1'

export default {
  name: 'purchaseRecords',
  data() {
    return {
      typeList: TYPE_LIST,
      form: {
        type: '食',
        amount: '',
        remark: '',
        time: Date.now(),
      },
      list: [],
      filter: {
        type: null,
        range: null, // [start, end] timestamp
        keyword: '',
      },
      editDialogVisible: false,
      editForm: {},
      page: 1,
      pageSize: 10,
    }
  },
  computed: {
    typeListWithColor() {
      return this.typeList.map(t => ({ ...t, color: TYPE_COLOR[t.value] || '#999' }))
    },
    typeColorMap() {
      const map = {}
      this.typeList.forEach(t => (map[t.value] = TYPE_COLOR[t.value] || '#999'))
      return map
    },
    filteredList() {
      return this.list
        .filter(item => {
          if (this.filter.type && item.type !== this.filter.type) return false
          if (this.filter.range && this.filter.range.length === 2) {
            const [s, e] = this.filter.range
            if (item.time < s || item.time > e) return false
          }
          if (this.filter.keyword) {
            const kw = this.filter.keyword.toLowerCase()
            if (!(item.remark && item.remark.toLowerCase().includes(kw))) return false
          }
          return true
        })
        .sort((a, b) => b.time - a.time)
    },
    pagedList() {
      const start = (this.page - 1) * this.pageSize
      return this.filteredList.slice(start, start + this.pageSize)
    },
    totalAmount() {
      return this.filteredList.reduce((s, r) => s + Number(r.amount || 0), 0)
    },
  },
  created() {
    this.loadFromLocal()
  },
  methods: {
    formatMoney(v) {
      const num = Number(v)
      if (!isFinite(num)) return '0.00'
      return num.toFixed(2)
    },
    formatTimestamp(ts) {
      if (!ts) return ''
      const d = new Date(Number(ts))
      const y = d.getFullYear()
      const m = String(d.getMonth() + 1).padStart(2, '0')
      const day = String(d.getDate()).padStart(2, '0')
      const hh = String(d.getHours()).padStart(2, '0')
      const mm = String(d.getMinutes()).padStart(2, '0')
      const ss = String(d.getSeconds()).padStart(2, '0')
      return `${y}-${m}-${day} ${hh}:${mm}:${ss}`
    },
    addRecord() {
      const amount = Number(this.form.amount)
      if (!isFinite(amount) || amount === 0) {
        this.$message.warning('请输入有效金额')
        return
      }
      const rec = {
        id: Date.now() + Math.floor(Math.random() * 999),
        type: this.form.type,
        amount: Number(amount.toFixed(2)),
        remark: this.form.remark || '',
        time: this.form.time || Date.now(),
      }
      this.list.unshift(rec)
      this.$message.success('添加成功')
      this.resetForm()
    },
    resetForm() {
      this.form.amount = ''
      this.form.remark = ''
      this.form.time = Date.now()
      this.form.type = '食'
    },
    removeRecord(id) {
      this.list = this.list.filter(i => i.id !== id)
      this.$message.success('已删除')
    },
    editRecord(row) {
      this.editForm = Object.assign({}, row)
      this.editDialogVisible = true
    },
    confirmEdit() {
      const idx = this.list.findIndex(i => i.id === this.editForm.id)
      if (idx !== -1) {
        this.$set(this.list, idx, {
          ...this.list[idx],
          type: this.editForm.type,
          amount: Number(this.editForm.amount) || 0,
          remark: this.editForm.remark,
          time: this.editForm.time,
        })
        this.$message.success('已保存')
      }
      this.editDialogVisible = false
    },
    resetFilter() {
      this.filter.type = null
      this.filter.range = null
      this.filter.keyword = ''
    },
    saveToLocal() {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.list))
      this.$message.success('已保存到本地')
    },
    loadFromLocal() {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) {
        try {
          const parsed = JSON.parse(raw)
          if (Array.isArray(parsed)) this.list = parsed
        } catch (e) {
          console.error(e)
        }
      }
    },
    exportCsv() {
      if (!this.list.length) {
        this.$message.warning('无数据可导出')
        return
      }
      const rows = [['类别', '金额', '备注', '时间']]
      this.list.forEach(r => {
        rows.push([r.type, this.formatMoney(r.amount), r.remark, this.formatTimestamp(r.time)])
      })
      const csv = rows.map(r => r.map(c => `"${String(c).replace(/"/g, '""')}"`).join(',')).join('\n')
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
      if (window.navigator && window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveOrOpenBlob(blob, 'consumption.csv')
      } else {
        const link = document.createElement('a')
        link.href = URL.createObjectURL(blob)
        link.download = 'consumption.csv'
        link.click()
        URL.revokeObjectURL(link.href)
      }
    },
  },
}
// ...existing code...
</script>

<style scoped>
.note-page {
  padding: 12px;
}
.form-row {
  display: flex;
  align-items: center;
  gap: 8px;
}
.filter-row {
  display: flex;
  align-items: center;
  gap: 8px;
}
.summary {
  margin-top: 8px;
}
</style>
