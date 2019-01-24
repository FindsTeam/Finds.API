/* eslint-disable func-names */
/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose');
const pointSchema = require('./point');

mongoose.Promise = Promise;

const feedback = new mongoose.Schema({
  title: {
    type: String,
  },
  location: {
    type: pointSchema,
    required: true,
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
}, {
  collection: 'feedback',
  versionKey: false,
});

feedback.method('toClient', function () {
  const obj = this.toObject();

  obj.id = obj._id;
  delete obj._id;

  return obj;
});

feedback.index({ loc: '2dsphere' });

module.exports = mongoose.model('feedback', feedback);
