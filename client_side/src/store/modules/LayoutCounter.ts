import { ref } from "vue";
import { defineStore } from "pinia";

//首页LayoutStore
export const useLayoutStore = defineStore(
  "Layout",
  () => {
    // 侧边栏菜单选项数据
    const menuOptions = ref([
      {
        label: "首页",
        key: "first",
        href: "/",
      },
      {
        label: "第二页",
        key: "second",
        children: [
          {
            label: "鼠",
            key: "rat",
          },
        ],
      },
      {
        label: "舞，舞，舞",
        key: "dance-dance-dance",
        children: [
          {
            type: "group",
            label: "人物",
            key: "people",
            children: [
              {
                label: "叙事者",
                key: "narrator",
              },
              {
                label: "羊男",
                key: "sheep-man",
              },
            ],
          },
          {
            label: "饮品",
            key: "beverage",
            children: [
              {
                label: "威士忌",
                key: "whisky",
                href: "/",
              },
            ],
          },
          {
            label: "食物",
            key: "food",
            children: [
              {
                label: "三明治",
                key: "sandwich",
              },
            ],
          },
          {
            label: "过去增多，未来减少",
            key: "the-past-increases-the-future-recedes",
          },
        ],
      },
    ]);
    return { menuOptions };
  },
  //持久化配置
  {
    persist: true,
  }
);
