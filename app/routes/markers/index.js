const express = require('express');

const router = express.Router();

const {
  getFreebeeTypes,

  validate,
} = require('../../controllers/markers');

router.get('/types', validate(getFreebeeTypes.name), getFreebeeTypes);

module.exports = router;
