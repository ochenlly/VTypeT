import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/login",
    component: () => import("../views/Login.vue"),
  },
  {
    path: "/register",
    component: () => import("../views/Register.vue"),
  },
  {
    path: "/home",
    component: () => import("../views/Home.vue"),
    redirect: "/work",
    children: [
      {
        path: "/work",
        meta: {
          isShow: true,
          title: "工作区",
        },
        component: () => import("../views/Work.vue"),
      },
      {
        path: "/table",
        meta: {
          isShow: true,
          title: "表格",
        },
        component: () => import("../views/Table.vue"),
      },
      {
        path: "/form",
        meta: {
          isShow: true,
          title: "表单",
        },
        component: () => import("../views/Form.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
