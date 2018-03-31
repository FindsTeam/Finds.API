const express = require("express");
const router = express.Router();

const loginController = require("../controllers/users");
const markerController = require("../controllers/markers");
const placesController = require("../controllers/places");

router.get("/login/:email/:name", loginController.login);
router.get("/register/:email/:name", loginController.register);

router.post("/marker/new", markerController.createMarker);
router.get("/marker/:id", markerController.getMarkerById);
router.delete("/marker/:id", markerController.deleteMarkerById);
router.get("/marker/near/:lat/:lng", markerController.getMarkersNear);

router.get("/place/:placeId", placesController.getPlaceById);

module.exports = router;