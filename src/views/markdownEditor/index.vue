<template>
  <div class="markdown-editor">
    <div class="editor-container">
      <extraCom :currentData="markdownContent" @handleLoadData="handleLoadData" />
      <textarea v-model="markdownContent" placeholder="请输入 Markdown 内容"></textarea>
    </div>
    <div class="preview-container" v-html="renderedHtml"></div>
  </div>
</template>

<script>
import { marked } from 'marked'
import hljs from 'highlight.js'
// import 'highlight.js/styles/github.css'
import 'highlight.js/styles/atom-one-dark.css'
import 'github-markdown-css'

import extraCom from './components/extraCom'

// 配置 marked，使用 highlight.js 进行代码高亮
marked.setOptions({
  highlight: function (code, lang) {
    if (lang && hljs.getLanguage(lang)) {
      return hljs.highlight(code, { language: lang }).value
    }
    return hljs.highlightAuto(code).value
  },
  breaks: true,
})

export default {
  name: 'markdownEditor',
  components: {
    extraCom,
  },
  data() {
    return {
      markdownContent: '',
    }
  },
  computed: {
    renderedHtml() {
      return marked(this.markdownContent)
    },
  },
  methods: {
    handleLoadData(data) {
      console.log(data)
      this.markdownContent = data.content
    }
  }
}
</script>

<style scoped>
.markdown-editor {
  display: flex;
  height: 100vh;
}

.editor-container {
  flex: 1;
  padding: 20px;
  position: relative;
}

.editor-container textarea {
  width: 100%;
  height: 100%;
  border: none;
  resize: none;
  font-size: 16px;
}

.preview-container {
  flex: 1;
  padding: 20px;
  border-left: 1px solid #ccc;
  overflow-y: auto;
}
</style>
