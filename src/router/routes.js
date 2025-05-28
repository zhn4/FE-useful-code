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
  // {
  //   path: '/formAndTableRender',
  //   name: 'formAndTableRender',
  //   component: () => import('../views/FormAndTableRender.vue'),
  // },
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
    path: '/dropForm',
    name: 'dropForm',
    component: () => import('../views/dropForm/index.vue'),
  },
  {
    path: '/captchaCode',
    name: 'captchaCode',
    meta: {
      name: '验证码',
    },
    component: () => import('../views/captchaCode/index.vue'),
  },
  // {
  //   path: '/processMap',
  //   name: 'processMap',
  //   meta: {
  //     name: '流程图',
  //   },
  //   component: () => import('../views/processMap/index.vue'),
  // },
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
  // {
  //   path: '/showCode',
  //   name: 'showCode',
  //   meta: {
  //     name: '源码',
  //   },
  //   component: () => import('../views/showCode/index.vue'),
  // },
  // TODO: 测试功能
  // {
  //   path: '/menuAndRouter',
  //   name: 'menuAndRouter',
  //   meta: {
  //     name: '菜单和路由',
  //   },
  //   component: () => import('../views/menuAndRouter/index.vue'),
  // },
  {
    path: '/longForm',
    name: 'longForm',
    meta: {
      name: '长表单',
    },
    component: () => import('../views/longForm/index.vue'),
  },
]

export default routes
