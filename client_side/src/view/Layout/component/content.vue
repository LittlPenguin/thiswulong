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

// 初始化音乐
// 播放列表
const cdMusic = ref();
// 当前音乐（数据）
const baseMusic = ref<MusicListType>();
// 播放音乐的数据（可识别路径）
const onMusic = ref();
onMounted(async () => {
  randomMusic("ny");
});

// 当前位置的索引
const num = ref(0);
// 随机播放音乐
const randomMusic = async (value: string) => {
  //获取全部音乐列表
  cdMusic.value = musicStore.theMusicList || (await musicStore.getMusicList());
  //初始化播放音乐
  // 顺序播放
  if (value === "gon") {
    // 获取当前音乐位置索引
    num.value =
      cdMusic.value.indexOf(
        cdMusic.value.find(
          (item: MusicListType) =>
            item.value === musicStore?.musicList?.[0]?.value
        )
      ) + 1;
    // 处理索引超出范围
    if (num.value >= cdMusic.value.length - 1) {
      num.value = 0;
    }
    // 进行播放
    baseMusic.value = cdMusic.value[num.value];
    // 随机播放
  } else if (value === "onRandom") {
    baseMusic.value = cdMusic.value[
      Math.floor(Math.random() * (cdMusic.value.length - 0 + 1)) + 0
    ] as MusicListType;
    // 单曲循环|| 默认播放已经存在的音乐，否则随机播放
  } else {
    baseMusic.value = (musicStore.musicList?.[0] ||
      cdMusic.value[
        Math.floor(Math.random() * (cdMusic.value.length - 0 + 1)) + 0
      ]) as MusicListType;
  }
  // 转化为可识别路径
  onMusic.value = new URL(
    `../../../assets/music/${baseMusic.value!.value}.mp3`,
    import.meta.url
  ).href;
  //上传数据
  musicStore.setMusicList([
    {
      label: baseMusic!.value!.value?.split(" - ")[1]?.trim() || "",
      author: baseMusic!.value!.value?.split(" - ")[0]?.trim() || "",
      value: baseMusic.value!.value,
    },
  ]);
  // ！！重新挂载组件
  audioRef.value?.load();
};

//导入音乐数据类型
import type { MusicListType } from "@/types/Music.d";
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
const playImport = ref();
const isLoding = ref(true);
const musicHandle = async (value: boolean) => {
  isLoding.value = !isLoding.value;
  audioRef.value!.play();
  PlayModel.value = value;
  if (value) {
    // readyState 4代表可以播放
    //若未加载完成则进入循环判断加载情况
    if (audioRef.value?.readyState != 4) {
      playImport.value = setInterval(() => {
        //直到加载完成后，清除定时器，开始播放
        if (audioRef.value?.readyState == 4) {
          audioRef.value!.play();
          clearInterval(playImport.value);
          musicHandle(true);
        }
      }, 1000);
      return;
    }
    // 清楚计时器以防出现问题
    clearInterval(playImport.value);
    clearInterval(timeMer.value);
    // 开启监听播放
    timeMer.value = setInterval(async () => {
      currentTime.value = audioRef.value?.currentTime || 0;
      maxTime.value = audioRef.value?.duration || 0;
      if (audioRef.value?.ended) {
        // 结束
        // 顺序播放
        if (playMusicModel.value === 1) {
          clearInterval(timeMer.value);
          randomMusic("gon");
          musicHandle(true);
          return;
          // 随机播放
        } else if (playMusicModel.value === 2) {
          clearInterval(timeMer.value);
          randomMusic("onRandom");
          musicHandle(true);
          return;
        }
        // 单曲循环
        musicHandle(true);
      }
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
const exChangeMusic = (value: string) => {
  //变更转化为可识别音乐
  onMusic.value = new URL(
    `../../../assets/music/${value}.mp3`,
    import.meta.url
  ).href;
  audioRef.value?.load();
};

// 变更音乐快进退
const changeValue = (type: string) => {
  if (type == "add") {
    audioRef.value!.currentTime += 3;
  } else if (type == "sub") {
    audioRef.value!.currentTime -= 3;
  }
};

// 更改播放状态
const playMusicModel = ref(musicStore.playMusicModel || 1);
const ChangemMusicPlayModel = (value: number) => {
  playMusicModel.value = value;
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
                @changeValue="changeValue"
                @ChangemMusicPlayModel="ChangemMusicPlayModel"
                :playMusicModel="playMusicModel"
                :isLoding="isLoding"
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
