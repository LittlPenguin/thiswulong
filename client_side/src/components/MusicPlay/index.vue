<script setup lang="ts">
// 导入vue
import { ref, onMounted } from "vue";
// 导入图标
import { Music, BrandSoundcloud } from "@vicons/tabler";
import {
  FormatListBulletedFilled,
  KeyboardDoubleArrowLeftOutlined,
  PlayArrowRound,
  KeyboardDoubleArrowRightOutlined,
  PauseCircleOutlineTwotone,
} from "@vicons/material";

// 导入事件
const emit = defineEmits(["handle"]);
const props = defineProps({
  PlayModel: Boolean,
});

onMounted(() => {
  // 判断是否在播放
  if (props.PlayModel) {
    PlayModel.value = true;
  } else {
    PlayModel.value = false;
  }
});

const PlayModel = ref(false);
const playSound = (value: boolean) => {
  PlayModel.value = value;
  emit("handle", value);
};

// 定义进度条值
const value = ref(0);
const max = ref(0);
const min = ref(0);

var soundEX = ref(0);
const go = (value: boolean) => {
  if (value) {
    soundEX.value = 100;
  } else {
    soundEX.value = 0;
  }
};

const options = [
  {
    label: "滨海湾金沙，新加坡",
    key: "marina bay sands",
    disabled: true,
  },
  {
    label: "布朗酒店，伦敦",
    key: "brown's hotel, london",
  },
  {
    label: "亚特兰蒂斯巴哈马，拿骚",
    key: "atlantis nahamas, nassau",
  },
  {
    label: "比佛利山庄酒店，洛杉矶",
    key: "the beverly hills hotel, los angeles",
  },
];

const handleSelect = (value) => {
  console.log(value);
};
</script>
<template>
  <div class="MusicContainer">
    <ul>
      <li class="header">
        <ul>
          <li class="MainTitle">
            <n-marquee> 七里香 </n-marquee>
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
            <n-slider v-model:value="value" :max="max" :min="min" />
          </li>
          <li class="time">00:00/00:00</li>
        </ul>
      </li>
      <li class="footer">
        <ul>
          <li>
            <n-dropdown
              trigger="hover"
              :options="options"
              @select="handleSelect"
            >
              <n-button :focusable="false" text style="font-size: 24px">
                <n-icon>
                  <FormatListBulletedFilled />
                </n-icon>
              </n-button>
            </n-dropdown>
          </li>
          <li>
            <n-button :focusable="false" text style="font-size: 24px">
              <n-icon>
                <KeyboardDoubleArrowLeftOutlined />
              </n-icon>
            </n-button>
          </li>
          <li>
            <n-button
              :focusable="false"
              text
              style="font-size: 24px"
              @click="playSound(!PlayModel)"
            >
              <n-icon v-show="!PlayModel">
                <PlayArrowRound />
              </n-icon>
              <n-icon v-show="PlayModel">
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
          <li @mouseenter="go(true)" @mouseleave="go(false)">
            <n-button
              :focusable="false"
              text
              style="font-size: 24px; position: relative"
            >
              <n-icon>
                <BrandSoundcloud />
              </n-icon>
              <n-space>
                <n-slider
                  class="sound-slider"
                  :class="{ 'sound-slider-show': soundEX != 0 }"
                  :style="{
                    width: soundEX + 'px',
                  }"
                />
              </n-space>
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
        & .sound-slider {
          transition: all 0.5s ease-in-out;
          opacity: 0;
          &.sound-slider-show {
            opacity: 1;
          }
        }
      }
    }
  }
}
</style>
