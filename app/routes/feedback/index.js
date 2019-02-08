const express = require('express');

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

router.get('/', validate(getFeedback.name), getFeedback);

router.get('/:id', validate(getFeedbackById.name), getFeedbackById);

router.post('/', validate(createFeedback.name), createFeedback);

router.post('/approve', validate(approveFeedback.name), approveFeedback);

router.put('/', validate(updateFeedback.name), updateFeedback);

router.delete('/:id', validate(deleteFeedback.name), deleteFeedback);

router.post('/delete', validate(deleteManyFeedback.name), deleteManyFeedback);

module.exports = router;
