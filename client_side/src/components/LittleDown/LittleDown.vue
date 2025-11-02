<script setup>
import { onMounted } from "vue";
import "./style.css";

import { init } from "./script.js";

onMounted(() => {
  init();
});
</script>

<template>
  <div class="stage"></div>
</template>

<style scoped lang="scss"></style>
