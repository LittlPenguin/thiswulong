<script setup lang="ts">
// 导入组件
import MusicPlay from "@/components/MusicPlay/index.vue";
// 导入ui组件库
import { CheckmarkCircle } from "@vicons/ionicons5";
import { ArrowBigLeft, ArrowBigRight, Music, Link } from "@vicons/tabler";
import { ErrorOutlineRound } from "@vicons/material";

// 导入vue
import { onMounted, ref, watch } from "vue";

//导入store
import { useMusicStore } from "@/store";
const musicStore = useMusicStore();

// 音乐组件
const audioRef = ref<HTMLAudioElement>();
//音乐控制组件
const musicPlayRef = ref(null);
const PlayModel = ref(false);
const timeMer = ref<number>(0);
//音频进度条
const maxTime = ref(audioRef.value?.duration);
const currentTime = ref(0);
// 组件渲染好后数据
const getAudioDuration = () => {
  maxTime.value = audioRef.value?.duration;
  // 初始化音量 从数据中获取，如果没有则为1
  audioRef.value!.volume = musicStore.soundVolume / 100 || 0.5;
  // 初始化数据
  audioRef.value!.currentTime = (musicStore.musicTime / 100) * maxTime.value!;
  // 初始化当前时间
  currentTime.value = (musicStore.musicTime / 100) * maxTime.value!;
};

// 处理音乐播放
const musicHandle = (value: boolean) => {
  PlayModel.value = value;
  maxTime.value = audioRef.value?.duration || 0;
  currentTime.value = audioRef.value?.currentTime || 0;
  if (value) {
    audioRef.value!.play();
    timeMer.value = setInterval(() => {
      currentTime.value = audioRef.value?.currentTime || 0;
    }, 500);
  } else {
    audioRef.value!.pause();
    clearInterval(timeMer.value);
  }
};
// 修改音量
const changeVolume = (value: number) => {
  audioRef.value!.volume = value / 100;
};

// 进度条
const SoundSinglevalue = ref(0);
watch([currentTime, maxTime], (newValue) => {
  SoundSinglevalue.value = Math.ceil((newValue[0] / newValue[1]!) * 100);
  if (newValue[0] != 0) {
    musicStore.setMusicTime(SoundSinglevalue.value);
  }
});
// 更新进度条变化
const changeMusic = (values: number) => {
  audioRef.value!.currentTime = (values / 100) * maxTime.value!;
  musicStore.setMusicTime(values);
  currentTime.value = (values / 100) * maxTime.value!;
};

// 变更音乐
import { musicMap } from "@/utils/music";
const baseMusic = ref<{ value: string; author: string; label: string }>(
  (musicStore.musicList?.[2] ||
    musicMap[Math.floor(Math.random() * (musicMap.length - 0 + 1)) + 0]) as {
    value: string;
    author: string;
    label: string;
  }
);
const onMusic = ref(
  new URL(
    `../../../assets/music/${baseMusic.value!.value}.mp3`,
    import.meta.url
  ).href
);
musicStore.setMusicList([
  {
    value: baseMusic!.value!.value?.split(" - ")[0]?.trim() || "",
    author: baseMusic!.value!.value?.split(" - ")[1]?.trim() || "",
    label: baseMusic.value!.value,
  },
]);
const exChangeMusic = (value: string) => {
  onMusic.value = new URL(
    `../../../assets/music/${value}.mp3`,
    import.meta.url
  ).href;
  audioRef.value?.load();
};

// 加载
const show = ref(true);
onMounted(() => {
  show.value = false;
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
              <MusicPlay
                :PlayModel="PlayModel"
                ref="musicPlayRef"
                @handle="musicHandle"
                @changeVolume="changeVolume"
                :maxTime="maxTime"
                :currentTime="currentTime"
                :SoundSinglevalue="SoundSinglevalue"
                @changeMusic="changeMusic"
                @exChangeMusic="exChangeMusic"
              />
            </n-popover>
            <audio
              style="display: none"
              controls
              ref="audioRef"
              @loadedmetadata="getAudioDuration"
            >
              <source :src="onMusic" type="audio/mpeg" />
            </audio>
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
            <n-tag v-if="!show" round :bordered="false" type="success">
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
