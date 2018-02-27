const mongoose = require("mongoose");
const dbURI = "mongodb://admin:admin@ds247058.mlab.com:47058/freebee";

mongoose.connect(dbURI);

mongoose.Promise = Promise;