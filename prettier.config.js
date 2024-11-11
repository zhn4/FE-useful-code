module.exports = {
  printWidth: 100, // 换行长度
  proseWrap: 'always', // 超出长度，换行
  singleAttributePerLine: false, // 是否每个属性换行
  semi: false, // 是否添加分号
  singleQuote: true, // 是否启用单引号
  trailingComma: 'all', // 尾随逗号
  useTabs: false, // 是否使用 tab
  tabWidth: 2, // tab 宽度
  arrowParens: 'always', // 箭头函数是否需要括号
  bracketSpacing: true, // 是否开启对象字括号之间的空格
  htmlWhitespaceSensitivity: 'css', // HTML 空白敏感度
  insertPragma: false, // 是否插入编译指示
  bracketSameLine: false, //  将多行 HTML（HTML、JSX、Vue、Angular）元素的 > 放在最后一行的末尾，而不是单独放在下一行（不适用于自关闭元素）
  jsxSingleQuote: true, // jsx 是否使用单引号
  quoteProps: 'as-needed', // 仅在需要时在对象属性周围添加引号
  requirePragma: false, // 是否启用特殊注释
}
