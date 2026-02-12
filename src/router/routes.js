const routes = [
  // {
  //   path: '/',
  //   name: 'home',
  //   component: HomeView,
  // },
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue'),
  // },
  {
    path: '/',
    name: 'usefulList',
    component: () => import('../views/usefulList.vue'),
  },
  {
    path: '/normalListPage',
    name: 'normalListPage',
    meta: {
      name: '普通列表页',
    },
    component: () => import('../views/normalListPage/index.vue'),
  },
  {
    path: '/tabFlexTable',
    name: 'tabFlexTable',
    meta: {
      name: '标签+列表页组合',
    },
    component: () => import('../views/tabFlexTable/index.vue'),
  },
  // {
  //   path: '/handle',
  //   name: 'Handle',
  //   component: () => import('../views/Handle.vue'),
  // },
  {
    path: '/listAndDialog',
    name: 'listAndDialog',
    meta: {
      name: 'dialog 二次封装',
    },
    component: () => import('../views/listAndDialog/index.vue'),
  },
  {
    path: '/formAndTable',
    name: 'formAndTable',
    meta: {
      name: '表格+表单，并输入校验',
    },
    component: () => import('../views/formAndTable/index.vue'),
  },
  {
    path: '/testSlot',
    name: 'testSlot',
    meta: {
      name: 'slot 插槽的调用方法',
    },
    component: () => import('../views/testSlot/index.vue'),
  },
  {
    path: '/aboutRegEx',
    name: 'aboutRegEx',
    meta: {
      name: '正则',
    },
    component: () => import('../views/aboutRegEx/index.vue'),
  },
  {
    path: '/aboutUX',
    name: 'aboutUX',
    meta: {
      name: '交互建议',
    },
    component: () => import('../views/aboutUX/index.vue'),
  },
  {
    path: '/codeStyle',
    name: 'codeStyle',
    meta: {
      name: '编码建议',
    },
    component: () => import('../views/codeStyle/index.vue'),
  },
  // {
  //   path: '/markDownEditor',
  //   name: 'markDownEditor',
  //   meta: {
  //     name: 'markdown编辑器',
  //   },
  //   component: () => import('../views/markdownEditor/index.vue'),
  // },
  {
    path: '/leftRight',
    name: 'leftRight',
    meta: {
      name: '左右布局',
    },
    component: () => import('../views/leftRight/index.vue'),
  },
  {
    path: '/allCharts',
    name: 'allCharts',
    meta: {
      name: '各种图表布局',
    },
    component: () => import('../views/allCharts/index.vue'),
  },
  {
    path: '/createForm',
    name: 'createForm',
    meta: {
      name: '创建调查问卷',
    },
    component: () => import('../views/createForm/index.vue'),
  },
  // {
  //   path: '/genFormCode',
  //   name: 'genFormCode',
  //   meta: {
  //     name: '生成表单代码',
  //   },
  //   component: () => import('../views/genFormCode/index.vue'),
  // },
  {
    path: '/importExcel',
    name: 'importExcel',
    meta: {
      name: '导入 excel',
    },
    component: () => import('../views/importExcel/index.vue'),
  },
  {
    path: '/importExcelAndAnalyze',
    name: 'importExcelAndAnalyze',
    meta: {
      name: '导入 excel 并分析',
    },
    component: () => import('../views/importExcelAndAnalyze/index.vue'),
  },
  {
    path: '/importExcelByMulti',
    name: 'importExcelByMulti',
    meta: {
      name: '导入多个Excel',
    },
    component: () => import('../views/importExcelByMulti/index.vue'),
  },
  // {
  //   path: '/dropForm',
  //   name: 'dropForm',
  //   component: () => import('../views/dropForm/index.vue'),
  // },
  {
    path: '/captchaCode',
    name: 'captchaCode',
    meta: {
      name: '验证码',
    },
    component: () => import('../views/captchaCode/index.vue'),
  },
  {
    path: '/svgGen',
    name: 'svgGen',
    meta: {
      name: 'svg生成',
    },
    component: () => import('../views/svgGen/index.vue'),
  },
  // {
  //   path: '/eleComGen',
  //   name: 'eleComGen',
  //   meta: {
  //     name: 'element 组件生成',
  //   },
  //   component: () => import('../views/eleComGen/index.vue'),
  // },
  {
    path: '/noteBook',
    name: 'noteBook',
    meta: {
      name: '笔记本',
    },
    component: () => import('../views/noteBook/index.vue'),
  },
  // TODO: 测试功能
  // {
  //   path: '/menuAndRouter',
  //   name: 'menuAndRouter',
  //   meta: {
  //     name: '菜单和路由',
  //   },
  //   component: () => import('../views/menuAndRouter/index.vue'),
  // },
  // {
  //   path: '/menuManage',
  //   name: 'menuManage',
  //   meta: {
  //     name: '菜单管理',
  //   },
  //   component: () => import('../views/menuAndRouter/menuManage.vue'),
  // },
  {
    path: '/longForm',
    name: 'longForm',
    meta: {
      name: '长表单',
    },
    component: () => import('../views/longForm/index.vue'),
  },
  {
    path: '/tvStream',
    name: 'tvStream',
    meta: {
      name: '电视',
    },
    component: () => import('../views/tvStream/index.vue'),
  },
  {
    path: '/consoleCollect',
    name: 'consoleCollect',
    meta: {
      name: 'console 收集',
    },
    component: () => import('../views/consoleCollect/index.vue'),
  },
  // {
  //   path: '/trafficViolationReport',
  //   name: 'trafficViolationReport',
  //   meta: {
  //     name: '交通违规举报',
  //   },
  //   component: () => import('../views/trafficViolationReport/index.vue'),
  // },
  {
    path: '/fxxxThing',
    name: 'fxxxThing',
    meta: {
      name: 'fucking thing',
    },
    component: () => import('../views/fxxxThing/index.vue'),
  },
  {
    path: '/recordCalendar',
    name: 'recordCalendar',
    meta: {
      name: '日记',
    },
    component: () => import('../views/recordCalendar/index.vue'),
  },
  {
    path: '/nodesAndSteps',
    name: 'nodesAndSteps',
    meta: {
      name: '节点与步骤',
    },
    component: () => import('../views/nodesAndSteps/index.vue'),
  },
  {
    path: '/mindMap',
    name: 'mindMap',
    meta: {
      name: '思維导图',
    },
    component: () => import('../views/mindMap/index.vue'),
  },
  {
    path: '/editorByFlow',
    name: 'editorByFlow',
    meta: {
      name: '流程图编辑器',
    },
    component: () => import('../views/editorByFlow/index.vue'),
  },
  {
    path: '/purchaseRecords',
    name: 'purchaseRecords',
    meta: {
      name: '消费记录',
    },
    component: () => import('../views/purchaseRecords/index.vue'),
  },
  {
    path: '/usefulCharts',
    name: 'usefulCharts',
    meta: {
      name: '有用图表配置',
    },
    component: () => import('../views/usefulCharts/index.vue'),
  },
  {
    path: '/threeGrid',
    name: 'threeGrid',
    meta: {
      name: '3格联动',
    },
    component: () => import('../views/threeGrid/index.vue'),
  },
  {
    path: '/classicLayout',
    name: 'classicLayout',
    meta: {
      name: '经典布局',
    },
    component: () => import('../views/classicLayout/index.vue'),
  },
  {
    path: '/testPage',
    name: 'testPage',
    meta: {
      name: '功能测试页',
    },
    component: () => import('../views/testPage/index.vue'),
  },
  {
    path: '/productList',
    name: 'productList',
    meta: {
      name: '商品列表',
    },
    component: () => import('../views/productList/ProductList.vue'),
  },
  {
    path: '/dynamicPropsDrawer',
    name: 'dynamicPropsDrawer',
    meta: {
      name: '动态属性抽屉',
    },
    component: () => import('../views/dynamicProps/DynamicPropsDrawer.vue'),
  },
  {
    path: '/aboutList',
    name: 'aboutList',
    meta: {
      name: '列表',
    },
    component: () => import('../views/aboutList/index.vue'),
  },
]

export default routes
