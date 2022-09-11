import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type AppStatusType = "loading" | "loaded";
type LoadingWindowType = "autorization" | "registration" | null;
const slice = createSlice({
  name: "app",
  initialState: {
    status: "loaded" as "loading" | "loaded",
    error: null as string | null,
    isInitialized: false,
    loadingWindow: null as LoadingWindowType,
  },
  reducers: {
    setAppStatusAC(state, action: PayloadAction<{ status: AppStatusType }>) {
      state.status = action.payload.status;
    },
    setAppInitializedAC(state, action: PayloadAction<{ value: boolean }>) {
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
  setAppInitializedAC,
  setLoadingWindowAC,
  setErrorAC,
} = slice.actions;
