const mongoose = require("mongoose");
const dbURI = "mongodb://admin:admin@ds247058.mlab.com:47058/freebee";

mongoose.connect(dbURI);

mongoose.Promise = Promise;

// CONNECTION EVENTS
mongoose.connection.on("connected", function() {
    console.log("Mongoose connected to " + dbURI);
});
mongoose.connection.on("error", function(err) {
    console.log("Mongoose connection error: " + err);
});
mongoose.connection.on("disconnected", function() {
    console.log("Mongoose disconnected");
});