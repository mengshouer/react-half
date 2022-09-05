import request from "@/utils/request";
import { UpdateCK } from "../interfaces";

export const userGet = (username: string) => {
  return request({
    url: "/users",
    method: "get",
    params: { username },
  });
};

export const userCKDelete = (user: string) => {
  return request({
    url: "/ql/jdck/delete",
    method: "post",
    data: { cookie: user },
  });
};

export const userCKUpdate = (data: UpdateCK) => {
  return request({
    url: "/ql/jdck/update",
    method: "post",
    data,
  });
};
