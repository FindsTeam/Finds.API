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
  contact_phone: {
    type: String,
    required: false,
  },
  address: {
    type: String,
    required: false,
  },
  organized_freebie: {
    type: [String],
    required: false
  }
});

module.exports = mongoose.model("freebeeOrganizers", freebeeOrganizers);
