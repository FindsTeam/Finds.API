const { check } = require('express-validator/check');
const { getValidationState } = require('../utils/validationHelper');
const locationService = require('../services/location');

exports.getRoute = function getRoute(req, res) {
  const state = getValidationState(req);
  if (state.hasErrors) {
    return res.status(400).json({ errors: state.errors });
  }
};

exports.geocoding = function geocoding(req, res) {
  const state = getValidationState(req);
  if (state.hasErrors) {
    return res.status(400).json({ errors: state.errors });
  }
};

exports.reverseGeocoding = async function reverseGeocoding(req, res) {
  const state = getValidationState(req);
  if (state.hasErrors) {
    return res.status(400).json({ errors: state.errors });
  }

  const { lat, lng } = req.params;

  try {
    const result = await locationService.reverseGeocoding(lat, lng);

    return res.status(200).json(result);
  } catch (error) {
    console.error(error);

    return res.status(500).json(error);
  }
};

exports.validate = (method) => {
  switch (method) {
    case exports.getRoute.name: {
      return [];
    }
    case exports.geocoding.name: {
      return [];
    }
    case exports.reverseGeocoding.name: {
      return [
        check('lat').exists().isNumeric(),
        check('lng').exists().isNumeric(),
      ];
    }
    default: {
      return [];
    }
  }
};
