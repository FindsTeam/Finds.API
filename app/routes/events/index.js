const express = require('express');
const { validateAuthToken } = require('../../services/auth');

const router = express.Router();

const {
  getEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
  deleteEvents,

  validate,
} = require('../../controllers/events');

router.get('/', validateAuthToken, validate(getEvents.name), getEvents);

router.get('/:id', validateAuthToken, validate(getEventById.name), getEventById);

router.post('/', validate(createEvent.name), createEvent);

router.put('/', validateAuthToken, validate(updateEvent.name), updateEvent);

router.delete('/:id', validateAuthToken, validate(deleteEvent.name), deleteEvent);

router.post('/delete', validateAuthToken, validate(deleteEvent.name), deleteEvents);

module.exports = router;
