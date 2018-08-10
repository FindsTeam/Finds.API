const Wifis = require("../models/wifis");

module.exports.getWifis = (req, res) => {
    Wifis.find()
    .limit(500)
    .exec((err, wifis) => {
        if (err) {
            return res.status(500);
        } else {
            return res.status(200).json(wifis);
        }
    });
};

