const Feedback = require('../models/feedback');
const { convertPointToGeoJSONPoint } = require('../utils/geo');

module.exports.getFeedback = (req, res) => {
  Feedback.find()
    .limit(100)
    .exec((err, feedback) => {
      if (err) {
        return res.status(500);
      }
      return res.status(200).json(feedback.map(f => f.toClient()));
    });
};

module.exports.getFeedbackById = (req, res) => {
  const { id } = req.params;

  Feedback.findById(id, (err, feedback) => {
    if (err) {
      return res.status(500);
    }

    return res.status(200).json(feedback.toClient());
  });
};

module.exports.createFeedback = (req, res) => {
  const {
    title,
    location,
    author,
    address,
    type,
    password,
    description,
  } = req.body;

  Feedback.create({
    title,
    location,
    author,
    address,
    type,
    password,
    description,
  }, (err, feedback) => {
    if (err) {
      return res.status(500);
    }

    return res.status(201).json(feedback.toClient());
  });
};

module.exports.approveFeedback = (req, res) => res.status(403);

module.exports.updateFeedback = (req, res) => {
  const {
    id,
    address,
    author,
    location,
    description,
  } = req.body;

  Feedback.findOneAndUpdate({ _id: id }, {
    location: convertPointToGeoJSONPoint(location),
    description,
    author,
    address,
  },
  { new: true },
  (err, feedback) => {
    if (err) {
      return res.status(500);
    }

    return res.status(200).json(feedback.toClient());
  });
};

module.exports.deleteFeedback = (req, res) => {
  const { id } = req.params;

  Feedback.findByIdAndDelete(id, (err) => {
    if (err) {
      return res.status(500);
    }

    return res.status(204);
  });
};

module.exports.deleteManyFeedback = (req, res) => {
  const ids = req.body;

  Feedback.deleteMany({
    id: { $in: ids },
  }, (err) => {
    if (err) {
      return res.status(500);
    }

    return res.status(204);
  });
};
