import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";

//导入pinia库
import pinia from "./store/index";

// 导入路由模块
import router from "./router";

const app = createApp(App);
app.use(pinia);
app.use(router);
app.mount("#app");
