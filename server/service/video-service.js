const Video = require("../models/video");

class VideoService {
  async getVideos() {
    const videos = await Video.find().sort({ createdAt: -1 });
    return videos;
  }
  async addVideo(link) {
    const video = await Video.create({
      link,
    });
    return video;
  }
  async deleteVideo(id) {
    const video = await Video.findByIdAndDelete(id);
    if (!video) {
      throw ApiError.BadRequest("Видео не существует");
    }
  }
}

module.exports = new VideoService();
