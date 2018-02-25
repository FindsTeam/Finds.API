const mongoose = require("mongoose");
const Markers = require("../models/markers");

module.exports.createMarker = (req, res) => {
    console.log(req.body.title);
    Markers.findOne({ title: req.body.marker.title }, (err, user) => {
        if (err !== null) {
            res.json("Error");
        } else {
            var marker = new Markers();

            console.log(req.body.marker)

            marker.save().then(function(err, item) {
                res.json("Marker is created");
            })
        };
    });
}