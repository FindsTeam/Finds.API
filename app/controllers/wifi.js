const Wifi = require('../models/wifi');
const { convertPointToGeoJSONPoint } = require('../utils/geo');

module.exports.getWifi = (req, res) => {
  Wifi.find()
    .limit(500)
    .exec((err, wifi) => {
      if (err) {
        return res.status(500);
      }

      return res.status(200).json(wifi.map(w => w.toClient()));
    });
};

module.exports.getWifiById = (req, res) => {
  const { id } = req.params;

  Wifi.findById(id, (err, wifi) => {
    if (err) {
      return res.status(500);
    }

    return res.status(200).json(wifi.toClient());
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
    location: convertPointToGeoJSONPoint(location),
    description,
    author,
    address,
    password,
  }, (err, createdWifi) => {
    if (err) {
      return res.status(500);
    }

    return res.status(201).json(createdWifi.toClient());
  });
};

module.exports.updateWifi = (req, res) => {
  const {
    id,
    title,
    location,
    description,
    author,
    address,
    password,
  } = req.body;

  Wifi.findOneAndUpdate({ _id: id }, {
    title,
    location: convertPointToGeoJSONPoint(location),
    description,
    author,
    address,
    password,
  },
  { new: true },
  (err, wifi) => {
    if (err) {
      return res.status(500);
    }

    return res.status(200).json(wifi.toClient());
  });
};

module.exports.deleteWifi = (req, res) => {
  const { id } = req.params;

  Wifi.findByIdAndDelete(id, (err) => {
    if (err) {
      return res.status(500);
    }

    return res.status(204);
  });
};

module.exports.deleteManyWifi = (req, res) => {
  const ids = req.body;

  Wifi.deleteMany({
    id: { $in: ids },
  }, (err) => {
    if (err) {
      return res.status(500);
    }

    return res.status(204);
  });
};
