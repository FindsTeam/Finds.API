const Wifi = require('../models/wifi');

module.exports.getWifi = (req, res) => {
  Wifi.find()
    .limit(500)
    .exec((err, wifi) => {
      if (err) {
        return res.status(500);
      }
      return res.status(200).json(wifi);
    });
};

module.exports.getWifiById = (req, res) => {
  const { id } = req.params;

  Wifi.findById(id, (err, wifi) => {
    if (err) {
      return res.status(500);
    }

    return res.status(200).json(wifi);
  });
};

module.exports.createWifi = (req, res) => {
  const {
    title,
    location,
    description,
    author,
    address,
    password,
  } = req.body;

  Wifi.create({
    title,
    location,
    description,
    author,
    address,
    password,
  }, (err, createdWifi) => {
    if (err) {
      return res.status(500);
    }

    return res.status(201).json(createdWifi);
  });
};

module.exports.updateWifi = (req, res) => {

};

module.exports.deleteWifi = (req, res) => {

};

module.exports.deleteManyWifi = (req, res) => {

};
