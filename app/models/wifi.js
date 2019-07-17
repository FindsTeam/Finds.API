const mongoose = require('mongoose');
const pointSchema = require('./point');
const { toClient } = require('./utils');

mongoose.Promise = Promise;

const wifi = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    index: {
      unique: false,
    },
  },
  location: {
    type: pointSchema,
    required: true,
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
  author: {
    type: String,
    required: false,
  },
  address: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: false,
  },
}, {
  collection: 'wifi',
  versionKey: false,
});

wifi.index({ location: '2dsphere' });

wifi.method('toClient', toClient);

module.exports = mongoose.model('wifi', wifi);
