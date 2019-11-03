const { check } = require('express-validator/check');
const { getValidationState } = require('../utils/validationHelper');
const Events = require('../models/events');
const { freebeeTypesModels } = require('../utils/freebeeTypes');
const { convertPointToGeoJSONPoint } = require('../utils/geo');

exports.getEvents = function getEvents(req, res) {
  const state = getValidationState(req);
  if (state.hasErrors) {
    return res.status(400).json({ errors: state.errors });
  }

  Events.find()
    .limit(150)
    .exec((err, events) => {
      if (err) {
        return res.status(500).json(err);
      }
      return res.status(200).json(events.map(event => event.toClient()));
    });
};

exports.getEventById = function getEventById(req, res) {
  const state = getValidationState(req);
  if (state.hasErrors) {
    return res.status(400).json({ errors: state.errors });
  }

  const { id } = req.params;

  Events.findById(id, (err, event) => {
    if (err) {
      return res.status(500).json(err);
    }

    return res.status(200).json(event.toClient());
  });
};

// FOR TEST
exports.createEvent = function createEvent(req, res) {
  const state = getValidationState(req);
  if (state.hasErrors) {
    return res.status(400).json({ errors: state.errors });
  }

  const {
    title, description,
    start, end,
    address, place,
    links,
  } = req.body;

  Events.create({
    title,
    description,
    start,
    end,
    address,
    place,
    links,
  }, (err, event) => {
    if (err) {
      return res.status(500).json(err);
    }

    return res.status(201).json(event.toClient());
  });
};

module.exports.updateEvent = function updateEvent(req, res) {
  const state = getValidationState(req);
  if (state.hasErrors) {
    return res.status(400).json({ errors: state.errors });
  }

  const {
    id,
    title, description,
    start, end,
    address, place,
    links,
  } = req.body;

  Events.findOneAndUpdate({ _id: id }, {
    title,
    description,
    start,
    end,
    address,
    place,
    links,
  },
  { new: true },
  (err, event) => {
    if (err) {
      return res.status(500).json(err);
    }

    return res.status(200).json(event.toClient());
  });
};

exports.deleteEvent = function deleteEvent(req, res) {
  const state = getValidationState(req);
  if (state.hasErrors) {
    return res.status(400).json({ errors: state.errors });
  }

  const { id } = req.params;

  Events.findByIdAndDelete(id, (err) => {
    if (err) {
      return res.status(500).json(err);
    }

    return res.status(204).json();
  });
};

exports.deleteEvents = function deleteEvents(req, res) {
  const state = getValidationState(req);
  if (state.hasErrors) {
    return res.status(400).json({ errors: state.errors });
  }

  const { ids } = req.body;

  Events.deleteMany({
    _id: { $in: ids },
  }, (err) => {
    if (err) {
      return res.status(500).json(err);
    }

    return res.status(204).json();
  });
};

exports.validate = (method) => {
  switch (method) {
    case exports.getEvents.name: {
      return [];
    }
    case exports.getEventById.name: {
      return [
        check('id').exists().isMongoId(),
      ];
    }
    case exports.createEvent.name: {
      return [
        check('title').exists().isString(),
        check('description').exists().isString(),
        check('start').exists(),
        check('end').exists(),
        check('address').exists().isString().not()
          .isEmpty(),
        check('place').optional({ nullable: true }).isString(),
        check('links').exists(),
      ];
    }
    case exports.updateEvent.name: {
      return [
        check('id').exists().isMongoId(),
        check('title').exists().isString(),
        check('description').exists().isString(),
        check('start').exists(),
        check('end').exists(),
        check('address').exists().isString().not()
          .isEmpty(),
        check('place').optional({ nullable: true }).isString(),
        check('links').exists(),
      ];
    }
    case exports.deleteEvent.name: {
      return [
        check('id').exists().isMongoId(),
      ];
    }
    case exports.deleteEvents.name: {
      return [
        check('ids').exists().isArray(),
      ];
    }
    default: {
      return [];
    }
  }
};
