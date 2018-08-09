const mongoose = require("mongoose");

mongoose.Promise = Promise;

const toilet = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        index: {
            unique: false
        }
    },
    location: {
        type: [Number],
        required: true,
        index: {
            type: "2dsphere",
            sparse: true
        }
    },
    description: {
        type: String,
        required: false
    },
    creationDate: {
        type: Date,
        default: Date.now,
        required: true
    },
    author: {
        type: String,
        required: false
    },
    address: {
        type: String,
        required: true,
    },
});

toilet.index({ loc: "2dsphere" });

module.exports = mongoose.model("toilets", toilet);
