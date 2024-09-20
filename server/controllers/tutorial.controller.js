const { default: slugify } = require("slugify")
const asyncHandler = require("../utils/asyncHandler.js")
const Tutorial = require("../models/tutorial.model.js");
const { validateMongodbId } = require("../config/validateMongoDbId.js");

const postTutorial = asyncHandler(async(req, res, next) => {
    if (req.body.title) {
        req.body.slug = slugify(req.body.title.toLowerCase());
        if (req.body.tutorialCategory) {
            req.body.tutorialCategorySlug = slugify(req.body.tutorialCategory.toLowerCase());
        }
    }
    const postTut = await Tutorial.create(req.body);
    res.status(201).json({
        status: "Success",
        message: "Tutorial Created Successfully"
    })
});
const getATutorial = asyncHandler(async (req, res, next) => {
    const { slug, type } = req.params;

    // Make sure to use 'type' from params for the tutorialCategorySlug
    const getTutorialData = await Tutorial.findOne({ slug: slug, tutorialCategorySlug: type });

    if (!getTutorialData) {
        return res.status(404).json({
            status: false,
            message: "Tutorial not found",
        });
    }

    // Fetching related tutorial topics by the type parameter
    const tutorialTopics = await Tutorial.find({ tutorialCategorySlug: type })
        .select("topicName title slug tutorialCategorySlug")
        .sort("createdAt");

    res.status(200).json({
        status: "Success",
        message: "Data Fetched",
        getTutorialData,
        tutorialTopics,
    });
});
const updateTutorial = asyncHandler(async(req, res, next) => {
    const {id} = req.params;
    validateMongodbId(id);
    if (req.body.title) {
        req.body.slug = slugify(req.body.title.toLowerCase());
        if (req.body.tutorialCategory) {
            req.body.tutorialCategorySlug = slugify(req.body.tutorialCategory.toLowerCase());
        }
    }
    const updateTut = await Tutorial.findByIdAndUpdate(id, req.body, {new:true});
    res.status(200).json({
        status: "Success",
        message: "Tutorial updated successfully"
    })
})
const deleteTutorial = asyncHandler(async(req, res, next) => {
    const {id} = req.params;
    validateMongodbId(id);
    
    const deleteTut = await Tutorial.findByIdAndDelete(id);
    res.status(200).json({
        status: "Success",
        message: "Tutorial deleted successfully"
    })
})
const allTutorials = asyncHandler(async(req,res, next) => {
    const tuts = await Tutorial.find();
    res.status(200).json({
        status: "Success",
        message: "Tutorials Fetched!",
        tuts
    })
});
module.exports = {
    postTutorial,
    getATutorial,
    updateTutorial,
    deleteTutorial,
    allTutorials
}