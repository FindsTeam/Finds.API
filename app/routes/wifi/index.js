const express = require('express');

const router = express.Router();

const {
  createWifi,
  deleteManyWifi,
  deleteWifi,
  getWifi,
  getWifiById,
  updateWifi,

  validate,
} = require('../../controllers/wifi');

router.get('/', validate(getWifi.name), getWifi);

router.get('/:id', validate(getWifiById.name), getWifiById);

router.post('/', validate(createWifi.name), createWifi);

router.put('/', validate(updateWifi.name), updateWifi);

router.delete('/:id', validate(deleteWifi.name), deleteWifi);

router.post('/delete', validate(deleteManyWifi.name), deleteManyWifi);

module.exports = router;
