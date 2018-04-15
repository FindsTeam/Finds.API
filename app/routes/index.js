const express = require("express");
const router = express.Router();

const loginController = require("../controllers/login");
const markerController = require("../controllers/markers");
const placeController = require("../controllers/places");
const userController = require("../controllers/users");

router.get("/login/:idToken", loginController.login);

// users
router.get("/user/id/:id", userController.getUserById);
router.get("/user/name/:name", userController.getUserByName);
router.put("/user/:id", userController.updateUserById);

// markers CRUD
router.post("/marker", markerController.createMarker);
router.get("/marker/:id", markerController.getMarkerById);
router.put("/marker/:id", markerController.updateMarkerById);
router.delete("/marker/:id", markerController.deleteMarkerById);
// markers + users
router.get("/marker/:idToken/:amount", markerController.recentMarkersByIdToken);
// markers + position
router.get("/marker/near/:lat/:lng", markerController.getMarkersNear);

// google
router.get("/place/:placeId", placeController.getPlaceById);

module.exports = router;