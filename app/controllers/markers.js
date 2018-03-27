const mongoose = require("mongoose");
const Markers = require("../models/markers");

module.exports.createMarker = (req, res) => {
    Markers.findOne({ title: req.body.title }, (err, user) => {
        if (err) {
            res.json(`Can't perform a search: ${err.errmsg}`);
        } else {
            var marker = new Markers();
            marker.title = req.body.title;
            marker.location = [parseFloat(req.body.lat), parseFloat(req.body.lng)];
            marker.type = req.body.type;
            marker.description = req.body.description;
            marker.creationDate = Date.now();
            marker.startDate = parseInt(req.body.startDate);
            marker.endDate = parseInt(req.body.endDate);
            marker.authorId = req.body.authorId;
            marker.placeId = req.body.placeId;
            marker.reviews = [];
            marker.save((error, item) => {
                if (error) {
                    res.json(`Can't save ${item._id}: ${error.errmsg}`);
                } else {
                    res.json(item);
                }
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
};