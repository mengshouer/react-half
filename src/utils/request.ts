import axios from "axios";
import { notification } from "antd";
import { BACKEND_ADDRESS } from "@/utils/config";

const HTTP_API = BACKEND_ADDRESS;
const WHITE_API = ["/auth/login", "/auth/register"];
const _request = axios.create({
  baseURL: HTTP_API,
  timeout: 1000 * 6,
  withCredentials: true,
});

_request.interceptors.request.use(
  (config) => {
    const { url } = config;
    // is white list
    if (!WHITE_API.includes(url!)) {
      // no white list auth
      const token = localStorage.getItem("auth-token");
      if (token) {
        config.headers!.Authorization = `Bearer ${token}`;
      } else {
        window.location.href = "#/login";
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

_request.interceptors.response.use(
  (response) => {
    const { status, data } = response;
    if (status === 401 || data.code === 401) {
      return Promise.reject(response);
    }
    if (status === 200) {
      if (!data.code && data.message) {
        return Promise.reject(response);
      }
    }
    return response;
  },
  (error) => {
    console.log("err:", error);
    const { status, data } = error.response;
    if (status === 401) {
      window.location.href = "#/login";
      window.localStorage.removeItem("auth-token");
    } else {
      notification.error({
        message: `请求错误`,
        description: data?.msg || "Error",
      });
    }
    return Promise.reject(error);
  }
);

export const request = _request;
