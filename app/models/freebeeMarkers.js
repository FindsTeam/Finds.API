const mongoose = require("mongoose");

mongoose.Promise = Promise;

const freebeeMarkers = new mongoose.Schema({
  freebee: { // get from mongodb
    name: {
      type: String,
      require: true
    },
    creation_date: {
      type: Date,
      require: true
    },
    end_date: {
      type: Date,
      required: false
    },
    description: {
      type: String,
      required: false
    },
    type: {
      // ??? 
    }
  }, 
  place: { // get from google api
    location: {
      type: [Number],
      index: {
          type: "2dsphere",
          sparse: true
      },
      required: true,
    },
    address: {
      type: String,
      required: false
    }, // like a formatted_address
    opening_hours: {
      open_now: { 
        type: Boolean,
        required: false,
      },
      shedule: { // like a google weekday_text
        // ...
      }
    },
    webste: {
      type: String,
      required: false
    }, // like a website
    name: {
      type: String,
      required: true,
    }, // like a name
    types: {
      type: [String],
      required: false
    }, // not sure that we need this 
    photo_url: { // or it may be array of photo links
      type: String,
      required: false
    } // like a icon
  } 
});

module.exports = mongoose.model("freebeeMarkers", freebeeMarkers);