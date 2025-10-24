import { ref } from "vue";
import { defineStore } from "pinia";

export const useUserCounter = defineStore(
  "userCounter",
  () => {
    //用户主题模式
    const themeActive = ref(false);

    // 修改主题设置
    const SetThemeActive = (values: boolean) => {
      themeActive.value = values;
    };
    return { themeActive, SetThemeActive };
  },
  {
    persist: true,
  }
);
