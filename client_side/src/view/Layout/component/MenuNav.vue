<script setup lang="ts">
// 导入vue基础
import { h, ref, onMounted } from "vue";

// 导入路由模块
import { useRouter, useRoute } from "vue-router";
const router = useRouter();
const route = useRoute();

// 导入store
import { useLayoutStore, useUserCounter } from "@/store";
const Layoutstore = useLayoutStore();
const Userstore = useUserCounter();

// 设置主题模式
const emit = defineEmits(["updatethemeActive"]);
const active = ref(Userstore.themeActive || false);
// 传入主函数，用于更新主题
const onUpdateTheme = (value: boolean) => {
  active.value = value;
  Userstore.SetThemeActive(value);
  emit("updatethemeActive", active.value);
};

//ui库默认导入
import { LabelRound } from "@vicons/material";
import { BrandGithub, BrandGit } from "@vicons/tabler";
import { NIcon } from "naive-ui";
// 导入ui库类型
import type { MenuOption } from "naive-ui";

//menu数据
const menuOptions = ref<MenuOption[]>([]);
onMounted(async () => {
  menuOptions.value =
    // 如果store中没有数据，才调用接口获取
    Layoutstore.menuOptions || (await Layoutstore.getMenuOptions());
});

// 侧边栏是否折叠数据
const collapsed = ref<boolean>(Userstore.collapsed);
const onCollapsed = (value: boolean) => {
  collapsed.value = value;
  Userstore.setCollapsed(value);
};

// 侧边栏点击路由跳转
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
import { iconMap } from "@/utils/icon";
// 导入图标类型
import type { tciontype } from "@/types/Layout";
// 声明一个图标功能函数，用于渲染图标
function renderMenuIcon(option: tciontype) {
  // 判断是否存在图标选项，并且图标是否存在
  if (option.ticon && iconMap[option.ticon]) {
    const iconComponent = iconMap[option.ticon];
    return h(NIcon, null, { default: () => h(iconComponent) });
  }
  // 如果图标不存在，返回默认图标
  return h(NIcon, null, { default: () => h(LabelRound) });
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

//跳转github或gitee
const goGithub = (type: string) => {
  window.open(
    type === "github"
      ? "https://github.com/LittlPenguin"
      : "https://gitee.com/colasheep"
  );
};

// 菜单功能
//配置默认选择项
const defaultActiveKey = ref();
if (route.path === "/") {
  defaultActiveKey.value = "first";
}
// 侧边栏菜单选项选择
const OnMenuChoice = (value: string) => {
  defaultActiveKey.value = value;
};
</script>
<template>
  <n-layout-sider
    content-class="content-class"
    :native-scrollbar="false"
    collapse-mode="width"
    :collapsed-width="120"
    :width="230"
    show-trigger="bar"
    :collapsed="collapsed"
    @update:collapsed="onCollapsed($event)"
    class="left-sider"
    top="5px"
    collapsed-trigger-style="right: -10px;"
    trigger-style="right: -10px;"
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
          @update:value="OnMenuChoice($event)"
          :value="defaultActiveKey"
        />
      </n-layout-content>
    </n-layout>
    <n-layout-footer position="absolute" style="background: rgba(0, 0, 0, 0)">
      <n-flex justify="space-around" class="footer-container" :wrap="false">
        <n-button
          v-show="!collapsed"
          :focusable="false"
          :bordered="false"
          circle
          @click="goGithub('gitee')"
        >
          <template #icon>
            <NIcon>
              <BrandGit />
            </NIcon>
          </template>
        </n-button>
        <n-button
          v-show="!collapsed"
          :bordered="false"
          :focusable="false"
          circle
          @click="goGithub('github')"
        >
          <template #icon>
            <NIcon>
              <BrandGithub />
            </NIcon>
          </template>
        </n-button>
        <n-switch
          v-model:value="active"
          @update:value="onUpdateTheme($event)"
          size="large"
          style="display: flex; justify-content: center; margin-bottom: 10px"
        >
          <template #icon> 🤔 </template>
        </n-switch>
      </n-flex>
    </n-layout-footer>
  </n-layout-sider>
</template>

<style scoped>
.left-sider {
  height: 98.6vh;
  position: sticky;
  top: 5px;
  left: -5px;
  transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 2.2);
  background: #ffffff14;
  margin: 4px 0;
  border: 5px solid transparent;
  box-shadow: 0 0 0 2px #ffffff99, 0 16px 32px #1d17171f;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  padding-left: 5px;

  & .footer-container {
    background-color: rgba(0, 0, 0, 0);
    & .n-button {
      transition: all 0.3s ease-in-out;
      &:hover {
        transform: scale(1.3);
      }
    }
  }
  & .n-layout-toggle-bar {
    right: 15px;
  }
}
</style>
