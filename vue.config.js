const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  /* 
    为了使用 github page 的设置
  */
  publicPath: '/FE-useful-code/',
  outputDir: 'docs', // 特意打包到这个目录，github page 除了根目录就只有这个目录
  assetsDir: './',
});
