import { ref } from "vue";
import { defineStore } from "pinia";

export const useUserCounter = defineStore(
  "userCounter",
  () => {
    //用户主题模式
    const themeActive = ref(false);
    // 侧边栏是否折叠数据
    const collapsed = ref(true);

    // 修改主题设置
    const SetThemeActive = (values: boolean) => {
      themeActive.value = values;
    };
    // 修改侧边栏折叠状态
    const setCollapsed = (value: boolean) => {
      collapsed.value = value;
    };
    return { themeActive, collapsed, SetThemeActive, setCollapsed };
  },
  {
    persist: true,
  }
);
