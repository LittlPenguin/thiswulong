import { ref } from "vue";
import { defineStore } from "pinia";

//音乐播放Store
export const useMusicStore = defineStore(
  "Music",
  () => {
    // 音乐音量
    const soundVolume = ref(0);
    // 音乐数据
    const musicList = ref<string[]>([]);

    // 设置音乐数据
    const setMusicList = (value: string[]) => {
      musicList.value = value;
    };
    // 设置音量
    const setSoundVol = (value: number) => {
      soundVolume.value = value;
    };
    // 导出store数据
    return { soundVolume, musicList, setMusicList, setSoundVol };
  },
  //持久化配置
  {
    persist: true,
  }
);
