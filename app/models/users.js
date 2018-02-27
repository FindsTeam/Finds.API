const mongoose = require("mongoose");

mongoose.Promise = Promise;

var user = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    name: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("users", user);