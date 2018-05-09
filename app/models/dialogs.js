const mongoose = require("mongoose");

mongoose.Promise = Promise;

var dialog = new mongoose.Schema({
    participants: {
        type: [String],
        required: true
    },
    messages: [{
        from: {
            type: String,
            required: true
        },
        date: {
            type: Date,
            default: Date.now,
            required: true
        },
        text: {
            type: String,
            required: true
        }
    }]
});

module.exports = mongoose.model("dialogs", dialog);