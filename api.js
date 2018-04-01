require("dotenv").config();

require("./app/mongoose");

const routesApi = require("./app/routes/index");
const bodyParser = require("body-parser");
const express = require("express");

const checkJwt = require('./app/middleware/jwt');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(checkJwt);

app.use("/api", routesApi);

const server = app.listen(process.env.PORT);