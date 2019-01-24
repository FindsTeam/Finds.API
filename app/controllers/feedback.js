const Feedback = require('../models/feedback');

const feedbackMapper = (body) => {
  const feedback = new Feedback();

  if (body) {
    const {
      address, type, description, author,
    } = body;

    feedback.address = address;
    feedback.type = type;
    feedback.creationDate = Date.now();
    feedback.description = description || null;
    feedback.author = author || null;

    return feedback;
  }
  return null;
};

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
  const { address, type } = req.body;
  if (address && type && type.length) {
    const feedback = feedbackMapper(req.body);
    if (!feedback) {
      return res.status(500);
    }
    feedback.save((err, data) => {
      if (err) {
        return res.status(500);
      }
      return res.status(201).json(data.toClient());
    });
  } else {
    return res.status(400).json({ message: 'Required fields are not filled' });
  }
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

  Feedback.findByIdAndUpdate(id, {
    location,
    description,
    author,
    address,
  }, (err, feedback) => {
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
