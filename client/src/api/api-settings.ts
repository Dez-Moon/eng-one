import axios, { AxiosRequestConfig } from "axios";
import { cookies } from "../cookies/cookies";

export const $api = axios.create({
  withCredentials: true,
  baseURL: process.env.REACT_APP_SERVER,
});
$api.interceptors.request.use((config: AxiosRequestConfig) => {
  if (config.headers) {
    config.headers.Autorization = `Bearer ${localStorage.getItem("token")}`;
    config.headers.Cookies = cookies.getCookie("refreshToken");
    return config;
  }
});
