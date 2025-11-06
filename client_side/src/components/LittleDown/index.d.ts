// 声明组件类型，以免调用报错
declare module "@/components/LittleDown/index.vue" {
  import { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;
  export default component;
}
