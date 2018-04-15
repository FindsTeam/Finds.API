const decode = require('jwt-decode');
const mongoose = require("mongoose");

const Users = require("../models/users");
const groups = require("../models/groups");

const createUser = (email, name, res) => {
    const user = new Users();
    user.email = email;
    user.name = name;
    user.groups = groups.common;
    user.save().then(() => {
        return res.json({ id: user._id, message: "Successfully created" });
    });
};

module.exports.login = (req, res) => {
    const { email, name } = decode(req.params.idToken);
    console.log(decode(req.params.idToken));
    Users.findOne({ email, name }, (err, user) => {
        if (err) {
            return res.json({ message: `An error occurred during the search` });
        } else {
            if (user) {
                return res.json({ id: user._id, message: "Logged in" });
            } else {
                return createUser(email, name, res);
            }
        }
    });
};