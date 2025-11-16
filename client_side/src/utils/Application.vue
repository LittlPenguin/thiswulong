<template>
  <NConfigProvider>
    <n-loading-bar-provider>
      <LoadingBarContent />
      <n-dialog-provider>
        <DialogContent />
        <n-notification-provider>
          <n-message-provider>
            <MessageContent />
            <slot></slot>
          </n-message-provider>
        </n-notification-provider>
      </n-dialog-provider>
    </n-loading-bar-provider>
  </NConfigProvider>
</template>

<script lang="ts" setup>
import { MessageContent } from "./Message";
import { DialogContent } from "./Dialog";
import { LoadingBarContent } from "./Loadingbar/index.ts";
import {
  NConfigProvider,
  NDialogProvider,
  NNotificationProvider,
  NMessageProvider,
  NLoadingBarProvider,
} from "naive-ui";
</script>
