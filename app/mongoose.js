const mongoose = require('mongoose');

module.exports.connect = () => {
  const connectionString = `${process.env.MONGODB_CONNECTION}/${process.env.MONGO_DB_NAME}`;

  mongoose.connect(connectionString, { useNewUrlParser: true });
  mongoose.Promise = Promise;
};
