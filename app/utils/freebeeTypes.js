const Toilet = require('../models/toilets');
const Wifi = require('../models/wifi');

const freebeeTypes = {
  wifi: { value: 1, label: 'Wi-Fi' },
  toilet: { value: 2, label: 'Туалет' },
  socket: { value: 3, label: 'Розетка' },
};

module.exports.freebeeTypes = freebeeTypes;

const freebeeTypesModels = {
  wifi: { type: freebeeTypes.wifi.value, model: Wifi },
  toilet: { type: freebeeTypes.toilet.value, model: Toilet },
  socket: { type: freebeeTypes.socket.value, model: null },
};

module.exports.freebeeTypesModels = freebeeTypesModels;
