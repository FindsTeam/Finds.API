const express = require('express');
const { validateAuthToken } = require('../../services/auth');

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

router.post('/', validateAuthToken, validate(createSocket.name), createSocket);

router.put('/', validateAuthToken, validate(updateSocket.name), updateSocket);

router.delete('/:id', validateAuthToken, validate(deleteSocket.name), deleteSocket);

router.post('/delete', validateAuthToken, validate(deleteSockets.name), deleteSockets);

module.exports = router;
