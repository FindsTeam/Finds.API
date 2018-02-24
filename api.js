const express = require("express");
const app = express();
const port = 3000;

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

const routes = require("./routes/index");
app.use("/api", routes);

const server = app.listen(process.env.PORT || 3000);