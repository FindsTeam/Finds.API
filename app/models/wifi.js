/* eslint-disable func-names */
/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose');
const pointSchema = require('./point');

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

wifi.method('toClient', function () {
  const obj = this.toObject();

  obj.id = obj._id;
  delete obj._id;

  return obj;
});

module.exports = mongoose.model('wifi', wifi);
