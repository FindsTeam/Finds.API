const express = require('express');

const router = express.Router();

const {
  createToilet,
  deleteManyToilets,
  deleteToilet,
  getToiletById,
  getToilets,
  updateToilet,

  validate,
} = require('../../controllers/toilets');

router.get('/', validate(getToilets.name), getToilets);

router.get('/:id', validate(getToiletById.name), getToiletById);

router.post('/', validate(createToilet.name), createToilet);

router.put('/', validate(updateToilet.name), updateToilet);

router.delete('/:id', validate(deleteToilet.name), deleteToilet);

router.post('/delete', validate(deleteManyToilets.name), deleteManyToilets);

module.exports = router;
