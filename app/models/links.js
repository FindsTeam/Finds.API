const mongoose = require('mongoose');

const Links = new mongoose.Schema({
  post: {
    type: String,
    required: true,
  },
  place: {
    type: String,
    required: false,
  },
  image: {
    type: String,
    required: false,
  },
});

module.exports = Links;
