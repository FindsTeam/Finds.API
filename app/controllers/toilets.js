const { check } = require('express-validator/check');
const { getValidationState } = require('../utils/validationHelper');
const Toilets = require('../models/toilets');
const { convertPointToGeoJSONPoint } = require('../utils/geo');

exports.getToilets = function getToilets(req, res) {
  const state = getValidationState(req);
  if (state.hasErrors) {
    return res.status(400).json({ errors: state.errors });
  }

  Toilets.find()
    .limit(500)
    .exec((err, toilets) => {
      if (err) {
        return res.status(500).json(err);
      }
      return res.status(200).json(toilets.map(t => t.toClient()));
    });
};

exports.getToiletById = function getToiletById(req, res) {
  const state = getValidationState(req);
  if (state.hasErrors) {
    return res.status(400).json({ errors: state.errors });
  }

  const { id } = req.params;

  Toilets.findById(id, (err, toilet) => {
    if (err) {
      return res.status(500).json(err);
    }

    return res.status(200).json(toilet.toClient());
  });
};

exports.createToilet = function createToilet(req, res) {
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

  Toilets.create({
    title,
    location: convertPointToGeoJSONPoint(location),
    description,
    author,
    address,
  }, (err, toilet) => {
    if (err) {
      return res.status(500).json(err);
    }

    return res.status(201).json(toilet.toClient());
  });
};

exports.updateToilet = function updateToilet(req, res) {
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

  Toilets.findOneAndUpdate({ _id: id }, {
    title,
    location: convertPointToGeoJSONPoint(location),
    description,
    author,
    address,
  },
  { new: true },
  (err, toilet) => {
    if (err) {
      return res.status(500).json(err);
    }

    return res.status(200).json(toilet.toClient());
  });
};

exports.deleteToilet = function deleteToilet(req, res) {
  const state = getValidationState(req);
  if (state.hasErrors) {
    return res.status(400).json({ errors: state.errors });
  }

  const { id } = req.params;

  Toilets.findByIdAndDelete(id, (err) => {
    if (err) {
      return res.status(500).json(err);
    }

    return res.status(204).json();
  });
};

exports.deleteToilets = function deleteToilets(req, res) {
  const state = getValidationState(req);
  if (state.hasErrors) {
    return res.status(400).json({ errors: state.errors });
  }

  const { ids } = req.body;

  Toilets.deleteMany({
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
    case exports.getToilets.name: {
      return [];
    }
    case exports.getToiletById.name: {
      return [
        check('id').exists().isMongoId(),
      ];
    }
    case exports.createToilet.name: {
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
    case exports.updateToilet.name: {
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
    case exports.deleteToilet.name: {
      return [
        check('id').exists().isMongoId(),
      ];
    }
    case exports.deleteToilets.name: {
      return [
        check('ids').exists().isArray(),
      ];
    }

    default: {
      return [];
    }
  }
};
