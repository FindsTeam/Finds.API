const decode = require('jwt-decode');
const mongoose = require("mongoose");

const Users = require("../models/users");
const Markers = require("../models/markers");
const groups = require("../models/groups");

module.exports.getUserByIdToken = (req, res) => {
    const { email, name } = decode(req.params.idToken);
    Users.findOne({ email, name }, (err, user) => {
        if (err) {
            return res.json({ message: `An error occurred during the search` });
        } else {
            const amount = 5;
            Markers.find({ "_id": { "$in": user.foundFreebies } })
                .sort("-date")
                .limit(amount)
                .exec((error, markers) => {
                    if (err) {
                        return res.json({ message: "Cannot find freebees by this user" });
                    } else {
                        user.foundFreebies = markers;
                        return res.json(user);
                    }
                });
        }
    });
};

module.exports.getUserByName = (req, res) => {
    Users.findOne({ name: req.params.name }, (err, user) => {
        if (err) {
            if (err.kind === 'ObjectId') {
                return res.json({ message: `Could not find a user with name ${req.params.name}` });
            }
            return res.json({ message: `An error occurred during the search` });
        } else {
            res.json(user);
        }
    });
};

module.exports.updateUserById = (req, res) => {
    Users.findById(req.params.id, (err, user) => {
        if (err) {
            if (err.kind === 'ObjectId') {
                return res.json({ message: `Could not find a user with id ${req.params.id}` });
            }
            return res.json({ message: `An error occurred during the search` });
        } else {
            user.bio = req.body.bio;
            user.city = req.body.city;
            user.country = req.body.country;
            user.save((error, data) => {
                if (error) {
                    return res.json({ message: `Can't update user "${data._id}"` });
                } else {
                    res.json(data);
                }
            });
        }
    });
};