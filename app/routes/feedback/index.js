const express = require('express');
const router = express.Router();

const feedbackController = require("../../controllers/feedback");

router.post("/feedback", feedbackController.createFeedback);

router.get("/", feedbackController.getFeedback);
router.get("/:id", feedbackController.getFeedbackById);
router.post("/", feedbackController.createFeedback);
router.post("/approve", feedbackController.approveFeedback);
router.put("/", feedbackController.updateFeedback);
router.delete("/:id", feedbackController.deleteFeedback);
router.post("/delete", feedbackController.deleteManyFeedback);

module.exports = router;
