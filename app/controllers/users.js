const mongoose = require("mongoose");
const Users = require("../models/users");

module.exports.register = (req, res) => {
    Users.findOne({ email: req.params.email }, (err, user) => {
        if (!err) {
            if (user) {
                res.json("User has been already created");
            } else {
                const user = new Users();
                user.email = req.params.email;
                user.name = req.params.name;

                user.save().then(() => {
                    res.json("User is created");
                });
            }
        } else {
            res.json("Error: " + err);
        }
    });
};

module.exports.login = (req, res) => {
    Users.findOne({ email: req.params.email }, (err, user) => {
        if (!err) {
            if (user) {
                res.json("Logged in");
            } else {
                res.json("No user with such credentials");
            }
        } else {
            res.json("Error: " + err);
        }
    });
};