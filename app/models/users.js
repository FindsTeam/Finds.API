const mongoose = require("mongoose");

mongoose.Promise = Promise;

var userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: false
    }
});

module.exports = mongoose.model("users", userSchema);