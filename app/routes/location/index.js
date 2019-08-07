const express = require('express');

const router = express.Router();

const {
  geocoding,
  reverseGeocoding,

  validate,
} = require('../../controllers/location');

router.get('/geocoding', validate(geocoding.name), geocoding);
router.get('/geocoding/reverse/:lat/:lng', validate(reverseGeocoding.name), reverseGeocoding);

module.exports = router;
