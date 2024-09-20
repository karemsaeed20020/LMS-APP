const asyncHandler = require("../utils/asyncHandler.js");
const NewsLetter = require("../models/newsLetter.model.js");
const { validateMongodbId } = require("../config/validateMongoDbId.js");
const subscribe = asyncHandler(async(req, res, next) => {
    const newEmail = await NewsLetter.create(req.body);
    res.status(201).json({
        status: "Success",
        message: "Subscribed To NewsLetter!"
    })
})
const unsubscribe = asyncHandler(async(req, res, next) => {
    const {id} = req.params;
    validateMongodbId(id);
    const deleteEmail = await NewsLetter.findByIdAndDelete(id);
    res.status(200).json({
        status: "Success",
        message: "UnSubscribed To NewsLetter!"
    })
})

module.exports = {
    subscribe,
    unsubscribe
}