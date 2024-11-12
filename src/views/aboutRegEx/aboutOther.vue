<template>
  <el-table :data="tableData" border style="width: 100%" height="80%">
    <el-table-column prop="regEx" label="正则" align="center">
      <template slot-scope="scope">
        <el-input :value="scope.row.regEx"></el-input>
      </template>
    </el-table-column>
    <el-table-column prop="text" label="例子" align="center"></el-table-column>
    <el-table-column prop="result" label="结果" align="center"></el-table-column>
    <el-table-column prop="desc" label="描述" align="center"></el-table-column>
    <el-table-column label="操作" width="200" align="center">
      <template slot-scope="scope">
        <el-button type="text" @click="scope.row.resetMethod(scope.row)" style="color: red"
          >重置</el-button
        >
        <el-button type="text" @click="scope.row.handleMethod(scope.row)">看看效果</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  name: 'aboutOther',
  data() {
    return {
      tableData: [
        {
          desc: '匹配特定数据格式，移除',
          regEx: `--(.+?)__`,
          text: `shopify-section-template--15498927964376__1628115108645bdee6`,
          result: '',
          handleMethod: (row) => {
            row.result = row.text.replace(/--(.+?)__/g, '')
          },
          resetMethod: (row) => {
            row.result = ''
          },
        },
        {
          desc: '匹配特定数据格式，查找',
          regEx: `--(.+?)__`,
          text: `shopify-section-template--15498927964376__1628115108645bdee6`,
          result: '',
          handleMethod: (row) => {
            row.result = row.text.match(/--(.+?)__/g).join('')
          },
          resetMethod: (row) => {
            row.result = ''
          },
        },
        {
          desc: '提取汉字',
          regEx: `/[\\u4e00-\\u9fa5]/g`, // 原文 /[\u4e00-\u9fa5]/g 加入反斜杠转义展示纯文本，否则会展示中文
          text: `123-中文汉字=abcd+-*/哈哈`,
          result: '',
          handleMethod: (row) => {
            row.result = row.text.match(/[\u4e00-\u9fa5]/g).join('')
          },
          resetMethod: (row) => {
            row.result = ''
          },
        },
        {
          desc: '去除汉字',
          regEx: `/[\\u4e00-\\u9fa5]/g`, // 原文 /[\u4e00-\u9fa5]/g 加入反斜杠转义展示纯文本，否则会展示中文
          text: `123-中文汉字=abcd+-*/哈哈`,
          result: '',
          handleMethod: (row) => {
            row.result = row.text.replace(/[\u4e00-\u9fa5]/g, '')
          },
          resetMethod: (row) => {
            row.result = ''
          },
        },
        {
          desc: '提取关键字之间的内容，包括开、头结尾关键字',
          regEx: `/cow(.*)milk/g`,
          text: `My cow always gives milk`,
          result: '',
          handleMethod: (row) => {
            row.result = row.text.match(/cow(.*)milk/g)
          },
          resetMethod: (row) => {
            row.result = ''
          },
        },
        {
          desc: '提取关键字之间的内容，不包括开头、结尾关键字',
          regEx: `/(?<=cow).*(?=milk)/g`,
          text: `My cow always gives milk`,
          result: '',
          handleMethod: (row) => {
            row.result = row.text.match(/(?<=cow).*(?=milk)/g)
          },
          resetMethod: (row) => {
            row.result = ''
          },
        },
        {
          desc: '移除货币符号及单位逗号',
          regEx: `/[^0-9\.-]+/g`,
          text: `-$4,400.50`,
          result: '',
          handleMethod: (row) => {
            row.result = row.text.replace(/[^0-9\.-]+/g, '')
          },
          resetMethod: (row) => {
            row.result = ''
          },
        },
        {
          desc: '查找连续的数字',
          regEx: `/\d+/g`,
          text: `happy135--test246,8888-f4-88`,
          result: '',
          handleMethod: (row) => {
            row.result = row.text.match(/\d+/g).join(',')
          },
          resetMethod: (row) => {
            row.result = ''
          },
        },
      ],
    }
  },
}
</script>
