import { createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit";
import { videosApi } from "../api/videos-api";

const slice = createSlice({
  name: "videos",
  initialState: { videos: [] } as any,
  reducers: {
    setVideosAC(state, action: PayloadAction<{ videos: any }>) {
      state.videos = action.payload.videos;
    },
    addVideoAC(state, action: PayloadAction<{ video: any }>) {
      state.videos.unshift(action.payload.video);
    },
    deleteVideoAC(state, action: PayloadAction<{ id: string }>) {
      state.videos.forEach((video: any, index: number) => {
        if (video._id === action.payload.id) {
          state.videos.splice(index, 1);
        }
      });
    },
  },
});
export const VideosReducer = slice.reducer;
export const { setVideosAC, addVideoAC, deleteVideoAC } = slice.actions;

export const setVideosTC = () => async (dispatch: Dispatch) => {
  const response = await videosApi.getVideos();
  dispatch(setVideosAC({ videos: response.data }));
};
export const addVideoTC = (link: string) => async (dispatch: Dispatch) => {
  const response = await videosApi.addVideo(link);
  dispatch(addVideoAC({ video: response.data }));
};
export const deleteVideoTC = (id: string) => async (dispatch: Dispatch) => {
  const response = await videosApi.deleteVideo(id);
  dispatch(deleteVideoAC({ id }));
};
