module.exports.convertPointToGeoJSONPoint = location => ({
  type: 'Point',
  coordinates: location,
});

module.exports.getAddressFromCoordinatesFormatter = (apiResponse) => {
  const { features } = apiResponse;

  if (features.length === 0) {
    return null;
  }

  const feature = features[0];

  const point = feature.geometry;
  const address = {
    city: feature.properties.address.city
      || feature.properties.address.town,
    district: feature.properties.address.city_district || null,
    suburb: feature.properties.address.suburb || null,
    street: feature.properties.address.road || null,
    house: feature.properties.address.house_number || null,
    name: feature.properties.name || null,
  };

  return { point, address };
};
