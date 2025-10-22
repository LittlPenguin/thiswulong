//配置pinia实例
import { createPinia } from "pinia";
import piniaPlugin from "pinia-plugin-persistedstate";

//创建pinia实例
const pinia = createPinia();
//使用持久化插件
pinia.use(piniaPlugin);

export default pinia;
//导出所有模块
export * from "./modules/LayoutCounter";
export * from "./modules/userCounter";
