require("dotenv").config();
const config = require("./config");

const decode = require("jwt-decode");
const mongoose = require("mongoose");
const randomLatitude = require("random-latitude");
const randomLongitude = require("random-longitude");
const faker = require("faker/locale/en");

const database = require("../app/mongoose");
database.connect();

const Markers = require("../app/models/markers");
const Users = require("../app/models/users");



const randomMinskLocation = () => {
  const minLat = 53.895346;
  const maxLat = 53.909246;
  const minLng = 27.533460;
  const maxLng = 27.540007;
  return [randomLatitude({min: minLat, max: maxLat}), randomLongitude({min: minLng, max: maxLng})];
};

const randomMarker = (authorId) => {
  var marker = new Markers();
  marker.title = faker.lorem.words() + " " + faker.random.uuid();
  marker.location = randomMinskLocation();
  marker.type = "Food";
  marker.description = faker.lorem.sentence();
  marker.creationDate = Date.parse(faker.date.past());
  marker.startDate = Date.parse(faker.date.past());
  marker.endDate = Date.parse(faker.date.future());
  marker.authorId = authorId;
  marker.placeId = faker.random.uuid();
  marker.reviews = [];
  return marker;
};

const createMarkersLikeAUser = (amount) => {
  const { email, nickname } = decode(config.idToken);
  Users.findOne({ email, nickname }, (err, user) => {
      if (err) {
          console.log(err);
      } else {
        console.log("User ID token is valid");
        for (let i = 1; i != amount; i++) {
          setTimeout(() => randomMarker(user._id).save((error, data) => {
            if (error) {
              console.log(error);
            } else {
              user.foundFreebies.push(data._id);
              user.save((error) => {
                  if (error) {
                    console.log(error);
                  }
              });
            }
          }), i);
        }
      }
  });
};

const createMarkers = (amount) => {
  for (let i = 1; i != amount; i++) {
    setTimeout(() => randomMarker(i).save((error, data) => {
      if (error) {
        console.log(error);
      } else {
        console.log(`${i}: Saved marker`);
      }
    }), i * 5);
  }
};

createMarkers(config.amount);
