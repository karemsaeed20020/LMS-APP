const mongoose = require("mongoose");
const contactSchema = new mongoose.Schema({
    name: {
        type:  String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    mobile: {
        type: String,
        required: true,
    },
    subject: {
        type: String,
        required: true,
    },
    profession: {
        type: String,
        required: true,
    },
    comment: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        default: "Submitted",
    }
}, {timestamps: true})
module.exports = mongoose.model("Contact", contactSchema);    