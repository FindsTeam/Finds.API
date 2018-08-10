const mongoose = require("mongoose");

mongoose.Promise = Promise;

const feedback = new mongoose.Schema({
    author: {
        type: String,
        required: false,
    },
    address: {
        type: String,
        required: true,
    },
    type: {
        type: [String],
        required: true,
    },
    description: {
        type: String,
        required: false
    },
    creationDate: {
        type: Date,
        default: Date.now,
        required: true
    }
});

module.exports = mongoose.model("feedback", feedback);
