import Axios from "axios";
import { message } from "antd";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { BACKEND_ADDRESS } from "@/utils/config";

const HTTP_API = BACKEND_ADDRESS;
const WHITE_API = ["/auth/login", "/auth/register"];
const request = Axios.create({
  baseURL: HTTP_API,
  timeout: 1000 * 6,
  withCredentials: true,
});

request.interceptors.request.use(
  (config) => {
    NProgress.start();
    const { url } = config;
    // is white list
    if (!WHITE_API.includes(url!)) {
      // no white list auth
      const token = localStorage.getItem("auth-token");
      if (token) {
        config.headers!.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

request.interceptors.response.use(
  (response) => {
    NProgress.done();
    const { status, data } = response;
    if (status === 200) {
      if (!data.code && data.message) {
        message.error(data.message || "Error");
        return Promise.reject(response);
      }
      return data;
    }
    if (status === 401 || data.code === 401) {
      message.error("登录状态失效，请重新登录");
      window.location.href = "/login";
      localStorage.removeItem("auth-token");
      return Promise.reject(response);
    } else {
      message.error(data.message || "Error");
      return Promise.reject(response);
    }
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

export default request;
