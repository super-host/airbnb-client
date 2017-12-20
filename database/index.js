const Promise = require('bluebird');
const path = require('path');

const models = require('express-cassandra');

const dbConfig = {
  contactPoints: ['127.0.0.1'],
  protocolOptions: { port: 9042 },
  keyspace: 'listing',
  queryOptions: { consistency: models.consistencies.one },
};

const ormConfig = {
  defaultReplicationStrategy: {
    class: 'SimpleStrategy',
    replication_factor: 3,
  },
  migration: 'safe',
};

models.setDirectory(path.join(__dirname, '/models')).bindAsync({
  clientOptions: dbConfig,
  ormOptions: ormConfig,
}).then(() => {
  models.importAsync(path.join(__dirname, '../fixtures'), (err) => {
    console.log('Error occurred: ', err);
  }).then(() => {
    console.log('Imported seeded data');
  });
});


module.exports = {
  addUser: (username) => {
    return new Promise((resolve, reject) => {
      const user = new models.instance.users({
        username,
      });

      user.save((err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
        console.log('Saved user!');
      });
    });
  },
  findUser: (id) => {
    return new Promise((resolve, reject) => {
      models.instance.users.findOne({ id }, (err, user) => {
        if (err) reject(err);
        resolve(user);
      });
    });
  },
  addListing: (
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
    userId,
    blackoutDates
  ) => {
    return new Promise((resolve, reject) => {
      const listing = new models.instance.listings({
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
        userId,
        blackoutDates,
      });

      listing.save((err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
        console.log('Saved listing!');
      });
    });
  },
  findListing: (listingId) => {
    return new Promise((resolve, reject) => {
      models.instance.listings.findOne({ listingId }, (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });
  },
  search: (location, priceMin = 0, priceMax, accomodationType, beds) => {
    return new Promise((resolve, reject) => {
      // ****
      // SEARCH BY PRICE RANGE
      // priceMin, priceMax
      // ****
      models.instance.listings.find({
        location, accomodationType, beds
      }, (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  },
};
