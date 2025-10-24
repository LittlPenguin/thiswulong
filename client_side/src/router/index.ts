import { createWebHistory, createRouter } from "vue-router";

// 导入布局组件
import Layout from "../view/Layout/index.vue";
import Content from "../view/Layout/component/content.vue";

// 定义路由规则
const routes = [
  {
    path: "/",
    component: Layout,
    children: [{ path: "/", component: Content }],
  },
];

// 创建路由实例
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
