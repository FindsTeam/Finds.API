var mongoose = require("mongoose");
const DB_CONNECT_URL = 'mongodb://admin:admin@ds247058.mlab.com:47058/freebee';

mongoose.connect(DB_CONNECT_URL);