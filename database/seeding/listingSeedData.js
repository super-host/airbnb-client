const faker = require('faker');
const moment = require('moment');
const uuidv4 = require('uuid/v4');
const db = require('../index.js');

const seedAmt = 7000000;
const batchAmt = 2000;
const priceMin = 50;
const priceMax = 300;
const numBlackoutDays = 10;
const maxNumGuests = 10;
const maxNumGuestsSplit = 6;
const randDescription = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';

const accomodationTypes = [
  'apartment',
  'condominium',
  'guesthouse',
  'house',
];

const cities = [
  'New York City, NY, USA',
  'Los Angeles, CA, USA',
  'Chicago, IL, USA',
  'Houston, TX, USA',
  'Philadelphia, PA, USA',
  'Phoenix, AZ, USA',
  'San Antonio, TX, USA',
  'San Francisco, CA, USA',
  'Dallas, TX, USA',
  'Charleston, SC, USA',
  'Las Vegas, NV, USA',
  'Seattle, WA, USA',
  'Washington, DC, USA',
  'New Orleans, LA, USA',
  'St. Louis, MO, USA',
  'Honolulu, HI, USA',
  'Boston, MA, USA',
  'Orlando, FL, USA',
  'Portland, OR, USA',
  'Nashville, TN, USA',
  'Salt Lake City, UT, USA',
  'Denver, CO, USA',
  'Miami, FL, USA',
  'Atlanta, GA, USA',
  'Minneapolis, MN, USA',
];

const roomTypes = ['Entire place', 'Entire place', 'Entire place', 'Entire place', 'Private room', 'Private room', 'Shared room'];

const titleAdjectives = ['Beautiful', 'Gorgeous', 'Unique', 'Holiday', 'Magical', 'Fun', 'Spacious', 'Adorable', 'Waterfront', 'Best', 'Luxurious'];

const titleEnding = ['near downtown', 'with a scenic view', 'near metro stations', 'in central area', 'with amazing views', 'in an exciting neighborhood'];

const ratings = [1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5];

const priceGenerator = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
};

const blackoutDateGenerator = (numDays) => {
  const blackoutDates = [];
  for (let i = 0; i < numDays; i++) {
    const date = moment(faker.date.between('2017-05-01', '2017-8-31')).format('YYYY-MM-DD');
    blackoutDates.push(date);
  }
  return blackoutDates;
};

const createListingsFile = (count) => {
  let counter = count || 0;
  if (counter < seedAmt) {
    const listings = [];
    for (let j = 0; j < batchAmt; j++) {
      const roomType = roomTypes[Math.floor(Math.random() * roomTypes.length)];
      let bedrooms;
      let bathrooms;
      let beds;
      let maxGuests;

      if (roomType === 'Entire place') {
        maxGuests = Math.floor(Math.random() * (maxNumGuests - 1) + 1);
        bedrooms = Math.floor(Math.random() * (maxNumGuestsSplit - (maxNumGuestsSplit / 2)) + (maxNumGuestsSplit / 2));
        bathrooms = Math.floor(Math.random() * (bedrooms - (bedrooms / 2)) + (bedrooms / 2));
        beds = Math.floor(Math.random() * ((bedrooms * 2) - (bedrooms)) + (bedrooms));
      } else {
        maxGuests = Math.floor(Math.random() * 2 + 1);
        bedrooms = 1;
        bathrooms = 1;
        beds = Math.floor(Math.random() * 2 + 1);
      }
      const accomodation = accomodationTypes[Math.floor(Math.random() * accomodationTypes.length)];

      const listingObj = {
        id: uuidv4(),
        location: cities[Math.floor(Math.random() * cities.length)],
        title: `${titleAdjectives[Math.floor(Math.random() * titleAdjectives.length)]} ${accomodation} ${titleEnding[Math.floor(Math.random() * titleEnding.length)]}`,
        description: randDescription,
        price: priceGenerator(priceMin, priceMax),
        max_guests: maxGuests,
        room_type: roomType,
        bedrooms,
        bathrooms,
        beds,
        overall_rating: ratings[Math.floor(Math.random() * ratings.length)],
        accomodation_type: accomodation,
        user_id: uuidv4(),
        updated_at: JSON.stringify(moment(faker.date.between('2015-01-01', '2016-4-30')).format('YYYY-MM-DD')),
        blackout_dates: blackoutDateGenerator(numBlackoutDays),
      };
      listings.push(listingObj);
    }
    db.doListingBatch(listings, (err) => {
      if (err) throw err;
    }).then(() => {
      counter += batchAmt;
      console.log('Completed uploading batch ', counter, ' of ', seedAmt);
      setTimeout(() => {
        createListingsFile(counter);
      }, 500);
    })
      .catch((err) => {
        throw err;
      });
  }
};

module.exports.createListingsFile = createListingsFile;
