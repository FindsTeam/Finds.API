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
        required: true
    },
    lng: {
        type: Number,
        required: true
    },
    zoom: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    adress: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("markers", marker);