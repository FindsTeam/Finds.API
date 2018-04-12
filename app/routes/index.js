const express = require("express");
const router = express.Router();

const loginController = require("../controllers/login");
const markerController = require("../controllers/markers");
const placeController = require("../controllers/places");
const userController = require("../controllers/users");

router.get("/login/:email/:name", loginController.login);
router.get("/register/:email/:name", loginController.register);

router.get("/user/id/:id", userController.getUserById);
router.get("/user/name/:name", userController.getUserByName);
router.put("/user/:id", userController.updateUserById);

router.put("/user/evolve/:id", userController.becomeOrganizer);

router.post("/marker", markerController.createMarker);
router.get("/marker/:id", markerController.getMarkerById);
router.put("/marker/:id", markerController.updateMarkerById);
router.delete("/marker/:id", markerController.deleteMarkerById);

router.get("/marker/near/:lat/:lng", markerController.getMarkersNear);

router.get("/place/:placeId", placeController.getPlaceById);

module.exports = router;