const { check } = require('express-validator/check');
const { getValidationState } = require('../utils/validationHelper');
const Water = require('../models/water');
const { convertPointToGeoJSONPoint } = require('../utils/geo');

exports.getWater = function getWater(req, res) {
  const state = getValidationState(req);
  if (state.hasErrors) {
    return res.status(400).json({ errors: state.errors });
  }

  Water.find()
    .limit(500)
    .exec((err, waters) => {
      if (err) {
        return res.status(500).json(err);
      }
      return res.status(200).json(waters.map(s => s.toClient()));
    });
};

exports.getWaterById = function getWaterById(req, res) {
  const state = getValidationState(req);
  if (state.hasErrors) {
    return res.status(400).json({ errors: state.errors });
  }

  const { id } = req.params;

  Water.findById(id, (err, water) => {
    if (err) {
      return res.status(500).json(err);
    }

    return res.status(200).json(water.toClient());
  });
};

exports.createWater = function createWater(req, res) {
  const state = getValidationState(req);
  if (state.hasErrors) {
    return res.status(400).json({ errors: state.errors });
  }

  const {
    title,
    location,
    description,
    author,
    address,
  } = req.body;

  Water.create({
    title,
    location: convertPointToGeoJSONPoint(location),
    description,
    author,
    address,
  }, (err, water) => {
    if (err) {
      return res.status(500).json(err);
    }

    return res.status(201).json(water.toClient());
  });
};

exports.updateWater = function updateWater(req, res) {
  const state = getValidationState(req);
  if (state.hasErrors) {
    return res.status(400).json({ errors: state.errors });
  }

  const {
    id,
    title,
    location,
    description,
    author,
    address,
  } = req.body;

  Water.findOneAndUpdate({ _id: id }, {
    title,
    location: convertPointToGeoJSONPoint(location),
    description,
    author,
    address,
  },
  { new: true },
  (err, water) => {
    if (err) {
      return res.status(500).json(err);
    }

    return res.status(200).json(water.toClient());
  });
};

exports.deleteWaterById = function deleteWaterById(req, res) {
  const state = getValidationState(req);
  if (state.hasErrors) {
    return res.status(400).json({ errors: state.errors });
  }

  const { id } = req.params;

  Water.findByIdAndDelete(id, (err) => {
    if (err) {
      return res.status(500).json(err);
    }

    return res.status(204).json();
  });
};

exports.deleteWater = function deleteWater(req, res) {
  const state = getValidationState(req);
  if (state.hasErrors) {
    return res.status(400).json({ errors: state.errors });
  }

  const { ids } = req.body;

  Water.deleteMany({
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
    case exports.getWater.name: {
      return [];
    }
    case exports.getWaterById.name: {
      return [
        check('id').exists().isMongoId(),
      ];
    }
    case exports.createWater.name: {
      return [
        check('title').optional(),
        check('location').exists().isArray(),
        check('author').exists().isString().not()
          .isEmpty(),
        check('address').exists().isString().not()
          .isEmpty(),
        check('description').optional().isString(),
      ];
    }
    case exports.updateWater.name: {
      return [
        check('id').exists().isMongoId(),
        check('title').optional(),
        check('location').exists().isArray(),
        check('author').optional().isString().not()
          .isEmpty(),
        check('address').exists().isString().not()
          .isEmpty(),
        check('description').optional().isString(),
      ];
    }
    case exports.deleteWaterById.name: {
      return [
        check('id').exists().isMongoId(),
      ];
    }
    case exports.deleteWater.name: {
      return [
        check('ids').exists().isArray(),
      ];
    }

    default: {
      return [];
    }
  }
};
