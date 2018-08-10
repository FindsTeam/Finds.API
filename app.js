require("dotenv").config();

const app = require("express")();
const server = require("http").Server(app);
const bodyParser = require("body-parser");

const routesApi = require("./app/routes/index");
const database = require("./app/mongoose");

database.connect();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Access-Control-Request-Method, Access-Control-Request-Headers, Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});
app.use("/api", routesApi);

server.listen(process.env.PORT);
