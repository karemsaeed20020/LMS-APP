const asyncHandler = require("../utils/asyncHandler.js");
const Video = require("../models/video.model.js");
const { default: slugify } = require("slugify");
const { validateMongodbId } = require("../config/validateMongoDbId.js");
const postVideo = asyncHandler(async(req, res, next) => {
    if (req.body.title) {
        req.body.slug = slugify(req.body.title.toLowerCase())
    }
    const video = await Video.create(req.body);
    res.status(201).json({
        status: "Success",
        message: "Video created successfully",
        video
    })
});

const getAVideo = asyncHandler(async(req, res, next) => {
    const {slug} = req.params;
    const video = await Video.findOne({slug: slug});
    res.status(200).json({
        status: "Success",
        message: "Video Found!",
        video
    })
})
const getAllVideos = asyncHandler(async(req, res, next) => {
    const video = await Video.find();
    res.status(200).json({
        status: "Success",
        message: "Videos Found!",
        video
    })
})
const deleteAVideo = asyncHandler(async(req, res, next) => {
    const {id} = req.params;
    validateMongodbId(id);
    const video = await Video.findByIdAndDelete(id);
    res.status(200).json({
        status: "Success",
        message: "Video Deleted Successfully"
    })
})
const updateAVideo = asyncHandler(async(req, res, next) => {
    const {id} = req.params;
    validateMongodbId(id);
    if (req.body.title) {
        req.body.slug = slugify(req.body.title.toLowerCase())
    }
    const video = await Video.findByIdAndUpdate(id, req.body, {new: true});
    res.status(200).json({
        status: "Success",
        message: "Video Updated Successfully",
        video
    })
})
module.exports = {
    postVideo,
    getAllVideos,
    getAVideo,
    updateAVideo,   
    deleteAVideo
}