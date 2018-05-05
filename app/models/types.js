const mongoose = require("mongoose");

mongoose.Promise = Promise;

var type = new mongoose.Schema({
    title: {
        type: String,
        unique: true,
        required: true
    },
});

module.exports = mongoose.model("types", type);