const express = require('express');

const router = express.Router();

const wifiRoutes = require('./wifi');
const toiletsRoutes = require('./toilets');
const socketsRoutes = require('./sockets');
const waterRoutes = require('./water');
const feedbackRoutes = require('./feedback');
const eventsRoutes = require('./events');
const markersRoutes = require('./markers');
const locationRoutes = require('./location');
const routingRoutes = require('./routing');

router.use('/wifi', wifiRoutes);
router.use('/toilets', toiletsRoutes);
router.use('/sockets', socketsRoutes);
router.use('/water', waterRoutes);
router.use('/feedback', feedbackRoutes);
router.use('/events', eventsRoutes);
router.use('/markers', markersRoutes);
router.use('/location', locationRoutes);
router.use('/route', routingRoutes);

module.exports = router;
