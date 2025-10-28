import http from "../index";

// 获取侧音乐选项数据
export const getMusicListAPI = async () => {
  const { data } = await http.get("/musiclist");
  return data;
};
