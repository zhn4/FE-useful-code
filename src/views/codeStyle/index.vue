<template>
  <div class="custom-page">
    <div class="custom-content">
      <div
        v-html="mdData"
        class="markdown-body theme-atom-one-dark"
        style="height: 100%; overflow: auto"
      ></div>
    </div>
  </div>
</template>

<script>
// NOTE: 读取纯 md 的方法
// const markdownFile = require('./codeStyle.md')

import markdownFile from './codeStyle.md'

import { marked } from 'marked'
import hljs from 'highlight.js'

import 'highlight.js/styles/atom-one-dark.css'
import 'github-markdown-css'

export default {
  name: 'codeStyle',
  data() {
    return {
      mdData: null,
    }
  },
  mounted() {
    console.log(markdownFile)
    // NOTE: 读取纯 md 的方法
    // console.log(markdownFile.default)

    this.mdData = marked.parse(markdownFile, {
      highlight: function (code, lang) {
        const language = hljs.getLanguage(lang) ? lang : 'plaintext'
        return hljs.highlight(code, { language }).value
      },
    })
  },
}
</script>
