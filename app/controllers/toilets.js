const Toilets = require('../models/toilets');

const toiletMapper = (rawToilet) => {
  if (!rawToilet) {
    return null;
  }
  const {
    title,
    location,
    description,
    author,
    address,
  } = rawToilet;

  const toilet = new Toilets();
  toilet.title = title || 'Туалет';
  toilet.location = location;
  toilet.description = description || null;
  toilet.author = author || 'Freebee';
  toilet.address = address;

  return toilet;
};

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
  const toilets = req.body.data || [];
  const transformedToilets = toilets.map(toilet => toiletMapper(toilet));

  Toilets.create(transformedToilets, (err, savedToilets) => {
    if (err) {
      return res.status(500).json({ message: 'Could not save toilets.' });
    }
    return res.status(201).json(savedToilets.toClient());
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

  Toilets.findByIdAndUpdate(id, {
    title,
    location,
    description,
    author,
    address,
  }, (err, toilet) => {
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
