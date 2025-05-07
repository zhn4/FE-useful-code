<!-- filepath: c:\Users\farben\Desktop\corporate_governance\src\views\importExcel\index.vue -->
<template>
  <div class="import-excel">
    <div class="top">
      <!-- <h1>导入 Excel 文件</h1> -->
      <input type="file" @change="handleFileUpload" accept=".xlsx, .xls" />
    </div>
    <div class="bottom">
      <div class="custom-table-containor">
        <el-tabs type="border-card">
          <template v-for="sheet in allSheets">
            <el-tab-pane :label="sheet.sheetName">
              <table v-if="sheet.sheetData.length">
                <thead>
                  <tr>
                    <th v-for="(header, index) in sheet.sheetData[0]" :key="index">{{ header }}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(row, rowIndex) in sheet.sheetData.slice(1)" :key="rowIndex">
                    <td v-for="(cell, cellIndex) in row" :key="cellIndex">{{ cell }}</td>
                  </tr>
                </tbody>
              </table>
            </el-tab-pane>
          </template>
        </el-tabs>
      </div>
    </div>
    <!-- <table v-if="excelData.length">
      <thead>
        <tr>
          <th v-for="(header, index) in headers" :key="index">{{ header }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, rowIndex) in excelData" :key="rowIndex">
          <td v-for="(cell, cellIndex) in row" :key="cellIndex">{{ cell }}</td>
        </tr>
      </tbody>
    </table> -->
  </div>
</template>

<script>
import * as XLSX from "xlsx";

export default {
  name: "ImportExcel",
  data() {
    return {
      headers: [], // 表头
      excelData: [], // Excel 数据
      allSheets: [],
    };
  },
  methods: {
    handleFileUpload(event) {
      console.log(event.target.files)
      const file = event.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });

        console.log('包含的表', workbook.SheetNames)

        let allSheets = []
        workbook.SheetNames.forEach(sheetName => {
          allSheets.push({
            sheetName: sheetName,
            sheetData: XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], { header: 1 })
          })
          console.log(workbook.Sheets[sheetName])
          // const jsonData = XLSX.utils.sheet_to_json(workbook.Sheets[x], { header: 1 })
          // this.headers = jsonData[0] || [];
          // this.excelData = jsonData.slice(1);
        })
        console.log(allSheets)

        // // 假设读取第一个工作表
        // const firstSheetName = workbook.SheetNames[0];
        // const worksheet = workbook.Sheets[firstSheetName];

        // // 将工作表转换为 JSON
        // const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

        // // 设置表头和数据
        // this.headers = jsonData[0] || [];
        // this.excelData = jsonData.slice(1);

        // console.log('头部数据')
        // console.log(this.headers)
        // console.log('内容数据')
        // console.log(this.excelData)
        this.allSheets = allSheets
      };

      reader.readAsArrayBuffer(file);
    },
  },
};
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
  }
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

th,
td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
  min-width: 80px;
  max-width: 220px;
}

th {
  background-color: #f4f4f4;
  white-space: nowrap;
}
</style>