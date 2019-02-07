const { validationResult } = require('express-validator/check');

exports.getValidationState = (req) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return {
      hasErrors: false,
    };
  }

  return {
    hasErrors: true,
    errors: errors.array(),
  };
};
