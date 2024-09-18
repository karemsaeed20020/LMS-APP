const mongoose = require('mongoose');
const AppError = require('../utils/AppError.js');

const validateMongodbId = (id) => {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) {
        // Throwing a custom AppError with status code 400 for invalid ID
        throw new AppError("Invalid MongoDB ID or not found", 400);
    }
}

module.exports = {
    validateMongodbId
}
