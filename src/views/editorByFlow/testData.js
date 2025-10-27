import * as echarts from 'echarts'

function getSymbolWidth(name, fontSize = 14, padding = 20) {
  return name.length * fontSize + padding
}

export let allNodes = [
  // 开始节点
  {
    name: '开始节点',
    id: 'zero',
    x: 500,
    y: 0,
    extraData: {
      main: true,
      desc: ``,
      workTime: ``,
      file: ``,
      routePath: ``,
    },
  },
  // 第一层节点 start
  {
    name: '南帝北丐',
    id: 'one',
    x: 500,
    y: 500,
    extraData: {
      main: true,
      desc: ``,
      workTime: ``,
      file: ``,
      routePath: ``,
    },
  },
  {
    name: '段智兴',
    id: 'one-1',
    x: 100,
    y: 400,
    extraData: {
      main: false,
      desc: ``,
      workTime: `3天`,
      file: `一阳指`,
      routePath: ``,
    },
  },
  {
    name: '洪七',
    id: 'one-2',
    x: 900,
    y: 400,
    extraData: {
      main: false,
      desc: ``,
      workTime: `3天`,
      file: `降龙十八掌`,
      routePath: ``,
    },
  },
  {
    name: '周伯通',
    id: 'one-3',
    x: 100,
    y: 450,
    extraData: {
      main: false,
      desc: ``,
      workTime: ``,
      file: ``,
      routePath: ``,
    },
  },
  {
    name: '刘瑛姑',
    id: 'one-4',
    x: 900,
    y: 450,
    extraData: {
      main: false,
      desc: ``,
      workTime: ``,
      file: ``,
      routePath: ``,
    },
  },
  {
    name: '程雪芯',
    id: 'one-5',
    x: 100,
    y: 500,
    extraData: {
      main: false,
      desc: ``,
      workTime: ``,
      file: ``,
      routePath: ``,
    },
  },
  {
    name: '苗思恩',
    id: 'one-6',
    x: 900,
    y: 500,
    extraData: {
      main: false,
      desc: ``,
      workTime: ``,
      file: ``,
      routePath: ``,
    },
  },
  // 第一层节点 end

  // 第二层分支
  {
    name: '东邪西毒',
    id: 'two',
    x: 500,
    y: 1000,
    extraData: {
      main: true,
      desc: ``,
      workTime: ``,
      file: ``,
      routePath: ``,
    },
  },
  {
    name: '黄药师',
    id: 'two-1',
    x: 100,
    y: 1000,
    extraData: {
      main: false,
      desc: ``,
      workTime: ``,
      file: ``,
      routePath: ``,
    },
  },
  {
    name: '欧阳锋',
    id: 'two-2',
    x: 900,
    y: 1000,
    extraData: {
      main: false,
      desc: ``,
      workTime: ``,
      file: ``,
      routePath: ``,
    },
  },

  // 第三层分支
  {
    name: '五绝争锋',
    id: 'three',
    x: 500,
    y: 1500,
    extraData: {
      main: true,
      desc: ``,
      workTime: ``,
      file: ``,
      routePath: ``,
    },
  },

  // 第四层分支
  {
    name: '九阴真经',
    id: 'four',
    x: 500,
    y: 2000,
    extraData: {
      main: true,
    },
  },

  // 最后一层，结束节点
  {
    name: '结束节点',
    id: 'five',
    x: 500,
    y: 2500,
    extraData: {
      main: true,
      desc: ``,
      workTime: ``,
      file: ``,
      routePath: ``,
    },
  },
].map(node => {
  // 根据节点类型选择渐变色
  const mainGradient = new echarts.graphic.LinearGradient(0, 0, 1, 0, [
    { offset: 0, color: '#ffffff' },
    { offset: 0.25, color: '#d9ecff' },
    { offset: 0.5, color: '#d9ecff' },
    { offset: 0.75, color: '#d9ecff' },
    { offset: 1, color: '#ffffff' },
  ])
  const childGradient = new echarts.graphic.LinearGradient(0, 0, 1, 0, [
    { offset: 0, color: '#ffffff' },
    { offset: 0.5, color: '#d9ecff' },
    { offset: 1, color: '#ffffff' },
  ])
  const grayGradient = new echarts.graphic.LinearGradient(0, 0, 1, 0, [
    { offset: 0, color: '#e0eafc' },
    { offset: 1, color: '#cfdef3' },
  ])

  // 根据节点属性选配色（可自定义逻辑）
  const gradient = node.extraData && node.extraData.main ? mainGradient : childGradient

  // TODO: 保留 start
  // 计算符号宽度
  const width = getSymbolWidth(node.name || '')
  // 依据 id 末尾数字判断奇偶：仅当 id 存在尾数时生效
  // - 有尾数：奇数 -> 把矩形向左偏移（连接点落在右边）；偶数 -> 向右偏移（连接点落在左边）
  // - 无尾数：保持不变（连接点在中心）
  const idStr = (node.id || '').toString()
  const m = idStr.match(/(\d+)$/)
  let offsetX = 0
  if (m) {
    const num = parseInt(m[1], 10)
    const isOdd = num % 2 === 1
    offsetX = isOdd ? -Math.floor(width / 2) : Math.floor(width / 2)
  } else {
    offsetX = 0
  }
  // TODO: 保留 end

  return {
    ...node,
    symbolSize: [width, 30], // 宽随文字
    // 通过 symbolOffset 调整矩形的可视中心，从而改变连线落点（连线仍连到 node.x/node.y）
    symbolOffset: [offsetX, 0],
    itemStyle: {
      color: gradient,
      // 可加圆角（仅在 symbol 为 rect 时生效）
      borderColor: '#b3d8ff',
      borderWidth: 1,
      shadowColor: 'rgba(0,0,0,0.15)',
      shadowBlur: 6,
    },
    label: {
      show: true,
      color: '#000', // 白色文字，确保在渐变上可读
      fontSize: 14,
      formatter: '{b}',
      fontWeight: 'bolder',
    },
  }
})
// TODO: 老版本
// .map(node => ({
//   ...node,
//   symbolSize: [getSymbolWidth(node.name), 30], // 高度30可自定义
// }))

export const allLinks = []
// const testLinks = [
//   // 主节点，带有 main 标识
//   {
//     source: 'zero',
//     target: 'one',
//   },
//   {
//     source: 'one',
//     target: 'two',
//   },
//   {
//     source: 'two',
//     target: 'three',
//   },
//   {
//     source: 'three',
//     target: 'four',
//   },
//   {
//     source: 'four',
//     target: 'five',
//   },
//   // 分支 1
//   {
//     source: 'one',
//     target: 'one-1',
//   },
//   {
//     source: 'one',
//     target: 'one-2',
//   },
//   {
//     source: 'one',
//     target: 'one-3',
//   },
//   {
//     source: 'one',
//     target: 'one-4',
//   },
//   {
//     source: 'one',
//     target: 'one-5',
//   },
//   {
//     source: 'one',
//     target: 'one-6',
//   },
//   {
//     source: 'one',
//     target: 'one-7',
//   },
//   {
//     source: 'one',
//     target: 'one-8',
//   },
//   // 分支2
//   {
//     source: 'two',
//     target: 'two-1',
//   },
//   {
//     source: 'two',
//     target: 'two-2',
//   },
// ].map(link => ({
//   ...link,
//   lineStyle: {
//     width: 1,
//     // curveness: 0.2, // 曲线弯曲度
//     color: '#2590ff',
//   },
// }))
