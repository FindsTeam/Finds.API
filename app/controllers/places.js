const needle = require("needle");

const url = "https://maps.googleapis.com/maps/api/place/details/json?placeid="

module.exports.getPlaceById = (req, res) => {
    const requestUrl = url + req.params.placeId + "&key=" + process.env.GOOGLE_API_KEY;

    needle.get(requestUrl, (request, response) => {
        res.json(response.body);
    });
}