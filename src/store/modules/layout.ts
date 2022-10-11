import { makeAutoObservable } from "mobx";
import { ITheme, ITabs } from "@/api/interfaces";

class LayoutStore {
  systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
  userTheme = localStorage.getItem("theme") as ITheme["theme"];
  theme = this.userTheme || this.systemTheme;
  collapsed: boolean = false;
  constructor() {
    makeAutoObservable(this);
  }

  changeTheme() {
    this.theme = this.theme === "dark" ? "light" : "dark";
    localStorage.setItem("theme", this.theme);
  }

  changeCollapsed() {
    this.collapsed = !this.collapsed;
  }
}

export default new LayoutStore();
