const decode = require("jwt-decode");
const mongoose = require("mongoose");

const Users = require("../models/users");
const Markers = require("../models/markers");
const groups = require("../models/groups");

module.exports.getProfileByIdToken = (req, res) => {
    const { email, name } = decode(req.params.idToken);
    Users.findOne({ email, name }, (err, user) => {
        if (err) {
            return res.json({ message: "Could not find such user" });
        } else {
            const amount = 5;
            Markers.find({ "_id": { "$in": user.foundFreebies } })
                .sort("-date")
                .limit(amount)
                .exec((error, markers) => {
                    if (err) {
                        return res.json({ message: "Cannot find freebees by this user" });
                    } else {
                        const userToSend = {};
                        userToSend.email = user.email;
                        userToSend.name = user.name;
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
    Users.findOne({ name: req.params.name }, (err, user) => {
        if (err) {
            if (err.kind === "ObjectId") {
                return res.json({ message: `Could not find a user with name ${req.params.name}` });
            }
            return res.json({ message: "An error occurred during the search" });
        } else {
            res.json(user);
        }
    });
};

module.exports.updateProfileByIdToken = (req, res) => {
    const { email, name } = decode(req.params.idToken);
    Users.findOne({ email, name }, (err, user) => {
        if (err) {
            return res.json({ message: "Could not find such user" });
        } else {
            user.bio = req.body.bio;
            user.city = req.body.city;
            user.country = req.body.country;
            user.save((error, data) => {
                if (error) {
                    return res.json({ message: `Can't update user "${user.name}"` });
                } else {
                    res.json(data);
                }
            });
        }
    });
};