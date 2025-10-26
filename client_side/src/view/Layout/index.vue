<script setup lang="ts">
// 导入必要vue组件
import { ref } from "vue";

// 导入store模块
import { useUserCounter } from "@/store";
const Userstore = useUserCounter();

// 导入侧边栏组件
import MenuNav from "./component/MenuNav.vue";
import Content from "./component/content.vue";

// 导入图标组件
import { lightTheme, darkTheme } from "@/utils/gloable";
// 设置默认主题模式和修改主题模式
const theme = ref(Userstore.themeActive ? darkTheme : lightTheme);
const onTheme = (value: boolean) => {
  theme.value = value ? darkTheme : lightTheme;
};
</script>

<template>
  <n-config-provider :theme-overrides="theme">
    <div style="height: 100vh; position: relative">
      <n-layout position="absolute">
        <n-layout
          has-sider
          position="absolute"
          style="top: 0px; bottom: 0px"
          class="LayoutContainer"
        >
          <!-- 侧边栏 -->
          <MenuNav @updatethemeActive="onTheme" />
          <!-- 内容 -->
          <Content />
        </n-layout>
      </n-layout>
    </div>
  </n-config-provider>
</template>

<style scoped lang="scss">
.LayoutContainer {
  background: url("../../assets/moon.png") no-repeat;
  background-position: center center;
  background-size: cover;
  background-attachment: fixed;
}
</style>
