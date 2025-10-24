import { ref } from "vue";
import { defineStore } from "pinia";

// 导入网络请求
import { getMenuOptionsAPI } from "../../api/components/menuoptions";

//首页LayoutStore
export const useLayoutStore = defineStore(
  "Layout",
  () => {
    // 侧边栏菜单选项数据
    const menuOptions = ref();

    // 获取侧边栏数据
    const getMenuOptions = async () => {
      const res = await getMenuOptionsAPI();
      // 存储到store中
      menuOptions.value = res;
      return res;
    };

    // 导出store数据
    return { menuOptions, getMenuOptions };
  },
  //持久化配置
  {
    persist: true,
  }
);
