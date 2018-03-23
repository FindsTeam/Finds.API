const needle = require("needle");

const url = "https://maps.googleapis.com/maps/api/place/details/json?";

const reducePlace = (place) => {
    return {
        name: place.result.name,
        address: place.result.formatted_address,
        types: place.result.types,
        open_now: place.result.opening_hours.open_now,
        opening_hours: place.result.opening_hours.periods
    }
};

module.exports.getPlaceById = (req, res) => {
    const requestUrl = `${url}placeid=${req.params.placeId}&key=${process.env.GOOGLE_API_KEY}`;

    needle.get(requestUrl, (request, response) => {
        res.json(reducePlace(response.body));
    });
};