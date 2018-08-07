const mongoose = require("mongoose");

/**
 * @export
 * @param {DbConfig} opts
 * @return {Promise<Mongoose>}
 */
module.exports.connect = (opts) => {
    mongoose.Promise = Promise;
    const { user, pass, host, port, name } = opts;
    return mongoose.connect(
        `mongodb://${host}:${port}/`,
        { user, pass, dbName: name, useNewUrlParser: true },
    );
};
