const express = require("express");
const videoController = require("../controllers/api-video-controller");

const router = express.Router();

router.get("/api/videos", videoController.getVideos);
router.post("/api/video", videoController.addVideo);
router.delete("/api/video/:id", videoController.deleteVideo);

module.exports = router;
