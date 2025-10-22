<script setup lang="ts">
// 导入vue基础
import { h, ref, onMounted } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();

//ui库默认导入
import type { MenuOption } from "naive-ui";
import { BookmarkOutline, CaretDownOutline } from "@vicons/ionicons5";
import { NIcon } from "naive-ui";

// 侧边栏是否折叠
const collapsed = ref(true);

// 主题
import { lightTheme, darkTheme } from "../../utils/gloable";
const active = ref(false);
const theme = ref(lightTheme);
const onUpdateTheme = (value: boolean) => {
  theme.value = value ? darkTheme : lightTheme;
  active.value = value;
};

//数据
const menuOptions: MenuOption[] = [
  {
    label: "且听风吟",
    key: "hear-the-wind-sing",
    href: "/",
  },
  {
    label: "1973年的弹珠玩具",
    key: "pinball-1973",
    children: [
      {
        label: "鼠",
        key: "rat",
      },
    ],
  },
  {
    label: "寻羊冒险记",
    key: "a-wild-sheep-chase",
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
];

// 路由跳转
function renderMenuLabel(option: MenuOption) {
  if ("href" in option) {
    return h(
      "a",
      { onClick: () => router.push(option.href as string) },
      option.label as string
    );
  }
  return option.label as string;
}

//图标
function renderMenuIcon(option: MenuOption) {
  // 渲染图标占位符以保持缩进
  if (option.key === "sheep-man") return true;
  // 返回 falsy 值，不再渲染图标及占位符
  if (option.key === "food") return null;
  return h(NIcon, null, { default: () => h(BookmarkOutline) });
}
function expandIcon() {
  return h(NIcon, null, { default: () => h(CaretDownOutline) });
}

// 侧边栏旋转功能
onMounted(() => {
  const leftsider = document.querySelector<HTMLDivElement>(".left-sider");

  // 鼠标移动时旋转侧边栏
  leftsider?.addEventListener("mousemove", (e: MouseEvent) => {
    const react = leftsider?.getBoundingClientRect();
    const x = (e.clientX - react.left) / react.width;
    const y = (e.clientY - react.top) / react.height;
    const tiX = (x - 0.5) * 25;
    const tiY = (y - 0.5) * 25;
    // 添加可选链操作符，确保类型安全
    leftsider.style.transform = `rotateX(${
      tiY < 0 ? -tiX : tiX
    }deg) rotateY(${tiY}deg)`;
  });
  // 鼠标离开时重置旋转角度
  leftsider?.addEventListener("mouseleave", () => {
    leftsider.style.transform = "rotateX(0deg) rotateY(0deg)";
  });
});
</script>

<template>
  <n-config-provider :theme-overrides="theme">
    <div style="height: 100vh; position: relative">
      <n-layout position="absolute">
        <n-layout
          has-sider
          position="absolute"
          style="top: 0px; bottom: 0px"
          class="container"
        >
          <n-layout-sider
            content-class="content-class"
            :native-scrollbar="false"
            collapse-mode="width"
            :collapsed-width="120"
            :width="230"
            show-trigger="bar"
            :collapsed="collapsed"
            @collapse="collapsed = true"
            @expand="collapsed = false"
            class="left-sider"
          >
            <n-layout style="background-color: transparent">
              <n-layout-content
                style="height: 650px; background-color: transparent"
                :native-scrollbar="false"
              >
                <n-menu
                  :collapsed="collapsed"
                  :collapsed-width="64"
                  :collapsed-icon-size="22"
                  :options="menuOptions"
                  :render-label="renderMenuLabel"
                  :render-icon="renderMenuIcon"
                  :expand-icon="expandIcon"
                />
              </n-layout-content>
            </n-layout>
            <n-layout-footer
              position="absolute"
              style="background: rgba(0, 0, 0, 0)"
            >
              <n-switch
                v-model:value="active"
                @update:value="onUpdateTheme($event)"
                size="large"
                style="
                  display: flex;
                  justify-content: center;
                  margin-bottom: 10px;
                "
              >
                <template #icon> 🤔 </template>
              </n-switch>
            </n-layout-footer>
          </n-layout-sider>
          <n-layout
            content-style="padding: 24px;"
            class="right-content"
            :native-scrollbar="false"
          >
            <router-view></router-view>
          </n-layout>
        </n-layout>
      </n-layout>
    </div>
  </n-config-provider>
</template>

<style scoped lang="scss">
.container {
  background: url("../../assets/moon.png") no-repeat;
  background-position: center center;
  background-size: cover;
  background-attachment: fixed;
}
// .left-sider {
// background-color: rgba(255, 255, 255, 0.35);
// backdrop-filter: blur(6px);
// -webkit-backdrop-filter: blur(6px);
// border: 0.8px solid rgba(255, 255, 255, 0.18);
// border-radius: 21px;
// -webkit-border-radius: 21px;
// color: rgb(255, 255, 255);
// transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 2.2);
//   box-shadow: 0 6px 6px rgba(0, 0, 0, 0.2), 0 0 20px rgba(0, 0, 0, 0.1);
// -webkit-box-shadow: 0 6px 6px rgba(0, 0, 0, 0.2), 0 0 20px rgba(0, 0, 0, 0.1);
// }

.left-sider {
  position: relative;
  left: -5px;
  transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 2.2);
  background: #ffffff14;
  margin: 4px 0;
  border: 5px solid transparent;
  box-shadow: 0 0 0 2px #ffffff99, 0 16px 32px #0000001f;
  border-top-right-radius: 21px;
  border-bottom-right-radius: 21px;
  padding-left: 5px;
}

.right-content {
  background-color: #ffffff00;
}
</style>
