const Toilets = require('../models/toilets');
const { convertPointToGeoJSONPoint } = require('../utils/geo');

module.exports.getToilets = (req, res) => {
  Toilets.find()
    .limit(500)
    .exec((err, toilets) => {
      if (err) {
        return res.status(500);
      }
      return res.status(200).json(toilets.map(t => t.toClient()));
    });
};

module.exports.getToiletById = (req, res) => {
  const { id } = req.params;

  Toilets.findById(id, (err, toilet) => {
    if (err) {
      return res.status(500);
    }

    return res.status(200).json(toilet.toClient());
  });
};

module.exports.createToilet = (req, res) => {
  const {
    title,
    location,
    description,
    author,
    address,
  } = req.body;

  Toilets.create({
    title,
    location: convertPointToGeoJSONPoint(location),
    description,
    author,
    address,
  }, (err, toilet) => {
    if (err) {
      return res.status(500);
    }

    return res.status(201).json(toilet.toClient());
  });
};

module.exports.updateToilet = (req, res) => {
  const {
    id,
    title,
    location,
    description,
    author,
    address,
  } = req.body;

  Toilets.findOneAndUpdate({ _id: id }, {
    title,
    location: convertPointToGeoJSONPoint(location),
    description,
    author,
    address,
  },
  { new: true },
  (err, toilet) => {
    if (err) {
      return res.status(500);
    }

    return res.status(200).json(toilet.toClient());
  });
};

module.exports.deleteToilet = (req, res) => {
  const { id } = req.params;

  Toilets.findByIdAndDelete(id, (err) => {
    if (err) {
      return res.status(500);
    }

    return res.status(204);
  });
};

module.exports.deleteManyToilets = (req, res) => {
  const ids = req.body;

  Toilets.deleteMany({
    id: { $in: ids },
  }, (err) => {
    if (err) {
      return res.status(500);
    }

    return res.status(204);
  });
};
