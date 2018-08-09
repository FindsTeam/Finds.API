const bodyParser = require("body-parser");
// noinspection JSValidateTypes
/** @type AppConfig */
const config = require("config");
const express = require("express");
const http = require("http");
const util = require('util');

const database = require("./app/mongoose");
const routesApi = require("./app/routes/index");

console.log(util.inspect(config, { showHidden: false, depth: null }));

(async () => {
    await database.connect(config.db);

    const app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use((req, res, next) => {
        res.header("Access-Control-Allow-Credentials", "true");
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
        res.header("Access-Control-Allow-Headers", [
            "Access-Control-Allow-Headers",
            "Access-Control-Request-Method",
            "Access-Control-Request-Headers",
            "Origin",
            "X-Requested-With",
            "Content-Type",
            "Accept",
            "Authorization"
        ].join(", "));
        next();
    });
    app.use("/api", routesApi);

    http.Server(app).listen(config.port);
    console.info("server started");
})();
