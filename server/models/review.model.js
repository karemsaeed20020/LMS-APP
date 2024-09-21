const mongoose = require("mongoose");
const reviewSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "user",
    },
    comment: {
        type: String,
        required: true,
    },
    color: {
        type: String,
        required: true
    },
    isApproved: {
        type: Boolean,
        default: false
    }
}, {timestamps: true})
module.exports = mongoose.model("Review", reviewSchema);    