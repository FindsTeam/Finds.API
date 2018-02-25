const mongoose = require("mongoose");
const Users = require("../models/users");

module.exports.login = function(req, res) {
    Users.findOne({ email: req.params.email }, function(err, user) {
        console.log(err, user);
        if (err !== null) {
            res.json("Error");
        } else {
            var user = new Users();
            user.email = req.params.email;
            user.name = req.params.name;
            user.save().then(function(err, item) {
                res.json("User is created");
            })
        };
    });
}