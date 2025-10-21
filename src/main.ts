import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";

// 导入路由模块
import router from "./router";

createApp(App).use(router).mount("#app");
