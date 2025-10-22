<script setup lang="ts">
// 导入vue基础
import { h, ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
const router = useRouter();
const route = useRoute();

//ui库默认导入
import type { MenuOption } from "naive-ui";
import {
  BookmarkOutline,
  CaretDownOutline,
  CheckmarkCircle,
} from "@vicons/ionicons5";
import {
  BrandGithub,
  BrandGit,
  ArrowBigLeft,
  ArrowBigRight,
  Music,
  Link,
} from "@vicons/tabler";
import { NIcon } from "naive-ui";

// 导入store
import { useLayoutStore, useUserCounter } from "../../store";
const Layoutstore = useLayoutStore();
const Userstore = useUserCounter();

//menu数据
const menuOptions: MenuOption[] = Layoutstore.menuOptions;

// 侧边栏是否折叠
const collapsed = ref(true);

// 主题模式
import { lightTheme, darkTheme } from "../../utils/gloable";
const active = ref(Userstore.themeActive || false);
const theme = ref(active.value ? darkTheme : lightTheme);
const onUpdateTheme = (value: boolean) => {
  theme.value = value ? darkTheme : lightTheme;
  active.value = value;
  Userstore.SetThemeActive(value);
};

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
  <n-config-provider :theme-overrides="theme">
    <div style="height: 100vh; position: relative">
      <n-layout position="absolute">
        <n-layout
          has-sider
          position="absolute"
          style="top: 0px; bottom: 0px"
          class="LayoutContainer"
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
                  @update:value="OnMenuChoice($event)"
                  :value="defaultActiveKey"
                />
              </n-layout-content>
            </n-layout>
            <n-layout-footer
              position="absolute"
              style="background: rgba(0, 0, 0, 0)"
            >
              <n-flex
                justify="space-around"
                class="footer-container"
                :wrap="false"
              >
                <n-button
                  v-show="!collapsed"
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
                  style="
                    display: flex;
                    justify-content: center;
                    margin-bottom: 10px;
                  "
                >
                  <template #icon> 🤔 </template>
                </n-switch>
              </n-flex>
            </n-layout-footer>
          </n-layout-sider>
          <n-layout
            class="right-content"
            :native-scrollbar="false"
            style="background-color: transparent"
          >
            <n-layout style="background-color: transparent">
              <n-layout-header class="content-top">
                <n-flex justify="space-between" style="height: 100%">
                  <ul>
                    <li>
                      <n-button secondary strong class="apple-icon">
                        <template #icon>
                          <NIcon>
                            <ArrowBigLeft />
                          </NIcon>
                        </template>
                      </n-button>
                    </li>
                    <li>
                      <n-button secondary strong class="apple-icon">
                        <template #icon>
                          <NIcon>
                            <ArrowBigRight />
                          </NIcon>
                        </template>
                      </n-button>
                    </li>
                    <li>
                      <n-button secondary strong class="apple-icon">
                        <template #icon>
                          <NIcon>
                            <Music />
                          </NIcon>
                        </template>
                      </n-button>
                    </li>
                  </ul>
                  <ul>
                    <li>
                      <n-button secondary strong class="apple-icon">
                        <template #icon>
                          <NIcon>
                            <Link />
                          </NIcon>
                        </template>
                      </n-button>
                    </li>
                    <li class="apple-icon">
                      <n-ellipsis style="max-width: 240px">
                        住在我心里孤独的 孤独的海怪 痛苦之王 开始厌倦 深海的光
                        停滞的海浪
                      </n-ellipsis>
                    </li>
                  </ul>
                  <ul>
                    <li>
                      <n-tag round :bordered="false" type="success">
                        IsOk
                        <template #icon>
                          <n-icon :component="CheckmarkCircle" />
                        </template>
                      </n-tag>
                    </li>
                  </ul>
                </n-flex>
              </n-layout-header>
              <n-layout-content style="background-color: #e3e3e3">
                <router-view></router-view>
              </n-layout-content>
              <n-layout-footer>成府路</n-layout-footer>
            </n-layout>
          </n-layout>
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
  margin: 5px;
  border-radius: 5px;
  & .content-top {
    height: 30px;
    background-color: #fff;
    & ul {
      list-style: none;
      display: flex;
      justify-content: center;
      margin: 0;
      padding: 0 10px;
      & .apple-icon {
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: transparent;
        transition: color 0.3s ease;
        color: #898989;
        &:hover {
          color: #515151;
        }
      }
    }
  }
}
.footer-container {
  background-color: rgba(0, 0, 0, 0);
  & .n-button {
    transition: all 0.3s ease-in-out;
    &:hover {
      transform: scale(1.3);
    }
  }
}
</style>
