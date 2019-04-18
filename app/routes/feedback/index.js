const express = require('express');
const { validateAuthToken } = require('../../services/auth');

const router = express.Router();

const {
  getFeedback,
  getFeedbackById,
  createFeedback,
  approveFeedback,
  updateFeedback,
  deleteFeedback,
  deleteManyFeedback,

  validate,
} = require('../../controllers/feedback');

router.get('/', validateAuthToken, validate(getFeedback.name), getFeedback);

router.get('/:id', validateAuthToken, validate(getFeedbackById.name), getFeedbackById);

router.post('/', validate(createFeedback.name), createFeedback);

router.post('/approve', validateAuthToken, validate(approveFeedback.name), approveFeedback);

router.put('/', validateAuthToken, validate(updateFeedback.name), updateFeedback);

router.delete('/:id', validateAuthToken, validate(deleteFeedback.name), deleteFeedback);

router.post('/delete', validateAuthToken, validate(deleteManyFeedback.name), deleteManyFeedback);

module.exports = router;
