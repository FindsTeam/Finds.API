const express = require('express');

const router = express.Router();

const toiletsController = require('../../controllers/toilets');

router.get('/', toiletsController.getToilets);
router.get('/:id', toiletsController.getToiletById);
router.post('/', toiletsController.createToilet);
router.put('/', toiletsController.updateToilet);
router.delete('/:id', toiletsController.deleteToilet);
router.post('/delete', toiletsController.deleteManyToilets);

module.exports = router;
