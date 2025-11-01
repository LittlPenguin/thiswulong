<script setup lang="ts">
// 导入vue
import Top from "@/components/Top/index.vue";
</script>

<template>
  <div class="ContentLayout">
    <Top />
    <div style="background-color: #e3e3e3" class="ContentContainer">
      <router-view></router-view>
    </div>
  </div>
</template>

<style scoped lang="scss">
.ContentLayout {
  width: 100%;
  border-radius: 5px;
  & .ContentContainer {
    min-height: 95vh;
  }
}
</style>
