import request from "@/utils/request";

// * 获取菜单列表
export const getMenuList = async () => {
  return await request.get("/menu/list");
};
