<script setup lang="ts">
// 导入必要vue组件
import { onMounted, ref } from "vue";
import { gsap } from "gsap";
import { ScrollTrigger, ScrollSmoother } from "gsap/all";
// ScrollSmoother requires ScrollTrigger
gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
// 导入store模块
import { useUserCounter } from "@/store";
const Userstore = useUserCounter();

// 导入侧边栏组件
import MenuNav from "./component/MenuNav.vue";
import Content from "./component/content.vue";
// 导入顶部导航组件
import Top from "@/components/Top/index.vue";

// 导入图标组件
import { lightTheme, darkTheme } from "@/utils/gloable";
// 设置默认主题模式和修改主题模式
const theme = ref(Userstore.themeActive ? darkTheme : lightTheme);
const onTheme = (value: boolean) => {
  theme.value = value ? darkTheme : lightTheme;
};
onMounted(() => {
  // 滚动平滑器
  ScrollSmoother.create({
    smooth: 2, // how long (in seconds) it takes to "catch up" to the native scroll position
    effects: true, // looks for data-speed and data-lag attributes on elements
    smoothTouch: 0.1, // much shorter smoothing time on touch devices (default is NO smoothing on touch devices)
  });
  //滚动触发器
  ScrollTrigger.create({
    onUpdate: (self) => topHidorShow(self.direction),
  });
});
const UpDown = ref(-1);

const topHidorShow = (direction: number) => {
  UpDown.value = direction;
};
</script>

<template>
  <n-config-provider :theme-overrides="theme">
    <div class="LayoutContainer">
      <!-- 侧边栏 -->
      <div class="left-aside">
        <MenuNav @updatethemeActive="onTheme" />
      </div>
      <!-- 内容 -->
      <div class="contentapp" style="width: 100%">
        <!--顶部导航-->
        <Top :UpDown="UpDown" />
        <div id="smooth-wrapper">
          <div id="smooth-content">
            <Content @updatethemeActive="onTheme" />
          </div>
        </div>
        ;
      </div>
    </div>
  </n-config-provider>
</template>

<style scoped lang="scss">
.LayoutContainer {
  display: flex;
  min-height: 100vh;
  & .left-aside {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
  }
}
</style>
