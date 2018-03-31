const mongoose = require("mongoose");
const Markers = require("../models/markers");

const markerFromRequest = (request) => {
    var marker = new Markers();
    if (request) {
        marker.title = request.title;
        marker.location = [parseFloat(request.lat), parseFloat(request.lng)];
        marker.type = request.type;
        marker.description = request.description;
        marker.creationDate = Date.now();
        marker.startDate = parseInt(request.startDate);
        marker.endDate = parseInt(request.endDate);
        marker.authorId = request.authorId;
        marker.placeId = request.placeId;
        marker.reviews = [];
    }
    return marker;
}

module.exports.createMarker = (req, res) => {
    Markers.findOne({ title: req.body.title }, (err, marker) => {
        if (err) {
            res.json(`Can't perform a search: ${err.errmsg}.`);
        } else {
            markerFromRequest(req.body).save((error, item) => {
                if (error) {
                    res.json(`Can't save ${item._id}: ${error.errmsg}`);
                } else {
                    res.json(item);
                }
            });
        }
    });
};

module.exports.getMarkerById = (req, res) => {
    Markers.findOne({ _id: req.params.id }, (err, marker) => {
        if (err) {
            res.json(`An error occurred during the search.`);
        } else {
            res.json(marker);
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