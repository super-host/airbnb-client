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
});
// .then(() => {
//   models.importAsync(path.join(__dirname, '../fixtures'), (err) => {
//     console.log('Error occurred: ', err);
//   }).then(() => {
//     console.log('Imported seeded data');
//   });
// });


module.exports = {
  doBatch: (queries) => {
    return new Promise((resolve, reject) => {
      resolve(models.doBatch(queries));
    });
  },
  addUser: (userObj) => {
    const {
      id,
      username,
      is_host,
      superhost_status,
      updated_at,
    } = userObj;
    return new Promise((resolve, reject) => {
      const user = new models.instance.users({
        id,
        username,
        is_host,
        superhost_status,
        updated_at,
      });

      user.save((err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
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
  addListing: (listingObj) => {
    const {
      id,
      location,
      title,
      description,
      price,
      maxGuests,
      roomType,
      bedrooms,
      bathrooms,
      beds,
      overall_rating,
      accomodation_type,
      user_id,
      updated_at,
      blackout_dates,
    } = listingObj;
    return new Promise((resolve, reject) => {
      const listing = new models.instance.listings({
        id,
        location,
        title,
        description,
        price,
        maxGuests,
        roomType,
        bedrooms,
        bathrooms,
        beds,
        overall_rating,
        accomodation_type,
        user_id,
        updated_at,
        blackout_dates,
      });

      listing.save((err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
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
  search: (location, priceMin = 0, priceMax, accomodation_type, beds) => {
    return new Promise((resolve, reject) => {
      const query = {
        location,
        price: { $gte: Number(priceMin), $lte: Number(priceMax) },
        accomodation_type,
        beds: Number(beds),
      };
      models.instance.listings.find(query, (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  },
};
