<script setup lang="ts">
// 导入必要vue组件
import { ref } from "vue";

// 导入store模块
import { useUserCounter } from "../../store";
const Userstore = useUserCounter();

// 导入侧边栏组件
import MenuNav from "./component/MenuNav.vue";

// 导入图标组件
import { CheckmarkCircle } from "@vicons/ionicons5";
import { ArrowBigLeft, ArrowBigRight, Music, Link } from "@vicons/tabler";
import { lightTheme, darkTheme } from "../../utils/gloable";

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
          <MenuNav @updatethemeActive="onTheme" />
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
