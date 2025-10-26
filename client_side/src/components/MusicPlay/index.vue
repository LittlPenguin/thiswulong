<script setup lang="ts">
// 导入vue
import { ref } from "vue";
import { Music, BrandSoundcloud } from "@vicons/tabler";
import {
  FormatListBulletedFilled,
  KeyboardDoubleArrowLeftOutlined,
  PlayArrowRound,
  KeyboardDoubleArrowRightOutlined,
  PauseCircleOutlineTwotone,
} from "@vicons/material";

const value = ref(50);
</script>
<template>
  <div class="MusicContainer">
    <ul>
      <li class="header">
        <ul>
          <li class="MainTitle">
            <n-marquee speed="40"> 七里香 </n-marquee>
          </li>
          <li class="SubTitle">
            <n-ellipsis style="max-width: 100px"> 周杰伦 </n-ellipsis>
          </li>
        </ul>
      </li>
      <li class="content">
        <ul>
          <li style="display: flex">
            <NIcon style="padding: 0 10px">
              <Music />
            </NIcon>
            <n-slider v-model:value="value" />
          </li>
          <li class="time">00:00/00:00</li>
        </ul>
      </li>
      <li class="footer">
        <ul>
          <li>
            <n-button :focusable="false" text style="font-size: 24px">
              <n-icon>
                <FormatListBulletedFilled />
              </n-icon>
            </n-button>
          </li>
          <li>
            <n-button :focusable="false" text style="font-size: 24px">
              <n-icon>
                <KeyboardDoubleArrowLeftOutlined />
              </n-icon>
            </n-button>
          </li>
          <li>
            <n-button :focusable="false" text style="font-size: 24px">
              <n-icon v-show="true">
                <PlayArrowRound />
              </n-icon>
              <n-icon v-show="false">
                <PauseCircleOutlineTwotone />
              </n-icon>
            </n-button>
          </li>
          <li>
            <n-button :focusable="false" text style="font-size: 24px">
              <n-icon>
                <KeyboardDoubleArrowRightOutlined />
              </n-icon>
            </n-button>
          </li>
          <li>
            <n-button :focusable="false" text style="font-size: 24px">
              <n-icon>
                <BrandSoundcloud />
              </n-icon>
            </n-button>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.MusicContainer {
  width: 300px;
  & ul {
    display: flex;
    flex-direction: column;
    align-items: center;
    list-style: none;
    padding: 0;
    margin: 0;
    & .MainTitle {
      font-size: 18px;
      font-weight: bold;
      letter-spacing: 3px;
    }
    & .SubTitle {
      font-size: 7px;
      font-weight: normal;
    }
    & li {
      width: 100%;
      text-align: center;
    }
    & .content {
      ul {
        margin: 15px 0;
        & .time {
          font-size: 10px;
          color: #717171;
        }
      }
    }
    & .footer {
      ul {
        display: flex;
        flex-direction: row;
      }
    }
  }
}
</style>
