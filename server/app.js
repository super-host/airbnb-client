const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

// listen for new listings
// listen for booking availability

app.get('/listings', (req, res) => {
  // get search listings from DB
  // get booking availability from Bookings service GET /booking/:listingID
  res.status(200).json({ listingID: 1, location: 'San Francisco' });
});

app.get('/listing/:listingID', (req, res) => {
  // get listing information from db
  // send view information to Analytics service POST /analytics/view/:listingID
});

app.post('/listing', (req, res) => {
  // send new listing information to Listings service POST /listing
});

app.post('/user', (req, res) => {
  // send new user information to Listings service POST /user
});

app.post('/booking/:listingID', (req, res) => {
  // send booking information to Bookings service POST /booking/:listingID
});

module.exports = app;
