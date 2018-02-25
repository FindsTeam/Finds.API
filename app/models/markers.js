const mongoose = require("mongoose");

mongoose.Promise = Promise;

const marker = new mongoose.Schema({
    title: {
        type: String,
        unique: true,
        required: true
    },
    location: {
        type: [Number],
        index: {
            type: '2dsphere',
            sparse: true
        }
    },
    zoom: {
        type: Number,
        required: false
    },
    type: {
        type: String,
        required: false
    },
    description: {
        type: String,
        required: false
    },
    adress: {
        type: String,
        required: false
    },
    time: {
        type: String,
        required: false
    },
    img: {
        type: String,
        required: false
    },
    date: {
        type: String,
        required: false
    }
});

marker.index({ loc: "2dsphere" });

module.exports = mongoose.model("markers", marker);