<script setup lang="ts">
import { CheckmarkCircle } from "@vicons/ionicons5";
import { ArrowBigLeft, ArrowBigRight, Music, Link } from "@vicons/tabler";
</script>

<template>
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
        <div class="ContentContainer">
          <n-layout></n-layout>
        </div>
      </n-layout-content>
      <n-layout-footer>成府路</n-layout-footer>
    </n-layout>
  </n-layout>
</template>

<style scoped lang="scss">
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
.ContentContainer {
  min-height: 100vh;
}
</style>
