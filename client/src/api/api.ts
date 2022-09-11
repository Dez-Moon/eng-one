import axios, { AxiosRequestConfig } from "axios";
import { cookies } from "../cookies/cookies";

export const $api = axios.create({
  withCredentials: true,
  baseURL: "https://eng-server.herokuapp.com/api/",
});
$api.interceptors.request.use((config: AxiosRequestConfig) => {
  if (config.headers) {
    config.headers.Autorization = `Bearer ${localStorage.getItem("token")}`;
    config.headers.Cookies = cookies.getCookie("refreshToken");
    return config;
  }
});
export const API = {
  getTests() {
    const promise = $api.get("tests") as any;
    return promise;
  },
  addTest(test: any) {
    const params = new URLSearchParams();
    params.append("test", JSON.stringify(test));
    const promise = $api.post("test", params) as any;
    return promise;
  },
  updateTest(test: any) {
    const params = new URLSearchParams();
    params.append("test", JSON.stringify(test));
    const promise = $api.put(`test/${test["_id"]}`, params) as any;
    return promise;
  },
  deleteTest(id: string, testName: string) {
    const data = {
      id,
      testName,
    };
    const promise = $api.delete(`test/${JSON.stringify(data)}`) as any;
    return promise;
  },
  getImage(name: string) {
    let nameArray = name.split("/");
    nameArray.splice(0, 1);
    let newName = nameArray.join("!-!");
    const url = encodeURI(newName);
    const promise = $api.get(`test-image/${url}`) as any;
    return promise;
  },
  uploadFile(file: any, testName: string) {
    let formData = new FormData();
    formData.append("image", file);
    formData.append("testName", testName);
    const promise = $api.post(`test-image`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }) as any;
    return promise;
  },
  finishedTest(testId: string, correctAnswers: string) {
    const params = new URLSearchParams();
    params.append("correctAnswers", correctAnswers);
    const promise = $api.put(`finishTest/${testId}`, params);
    return promise;
  },
};
