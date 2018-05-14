const mongoose = require("mongoose");

mongoose.Promise = Promise;

var user = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    nickname: {
        type: String,
        required: true
    },
    groups: {
        type: [String],
        required: true
    },
    bio: {
        type: String,
        required: false
    },
    city: {
        type: String,
        required: false
    },
    country: {
        type: String,
        required: false
    },
    phone: {
        type: String,
        required: false
    },
    foundFreebies: {
        type: [String],
        required: false
    },
});

module.exports = mongoose.model("users", user);