const express = require('express');
const bodyParser = require('body-parser');
const db = require('../database/index.js');
const axios = require('axios');

const app = express();

app.use(bodyParser.json());

app.get('/listings', (req, res) => {
  // get search listings from DB
  const { location, priceMin, priceMax, accomodationType, beds } = req.headers;
  // get booking availability from Bookings service GET /bookings/:listingID
  db.search(location, priceMin, priceMax, accomodationType, beds).then((results) => {
    const searchListings = [];
    results.map((listing) => {
      return searchListings.push(listing.id);
    });
    return searchListings;
  }).then((searchListings) => {
    axios.get('BOOKING_SERVICE/bookings', {
      searchListings,
    }).then((results) => {
      res.status(200).json(results);
    });
  });
});

app.get('/listings/:listingID', (req, res) => {
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
      axios.post('ANALYTICS_SERVICE/view', {
        analyticsObj,
      });
    });
  });
});

app.post('/listings', (req, res) => {
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
    userID,
    blackOutDates,
  } = req.body;
  axios.post('LISTINGS_SERVICE/listings', {
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
    userID,
    blackOutDates,
  }).then(() => {
    res.status(200).send('POST listing info to listings!');
  });
});

app.post('/users', (req, res) => {
  // send new user information to Listings service POST /user
  const { username } = req.body;
  axios.post('LISTINGS_SERVICE/users', {
    username,
  }).then(() => {
    res.status(200).send('POST user info to listings!');
  });
});

app.post('/bookings', (req, res) => {
  // send booking information to Bookings service POST /bookings
  // send listingID, userID, startDate, endData, pricePerDay
  const { listingId, userId, startDate, endData, price } = req.body;
  const bookingInfo = { listingId, userId, startDate, endData, price };

  axios.post('BOOKINGS_SERVICE/bookings', bookingInfo).then(() => {
    res.status(200).send('Posted booking info to bookings!');
  });

  db.findListing(listingId).then((listingResult) => {
    db.findUser(listingResult.userId).then((userResult) => {
      const bookingAnalyticsInfo = bookingInfo;
      bookingAnalyticsInfo.userId = userResult.id;
      bookingAnalyticsInfo.superhostStatus = userResult.superhostStatus;
      return bookingAnalyticsInfo;
    }).then((bookingAnalyticsInfo) => {
      axios.post('ANALYTICS_SERVICE/booking', {
        bookingAnalyticsInfo,
      }).then(() => {
        res.status(200).send('Posted booking info to analytics!');
      });
    });
  });
});

module.exports = app;
