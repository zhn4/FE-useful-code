<template>
  <div class="excel-parser">
    <h1>Excel 文件解析器 (Vue)</h1>
    <input 
      type="file" 
      accept=".xlsx, .xls, .csv" 
      @change="handleFileChange"
      class="file-input"
    />
    
    <div v-if="loading" class="loading">加载中...</div>
    
    <div v-if="error" class="error">{{ error }}</div>
    
    <div v-if="tableData.length > 0" class="table-container">
      <table>
        <thead>
          <tr>
            <th 
              v-for="(header, index) in headers" 
              :key="index"
              :colspan="getColSpan(header)"
              :rowspan="getRowSpan(header)"
            >
              {{ header.value }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, rowIndex) in tableData" :key="rowIndex">
            <td 
              v-for="(cell, cellIndex) in row" 
              :key="cellIndex"
              :class="{ 'merged-cell': cell.merged }"
              :rowspan="cell.rowspan || 1"
              :colspan="cell.colspan || 1"
            >
              {{ cell.value }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import * as XLSX from 'xlsx';

export default {
  name: 'ExcelParser',
  data() {
    return {
      loading: false,
      error: null,
      headers: [],
      tableData: [],
      merges: []
    };
  },
  methods: {
    handleFileChange(event) {
      this.loading = true;
      this.error = null;
      this.headers = [];
      this.tableData = [];
      this.merges = [];
      
      const file = event.target.files[0];
      if (!file) {
        this.loading = false;
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = new Uint8Array(e.target.result);
          const workbook = XLSX.read(data, { type: 'array' });
          
          // 获取第一个工作表
          const firstSheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[firstSheetName];
          
          // 保存合并单元格信息
          this.merges = worksheet['!merges'] || [];
          
          // 处理表头
          this.processHeaders(worksheet);
          
          // 处理表格数据
          this.processTableData(worksheet);
          
        } catch (err) {
          console.error('解析错误:', err);
          this.error = '文件解析失败，请检查文件格式';
        } finally {
          this.loading = false;
        }
      };
      
      reader.onerror = () => {
        this.error = '文件读取失败';
        this.loading = false;
      };
      
      reader.readAsArrayBuffer(file);
    },
    
    processHeaders(worksheet) {
      // 获取表头行（假设第一行是表头）
      const range = XLSX.utils.decode_range(worksheet['!ref']);
      const headerRow = range.s.r;
      
      this.headers = [];
      
      for (let col = range.s.c; col <= range.e.c; col++) {
        const cellAddress = XLSX.utils.encode_cell({ r: headerRow, c: col });
        const cell = worksheet[cellAddress];
        
        this.headers.push({
          value: cell ? cell.v : `列${col + 1}`,
          isMerged: false,
          mergeInfo: null
        });
      }
      
      // 处理表头中的合并单元格
      this.merges.forEach(merge => {
        if (merge.s.r === headerRow) {
          // 这是一个表头行的合并单元格
          for (let col = merge.s.c; col <= merge.e.c; col++) {
            this.headers[col].isMerged = col !== merge.s.c;
            this.headers[col].mergeInfo = {
              colspan: merge.e.c - merge.s.c + 1,
              rowspan: merge.e.r - merge.s.r + 1
            };
          }
        }
      });
    },
    
    processTableData(worksheet) {
      const range = XLSX.utils.decode_range(worksheet['!ref']);
      const headerRow = range.s.r;
      
      this.tableData = [];
      
      // 从第二行开始处理数据（假设第一行是表头）
      for (let row = headerRow + 1; row <= range.e.r; row++) {
        const tableRow = [];
        
        for (let col = range.s.c; col <= range.e.c; col++) {
          const cellAddress = XLSX.utils.encode_cell({ r: row, c: col });
          const cell = worksheet[cellAddress];
          
          // 检查是否是合并单元格的一部分
          const isMerged = this.isCellMerged(row, col);
          const mergeInfo = isMerged ? this.getMergeInfo(row, col) : null;
          
          tableRow.push({
            value: cell ? cell.v : '',
            merged: isMerged,
            rowspan: mergeInfo ? mergeInfo.rowspan : 1,
            colspan: mergeInfo ? mergeInfo.colspan : 1
          });
        }
        
        this.tableData.push(tableRow);
      }
    },
    
    isCellMerged(row, col) {
      return this.merges.some(merge => {
        return (
          row >= merge.s.r && 
          row <= merge.e.r && 
          col >= merge.s.c && 
          col <= merge.e.c &&
          !(row === merge.s.r && col === merge.s.c)
        );
      });
    },
    
    getMergeInfo(row, col) {
      const merge = this.merges.find(m => 
        row >= m.s.r && row <= m.e.r && col >= m.s.c && col <= m.e.c
      );
      
      if (merge) {
        return {
          rowspan: merge.e.r - merge.s.r + 1,
          colspan: merge.e.c - merge.s.c + 1
        };
      }
      return null;
    },
    
    getColSpan(header) {
      return header.isMerged ? 1 : (header.mergeInfo ? header.mergeInfo.colspan : 1);
    },
    
    getRowSpan(header) {
      return header.isMerged ? 1 : (header.mergeInfo ? header.mergeInfo.rowspan : 1);
    }
  }
};
</script>

<style scoped>
.excel-parser {
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
}

.file-input {
  margin-bottom: 20px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.loading, .error {
  padding: 10px;
  margin: 10px 0;
  border-radius: 4px;
}

.loading {
  background-color: #f0f0f0;
  color: #333;
}

.error {
  background-color: #ffebee;
  color: #d32f2f;
}

table {
  border-collapse: collapse;
  width: 100%;
  margin-top: 20px;
}

th, td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

th {
  background-color: #f2f2f2;
  font-weight: bold;
}

.merged-cell {
  display: none;
}

.table-container {
  overflow-x: auto;
}
</style>