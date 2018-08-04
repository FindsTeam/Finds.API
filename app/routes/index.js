const express = require("express");
const router = express.Router();

const feedbackController = require("../controllers/feedback");
const wifisController = require("../controllers/wifi");
const toiletsController = require("../controllers/toilets");

// feedback
router.get("/feedback", feedbackController.getFeedback);
router.post("/feedback", feedbackController.createFeedback);

// wifis
router.get("/wifis", wifisController.getWifis);

// toilets
router.get("/toilets", toiletsController.getToilets);
router.post("/toilets", toiletsController.createToilets);

module.exports = router;
