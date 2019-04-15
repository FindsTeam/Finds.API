const http = require('./http');
const { getAddressFromCoordinatesFormatter } = require('../utils/geo');

const baseApi = 'https://nominatim.openstreetmap.org';
const format = 'geojson';

const reverseGeocodingEndpoint = `${baseApi}/reverse`;
module.exports.reverseGeocoding = async (lat, lng) => {
  const { data } = await http.get(reverseGeocodingEndpoint, {
    params: {
      format,
      lat,
      lon: lng,
    },
  });

  const formattedAddress = getAddressFromCoordinatesFormatter(data);

  return formattedAddress;
};

const geocodingEndpoint = `${baseApi}/search`;
module.exports.geocode = async address => null;
