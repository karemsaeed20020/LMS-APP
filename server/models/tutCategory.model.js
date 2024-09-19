const mongoose = require("mongoose");

const tutCategorySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    slug: {
        type: String,
        required: true,
        unique: true,
        index: true,
    },
    image: {
        type: String,
        default: "https://companysegurity.com/modules/iblog/img/post/default.jpg"
    }
}, {timestamps: true})

module.exports = mongoose.model("TutorialCategory", tutCategorySchema);