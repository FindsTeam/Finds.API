const mongoose = require("mongoose");

const Users = require("../models/users");
const groups = require("../models/groups");

module.exports.register = (req, res) => {
    Users.findOne({ email: req.params.email, name: req.params.name }, (err, user) => {
        if (err) {
            return res.json({ message: `An error occurred during the search` });
        } else {
            if (user) {
                return res.json({ message: "User has been already created" });
            } else {
                const user = new Users();
                user.email = req.params.email;
                user.name = req.params.name;
                user.groups = groups.common;
                user.save().then(() => {
                    return res.json({ message: "Successfully created" });
                });
            }
        }
    });
};

module.exports.login = (req, res) => {
    Users.findOne({ email: req.params.email }, (err, user) => {
        if (err) {
            return res.json({ message: `An error occurred during the search` });
        } else {
            if (user) {
                return res.json({ message: "Logged in" });
            } else {
                return res.json({ message: "No user with such credentials" });
            }
        }
    });
};