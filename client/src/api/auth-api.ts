import { AxiosResponse } from "axios";
import { $api } from "../api/api";
import { IUser } from "../models/IUser";
import { AuthResponse } from "../models/response/AuthResponse";

export const authApi = {
  login(data: {
    email: string;
    password: string;
    rememberMe: boolean;
  }): Promise<AxiosResponse<AuthResponse>> {
    const params = new URLSearchParams();
    params.append("email", data.email);
    params.append("password", data.password);
    params.append("rememberMe", data.rememberMe.toString());
    const promise = $api.post<AuthResponse>("login", params);
    return promise;
  },
  registration(
    email: string,
    login: string,
    password: string
  ): Promise<AxiosResponse<AuthResponse>> {
    const params = new URLSearchParams();
    params.append("email", email);
    params.append("login", login);
    params.append("password", password);
    const promise = $api.post<AuthResponse>("registration", params);
    return promise;
  },
  logout(): Promise<AxiosResponse> {
    const promise = $api.post("logout");
    return promise;
  },
  refresh(): Promise<AxiosResponse<AuthResponse>> {
    const promise = $api.get<AuthResponse>("refresh");
    return promise;
  },
  getUpdateUserData(): Promise<AxiosResponse> {
    const promise = $api.get("user");
    return promise;
  },
  changeUserPhoto(photo: File) {
    let formData = new FormData();
    formData.append("photo", photo);
    const promise = $api.put<AuthResponse>(`user-photo`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }) as any;
    return promise;
  },
  getUser(id: string): Promise<AxiosResponse<IUser>> {
    const promise = $api.get<IUser>(`user/${id}`);
    return promise;
  },
  getUsers(): Promise<AxiosResponse<IUser>> {
    const promise = $api.get<IUser>("users");
    return promise;
  },
  userOffline() {
    const promise = $api.get("user-offline");
    return promise;
  },
  getPasswordRecoveryCode(email: string): Promise<AxiosResponse<any>> {
    const params = new URLSearchParams();
    params.append("email", email);
    const promise = $api.post("get-password-recovery-code", params);
    return promise;
  },
  checkPasswordRecoveryCode(code: string): Promise<AxiosResponse<any>> {
    const params = new URLSearchParams();
    params.append("code", code);
    const promise = $api.post("check-password-recovery-code", params);
    return promise;
  },
  setPassword(email: string, password: string) {
    const params = new URLSearchParams();
    params.append("email", email);
    params.append("password", password);
    const promise = $api.put("set-password", params);
    return promise;
  },
};
