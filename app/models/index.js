var mongoose = require("mongoose");
var user = require("./users");

var UserSchema = new mongoose.Schema(user.UserModel);
var User = mongoose.model("user", UserSchema);

module.exports = {
    User
};