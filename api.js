require("./app/services/mongoose");
const routes = require("./app/routes");
const express = require("express");
const app = express();
const port = 3000;

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

routes(app, __dirname);
app.use("/api", routes);

const server = app.listen(process.env.PORT || 3000);