import { createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit";
import { chechAuthTC } from "./auth-reducer";

type AppStatusType = "loading" | "loaded";
type LoadingWindowType = "autorization" | "registration" | null;

export type AppInitialStateType = {
  status: "loading" | "loaded";
  error: string | null;
  isInitialized: boolean;
  loadingWindow: LoadingWindowType;
};
const initialState: AppInitialStateType = {
  status: "loaded" as "loading" | "loaded",
  error: null as string | null,
  isInitialized: false,
  loadingWindow: null as LoadingWindowType,
};
const slice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setAppStatusAC(state, action: PayloadAction<{ status: AppStatusType }>) {
      state.status = action.payload.status;
    },
    setIsInitializedAC(state, action: PayloadAction<{ value: boolean }>) {
      state.isInitialized = action.payload.value;
    },
    setLoadingWindowAC(
      state,
      action: PayloadAction<{ window: LoadingWindowType }>
    ) {
      state.loadingWindow = action.payload.window;
    },
    setErrorAC(state, action: PayloadAction<{ error: string | null }>) {
      state.error = action.payload.error;
    },
  },
});
export const appReducer = slice.reducer;
export const {
  setAppStatusAC,
  setIsInitializedAC,
  setLoadingWindowAC,
  setErrorAC,
} = slice.actions;

export const isInitializedTC = () => (dispatch: Dispatch) => {
  if (localStorage.getItem("token")) {
    chechAuthTC()(dispatch);
  }
  setTimeout(() => {
    dispatch(setIsInitializedAC({ value: true }));
  }, 1000);
};
