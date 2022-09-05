import { ILoginForm, IRegisterForm } from "../interfaces";
import request from "@/utils/request";

export const userLogin = (data: ILoginForm) => {
  return request({
    url: "/auth/login",
    method: "post",
    data,
  });
};

export const userRegister = (data: IRegisterForm) => {
  return request({
    url: "/users/register",
    method: "post",
    data,
  });
};
