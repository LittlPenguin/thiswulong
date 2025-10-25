import { createWebHistory, createRouter } from "vue-router";

// 导入布局组件
import Layout from "../view/Layout/index.vue";
import second from "../view/PageComponent/second.vue";
import third from "../view/PageComponent/third.vue";

// 定义路由规则
const routes = [
  {
    path: "/",
    component: Layout,
    children: [
      {
        path: "/second",
        component: second,
      },
      {
        path: "/third",
        component: third,
      },
    ],
  },
];

// 创建路由实例
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
