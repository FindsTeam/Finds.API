const mongoose = require('mongoose');
const Links = require('./links');
const { toClient } = require('./utils');

mongoose.Promise = Promise;

const events = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  start: {
    type: Date,
    required: true,
  },
  end: {
    type: Date,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  place: {
    type: String,
    required: false,
  },
  links: {
    type: Links,
    required: true,
  },
}, {
  collection: 'events',
  versionKey: false,
});

events.method('toClient', toClient);

module.exports = mongoose.model('events', events);
