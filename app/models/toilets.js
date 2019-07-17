const mongoose = require('mongoose');
const pointSchema = require('./point');
const { toClient } = require('./utils');

mongoose.Promise = Promise;

const toilet = new mongoose.Schema({
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
}, {
  collection: 'toilets',
  versionKey: false,
});

toilet.index({ location: '2dsphere' });

toilet.method('toClient', toClient);

module.exports = mongoose.model('toilets', toilet);
