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
};

// TODO: Add marker id to user-creator
module.exports.createMarker = (req, res) => {
    Markers.findOne({ title: req.body.title }, (err, marker) => {
        if (err) {
            return res.json(`Can't perform a search: ${err.errmsg}.`);
        } else {
            markerFromRequest(req.body).save((error, data) => {
                if (error) {
                    return res.json({ message: `Can't save marker "${data._id}"` });
                } else {
                    res.json(data);
                }
            });
        }
    });
};

module.exports.getMarkerById = (req, res) => {
    Markers.findById(req.params.id, (err, marker) => {
        if (err) {
            if (err.kind === 'ObjectId') {
                return res.json({ message: `Could not find a marker with id ${req.params.id}` });
            }
            return res.json({ message: `An error occurred during the search` });
        } else {
            res.json(marker);
        }
    });
};

module.exports.updateMarkerById = (req, res) => {
    Markers.findById(req.params.id, (err, marker) => {
        if (err) {
            if (err.kind === 'ObjectId') {
                return res.json({ message: `Could not find a marker with id ${req.params.id}` });
            }
            return res.json({ message: `An error occurred during the search` });
        } else {
            marker = markerFromRequest(req.body);
            marker.save((error, data) => {
                if (error) {
                    return res.json({ message: `Can't update marker "${data._id}"` });
                } else {
                    res.json(data);
                }
            });
        }
    });
};

module.exports.deleteMarkerById = (req, res) => {
    Markers.findByIdAndRemove(req.params.id, (err, marker) => {
        if (err) {
            if (err.kind === 'ObjectId') {
                return res.json({ message: `Could not find a marker with id ${req.params.id}` });
            }
            return res.json({ message: `Could not delete marker with id ${req.params.id}` });
        }
        if (!marker) {
            return res.json({ message: `Marker with not id ${req.params.id} is not found` });
        }
        res.json({ message: `Successfully deleted ${req.params.id}` });
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
            return res.json({ message: `An error occurred during the search` });
        } else {
            return res.json(results);
        }
    });
};