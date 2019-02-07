const freebeeTypes = require('../utils/freebeeTypes');

module.exports.getFreebeeTypes = function getFreebeeTypes(req, res) {
  const types = Object.values(freebeeTypes);
  return res.status(200).json(types);
};


exports.validate = (method) => {
  switch (method) {
    case exports.getFreebeeTypes.name: {
      return [];
    }

    default: {
      return [];
    }
  }
};
