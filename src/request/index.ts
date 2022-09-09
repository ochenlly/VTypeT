import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { ElMessage } from "element-plus";

//创建实例
const service: AxiosInstance = axios.create({
  baseURL: "http://127.0.0.1:5050",
  timeout: 5000,
});

//请求拦截
service.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    config.headers = config.headers || {};
    if (localStorage.getItem("token")) {
      config.headers.token = localStorage.getItem("token") || "";
    }
    return config;
  },
  (err) => {
    //对错误做些什么
    return Promise.reject(err);
  }
);

//响应拦截
service.interceptors.response.use(
  (res: AxiosResponse) => {
    return res.data;
  },
  (err) => {
    console.log(err);
  }
);

export default service;
