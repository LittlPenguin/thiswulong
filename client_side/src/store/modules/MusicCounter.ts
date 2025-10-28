import { ref } from "vue";
import { defineStore } from "pinia";

//导入音乐数据类型
import type { MusicListType } from "@/types/Music.d";

//音乐播放Store
export const useMusicStore = defineStore(
  "Music",
  () => {
    // 音乐音量
    const soundVolume = ref(50);
    // 音乐数据
    const musicList = ref<MusicListType[]>();
    // 设置音乐市场
    const musicTime = ref(0);

    // 设置音乐数据
    const setMusicList = (value: MusicListType[]) => {
      musicList.value = value;
    };
    // 设置音量
    const setSoundVol = (value: number) => {
      soundVolume.value = value;
    };
    // 设置音乐时间
    const setMusicTime = (value: number) => {
      musicTime.value = value;
    };
    // 导出store数据
    return {
      soundVolume,
      musicList,
      musicTime,
      setMusicList,
      setSoundVol,
      setMusicTime,
    };
  },
  //持久化配置
  {
    persist: true,
  }
);
