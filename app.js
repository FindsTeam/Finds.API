require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");

const routesApi = require("./app/routes/index");
const checkJwt = require("./app/middleware/jwt");
const database = require("./app/mongoose");

database.connect();

const app = express();

app.use(checkJwt);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use("/api", routesApi);

const server = app.listen(process.env.PORT);