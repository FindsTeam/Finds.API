const needle = require("needle");

const url = "https://maps.googleapis.com/maps/api/place/details/json?";

const reducePlace = (place) => {
    return {
        name: place.result.name,
        address: place.result.formatted_address,
        types: place.result.types,
        openNow: place.result.opening_hours.open_now,
        openingHours: place.result.opening_hours.periods
    };
};

module.exports.getPlaceById = (req, res) => {
    const requestUrl = `${url}placeid=${req.params.placeId}&language=ru&key=${process.env.GOOGLE_API_KEY}`;

    needle.get(requestUrl, (error, response) => {
        if (error) {
            return res.status(503).json({ message: "Can't load place information" });
        } else {
            return res.json(reducePlace(response.body));
        }   
    });
};