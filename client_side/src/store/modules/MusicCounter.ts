import { ref } from "vue";
import { defineStore } from "pinia";

//导入音乐数据
import { getMusicListAPI } from "@/api/components/musicList";
//导入音乐数据类型
import type { MusicListType } from "@/types/Music.d";

//音乐播放Store
export const useMusicStore = defineStore(
  "Music",
  () => {
    // 音乐音量
    const soundVolume = ref(30);
    // 音乐数据
    const musicList = ref<MusicListType[]>();
    // 设置音乐市场
    const musicTime = ref(0);
    // 获取音乐基础数据
    const theMusicList = ref<MusicListType[]>();
    // 音乐播放模式
    const playMusicModel = ref(1);

    // 设置音乐数据
    // 获取音乐基础数据
    const getMusicList = async () => {
      const { data } = await getMusicListAPI();
      theMusicList.value = data;
      return data;
    };
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
    // 设置音乐播放模式
    const setPlayMusicModel = (value: number) => {
      playMusicModel.value = value;
    };
    // 导出store数据
    return {
      soundVolume,
      musicList,
      musicTime,
      theMusicList,
      playMusicModel,
      getMusicList,
      setMusicList,
      setSoundVol,
      setMusicTime,
      setPlayMusicModel,
    };
  },
  //持久化配置
  {
    persist: true,
  }
);
