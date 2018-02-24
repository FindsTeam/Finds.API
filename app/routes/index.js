const models = require("../models");
const loginRoute = require("./login");

module.exports = (app, dir) => {
    loginRoute(app, models.User);
};