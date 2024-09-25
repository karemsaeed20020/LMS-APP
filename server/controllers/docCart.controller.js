const { default: slugify } = require("slugify")
const asyncHandler = require("../utils/asyncHandler.js")
const DocCat = require("../models/docCat.model.js");
const { validateMongodbId } = require("../config/validateMongoDbId.js");

const postDocCat = asyncHandler(async(req, res, next) => {
   
    const postDoc = await DocCat.create(req.body);
    res.status(201).json({
        status: "Success",
        message: "DocCat Created Successfully",
        postDoc
    })
});
const getADocCat = asyncHandler(async (req, res, next) => {
    const {slug } = req.params;

    // Make sure to use 'type' from params for the DocCatCategorySlug
    const getDocCatData = await DocCat.findByOne({slug: slug});

    if (!getDocCatData) {
        return res.status(404).json({
            status: false,
            message: "DocCat not found",
        });
    }


    res.status(200).json({
        status: "Success",
        message: "Data Fetched",
        getDocCatData,
    });
});
const updateDocCat = asyncHandler(async(req, res, next) => {
    const {id} = req.params;
    validateMongodbId(id);
    
    const updateDoc = await DocCat.findByIdAndUpdate(id, req.body, {new:true});
    res.status(200).json({
        status: "Success",
        message: "DocCat updated successfully"
    })
})
const deleteDocCat = asyncHandler(async(req, res, next) => {
    const {id} = req.params;
    validateMongodbId(id);
    
    const deleteDoc = await DocCat.findByIdAndDelete(id);
    res.status(200).json({
        status: "Success",
        message: "DocCat deleted successfully"
    })
})
const allDocCats = asyncHandler(async(req,res, next) => {
    const Docs = await DocCat.find();
    res.status(200).json({
        status: "Success",
        message: "DocCats Fetched!",
        Docs
    })
});
module.exports = {
    postDocCat,
    getADocCat,
    updateDocCat,
    deleteDocCat,
    allDocCats
}