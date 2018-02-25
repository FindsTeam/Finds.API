const mongoose = require("mongoose");
const Markers = require("../models/markers");

module.exports.createMarker = (req, res) => {
    Markers.findOne({ title: req.body.title }, (err, user) => {
        if (err !== null) {
            res.json("Error");
        } else {
            var marker = new Markers();

            marker.title = req.body.title;
            marker.location = [parseFloat(req.body.lat), parseFloat(req.body.lng)]
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

module.exports.getMarkersNear = (req, res) => {
    const lng = parseFloat(req.params.lng);
    const lat = parseFloat(req.params.lat);
    const point = {
        type: "Point",
        coordinates: [lat, lng]
    };

    Markers.find().where("location").near({
        center: point,
        maxDistance: 3000
    }).exec((err, results, stats) => {
        console.log('Geo Results', results);
        if (err) {
            console.log('geoNear error:', err);
            res.json(err);
        } else {
            console.log(results, stats);
            res.json(results);
        }
    });
}