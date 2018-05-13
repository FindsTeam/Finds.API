const mongoose = require("mongoose");

mongoose.Promise = Promise;

var organizer = new mongoose.Schema({
    email: {
      type: String,
      unique: true,
      required: true
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
    organizedFreebies: {
      type: [String],
      required: false
    }
});

module.exports = mongoose.model("organizers", user);