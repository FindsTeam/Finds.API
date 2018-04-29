const decode = require("jwt-decode");
const mongoose = require("mongoose");

const Markers = require("../models/markers");
const Users = require("../models/users");

Array.prototype.remove = (element) => {
    return this.filter((e) => e !== element);
};

const markerFromRequest = (request, authorId) => {
    var marker = new Markers();
    if (request) {
        marker.title = request.title;
        marker.location = [parseFloat(request.lat), parseFloat(request.lng)];
        marker.type = request.type;
        marker.description = request.description;
        marker.creationDate = Date.now();
        marker.startDate = parseInt(request.startDate);
        marker.endDate = parseInt(request.endDate);
        marker.authorId = authorId;
        marker.placeId = request.placeId;
        marker.reviews = [];
    }
    return marker;
};

module.exports.createMarker = (req, res) => {
    const { email, nickname } = decode(req.body.idToken);
    Users.findOne({ email, nickname }, (err, user) => {
        if (err) {
            return res.status(500).json({ message: "Can't find a user with such credentials." });
        } else {
            Markers.findOne({ title: req.body.title }, (err, marker) => {
                if (err) {
                    return res.status(500).json({ message: "Can't check if a marker already exists." });
                } else if (marker) {
                    return res.status(409).json({ message: "Marker with such title already exists." });
                } else {
                    markerFromRequest(req.body, user._id).save((error, data) => {
                        if (error) {
                            return res.status(500).json({ message: "Can't save marker." });
                        } else {
                            user.foundFreebies.push(data._id);
                            user.save((error) => {
                                if (error) {
                                    return res.status(500).json({ message: "Can't update user's found freebees." });
                                }
                            });
                            return res.json(data);
                        }
                    });
                }
            });
        }
    });
};

module.exports.getMarkerById = (req, res) => {
    Markers.findById(req.params.id, (err, marker) => {
        if (err) {
            return res.status(500).json({ message: "Can't check if a marker already exists." });
        } else {
            res.json(marker);
        }
    });
};

module.exports.updateMarkerById = (req, res) => {
    const { email, nickname } = decode(req.params.idToken);
    Users.findOne({ email, nickname }, (err, user) => {
        if (err) {
            return res.status(500).json({ message: "Can't find a user with such credentials." });
        } else {
            if (user.foundFreebies.includes(req.params.id)) {
                Markers.findById(req.params.id, (err, marker) => {
                    if (err) {
                        return res.status(500).json({ message: "Can't check if a marker already exists." });
                    } else {
                        marker = markerFromRequest(req.body);
                        marker.save((error, data) => {
                            if (error) {
                                return res.status(500).json({ message: `Can't update a marker."` });
                            } else {
                                res.json(data);
                            }
                        });
                    }
                });
            }
        }
    });
};

module.exports.deleteMarkerById = (req, res) => {
    const { email, nickname } = decode(req.params.idToken);
    Users.findOne({ email, nickname }, (err, user) => {
        if (err) {
            return res.status(500).json({ message: "Can't find a user with such credentials." });
        } else {
            if (user.foundFreebies.includes(req.params.id)) {
                Markers.findByIdAndRemove(req.params.id, (err, marker) => {
                    if (err) {
                        return res.status(500).json({ message: "Can't delete marker." });
                    } else {
                        Users.updateOne({ email, nickname }, { "$set": { foundFreebies: user.foundFreebies.remove(req.params.id)}}, () => {
                            return res.status(200);
                        });
                    }  
                });
            } else {
                return res.status(403).json({ message: "The marker can't be deleted by this user." });
            }
        }
    });
};

module.exports.recentMarkersByIdToken = (req, res) => {
    const { email, nickname } = decode(req.params.idToken);
    Users.findOne({ email, nickname }, (err, user) => {
        if (err) {
            return res.status(500).json({ message: "Can't find a user with such credentials." });
        } else {
            Markers.find({ "_id": { "$in": user.foundFreebies } })
                .sort("-date")
                .limit(parseInt(req.params.amount, 10))
                .exec((error, markers) => {
                    if (err) {
                        return res.status(500).json({ message: "Can't find recent freebees by this user." });
                    } else {
                        return res.json(markers);
                    }
                });
        }
    });
};

module.exports.getMarkersNear = (req, res) => {
    const lat = parseFloat(req.params.lat);
    const lng = parseFloat(req.params.lng);

    Markers.find().where("location").near({
        center: {
            type: "Point",
            coordinates: [lat, lng]
        },
        maxDistance: 3000
    }).exec((err, results, stats) => {
        if (err) {
            return res.status(500).json({ message: "An error occurred during the search." });
        } else {
            return res.json(results);
        }
    });
};