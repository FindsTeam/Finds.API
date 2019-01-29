module.exports.convertPointToGeoJSONPoint = location => ({
  type: 'Point',
  coordinates: location,
});
