const mongoose = require("mongoose");
const Users = require("../models/users");

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