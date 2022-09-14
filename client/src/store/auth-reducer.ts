import { AuthResponse } from "./../models/response/AuthResponse";
import axios from "axios";
import { createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit";
import { authApi } from "../api/auth-api";
import { IUser } from "../models/IUser";
import { setAppStatusAC, setErrorAC, setLoadingWindowAC } from "./app-reducer";
import { cookies } from "../cookies/cookies";

export type AuthInitialStateType = { user: IUser; isAuth: boolean };

const initialState: AuthInitialStateType = { user: {} as IUser, isAuth: false };
const slice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setIsAuthAC(state, action: PayloadAction<{ value: boolean }>) {
      state.isAuth = action.payload.value;
    },
    setUserAC(state, action: PayloadAction<{ user: IUser }>) {
      state.user = action.payload.user;
    },
  },
});
export const authReducer = slice.reducer;
export const { setIsAuthAC, setUserAC } = slice.actions;

export const chechAuthTC = () => async (dispatch: Dispatch) => {
  try {
    const response = await authApi.refresh();
    cookies.setCookie("refreshToken", response.data.refreshToken, 30);
    localStorage.setItem("token", response.data.accessToken);
    dispatch(setIsAuthAC({ value: true }));
    dispatch(setUserAC({ user: response.data.user }));
  } catch (e: any) {
    console.log(e.response?.data?.message);
  }
};
export const loginTC =
  (values: { email: string; password: string; rememberMe: boolean }) =>
  async (dispatch: Dispatch) => {
    try {
      dispatch(setLoadingWindowAC({ window: "autorization" }));
      const response = await authApi.login(values);
      if (response.data.rememberMe) {
        cookies.setCookie("refreshToken", response.data.refreshToken, 30);
      } else {
        cookies.setCookie("refreshToken", response.data.refreshToken, 60);
      }
      localStorage.setItem("token", response.data.accessToken);
      dispatch(setIsAuthAC({ value: true }));
      dispatch(setUserAC({ user: response.data.user }));
    } catch (e: any) {
      console.log(e.response?.data?.message);
      dispatch(setErrorAC({ error: e.response.data.message }));
    }
    dispatch(setLoadingWindowAC({ window: null }));
  };
export const registrationTC =
  (email: string, login: string, password: string) =>
  async (dispatch: Dispatch) => {
    try {
      dispatch(setLoadingWindowAC({ window: "registration" }));
      const response = await authApi.registration(email, login, password);
      cookies.setCookie("refreshToken", response.data.refreshToken, 30);
      localStorage.setItem("token", response.data.accessToken);
      dispatch(setIsAuthAC({ value: true }));
      dispatch(setUserAC({ user: response.data.user }));
    } catch (e: any) {
      console.log(e.response?.data?.message);
      dispatch(setErrorAC({ error: e.response.data.message }));
    }
    dispatch(setLoadingWindowAC({ window: null }));
  };
export const logoutTC = () => async (dispatch: Dispatch) => {
  try {
    const response = await authApi.logout();
    cookies.deleteCookie("refreshToken");
    localStorage.removeItem("token");
    dispatch(setIsAuthAC({ value: false }));
    dispatch(setUserAC({ user: {} as IUser }));
  } catch (e: any) {
    console.log(e.response?.data?.message);
  }
};
export const uploadUserPhotoTC = (file: File) => async (dispatch: Dispatch) => {
  dispatch(setAppStatusAC({ status: "loading" }));
  const response = await authApi.changeUserPhoto(file);
  const response2 = await authApi.getUpdateUserData();
  dispatch(setUserAC({ user: response2.data }));
  dispatch(setAppStatusAC({ status: "loaded" }));
};
