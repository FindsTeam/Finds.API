const mongoose = require('mongoose');

mongoose.Promise = Promise;

const feedback = new mongoose.Schema({
  title: {
    type: String,
  },
  location: {
    type: [Number],
    required: true,
    index: {
      type: '2dsphere',
      sparse: true,
    },
  },
  author: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  type: {
    type: [String],
    required: true,
  },
  password: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: false,
  },
  creationDate: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

module.exports = mongoose.model('feedback', feedback);
