import request from "@/utils/request";

// * 获取菜单列表
export async function getMenuList<T>(): Promise<T> {
  return await request.get("/menu/list");
}
