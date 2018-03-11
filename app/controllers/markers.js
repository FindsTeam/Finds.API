const mongoose = require("mongoose");
const Markers = require("../models/markers");

module.exports.createMarker = (req, res) => {
    Markers.findOne({ title: req.body.title }, (err, user) => {
        if (err) {
            res.json("Error: " + err);
        } else {
            var marker = new Markers();
            marker.title = req.body.title;
            marker.author_id = req.body.author_id;
            marker.location = [parseFloat(req.body.lat), parseFloat(req.body.lng)];
            marker.organizer = req.body.organizer;
            marker.sort = req.body.sort;
            marker.type = JSON.parse(req.body.type);
            marker.description = req.body.description;
            marker.creation_date = req.body.creation_date;
            marker.start_date = req.body.start_date;
            marker.end_date = req.body.end_date;

            marker.save().then(function(err, item) {
                res.json("Marker is created");
            });
        }
    });
};

module.exports.getMarkersNear = (req, res) => {
    const lat = parseFloat(req.params.lat);
    const lng = parseFloat(req.params.lng);
    const point = {
        type: "Point",
        coordinates: [lat, lng]
    };

    Markers.find().where("location").near({
        center: point,
        maxDistance: 3000
    }).exec((err, results, stats) => {
        if (err) {
            res.json(err);
        } else {
            res.json(results);
        }
    });
}