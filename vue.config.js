const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  /*
    为了使用 github page 的设置
  */
  publicPath: '/FE-useful-code/',
  outputDir: 'docs', // 特意打包到这个目录，github page 除了根目录就只有这个目录
  assetsDir: './',
  chainWebpack: config => {
    // NOTE: 读取纯 md 的方法
    // config.module
    //   .rule('md')
    //   .test(/\.md$/)
    //   .use('html-loader')
    //   .loader('html-loader')
    //     .end()
    //   .use('markdown-loader')
    //     .loader('markdown-loader')
    //     .end()
    config.module.rule('md').test(/\.md$/).use('raw-loader').loader('raw-loader').end()
  },
})
