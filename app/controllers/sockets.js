const { check } = require('express-validator/check');
const { getValidationState } = require('../utils/validationHelper');
const Sockets = require('../models/sockets');
const { convertPointToGeoJSONPoint } = require('../utils/geo');

exports.getSockets = function getSockets(req, res) {
  const state = getValidationState(req);
  if (state.hasErrors) {
    return res.status(400).json({ errors: state.errors });
  }

  Sockets.find()
    .limit(500)
    .exec((err, sockets) => {
      if (err) {
        return res.status(500).json(err);
      }
      return res.status(200).json(sockets.map(s => s.toClient()));
    });
};

exports.getSocketById = function getSocketById(req, res) {
  const state = getValidationState(req);
  if (state.hasErrors) {
    return res.status(400).json({ errors: state.errors });
  }

  const { id } = req.params;

  Sockets.findById(id, (err, socket) => {
    if (err) {
      return res.status(500).json(err);
    }

    return res.status(200).json(socket.toClient());
  });
};

exports.createSocket = function createSocket(req, res) {
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

  Sockets.create({
    title,
    location: convertPointToGeoJSONPoint(location),
    description,
    author,
    address,
  }, (err, socket) => {
    if (err) {
      return res.status(500).json(err);
    }

    return res.status(201).json(socket.toClient());
  });
};

exports.updateSocket = function updateSocket(req, res) {
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

  Sockets.findOneAndUpdate({ _id: id }, {
    title,
    location: convertPointToGeoJSONPoint(location),
    description,
    author,
    address,
  },
  { new: true },
  (err, socket) => {
    if (err) {
      return res.status(500).json(err);
    }

    return res.status(200).json(socket.toClient());
  });
};

exports.deleteSocket = function deleteSocket(req, res) {
  const state = getValidationState(req);
  if (state.hasErrors) {
    return res.status(400).json({ errors: state.errors });
  }

  const { id } = req.params;

  Sockets.findByIdAndDelete(id, (err) => {
    if (err) {
      return res.status(500).json(err);
    }

    return res.status(204).json();
  });
};

exports.deleteSockets = function deleteSockets(req, res) {
  const state = getValidationState(req);
  if (state.hasErrors) {
    return res.status(400).json({ errors: state.errors });
  }

  const { ids } = req.body;

  Sockets.deleteMany({
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
    case exports.getSockets.name: {
      return [];
    }
    case exports.getSocketById.name: {
      return [
        check('id').exists().isMongoId(),
      ];
    }
    case exports.createSocket.name: {
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
    case exports.updateSocket.name: {
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
    case exports.deleteSocket.name: {
      return [
        check('id').exists().isMongoId(),
      ];
    }
    case exports.deleteSockets.name: {
      return [
        check('ids').exists().isArray(),
      ];
    }

    default: {
      return [];
    }
  }
};
