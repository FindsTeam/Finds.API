const express = require('express');

const router = express.Router();

const wifiRoutes = require('./wifi');
const toiletsRoutes = require('./toilets');
const feedbackRoutes = require('./feedback');

router.use('/wifi', wifiRoutes);
router.use('/toilets', toiletsRoutes);
router.use('/feedback', feedbackRoutes);

module.exports = router;
