const mongoose = require("mongoose");

mongoose.Promise = Promise;

const wifi = new mongoose.Schema({
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
    password: {
        type: String,
        required: false,
    },
});

wifi.index({ loc: "2dsphere" });

module.exports = mongoose.model("wifis", wifi);
