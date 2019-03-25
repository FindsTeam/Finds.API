const mongoose = require('mongoose');
const pointSchema = require('./point');
const { toClient } = require('./utils');

mongoose.Promise = Promise;

const sockets = new mongoose.Schema({
  title: {
    type: String,
    required: false,
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
  collection: 'sockets',
  versionKey: false,
});

sockets.method('toClient', toClient);

sockets.index({ loc: '2dsphere' });

module.exports = mongoose.model('sockets', sockets);
