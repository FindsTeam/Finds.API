const { check, validationResult } = require('express-validator/check');
const Feedback = require('../models/feedback');
const { freebeeTypesModels } = require('../utils/freebeeTypes');
const { convertPointToGeoJSONPoint } = require('../utils/geo');

exports.getFeedback = (req, res) => {
  Feedback.find()
    .limit(100)
    .exec((err, feedback) => {
      if (err) {
        return res.status(500).json(err);
      }
      return res.status(200).json(feedback.map(f => f.toClient()));
    });
};

exports.getFeedbackById = function getFeedbackById(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(401).json({ errors: errors.array() });
  }

  const { id } = req.params;

  Feedback.findById(id, (err, feedback) => {
    if (err) {
      return res.status(500).json(err);
    }

    return res.status(200).json(feedback.toClient());
  });
};

exports.createFeedback = function createFeedback(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(401).json({ errors: errors.array() });
  }

  const {
    title,
    location,
    author,
    address,
    type,
    password,
    description,
  } = req.body;

  Feedback.create({
    title,
    location,
    author,
    address,
    type,
    password,
    description,
  }, (err, feedback) => {
    if (err) {
      return res.status(500).json(err);
    }

    return res.status(201).json(feedback.toClient());
  });
};

exports.approveFeedback = function approveFeedback(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(401).json({ errors: errors.array() });
  }

  const { type } = req.body;
  const firstType = parseInt(type[0], 10);

  // eslint-disable-next-line no-restricted-globals
  if (isNaN(firstType)) {
    return res.status(401);
  }

  const freebeeTypeWithModel = Object.values(freebeeTypesModels)
    .find(typeModel => typeModel.type === firstType);

  const MarkerModel = freebeeTypeWithModel.model;

  const marker = new MarkerModel({ ...req.body });

  marker.save((createdMarker, err) => {
    if (err) {
      return res.status(500);
    }

    return res.status(201).json(createdMarker.toClient());
  });
};

module.exports.updateFeedback = function updateFeedback(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(401).json({ errors: errors.array() });
  }

  const {
    id,
    address,
    author,
    location,
    description,
  } = req.body;

  Feedback.findOneAndUpdate({ _id: id }, {
    location: convertPointToGeoJSONPoint(location),
    description,
    author,
    address,
  },
  { new: true },
  (err, feedback) => {
    if (err) {
      return res.status(500);
    }

    return res.status(200).json(feedback.toClient());
  });
};

exports.deleteFeedback = function deleteFeedback(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(401).json({ errors: errors.array() });
  }

  const { id } = req.params;

  Feedback.findByIdAndDelete(id, (err) => {
    if (err) {
      return res.status(500);
    }

    return res.status(204);
  });
};

exports.deleteManyFeedback = function deleteManyFeedback(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(401).json({ errors: errors.array() });
  }

  const { ids } = req.body;

  Feedback.deleteMany({
    id: { $in: ids },
  }, (err) => {
    if (err) {
      return res.status(500);
    }

    return res.status(204);
  });
};

exports.validate = (method) => {
  switch (method) {
    case exports.getFeedback.name: {
      return [];
    }
    case exports.getFeedbackById.name: {
      return [
        check('id').exists().isMongoId(),
      ];
    }
    case exports.createFeedback.name: {
      return [
        check('title').optional(),
        check('location').exists().isArray().isLength({ min: 2, max: 2 }),
        check('author').exists().isString().not()
          .isEmpty(),
        check('address').exists().isString().not()
          .isEmpty(),
        check('type').exists().isArray().isLength({ min: 1 }),
        check('password').optional().isString().isLength({ min: 8 }),
        check('description').optional(),
      ];
    }
    case exports.approveFeedback.name: {
      return [
        check('type').exists().isArray().isLength({ min: 1 }),
        check('id').exists().isMongoId(),
        check('location').exists().isArray().isLength({ min: 2, max: 2 }),
        check('author').exists().isString(),
        check('address').exists().isString().not()
          .isEmpty(),
        check('password').optional().isString().isLength({ min: 8 }),
        check('description').optional(),
      ];
    }
    case exports.updateFeedback.name: {
      return [
        check('id').exists().isMongoId(),
        check('location').exists().isArray().isLength({ min: 2, max: 2 }),
        check('author').exists().isString().not()
          .isEmpty(),
        check('address').exists().isString().not()
          .isEmpty(),
        check('type').exists().isArray().isLength({ min: 1 }),
      ];
    }
    case exports.deleteFeedback.name: {
      return [
        check('id').exists().isMongoId(),
      ];
    }
    case exports.deleteManyFeedback.name: {
      return [
        check('ids').exists().isArray().isLength({ min: 1 }),
      ];
    }

    default: {
      return [];
    }
  }
};
