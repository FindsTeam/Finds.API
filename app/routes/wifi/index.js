const express = require('express');
const { validateAuthToken } = require('../../services/auth');

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

router.post('/', validateAuthToken, validate(createWifi.name), createWifi);

router.put('/', validateAuthToken, validate(updateWifi.name), updateWifi);

router.delete('/:id', validateAuthToken, validate(deleteWifi.name), deleteWifi);

router.post('/delete', validateAuthToken, validate(deleteManyWifi.name), deleteManyWifi);

module.exports = router;
