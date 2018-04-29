const decode = require("jwt-decode");
const mongoose = require("mongoose");

const Users = require("../models/users");
const groups = require("../models/groups");

const createUser = (email, nickname, res) => {
    const user = new Users();
    user.email = email;
    user.nickname = nickname;
    user.groups = groups.common;
    user.save().then(() => {
        return res.json(user);
    });
};

module.exports.login = (req, res) => {
    const { email, nickname } = decode(req.params.idToken);
    Users.findOne({ email, nickname }, (err, user) => {
        if (err) {
            return res.status(500).json({ message: "An error occurred during the login. Please, try later." });
        } else {
            if (user) {
                return res.json(user);
            } else {
                return createUser(email, nickname, res);
            }
        }
    });
};