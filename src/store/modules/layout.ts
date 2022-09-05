import { makeAutoObservable } from "mobx";
import { ITheme, ITabs } from "@/api/interfaces";

class LayoutStore {
  systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
  userTheme = localStorage.getItem("theme") as ITheme["theme"];
  theme = this.userTheme || this.systemTheme;
  collapsed: boolean = false;
  tabList: Array<ITabs> = [];
  constructor() {
    makeAutoObservable(this);
    this.resetTab();
  }

  changeTheme() {
    this.theme = this.theme === "dark" ? "light" : "dark";
    localStorage.setItem("theme", this.theme);
  }

  changeCollapsed() {
    this.collapsed = !this.collapsed;
  }

  addTab(tab: ITabs) {
    this.tabList.push(tab);
  }

  removeTab(tabPath: string) {
    if (this.tabList.length === 1) return;
    this.tabList = this.tabList.filter((item) => item.path !== tabPath);
  }

  setTbaList(list: Array<ITabs>) {
    this.tabList = list;
  }

  resetTab() {
    this.tabList = [{ title: "首页", path: "/home" }];
  }
}

export default new LayoutStore();
