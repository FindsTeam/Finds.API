const express = require("express");
const router = express.Router();

const loginController = require("../controllers/login");
const markerController = require("../controllers/markers");
const placeController = require("../controllers/places");
const userController = require("../controllers/users");
const typeController = require("../controllers/types");

router.get("/login/:idToken", loginController.login);

// profile
router.get("/profile/:idToken", userController.getProfileByIdToken);
router.put("/profile/:idToken", userController.updateProfileByIdToken);
// users
router.get("/user/:nickname", userController.getUserByName);

// markers CRUD
router.get("/marker/:id", markerController.getMarkerById);
router.post("/marker", markerController.createMarker);
router.delete("/marker/:idToken/:id", markerController.deleteMarkerById);
router.put("/marker/:idToken/:id", markerController.updateMarkerById);

// markers + users
router.get("/marker/:idToken/:amount", markerController.recentMarkersByIdToken);
// markers + position
router.get("/marker/near/:lat/:lng", markerController.getMarkersNear);

//types
router.get("/type/:type", typeController.createType);
router.get("/types", typeController.getAllTypes);

// google
router.get("/place/:placeId", placeController.getPlaceById);

module.exports = router;