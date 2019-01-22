const express = require('express');
const router = express.Router();

const wifiController = require("../../controllers/wifi");

router.get("/", wifiController.getWifi);
router.get("/:id", wifiController.getWifiById);
router.post("/", wifiController.createWifi);
router.put("/", wifiController.updateWifi);
router.delete("/:id", wifiController.deleteWifi);
router.post("/delete", wifiController.deleteManyWifi);

module.exports = router;
