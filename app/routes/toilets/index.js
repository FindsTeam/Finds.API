const express = require('express');
const { validateAuthToken } = require('../../services/auth');

const router = express.Router();

const {
  createToilet,
  deleteToilets,
  deleteToilet,
  getToiletById,
  getToilets,
  updateToilet,

  validate,
} = require('../../controllers/toilets');

router.get('/', validate(getToilets.name), getToilets);

router.get('/:id', validate(getToiletById.name), getToiletById);

router.post('/', validateAuthToken, validate(createToilet.name), createToilet);

router.put('/', validateAuthToken, validate(updateToilet.name), updateToilet);

router.delete('/:id', validateAuthToken, validate(deleteToilet.name), deleteToilet);

router.post('/delete', validateAuthToken, validate(deleteToilets.name), deleteToilets);

module.exports = router;
