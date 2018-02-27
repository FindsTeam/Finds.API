const express = require("express");
const router = express.Router();

const ctrLogin = require("../controllers/users");
const ctrMarkers = require("../controllers/markers");

router.get("/login/:email/:name", ctrLogin.login);

router.post("/marker/new", ctrMarkers.createMarker);
router.get("/marker/near/:lat/:lng", ctrMarkers.getMarkersNear);

module.exports = router;