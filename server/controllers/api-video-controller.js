const videoService = require("../service/video-service");

class VideoController {
  async getVideos(req, res, next) {
    try {
      const response = await videoService.getVideos();
      console.log(response);
      res.status(200).json(response);
    } catch (e) {
      next(e);
    }
  }
  async addVideo(req, res, next) {
    try {
      const { link } = req.body;
      const video = await videoService.addVideo(link);
      res.status(200).json(video);
    } catch (e) {
      next(e);
    }
  }
  async deleteVideo(req, res, next) {
    try {
      const { id } = req.params;
      const response = await videoService.deleteVideo(id);
      res.status(200).json();
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new VideoController();
