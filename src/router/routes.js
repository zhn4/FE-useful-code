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
    name: 'NormalListPage',
    meta: {
      name: '普通列表页',
    },
    component: () => import('../views/NormalListPage.vue'),
  },
  {
    path: '/tabFlexTable',
    name: 'tabFlexTable',
    meta: {
      name: '标签+列表页组合',
    },
    component: () => import('../views/TabFlexTable.vue'),
  },
  {
    path: '/handle',
    name: 'Handle',
    component: () => import('../views/Handle.vue'),
  },
  {
    path: '/listAndDialog',
    name: 'listAndDialog',
    meta: {
      name: 'dialog 二次封装',
    },
    component: () => import('../views/ListAndDialog.vue'),
  },
  {
    path: '/formAndTable',
    name: 'formAndTable',
    meta: {
      name: '表格+表单，并输入校验',
    },
    component: () => import('../views/FormAndTable.vue'),
  },
  {
    path: '/formAndTableRender',
    name: 'formAndTableRender',
    component: () => import('../views/FormAndTableRender.vue'),
  },
  {
    path: '/testSlot',
    name: 'testSlot',
    meta: {
      name: 'slot 插槽的调用方法',
    },
    component: () => import('../views/TestSlot.vue'),
  },
  {
    path: '/flexTable',
    name: 'flexTable',
    component: () => import('../views/FlexTable.vue'),
  },
  {
    path: '/regList',
    name: 'regList',
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
]

export default routes
