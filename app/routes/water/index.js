const express = require('express');
const { validateAuthToken } = require('../../services/auth');

const router = express.Router();

const {
  createWater,
  deleteWater,
  deleteWaterById,
  getWaterById,
  getWater,
  updateWater,

  validate,
} = require('../../controllers/water');

router.get('/', validate(getWater.name), getWater);

router.get('/:id', validate(getWaterById.name), getWaterById);

router.post('/', validateAuthToken, validate(createWater.name), createWater);

router.put('/', validateAuthToken, validate(updateWater.name), updateWater);

router.delete('/:id', validateAuthToken, validate(deleteWaterById.name), deleteWaterById);

router.post('/delete', validateAuthToken, validate(deleteWater.name), deleteWater);

module.exports = router;
