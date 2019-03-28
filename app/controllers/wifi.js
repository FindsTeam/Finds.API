const { check } = require('express-validator/check');
const { getValidationState } = require('../utils/validationHelper');
const Wifi = require('../models/wifi');
const { convertPointToGeoJSONPoint } = require('../utils/geo');

exports.getWifi = function getWifi(req, res) {
  const state = getValidationState(req);
  if (state.hasErrors) {
    return res.status(400).json({ errors: state.errors });
  }

  Wifi.find()
    .limit(500)
    .exec((err, wifi) => {
      if (err) {
        return res.status(500).json(err);
      }

      return res.status(200).json(wifi.map(w => w.toClient()));
    });
};

exports.getWifiById = function getWifiById(req, res) {
  const state = getValidationState(req);
  if (state.hasErrors) {
    return res.status(400).json({ errors: state.errors });
  }

  const { id } = req.params;

  Wifi.findById(id, (err, wifi) => {
    if (err) {
      return res.status(500).json(err);
    }

    return res.status(200).json(wifi.toClient());
  });
};

exports.createWifi = function createWifi(req, res) {
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
    password,
  } = req.body;

  Wifi.create({
    title,
    location: convertPointToGeoJSONPoint(location),
    description,
    author,
    address,
    password,
  }, (err, createdWifi) => {
    if (err) {
      return res.status(500).json(err);
    }

    return res.status(201).json(createdWifi.toClient());
  });
};

exports.updateWifi = function updateWifi(req, res) {
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
    password,
  } = req.body;

  Wifi.findOneAndUpdate({ _id: id }, {
    title,
    location: convertPointToGeoJSONPoint(location),
    description,
    author,
    address,
    password,
  },
  { new: true },
  (err, wifi) => {
    if (err) {
      return res.status(500).json(err);
    }

    return res.status(200).json(wifi.toClient());
  });
};

exports.deleteWifi = function deleteWifi(req, res) {
  const state = getValidationState(req);
  if (state.hasErrors) {
    return res.status(400).json({ errors: state.errors });
  }

  const { id } = req.params;

  Wifi.findByIdAndDelete(id, (err) => {
    if (err) {
      return res.status(500).json(err);
    }

    return res.status(204).json();
  });
};

exports.deleteManyWifi = function deleteManyWifi(req, res) {
  const state = getValidationState(req);
  if (state.hasErrors) {
    return res.status(400).json({ errors: state.errors });
  }

  const { ids } = req.body;

  Wifi.deleteMany({
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
    case exports.getWifi.name: {
      return [];
    }
    case exports.getWifiById.name: {
      return [
        check('id').exists().isMongoId(),
      ];
    }
    case exports.createWifi.name: {
      return [
        check('title').exists(),
        check('location').exists().isArray(),
        check('author').optional().isString().not()
          .isEmpty(),
        check('address').exists().isString().not()
          .isEmpty(),
        check('password').optional({ nullable: true }).isString().isLength({ min: 8 }),
        check('description').optional().isString(),
      ];
    }
    case exports.updateWifi.name: {
      return [
        check('id').exists().isMongoId(),
        check('title').exists(),
        check('location').exists().isArray(),
        check('author').optional().isString().not()
          .isEmpty(),
        check('address').exists().isString().not()
          .isEmpty(),
        check('password').optional({ nullable: true }).isString().isLength({ min: 8 }),
        check('description').optional().isString(),
      ];
    }
    case exports.deleteWifi.name: {
      return [
        check('id').exists().isMongoId(),
      ];
    }
    case exports.deleteManyWifi.name: {
      return [
        check('ids').exists().isArray(),
      ];
    }

    default: {
      return [];
    }
  }
};
