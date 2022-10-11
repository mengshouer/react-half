import { MenuOptions, MenuItem, ITabs } from "@/api/interfaces";
import { makeAutoObservable } from "mobx";

class MenuStore {
  menuList: MenuItem[] = [];
  menuData: MenuOptions[] = [];
  tabList: Array<ITabs> = [];
  constructor() {
    makeAutoObservable(this);
    this.resetTab();
  }

  setMenuList(menuList: MenuItem[]) {
    this.menuList = menuList;
  }

  setMenuData(menuData: MenuOptions[]) {
    this.menuData = menuData;
  }

  getMenuByPath(path: string) {
    const dfs = (
      menu: MenuOptions[],
      path: string
    ): MenuOptions | undefined => {
      for (const item of menu) {
        if (item.path === path) {
          return item;
        }
        if (item.children) {
          const res = dfs(item.children, path);
          if (res) {
            return res;
          }
        }
      }
    };
    return dfs(this.menuData, path);
  }

  addTab(pathname: string) {
    const menu = this.getMenuByPath(pathname);
    this.tabList.push({
      label: menu?.title || pathname,
      path: pathname,
      key: pathname,
    });
  }

  removeTab(tabPath: string) {
    if (this.tabList.length === 1) return;
    this.tabList = this.tabList.filter((item) => item.path !== tabPath);
  }

  setTbaList(list: Array<ITabs>) {
    this.tabList = list;
  }

  resetTab() {
    this.tabList = [
      { label: "首页", path: "/home", key: "/home", closable: false },
    ];
  }
}

export default new MenuStore();
