import http from "../index";

// 获取侧边栏菜单选项数据
export const getMenuOptionsAPI = async () => {
  const {
    data: { data },
  } = await http.get("/menuoptions");
  return data;
};
