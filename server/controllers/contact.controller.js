const { validateMongodbId } = require("../config/validateMongoDbId.js");
const asyncHandler = require("../utils/asyncHandler.js");
const Contact = require("../models/contact.model.js")
const createContact = asyncHandler(async(req, res, next) => {
    const {_id} = req.user;
    validateMongodbId(_id);
    
    const contact = await Contact.create(req.body);
    res.status(201).json({
        status: "Success",
        message: "Contact created successfully",
        contact
    })
})
const getAllContacts = asyncHandler(async(req, res, next) => {
    const contact = await Contact.find();
    res.status(200).json({
        status: "Success",
        message: "Contact Fetched Successfully",
        contact
    })
})
const getAContact = asyncHandler(async(req, res, next) => {
    const {id} = req.params;
    const contact = await Contact.findById(id);
    res.status(200).json({
        status: "Success",
        message: "Contact Fetched Successfully",
        contact
    })
})
const deleteAContact = asyncHandler(async(req, res, next) => {
    const {id} = req.params;
    const contact = await Contact.findByIdAndDelete(id);
    res.status(200).json({
        status: "Success",
        message: "Contact Deleted Successfully",
    })
})
const updateAContact = asyncHandler(async(req, res, next) => {
    const {id} = req.params;
    const contact = await Contact.findByIdAndUpdate(id, {status: req.body.status},{new: true});
    res.status(200).json({
        status: "Success",
        message: "Review Updated Successfully",
    })
})
module.exports = {
    createContact,
    getAllContacts,
    getAContact,
    deleteAContact,
    updateAContact
}