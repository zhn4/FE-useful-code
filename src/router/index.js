import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  // 汇总
  {
    path: "/SummaryOfComments",
    name: "SummaryOfComments",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/SummaryOfComments.vue"),
  },
  // 汇总的详情
  {
    path: "/commentDetails",
    name: "CommentDetails",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/CommentDetails.vue"),
  },
  // 修订管理 - 处理
  {
    path: "/handle",
    name: "Handle",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Handle.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
