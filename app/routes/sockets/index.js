const express = require('express');

const router = express.Router();

const {
  createSocket,
  deleteSockets,
  deleteSocket,
  getSocketById,
  getSockets,
  updateSocket,

  validate,
} = require('../../controllers/sockets');

router.get('/', validate(getSockets.name), getSockets);

router.get('/:id', validate(getSocketById.name), getSocketById);

router.post('/', validate(createSocket.name), createSocket);

router.put('/', validate(updateSocket.name), updateSocket);

router.delete('/:id', validate(deleteSocket.name), deleteSocket);

router.post('/delete', validate(deleteSockets.name), deleteSockets);

module.exports = router;
