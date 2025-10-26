<script setup lang="ts">
// 导入组件
import MusicPlay from "../../../components/MusicPlay/index.vue";
// 导入ui组件库
import { CheckmarkCircle } from "@vicons/ionicons5";
import { ArrowBigLeft, ArrowBigRight, Music, Link } from "@vicons/tabler";
import { ErrorOutlineRound } from "@vicons/material";

// 导入vue
import { onMounted, ref } from "vue";

// 加载
const show = ref(false);
onMounted(() => {
  show.value = true;
});
</script>

<template>
  <n-layout style="margin: 5px" :native-scrollbar="false" class="ContentLayout">
    <div class="content-top">
      <n-flex justify="space-between" style="height: 100%">
        <ul>
          <li>
            <n-button
              secondary
              strong
              class="apple-icon"
              @click="$router.go(-1)"
            >
              <template #icon>
                <NIcon>
                  <ArrowBigLeft />
                </NIcon>
              </template>
            </n-button>
          </li>
          <li>
            <n-button
              secondary
              strong
              class="apple-icon"
              @click="$router.go(1)"
            >
              <template #icon>
                <NIcon>
                  <ArrowBigRight />
                </NIcon>
              </template>
            </n-button>
          </li>
          <li>
            <n-popover
              trigger="hover"
              style="
                background: #83bbd88f;
                border: 5px solid transparent;
                box-shadow: 0 0 0 2px #ffffff99, 0 16px 32px #1d17171f;
                backdrop-filter: blur(10px);
              "
            >
              <template #trigger>
                <n-button secondary strong class="apple-icon">
                  <template #icon>
                    <NIcon>
                      <Music />
                    </NIcon>
                  </template>
                </n-button>
              </template>
              <MusicPlay />
            </n-popover>
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
              住在我心里孤独的 孤独的海怪 痛苦之王 开始厌倦 深海的光 停滞的海浪
            </n-ellipsis>
          </li>
        </ul>
        <ul>
          <li>
            <n-tag v-if="show" round :bordered="false" type="success">
              IsOk
              <template #icon>
                <n-icon :component="CheckmarkCircle" />
              </template>
            </n-tag>
            <n-tag v-else round :bordered="false">
              NoOk
              <template #icon>
                <n-icon :component="ErrorOutlineRound" />
              </template>
            </n-tag>
          </li>
        </ul>
      </n-flex>
    </div>
    <n-layout
      style="background-color: #e3e3e3"
      class="ContentContainer"
      :native-scrollbar="false"
    >
      <router-view></router-view>
    </n-layout>
  </n-layout>
</template>

<style scoped lang="scss">
.ContentLayout {
  border-radius: 5px;
  & .content-top {
    position: sticky;
    width: 100%;
    top: 0;
    z-index: 999;
    background-color: #fff;
    border-top-right-radius: 5px;
    border-top-left-radius: 5px;
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

  & .ContentContainer {
    min-height: 95vh;
  }
}
</style>
