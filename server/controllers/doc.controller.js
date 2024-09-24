const { default: slugify } = require("slugify")
const asyncHandler = require("../utils/asyncHandler.js")
const Doc = require("../models/documentation.model.js");
const { validateMongodbId } = require("../config/validateMongoDbId.js");

const postDoc = asyncHandler(async(req, res, next) => {
    if (req.body.title) {
        req.body.slug = slugify(req.body.title);
    }
    const postDoc = await Doc.create(req.body);
    res.status(201).json({
        status: "Success",
        message: "Doc Created Successfully",
        postDoc
    })
});
const getADoc = asyncHandler(async (req, res, next) => {
    const {slug } = req.params;

    // Make sure to use 'type' from params for the DocCatCategorySlug
    const getDocData = await Doc.findOne({slug: slug});

    if (!getDocData) {
        return res.status(404).json({
            status: false,
            message: "Doc not found",
        });
    }


    res.status(200).json({
        status: "Success",
        message: "Data Fetched",
        getDocData,
    });
});
const updateDoc = asyncHandler(async(req, res, next) => {
    const {id} = req.params;
    validateMongodbId(id);
    if (req.body.title) {
        req.body.slug = slugify(req.body.title);
    }
    
    const updateDoc = await Doc.findByIdAndUpdate(id, req.body, {new:true});
    res.status(200).json({
        status: "Success",
        message: "Doc updated successfully",
        updateDoc
    })
})
const deleteDoc = asyncHandler(async(req, res, next) => {
    const {id} = req.params;
    validateMongodbId(id);
    
    const deleteDoc = await Doc.findByIdAndDelete(id);
    res.status(200).json({
        status: "Success",
        message: "Doc deleted successfully"
    })
})
const allDoc = asyncHandler(async(req,res, next) => {
    const Docs = await Doc.find();
    res.status(200).json({
        status: "Success",
        message: "Docs Fetched!",
        Docs
    })
});
module.exports = {
    postDoc,
    getADoc,
    updateDoc,
    deleteDoc,
    allDoc
}