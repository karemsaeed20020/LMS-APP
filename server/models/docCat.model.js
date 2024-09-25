const mongoose = require('mongoose');

const docCatSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    }
}, {timestamps: true});
module.exports = mongoose.model("DocCat", docCatSchema);