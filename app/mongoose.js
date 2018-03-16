const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_CONNECTION);

mongoose.Promise = Promise;