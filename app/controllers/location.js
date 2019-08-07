const { check } = require('express-validator/check');
const { getValidationState } = require('../utils/validationHelper');
const locationService = require('../services/location');

exports.geocoding = function geocoding(req, res) {
  const state = getValidationState(req);
  if (state.hasErrors) {
    return res.status(400).json({ errors: state.errors });
  }

  return res.status(501).json({});
};

exports.reverseGeocoding = async function reverseGeocoding(req, res) {
  const state = getValidationState(req);
  if (state.hasErrors) {
    return res.status(400).json({ errors: state.errors });
  }

  const { lat, lng } = req.params;

  try {
    const geocodingResult = await locationService.reverseGeocoding(lat, lng);

    if (!geocodingResult) {
      return res.status(404).json(geocodingResult);
    }

    return res.status(200).json(geocodingResult);
  } catch (error) {
    console.error(error);

    return res.status(500).json(error);
  }
};

exports.validate = (method) => {
  switch (method) {
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
