const mongoose = require("mongoose");

module.exports.connect = () => {
    mongoose.connect(process.env.MONGODB_CONNECTION);
    mongoose.Promise = Promise;
};