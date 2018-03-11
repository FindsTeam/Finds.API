const mongoose = require("mongoose");

mongoose.Promise = Promise;

const marker = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author_id: {
        type: String,
        required: true
    },
    location: {
        type: [Number],
        index: {
            type: "2dsphere",
            sparse: true
        }
    },
    organizer: {
        type: String,
        required: false
    },
    sort: {
        type: String,
        required: false
    },
    type: {
        type: [String],
        required: false
    },
    description: {
        type: String,
        required: false
    },
    creation_date: {
        type: Date,
        require: true
    },
    start_date: {
        type: Date,
        required: false
    },
    end_date: {
        type: Date,
        required: false
    },
});

marker.index({ loc: "2dsphere" });

module.exports = mongoose.model("markers", marker);