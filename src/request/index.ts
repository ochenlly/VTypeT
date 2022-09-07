import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

//创建实例
const service: AxiosInstance = axios.create({
  baseURL: "",
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
    const code: number = res.data.code;
    if (code != 200) {
      return Promise.reject();
    }
    return res.data;
  },
  (err) => {
    console.log(err);
  }
);

export default service;
