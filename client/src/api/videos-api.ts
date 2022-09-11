import { AxiosResponse } from "axios";
import { $api } from "./api";

export const videosApi = {
  getVideos() {
    const promise = $api.get("videos");
    return promise;
  },
  addVideo(link: string): Promise<AxiosResponse> {
    const params = new URLSearchParams();
    params.append("link", link.split(" ")[3].split('"')[1]);
    const promise = $api.post("video", params);
    return promise;
  },
  deleteVideo(id: string) {
    const promise = $api.delete(`video/${id}`);
    return promise;
  },
};
