const Wifi = require("../models/wifi");

module.exports.getWifi = (req, res) => {
    Wifi.find()
    .limit(500)
    .exec((err, wifi) => {
        if (err) {
            return res.status(500);
        } else {
            return res.status(200).json(wifi);
        }
    });
};

module.exports.getWifiById = (req, res) => {

};

module.exports.createWifi = (req, res) => {

};

module.exports.updateWifi = (req, res) => {

};

module.exports.deleteWifi = (req, res) => {

};

module.exports.deleteManyWifi = (req, res) => {

};
