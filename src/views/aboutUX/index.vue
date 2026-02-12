<template>
  <div class="page">
    <div class="left">
      <!-- <div class="custom-page"> -->
      <listPage />
      <!-- </div> -->
    </div>
    <div class="right">
      <div class="custom-page">
        <div class="custom-content">
          <div v-html="mdData" class="markdown-body theme-atom-one-dark" style="height: 100%; overflow: auto"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import dialogByUX from './components/dialogByUX.vue'
// import drawerByUX from './components/drawerByUX.vue'

import listPage from './listPage.vue'

import markdownFile from './aboutUX.md'

import { marked } from 'marked'
import hljs from 'highlight.js'

import 'highlight.js/styles/atom-one-dark.css'
import 'github-markdown-css'

export default {
  name: 'aboutUX',
  components: {
    // dialogByUX,
    // drawerByUX,
    listPage,
  },
  data() {
    return {
      searchForm: {
        prop1: '',
        prop2: '',
        prop3: '',
      },
      visibleByDialog: false,
      visibleByDrawer: false,
      mdData: null,
    }
  },
  mounted() {
    this.mdData = marked.parse(markdownFile, {
      highlight: function (code, lang) {
        const language = hljs.getLanguage(lang) ? lang : 'plaintext'
        return hljs.highlight(code, { language }).value
      },
    })
  },
  methods: {
    onReset() {
      this.$refs['formRef'].resetFields()
    },
    onOpenDialog() {
      this.visibleByDialog = true
    },
    onOpenDrawer() {
      this.visibleByDrawer = true
    },
    onMessage() {
      this.$message.success('消息提示，当前页面功能相关提示')
    },
    onNotification() {
      this.$notify({
        title: '提示',
        type: 'warning',
        message: '全局提示，用于全局的请求拦截器',
      })
    },
  },
}
</script>

<style lang="less" scoped>
.page {
  width: 100%;
  height: 100%;
  overflow: hidden;
  // display: flex;
  // flex-direction: column;
  display: grid;
  grid-template-columns: 1fr 600px;
  .left,
  .right {
    overflow: auto;
  }
}
</style>
