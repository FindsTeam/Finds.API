const mongoose = require("mongoose");
const Users = require("../models/users");

module.exports.login = (req, res) => {
    Users.findOne({ email: req.params.email }, (err, user) => {
        if (err) {
            res.json("Error: " + err);
        } else {
            var user = new Users();
            user.email = req.params.email;
            user.name = req.params.name;

            user.save().then((err, item) => {
                res.json("User is created");
            })
        };
    });
}