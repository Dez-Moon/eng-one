import { combineReducers } from "redux";
import thunkMiddleware from "redux-thunk";
import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./auth-reducer";
import { appReducer } from "./app-reducer";
import { TestsReducer } from "./tests-reducer";
import { VideosReducer } from "./videos-reducer";

const rootReducer = combineReducers({
  auth: authReducer,
  app: appReducer,
  tests: TestsReducer,
  videos: VideosReducer,
});
export type AppRootStateType = ReturnType<typeof rootReducer>;

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(thunkMiddleware),
});

declare global {
  interface Window {
    store: any;
  }
}
window.store = store;
