const mongoose = require("mongoose");
const docSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    keywords: {
        type: [],
        required: true
    },
    type: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        default: "Developer's Corner"
    },
    category: {
        type: String,
        required: true
    }

})
module.exports = mongoose.model("Doc", docSchema);