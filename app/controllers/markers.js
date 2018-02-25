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
        coordinates: [lng, lat]
    };
    const geoOptions = {
        spherical: true,
        maxDistance: 10,
        num: 10
    };
    Markers.geoFind(point, geoOptions, (err, results, stats) => {
        console.log('Geo Results', results);
        console.log('Geo stats', stats);
        if (err) {
            console.log('geoNear error:', err);
            sendJsonResponse(res, 404, err);
        } else {
            locations = buildLocationList(req, res, results, stats);
            sendJsonResponse(res, 200, locations);
        }
    });
}