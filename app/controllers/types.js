const mongoose = require("mongoose");

const Types = require("../models/types");

module.exports.createType = (req, res) => {
  
  Types.findOneAndUpdate(
    { title: req.params.type },
    { title: req.params.type }, 
    { upsert: true }, (err, success) => {
      if (err) {
        return res.status(500).json({ message: "An error occurred during type creation." });
      } else if (success) {
        return res.status(200).json();
      }
  });
};

module.exports.getAllTypes = (req, res) => {
  Types.find({}, (err, types) => {
    if (err) {
      return res.status(500).json({ message: "An error occurred during getting types." });
    } else if (types) {
      const typesArray = [];
      types.map((type) => typesArray.push(type.title));
      return res.json(typesArray);
    }
  });
};
