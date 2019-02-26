/* eslint-disable func-names */
/* eslint-disable no-underscore-dangle */

exports.toClient = function toClient() {
  const obj = this.toObject();

  obj.id = obj._id;
  delete obj._id;

  return obj;
};
