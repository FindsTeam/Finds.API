const { check } = require('express-validator/check');
const { getValidationState } = require('../utils/validationHelper');
const routingService = require('../services/routing');

exports.getRoute = async function getRoute(req, res) {
  const state = getValidationState(req);
  if (state.hasErrors) {
    return res.status(400).json({ errors: state.errors });
  }

  const { point0, point1 } = req.body;

  try {
    const buildRouteResult = await routingService.buildRoute(point0, point1);
    if (!buildRouteResult) {
      return res.status(404).json(buildRouteResult);
    }

    return res.status(200).json(buildRouteResult);
  } catch (error) {
    console.error(error);

    return res.status(500).json(error);
  }
};

exports.validate = (method) => {
  switch (method) {
    case exports.getRoute.name: {
      return [
        check('point0').exists().isArray(),
        check('point1').exists().isArray(),
      ];
    }
    default: {
      return [];
    }
  }
};
