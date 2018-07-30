const Feedback = require("../models/feedback");

const feedbackFromRequest = (body) => {
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
}

module.exports.createFeedback = (req, res) => {
    const { address, type } = req.body;
    if (address && type && type.length) {
        const feedback = feedbackFromRequest(req.body);
        if (!feedback) {
            return res.status(500);
        }
        console.log(feedback);
        feedback.save((err, data) => {
            if (err) {
                return res.status(500);
            }

            return res.status(201).json(data);
        })
    } else {
        return res.status(400).json({ message: "Required fields not filled" })
    }
}

module.exports.getFeedback = (req, res) => {
    Feedback.find()
    .limit(100)
    .exec((err, feedback) => {
        if (err) {
            return res.status(500);
        } else {
            return res.status(200).json(feedback);
        }
    })
}
