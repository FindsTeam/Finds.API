const decode = require("jwt-decode");
const mongoose = require("mongoose");

const Users = require("../models/users");
const Markers = require("../models/markers");
const groups = require("../models/groups");

module.exports.getProfileByIdToken = (req, res) => {
    const { email, nickname } = decode(req.params.idToken);
    Users.findOne({ email, nickname }, (err, user) => {
        if (err) {
            return res.status(500).json({ message: "Can't find a user with such credentials." });
        } else {
            Markers.find({ "_id": { "$in": user.foundFreebies } })
                .sort("-date")
                .limit(5)
                .exec((error, markers) => {
                    if (err) {
                        return res.status(500).json({ message: "Can't' find freebees by this user." });
                    } else {
                        const userToSend = {};
                        userToSend.email = user.email;
                        userToSend.nickname = user.nickname;
                        userToSend.groups = user.groups;
                        userToSend.bio = user.bio;
                        userToSend.city = user.city;
                        userToSend.country = user.country;
                        userToSend.phone = user.phone;
                        userToSend.foundFreebies = markers;
                        return res.json(userToSend);
                    }
                });
        }
    });
};

module.exports.getUserByName = (req, res) => {
    Users.findOne({ nickname: req.params.nickname }, (err, user) => {
        if (err) {
            return res.status(500).json({ message: "Can't find a user with such credentials." });
        } else {
            res.json(user);
        }
    });
};

module.exports.updateProfileByIdToken = (req, res) => {
    const { email, nickname } = decode(req.params.idToken);
    Users.findOne({ email, nickname }, (err, user) => {
        if (err) {
            return res.status(500).json({ message: "Can't find a user with such credentials." });
        } else {
            user.bio = req.body.bio;
            user.city = req.body.city;
            user.country = req.body.country;
            user.save((error, data) => {
                if (error) {
                    return res.status(500).json({ message: "Can't update a user profile." });
                } else {
                    res.json(data);
                }
            });
        }
    });
};