<template>
  <div class="custom-page">
    <div class="custom-search-bar">
      <el-form ref="formRef" :model="form" :inline="true">
        <el-form-item label="金额范围" prop="min">
          <el-input type="number" v-model="form.min" placeholder="最小值" style="width: 160px;" min="0"
            clearable></el-input>
        </el-form-item>
        <el-form-item prop="max">
          <el-input type="number" v-model="form.max" placeholder="最大值" style="width: 160px;" max="99999999999"
            clearable></el-input>
        </el-form-item>
        <!-- <el-form-item label="归档时间">
          <el-date-picker v-model="form.time" type="daterange" range-separator="至" start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item> -->
        <el-form-item>
          <el-button type="primary" @click="onSearch" icon="el-icon-search">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button @click="onReset" icon="el-icon-refresh-right">重置</el-button>
        </el-form-item>
        <el-form-item>
          <el-upload action="" :auto-upload="false" :multiple="true" :show-file-list="false"
            :on-change="handleFileChange" accept=".xlsx,.xls" ref="upload">
            <el-button type="primary">选择Excel文件</el-button>
          </el-upload>
        </el-form-item>
      </el-form>
    </div>
    <div class="custom-content">
      <el-table v-if="tableData.length" :data="tableData" style="width: 100%;" border height="100%">
        <el-table-column type="index" label="序号" width="60" />
        <el-table-column v-for="col in tableHeader" :key="col" :prop="col" :label="col" />
      </el-table>
    </div>
  </div>
</template>

<script>
import * as XLSX from 'xlsx';

export default {
  data() {
    return {
      form: {
        min: '',
        max: '',
        time: [],
      },
      tableHeader: [],
      tableData: [],
      // currentTableData: [],
    };
  },
  methods: {
    onSearch() {
      if (this.form.min && !this.form.max) {
        this.$message.warning('请输入最大值');
        return;
      }
      if (!this.form.min && this.form.max) {
        this.$message.warning('请输入最小值');
        return;
      }
      if (this.form.min && this.form.max && this.form.min > this.form.max) {
        this.$message.warning('最小值不能大于最大值');
        return;
      }
      if (this.form.min === this.form.max) {
        this.$message.warning('最小值和最大值不能相等');
        return;
      }
    },
    onReset() {
      this.$refs.formRef.resetFields();
    },
    async handleFileChange(file, fileList) {
      // 清空旧数据
      this.tableHeader = [];
      this.tableData = [];
      for (const f of fileList) {
        const rawFile = f.raw || f; // el-upload 组件有 raw 属性
        await this.readExcel(rawFile);
      }
    },
    readExcel(file) {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          const data = new Uint8Array(e.target.result);
          const workbook = XLSX.read(data, { type: 'array' });
          // 只读取第一个sheet
          const sheetName = workbook.SheetNames[0];
          const sheet = workbook.Sheets[sheetName];
          console.log('%c读取的sheet:', 'color: red; font-size: 1.4em; font-weight: bolder;');
          console.log(sheet)
          let json = XLSX.utils.sheet_to_json(sheet, { header: 1 });
          console.log('%c转换后的json:', 'color: blue; font-size: 1.4em; font-weight: bolder;');
          console.log(json);
          console.log('%c最长的数组:', 'color: green; font-size: 1.4em; font-weight: bolder;');
          const result = this.findLongestArray(json);
          console.log(result);

          function sortJsonByKeywords(json, keywords, keywordsFully = ['日期', '货币', '交易金额', '余额', '交易地方/地点', '摘要', '对方账户或户名']) {
            // 获取表头
            let headerRow = json[0];
            // 生成 keywordsIndex，按 keywords 顺序排列
            let keywordsIndex = keywords.map((kw, kwIndex) => {
              console.log('---')
              console.log('%c1.看看kw', 'font-weight: bolder;')
              console.log(kw)

              let idx = headerRow.findIndex(col => col.includes(kw));
              console.log('%c2.看看idx，关键字在第一行数据的索引值', 'color: red; font-weight: bolder;')
              console.log(idx)

              if (idx === -1) {
                // 表头没有该关键字，插入到表头末尾
                // headerRow.push(kw);
                headerRow.push(keywordsFully[kwIndex])
                console.log('%c3.表头补充数据后的数据', 'color: green; font-size: 1.5em; font-weight: bolcer;')
                console.log(headerRow)
                // 同步所有数据行补空值
                json.forEach(row => row.push(''));
                console.log(headerRow.length - 1)
                return headerRow.length - 1;
              }
              return idx;
            });
            console.log('%clast看看 keywordIndex 是什么 => ', 'color: tomato; font-weight: bolder;')
            console.log(keywordsIndex)

            // 只保留并排序关键字对应的列
            return json.map(row => keywordsIndex.map(idx => row[idx]));
          }

          // 用法示例
          let keywords = ['日期', '币', '金额', '余额', '地', '摘要', '对'];
          let sortedJson = sortJsonByKeywords(json, keywords);
          console.log('根据关键字排序后的json:', sortedJson);

          json = sortedJson

          if (json.length) {
            // 第一行为表头
            if (!this.tableHeader.length) {
              // this.tableHeader = json[result.index]
              this.tableHeader = ['日期', '货币', '交易金额', '余额', '交易地方/地点', '摘要', '对方账户或户名']
            }
            // 其余为数据，第一行是表头数据
            let finallyData = json.slice(result.index);
            for (let i = 1; i < finallyData.length; i++) {
              const row = {};
              this.tableHeader.forEach((key, idx) => {
                row[key] = finallyData[i][idx] || '';
              });
              this.tableData.push(row);
            }
          }
          resolve();
        };
        reader.readAsArrayBuffer(file);
      });
    },
    findLongestArray(arrays) {
      let maxLen = 0;
      let maxArr = null;
      let maxIdx = -1;
      // NOTE: 通常正式表格前的几行可能是标题或其他信息
      for (let i = 0; i < 20; i++) {
        const arr = arrays[i];
        if (arr && (arr.length > maxLen)) {
          maxLen = arr.length;
          maxArr = arr;
          maxIdx = i;
        }
      }
      return { array: maxArr, index: maxIdx };
    }
  }
};
</script>
