const mongoose = require("mongoose");

mongoose.Promise = Promise;

const marker = new mongoose.Schema({
    title: {
        type: String,
        unique: false,
        required: true
    },
    location: {
        type: [Number],
        index: {
            type: "2dsphere",
            sparse: true
        }
    },
    type: {
        type: [String],
        required: false
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
    startDate: {
        type: Date,
        default: Date.now,
        required: true
    },
    endDate: {
        type: Date,
        required: false
    },
    authorId: {
        type: String,
        required: true
    },
    placeId: {
        type: String,
        required: true
    },
    reviews: {
        type: [Object],
        required: false
    }
});

marker.index({ loc: "2dsphere" });

module.exports = mongoose.model("markers", marker);