const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    video_url: {
        type: String,
        default: "https://companysegurity.com/modules/iblog/img/post/default.jpg"
    },
    thumbnail: {
        type: String,
        required: true
    },
    keywords: {
        type: [String],
        required: true
    }
}, {timestamps: true});
module.exports = mongoose.model("Video", videoSchema);