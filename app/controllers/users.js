const mongoose = require("mongoose");
const Users = require("../models/users");

const groups = require("./groups");

module.exports.getUserById = (req, res) => {
    Users.findById(req.params.id, (err, user) => {
        if (err) {
            if (err.kind === 'ObjectId') {
                return res.json({ message: `Could not find a user with id ${req.params.id}` });
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

module.exports.becomeOrganizer = (req, res) => {
    Users.findById(req.params.id, (err, user) => {
        if (err) {
            if (err.kind === 'ObjectId') {
                return res.json({ message: `Could not find a user with id ${req.params.id}` });
            }
            return res.json({ message: `An error occurred during the search` });
        } else {
            user.groups.push(groups.organizer);
            user.phone = req.body.phone;
            user.address = req.user.address;
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