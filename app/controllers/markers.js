const mongoose = require("mongoose");
const Markers = require("../models/markers");

module.exports.createMarker = (req, res) => {
    Markers.findOne({ title: req.body.title }, (err, user) => {
        if (err !== null) {
            res.json("Error");
        } else {
            var marker = new Markers();

            marker.title = req.body.title;
            marker.lat = req.body.lat;
            marker.lng = req.body.lng;
            marker.zoom = req.body.zoom;
            marker.type = req.body.type;
            marker.description = req.body.description;
            marker.adress = req.body.adress;
            marker.time = req.body.time;
            marker.img = req.body.img;
            marker.date = req.body.date;



            marker.save().then(function(err, item) {
                res.json("Marker is created");
            })
        };
    });
}