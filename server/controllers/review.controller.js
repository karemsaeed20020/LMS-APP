const { validateMongodbId } = require("../config/validateMongoDbId.js");
const asyncHandler = require("../utils/asyncHandler.js");
const Review = require("../models/review.model.js")
const createReview = asyncHandler(async(req, res, next) => {
    const {_id} = req.user;
    validateMongodbId(_id);
    let data = {
        user: _id,
        comment: req.body.comment,
        color: req.body.color
    }
    const review = await Review.create(data);
    res.status(201).json({
        status: "Success",
        message: "Review created successfully",
        review
    })
})
const getAllReviews = asyncHandler(async(req, res, next) => {
    const review = await Review.find().populate("user");
    res.status(200).json({
        status: "Success",
        message: "Review Fetched Successfully",
        review
    })
})
const getAReview = asyncHandler(async(req, res, next) => {
    const {id} = req.params;
    const review = await Review.findById(id).populate("user");
    res.status(200).json({
        status: "Success",
        message: "Review Fetched Successfully",
        review
    })
})
const deleteAReview = asyncHandler(async(req, res, next) => {
    const {id} = req.params;
    const review = await Review.findByIdAndDelete(id);
    res.status(200).json({
        status: "Success",
        message: "Review Deleted Successfully",
    })
})
const updateAReview = asyncHandler(async(req, res, next) => {
    const {id} = req.params;
    const review = await Review.findByIdAndUpdate(id, {isApproved: req.body.isApproved},{new: true});
    res.status(200).json({
        status: "Success",
        message: "Review Updated Successfully",
    })
})
module.exports = {
    createReview,
    getAllReviews,
    getAReview,
    deleteAReview,
    updateAReview
}