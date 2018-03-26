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
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: false
    },
    authorId: {
        type: Date,
        required: true
    },
    placeId: {
        type: Date,
        required: true
    },
    reviews: {
        type: [Object],
        required: true
    }
});

marker.index({ loc: "2dsphere" });

module.exports = mongoose.model("markers", marker);