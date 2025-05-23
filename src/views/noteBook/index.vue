<template>
  <div class="notebook-page">
    <div class="editor-panel">
      <div style="text-align: right; margin-bottom: 8px">
        <el-button type="success" size="mini" @click="importTxt">导入 .txt</el-button>
        <el-button type="success" size="mini" @click="importMd">导入 .md</el-button>
        <el-button type="primary" size="mini" @click="exportTxt">导出 .txt</el-button>
        <el-button type="primary" size="mini" @click="exportMd">导出 .md</el-button>
        <input ref="fileInputTxt" type="file" accept=".txt" style="display: none" @change="handleFileChangeTxt" />
        <input ref="fileInputMd" type="file" accept=".md" style="display: none" @change="handleFileChangeMd" />
      </div>
      <el-input type="textarea" v-model="markdownText" :rows="24" placeholder="请输入Markdown内容" resize="none"
        class="markdown-input" />
    </div>
    <div class="preview-panel">
      <div style="text-align: left; margin-bottom: 8px">
        <el-button type="primary" size="mini" @click="exportPdf">导出 PDF </el-button>
      </div>
      <!-- <div ref="markdownPreview" class="markdown-preview markdown-body theme-atom-one-dark" v-html="renderedMarkdown">
      </div> -->
      <div ref="markdownPreview" class="markdown-preview markdown-body theme-atom-one-dark" v-html="renderedMarkdown">
      </div>
      <!-- <div class="markdown-preview markdown-body " ref="markdownPreview">
        <pre class="theme-atom-one-dark">
          <code>{{ renderedMarkdown }}</code>
        </pre>
      </div> -->
    </div>
  </div>
</template>

<script>
import { marked } from 'marked'
import hljs from 'highlight.js'
import html2pdf from 'html2pdf.js/dist/html2pdf.min.js'

import 'highlight.js/styles/atom-one-dark.css'
import 'github-markdown-css'

marked.setOptions({
  highlight: function (code, lang) {
    if (lang && hljs.getLanguage(lang)) {
      return hljs.highlight(code, { language: lang }).value
    }
    return hljs.highlightAuto(code).value
  },
})

export default {
  name: 'NoteBook',
  data() {
    return {
      markdownText: '# 欢迎使用Markdown笔记本\n\n请在左侧输入内容，右侧实时预览。',
    }
  },
  computed: {
    renderedMarkdown() {
      return marked(this.markdownText)
    },
  },
  methods: {
    exportTxt() {
      const blob = new Blob([this.markdownText], { type: 'text/plain;charset=utf-8' })
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `export-${new Date().getTime()}-notebook.txt`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      window.URL.revokeObjectURL(url)
    },
    exportMd() {
      const blob = new Blob([this.markdownText], { type: 'text/markdown;charset=utf-8' })
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `export-${new Date().getTime()}-notebook.md`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      window.URL.revokeObjectURL(url)
    },
    exportPdf() {
      const element = this.$refs.markdownPreview
      const opt = {
        margin: 0.2,
        filename: `export-${new Date().getTime()}-notebook.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' },
      }
      html2pdf().set(opt).from(element).save()
    },
    importTxt() {
      this.$refs.fileInputTxt.value = null
      this.$refs.fileInputTxt.click()
    },
    importMd() {
      this.$refs.fileInputMd.value = null
      this.$refs.fileInputMd.click()
    },
    handleFileChangeTxt(e) {
      const file = e.target.files[0]
      if (!file) return
      const reader = new FileReader()
      reader.onload = (event) => {
        this.markdownText = event.target.result
      }
      reader.readAsText(file, 'utf-8')
    },
    handleFileChangeMd(e) {
      const file = e.target.files[0]
      if (!file) return
      const reader = new FileReader()
      reader.onload = (event) => {
        this.markdownText = event.target.result
      }
      reader.readAsText(file, 'utf-8')
    },
  },
}
</script>

<style lang="less" scoped>
.notebook-page {
  display: flex;
  height: 100%;
  background: #f8faff;
}

.editor-panel {
  width: 50%;
  padding: 24px;
  box-sizing: border-box;
  border-right: 1px solid #e3e8ee;
  background: #3b3e3d;
  display: flex;
  flex-direction: column;
}

.preview-panel {
  width: 50%;
  padding: 24px;
  box-sizing: border-box;
  overflow-y: auto;
  background: #3b3e3d;
  display: flex;
  flex-direction: column;
}

.markdown-input {
  width: 100%;
  height: 100%;

  ::v-deep .el-textarea__inner {
    height: 100%;
    // background: #3b3e3d;
    // color: #fff;
  }
}

.markdown-preview {
  width: 100%;
  height: 100%;
  /* background: #fff; */
  border-radius: 6px;
  padding: 16px;
  box-sizing: border-box;
  overflow-x: auto;
}
</style>
