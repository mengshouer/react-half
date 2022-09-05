import { makeAutoObservable } from "mobx";

class UserStore {
  username: string = localStorage.getItem("username") || "";
  constructor() {
    makeAutoObservable(this);
  }

  setUsername(username: string) {
    localStorage.setItem("username", username);
    this.username = username;
  }
}
export default new UserStore();
