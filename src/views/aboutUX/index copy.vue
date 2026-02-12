<template>
  <div class="custom-page">
    <div class="custom-search-bar">
      <el-form :model="searchForm" ref="formRef" inline>
        <el-form-item prop="prop1">
          <el-input v-model="searchForm.prop1" placeholder="字段1" clearable></el-input>
        </el-form-item>
        <el-form-item prop="prop2">
          <el-input v-model="searchForm.prop2" placeholder="假如字段2的label很长" clearable></el-input>
        </el-form-item>
        <el-form-item prop="prop3">
          <el-input v-model="searchForm.prop3" placeholder="假如字段3的label很长很长很长很长" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">搜索</el-button>
          <el-button @click="onReset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="custom-content">
      <div class="custom-btns">
        <el-button type="primary" @click="onOpenDialog">弹窗</el-button>
        <el-button type="primary" @click="onOpenDrawer">抽屉</el-button>
        <el-button type="primary" @click="onMessage">消息提示</el-button>
        <el-button type="primary" @click="onNotification">通知</el-button>
      </div>
      <div v-html="mdData" class="markdown-body theme-atom-one-dark" style="height: 100%; overflow: auto"></div>
    </div>
    <dialogByUX :visible.sync="visibleByDialog" />
    <drawerByUX :visible.sync="visibleByDrawer" />
  </div>
</template>

<script>
import dialogByUX from './components/dialogByUX.vue'
import drawerByUX from './components/drawerByUX.vue'

import markdownFile from './aboutUX.md'

import { marked } from 'marked'
import hljs from 'highlight.js'

import 'highlight.js/styles/atom-one-dark.css'
import 'github-markdown-css'

export default {
  name: 'aboutUX',
  components: {
    dialogByUX,
    drawerByUX,
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
