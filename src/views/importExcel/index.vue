<!-- filepath: c:\Users\farben\Desktop\corporate_governance\src\views\importExcel\index.vue -->
<template>
  <div class="import-excel">
    <div class="top">
      <h3>导入 Excel 文件，HTML 的 table 标签展示</h3>
      <input type="file" @change="handleFileUpload" accept=".xlsx, .xls" />
    </div>
    <div class="bottom">
      <div ref="testRef" class="html-raw" v-html="htmlByTable"></div>
      <el-tabs type="border-card">
        <template v-for="sheet in allSheets">
          <el-tab-pane :label="sheet.sheetName">
            <div v-html="sheet.sheetData" class="html-raw"></div>
          </el-tab-pane>
        </template>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import * as XLSX from 'xlsx'

export default {
  name: 'ImportExcel',
  data() {
    return {
      headers: [], // 表头
      excelData: [], // Excel 数据
      allSheets: [],
      htmlByTable: null,
    }
  },
  methods: {
    handleFileUpload(event) {
      const file = event.target.files[0]
      if (!file) return

      const reader = new FileReader()
      reader.onload = (e) => {
        const data = new Uint8Array(e.target.result)
        const workbook = XLSX.read(data, { type: 'array' })
        // 假设读取第一个工作表
        // const firstSheetName = workbook.SheetNames[0]
        // const worksheet = workbook.Sheets[firstSheetName]
        // const tableHtml = XLSX.utils.sheet_to_html(worksheet)
        // this.htmlByTable = tableHtml
        let allSheets = []
        workbook.SheetNames.forEach((sheetName) => {
          allSheets.push({
            sheetName: sheetName,
            sheetData: workbook.Sheets[sheetName]['!ref'] ? XLSX.utils.sheet_to_html(workbook.Sheets[sheetName]) : null,
          })
        })
        this.allSheets = allSheets
      }
      reader.readAsArrayBuffer(file)
    },
  },
}
</script>

<style style="less" scoped>
.import-excel {
  width: 100%;
  height: 100%;
  padding: 20px;
  box-sizing: border-box;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;

  .bottom {
    width: 100%;
    height: 100%;
    flex: 1;
    overflow: hidden;
  }
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  border: 1px solid #ddd !important;
  padding: 8px;
  text-align: left;
  min-width: 80px;
  max-width: 220px;
}

th {
  background-color: #f4f4f4;
  white-space: nowrap;
}

::v-deep .el-tabs {
  height: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}

::v-deep .el-tabs__content {
  height: 100%;
  overflow: auto;
}
</style>

<style lang="less">
.html-raw {
  table {
    border-collapse: collapse;
  }

  td {
    border: 1px solid #ddd;
    text-align: left;
    padding: 4px;
    min-width: 80px;
    max-width: 220px;
  }
}
</style>
