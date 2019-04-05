const http = require('./http');
const { locationEndpoints } = require('../endpoints');

const format = 'geojson';

module.exports.reverseGeocoding = async (lat, lng) => {
  const { data } = await http.get(locationEndpoints.reverse, {
    params: {
      format,
      lat,
      lon: lng,
    },
  });

  return data;
};
