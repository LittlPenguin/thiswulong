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

import { useMusicStore } from "@/store/modules/MusicCounter";
const musicStore = useMusicStore();

// 导入音乐数据
import { musicMap } from "@/utils/music";
// 导入事件
const emit = defineEmits(["handle", "changeMusic"]);
const props = defineProps({
  PlayModel: Boolean,
});

// 判断是否在播放
onMounted(() => {
  if (props.PlayModel) {
    PlayModel.value = true;
  } else {
    PlayModel.value = false;
  }
});

// 定义播放状态
const PlayModel = ref(false);
const playSound = (value: boolean) => {
  PlayModel.value = value;
  emit("handle", value);
};

// 定义进度条值
const SoundSinglevalue = ref(0);
const max = ref(100);
const min = ref(0);

// 定义音量
const soundVolume = ref(musicStore.soundVolume || 0);
const soundEX = ref(0);
const SoundGo = (value: boolean) => {
  if (value) {
    soundEX.value = 100;
  } else {
    soundEX.value = 0;
  }
};
// 处理音量变化
const handleSound = (values: number) => {
  soundVolume.value = values;
  // 存入数据
  musicStore.setSoundVol(values);
};

// 标题
const title = ref("");
const SubTitle = ref("");
onMounted(() => {
  title.value = musicStore.musicList[0] || "无播放";
  SubTitle.value = musicStore.musicList[1] || "无播放";
  selectedMusic.value = musicStore.musicList[2] || "";
});

// 定义选择音乐
const selectedMusic = ref("");
// 选择音乐事件
const handelasdlajsld = (value: string) => {
  selectedMusic.value = value;
  title.value = selectedMusic.value?.split(" - ")[0]?.trim() || "无播放";
  SubTitle.value = selectedMusic.value?.split(" - ")[1]?.trim() || "无播放";
  // 播放状态
  playSound(false);
  // 存入数据
  musicStore.setMusicList([title.value, SubTitle.value, selectedMusic.value]);
};
</script>
<template>
  <div class="MusicContainer">
    <ul>
      <li class="header">
        <ul>
          <li class="MainTitle">
            <n-marquee> {{ title }} </n-marquee>
          </li>
          <li class="SubTitle">
            <n-ellipsis style="max-width: 100px"> {{ SubTitle }} </n-ellipsis>
          </li>
        </ul>
      </li>
      <li class="content">
        <ul>
          <li style="display: flex">
            <NIcon style="padding: 0 10px">
              <Music />
            </NIcon>
            <n-slider v-model:value="SoundSinglevalue" :max="max" :min="min" />
          </li>
          <li class="time">00:00/00:00</li>
        </ul>
      </li>
      <li class="footer">
        <ul>
          <li>
            <n-popselect
              v-model:value="selectedMusic"
              :options="musicMap"
              scrollable
              size="small"
              @update:value="handelasdlajsld"
            >
              <n-button :focusable="false" text style="font-size: 24px">
                <n-icon>
                  <FormatListBulletedFilled />
                </n-icon>
              </n-button>
            </n-popselect>
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
          <li @mouseenter="SoundGo(true)" @mouseleave="SoundGo(false)">
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
                  :default-value="soundVolume"
                  class="sound-slider"
                  :class="{ 'sound-slider-show': soundEX != 0 }"
                  :style="{
                    width: soundEX + 'px',
                  }"
                  @update:value="handleSound"
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
