const express = require('express');
const bodyParser = require('body-parser');
const db = require('../database/index.js');
const axios = require('axios');

const app = express();

app.use(bodyParser.json());

app.get('/listings', (req, res) => {
  // get search listings from DB
  // get booking availability from Bookings service GET /bookings/:listingID
});

app.get('/listing/:listingID', (req, res) => {
  let analyticsObj = {};
  // get listing information from db
  const { username } = req.headers;
  analyticsObj.listingID = req.params.listingID;
  db.findListing(req.params.listingID).then((result) => {
    res.status(200).json(result);
    analyticsObj = {
      city: result.location,
      rating: result.overallRating,
      accomodationType: result.accomodationType,
      beds: result.beds,
      price: result.price,
    };
  }).then(() => {
    db.findUser(username).then((result) => {
      analyticsObj = {
        hostId: result.id,
        superhostStatus: result.superhostStatus,
      };
    }).then(() => {
      // send view information to Analytics service POST /analytics/view/:listingID
      axios.post('/analytics/view', {
        analyticsObj,
      }).then(() => {
        console.log('Posted view to analytics!');
      });
    });
  });
});

app.post('/listing', (req, res) => {
  // send new listing information to Listings service POST /listing
  const { 
    location,
    title,
    description,
    price,
    maxGuests,
    roomType,
    bedrooms,
    bathrooms,
    beds,
    overallRating,
    accomodationType,
    hostID,
    availabilityPreferences,
  } = req.body;
  db.addListing(
    location,
    title,
    description,
    price,
    maxGuests,
    roomType,
    bedrooms,
    bathrooms,
    beds,
    overallRating,
    accomodationType,
    hostID,
    availabilityPreferences
  ).then(() => {
    res.status(200).send('POST to /listing successful');
  });
});

app.post('/user', (req, res) => {
  // send new user information to Listings service POST /user
  const { username } = req.body;
  db.addUser(username).then(() => {
    res.status(200).send('POST to /user successful');
  });
});

app.post('/booking/:listingID', (req, res) => {
  // send booking information to Bookings service POST /booking/:listingID
});

module.exports = app;
