<script setup lang="ts">
// 导入vue
import { ref, onMounted, watch } from "vue";
// 导入图标
import { Music, BrandSoundcloud, ArrowsShuffle2 } from "@vicons/tabler";
//  AirOutlined顺序  material
// ArrowsShuffle2随机 tabler
import {
  FormatListBulletedFilled,
  KeyboardDoubleArrowLeftOutlined,
  PlayArrowRound,
  KeyboardDoubleArrowRightOutlined,
  PauseCircleOutlineTwotone,
  AirOutlined,
} from "@vicons/material";

// 导入音乐状态管理
import { useMusicStore } from "@/store/modules/MusicCounter";
const musicStore = useMusicStore();

// 导入音乐数据
const musicMap = ref(musicStore.theMusicList);
// 导入事件
const emit = defineEmits([
  "handle",
  "changeMusic",
  "changeVolume",
  "exChangeMusic",
  "changeValue",
  "ChangemMusicPlayModel",
]);
// 获取父传子属性
const props = defineProps({
  // 播放状态
  PlayModel: Boolean,
  // 时间
  maxTime: Number,
  currentTime: Number,
  // 进度条
  SoundSinglevalue: Number,
  // 播放模式
  playMusicModel: Number,
  isLoding: Boolean,
});

// 初始化时间
const maxTime = ref(0);
onMounted(() => {
  maxTime.value = props.maxTime || 0;
  musicmodel.value = props.playMusicModel || 0;
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

// 定义音量
const soundVolume = ref(musicStore.soundVolume || 30);
//音量进度条显示
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
  emit("changeVolume", values);
};

// 标题
const title = ref<string>();
const SubTitle = ref<string>();
onMounted(() => {
  title.value = musicStore.musicList?.[0]?.label || "无播放";
  SubTitle.value = musicStore.musicList?.[0]?.author || "无播放";
  selectedMusic.value = musicStore.musicList?.[0]?.value || "";
});
watch(
  () => props.isLoding,
  () => {
    title.value = musicStore.musicList?.[0]?.label || "无播放";
    SubTitle.value = musicStore.musicList?.[0]?.author || "无播放";
    selectedMusic.value = musicStore.musicList?.[0]?.value || "";
  }
);

// 定义选择音乐
const selectedMusic = ref("");
// 选择音乐事件
const handelasdlajsld = (value: string) => {
  selectedMusic.value = value;
  title.value = selectedMusic.value?.split(" - ")[1]?.trim() || "无播放";
  SubTitle.value = selectedMusic.value?.split(" - ")[0]?.trim() || "无播放";
  // 播放状态
  playSound(false);
  // 存入数据
  musicStore.setMusicList([
    { label: title.value, author: SubTitle.value, value: selectedMusic.value },
  ]);
  emit("exChangeMusic", selectedMusic.value);
  //切换音乐自动回到开头
  handleSliderAction();
  handleSliderChange(0);
};

//进度条变化
const formatTime = (seconds: number) => {
  // 计算分钟（取整数部分）
  const minutes = Math.floor(seconds / 60);
  // 计算剩余秒数
  const secs = seconds % 60;
  // 补0处理：确保分钟和秒数都是两位数
  const formattedMinutes = Math.ceil(minutes).toString().padStart(2, "0"); // 不足2位补0
  const formattedSeconds = Math.ceil(secs).toString().padStart(2, "0");
  return `${formattedMinutes}:${formattedSeconds}`;
};

// 定义进度条值
const stop = ref(false);
const SoundSinglevalue = ref(musicStore.musicTime);
// 监听进度条变化
const actionWatch = () => {
  const stopWatch = watch(
    () => props.SoundSinglevalue,
    (newValue) => {
      if (stop.value) {
        stopWatch();
        return;
      }
      SoundSinglevalue.value = newValue || 0;
    }
  );
};
// 处理进度条变化
const handleSliderAction = () => {
  stop.value = true;
};
const handleSliderChange = (value: number) => {
  stop.value = false;
  actionWatch();
  if (value == 0) {
    SoundSinglevalue.value = value;
  }
  emit("changeMusic", SoundSinglevalue.value);
};
actionWatch();

// 音乐快进退
const MusicChange = (type: string) => {
  emit("changeValue", type);
};

// 改变音乐模式
const musicmodel = ref(1);
onMounted(() => {
  musicmodel.value = props.playMusicModel || 1;
});
const changeMusicModel = () => {
  musicmodel.value++;
  if (musicmodel.value > 2) {
    musicmodel.value = 0;
  }
  musicStore.setPlayMusicModel(musicmodel.value);
  emit("ChangemMusicPlayModel", musicmodel.value);
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
            <div
              class="cc"
              style="width: 40px; position: relative"
              @click="changeMusicModel"
            >
              <NIcon
                class="active"
                :class="musicmodel == 0 ? 'mr' : ''"
                style="padding: 0 10px; cursor: pointer"
              >
                <Music />
              </NIcon>
              <NIcon
                class="active"
                :class="musicmodel == 1 ? 'mr' : ''"
                style="padding: 0 10px; cursor: pointer"
              >
                <AirOutlined />
              </NIcon>
              <NIcon
                class="active"
                :class="musicmodel == 2 ? 'mr' : ''"
                style="padding: 0 10px; cursor: pointer"
              >
                <ArrowsShuffle2 />
              </NIcon>
            </div>
            <n-slider
              v-model:value="SoundSinglevalue"
              :max="100"
              :min="0"
              @dragstart="handleSliderAction"
              @dragend="handleSliderChange"
            />
          </li>
          <li class="time">
            {{ formatTime(props?.currentTime || 0) }}/{{
              formatTime(props?.maxTime || 0)
            }}
          </li>
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
            <n-button
              :focusable="false"
              text
              style="font-size: 24px"
              @click="MusicChange('sub')"
            >
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
            <n-button
              :focusable="false"
              text
              style="font-size: 24px"
              @click="MusicChange('add')"
            >
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
      & .active {
        position: absolute;
        left: 0;
        top: 0;
        transition: all 0.2s ease-in-out;
        opacity: 0;
        &.mr {
          opacity: 1;
        }
      }
      ul {
        margin: 15px 0;
        & .time {
          font-size: 10px;
          color: #717171;
          -webkit-user-select: none; /* Safari */
          -moz-user-select: none; /* Firefox */
          -ms-user-select: none; /* Internet Explorer/Edge */
          user-select: none; /* 标准语法 */
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
