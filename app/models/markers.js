const mongoose = require("mongoose");

mongoose.Promise = Promise;

var marker = new mongoose.Schema({
    title: {
        type: String,
        unique: true,
        required: true
    },
    lat: {
        type: Number,
        required: false
    },
    lng: {
        type: Number,
        required: false
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

module.exports = mongoose.model("markers", marker);