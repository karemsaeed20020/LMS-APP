const slugify  = require("slugify");
const TutorialCategory = require("../models/tutCategory.model.js");
const asyncHandler = require("../utils/asyncHandler.js");
const { validateMongodbId } = require("../config/validateMongoDbId.js");



const postTutorialCategory = asyncHandler(async(req, res, next) => {
    if (req.body.title) {
        req.body.slug = slugify(req.body.title.toLowerCase());
    }
    const postTutorialCategory = TutorialCategory.create(req.body);
    res.status(201).json({
        status: "Success",
        message: "Tutorial category created successfully"
    })
})
const getAllTutorialCategories = asyncHandler(async(req, res, next) => {
    const allTutorialCategories = await TutorialCategory.find();
    res.status(200).json({
        status: "Success",
        message: "Tutorials Category Fetched Successifully",
        allTutorialCategories
    }) 
});
const getATutorialCategory = asyncHandler(async(req, res, next) => {
    const {id} = req.params;
    validateMongodbId(id);
    const findTutCategory = await TutorialCategory.findById(id);
    res.status(200).json({
        status: "Success",
        message: "Tutorial Category Fetched!",
        findTutCategory,
    })
})
const deleteATutorialCategory = asyncHandler(async(req, res, next) => {
    const {id} = req.params;
    validateMongodbId(id);
    const deleteTutCategory = await TutorialCategory.findByIdAndDelete(id);
    res.status(200).json({
        status: "Success",
        message: "Tutorial Category Deleted Successfully",
        deleteTutCategory,
    })
})
const updateATutorialCategory = asyncHandler(async(req, res, next) => {
    const {id} = req.params;
    validateMongodbId(id);
    req.body.slug = slugify(req.body.title.toLowerCase());
    const updateTutCategory = await TutorialCategory.findByIdAndUpdate(id, req.body, {new: true});
    res.status(200).json({
        status: "Success",
        message: "Tutorial Category Updated Successfully",
        updateTutCategory,
    })
})

module.exports = {
    postTutorialCategory,
    getAllTutorialCategories,
    getATutorialCategory,
    deleteATutorialCategory,
    updateATutorialCategory
}