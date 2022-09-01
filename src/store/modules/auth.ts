import { makeAutoObservable } from "mobx";
import request from "@/utils/request";
import { ILoginForm, IRegisterForm } from "@/api/interfaces";

class AuthStore {
  token = localStorage.getItem("auth-token") || "";
  constructor() {
    makeAutoObservable(this);
  }

  setToken(token: string) {
    this.token = token;
    localStorage.setItem("auth-token", token);
  }

  logOut() {
    this.token = "";
    localStorage.removeItem("auth-token");
  }
}
export default new AuthStore();
