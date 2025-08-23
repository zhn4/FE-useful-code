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
    // 生产环境才进行分包优化
    if (process.env.NODE_ENV === 'production') {
      config.optimization.splitChunks({
        chunks: 'all',
        cacheGroups: {
          vendor: {
            name: 'chunk-vendors',
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
            chunks: 'initial',
          },
          elementUI: {
            name: 'chunk-elementUI',
            priority: 20,
            test: /[\\/]node_modules[\\/]_?element-ui(.*)/,
          },
        },
      })
    }
  },
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      // 生产环境外链Element UI
      config.externals = {
        'element-ui': 'ELEMENT',
      }
    }
  },
})
