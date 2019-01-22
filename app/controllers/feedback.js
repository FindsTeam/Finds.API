const Feedback = require("../models/feedback");

const feedbackMapper = (body) => {
    const feedback = new Feedback();

    if (body) {
        const { address, type, description, author } = body;

        feedback.address = address;
        feedback.type = type;
        feedback.creationDate = Date.now();
        feedback.description = description ? description : null;
        feedback.author = author ? author : null;

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
        } else {
            return res.status(200).json(feedback);
        }
    });
};

module.exports.getFeedbackById = (req, res) => {

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
            return res.status(201).json(data);
        });
    } else {
        return res.status(400).json({ message: "Required fields are not filled" });
    }
};

module.exports.approveFeedback = (req, res) => {

};

module.exports.updateFeedback = (req, res) => {

};

module.exports.deleteFeedback = (req, res) => {

};

module.exports.deleteManyFeedback = (req, res) => {

};
