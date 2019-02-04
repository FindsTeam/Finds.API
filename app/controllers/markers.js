const freebeeTypes = require('../utils/freebeeTypes');

module.exports.getFreebeeTypes = (req, res) => {
  const types = Object.values(freebeeTypes);
  return res.status(200).json(types);
};
