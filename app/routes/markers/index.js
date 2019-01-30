const express = require('express');

const router = express.Router();

const markersController = require('../../controllers/markers');

router.get('/types', markersController.getFreebeeTypes);

module.exports = router;
