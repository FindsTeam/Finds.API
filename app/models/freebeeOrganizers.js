const mongoose = require("mongoose");

mongoose.Promise = Promise;

const freebeeOrganizers = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  location: { // or google id object
    type: [Number],
    index: {
        type: "2dsphere",
        sparse: true
    }
  },
  details: {
    contact_phone: {
      type: String,
      required: false,
    },
    address: {
      type: String,
      required: false,
    }
  },
  organized_freebie: {
    type: [String],
    required: false
  }
});

module.exports = mongoose.model("freebeeOrganizers", freebeeOrganizers);
