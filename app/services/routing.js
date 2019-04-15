const http = require('./http');

const baseApi = `${process.env.HERE_ROUTE_API}?app_id=${process.env.HERE_APP_ID}&app_code=${process.env.HERE_APP_CODE}`;

const prefix = 'geo!';
const modeComponents = {
  type: 'balanced',
  transportModes: 'pedestrian',
  trafficMode: 'traffic:disabled',
};

module.exports.buildRoute = async (point0, point1) => {
  const waypoint0 = `${prefix}${point0.join(',')}`;
  const waypoint1 = `${prefix}${point1.join(',')}`;

  const mode = Object.values(modeComponents).join(';');

  const { data } = await http.get(baseApi, {
    params: {
      waypoint0,
      waypoint1,
      mode,
    },
  });

  return data;
};
