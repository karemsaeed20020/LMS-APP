const express = require("express");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const { getAllVideos, getAVideo, deleteAVideo, updateAVideo, postVideo } = require("../controllers/video.controller.js");

const videoRouter = express.Router();

videoRouter.route("/").post(authMiddleware, isAdmin, postVideo)
videoRouter.route("/").get(getAllVideos);
videoRouter.route("/:slug").get(getAVideo);
videoRouter.route("/:id").delete(deleteAVideo);
videoRouter.route("/:id").put(authMiddleware, isAdmin,updateAVideo);

module.exports = videoRouter;