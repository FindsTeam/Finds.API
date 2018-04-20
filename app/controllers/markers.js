const decode = require('jwt-decode');
const mongoose = require("mongoose");

const Markers = require("../models/markers");
const Users = require("../models/users");

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
    Markers.findOne({ title: req.body.title }, (err, marker) => {
        if (err) {
            return res.json({ message: `Can't perform a search: ${err.errmsg}.` });
        } else {
            const { email, name } = decode(req.body.idToken);
            Users.findOne({ email, name }, (err, user) => {
                if (err) {
                    return res.json({ message: `Can't find user with such id token` });
                } else {
                    markerFromRequest(req.body, user._id).save((error, data) => {
                        if (error) {
                            return res.json({ message: `Can't save marker` });
                        } else {
                            user.foundFreebies.push(data._id);
                            user.save((error) => {
                                if (error) {
                                    return res.json({ message: `Can't update user's found freebees` });
                                }
                            });
                            res.json(data);
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
    const { email, name } = decode(req.params.idToken);
    Users.findOne({ email, name }, (err, user) => {
        if (err) {
            return res.json({ message: `Can't find user with such id token` });
        } else {
            if (user.foundFreebies.includes(req.params.id)) {
                Markers.findByIdAndRemove(req.params.id, (err, marker) => {
                    if (err) {
                        if (err.kind === 'ObjectId') {
                            return res.json({ message: `Could not find a marker with id ${req.params.id}` });
                        }
                        return res.json({ message: `Could not delete marker with id ${req.params.id}` });
                    } else if (!marker) {
                        return res.json({ message: `Marker with not id ${req.params.id} is not found` });
                    } else {
                        res.json({ message: `Successfully deleted ${req.params.id}` });
                    }  
                });
            } else {
                res.json({ message: `The marker couldn't be deleted by this user` });
            }
        }
    });
};

module.exports.recentMarkersByIdToken = (req, res) => {
    const { email, name } = decode(req.params.idToken);
    Users.findOne({ email, name }, (err, user) => {
        if (err) {
            return res.json({ message: "Cannot find such user. Please, try later." });
        } else {
            Markers.find({ "_id": { "$in": user.foundFreebies } })
                .sort("-date")
                .limit(parseInt(req.params.amount, 10))
                .exec((error, markers) => {
                    if (err) {
                        return res.json({ message: "Cannot find recent freebees by this user" });
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