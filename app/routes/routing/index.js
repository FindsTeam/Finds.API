const express = require('express');

const router = express.Router();

const {
  getRoute,

  validate,
} = require('../../controllers/routing');

router.post('/', validate(getRoute.name), getRoute);

module.exports = router;
