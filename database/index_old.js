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
    return new Promise((resolve, reject) => {
      const user = new models.instance.users(userObj);
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
    const allListings = (listingObj) => {
      return new Promise((resolve, reject) => {
        const listing = new models.instance.listings(listingObj);
        listing.save((err, res) => {
          if (err) {
            reject(err);
          }
          resolve(res);
        });
      });
    };
    const oneListing = (listingObj) => {
      return new Promise((resolve, reject) => {
        const listing = new models.instance.singleListings(listingObj);
        listing.save((err, res) => {
          if (err) {
            reject(err);
          }
          resolve(res);
        });
      });
    };
    Promise.all([allListings(listingObj), oneListing(listingObj)]);
  },
  findListing: (listing_id) => {
    return new Promise((resolve, reject) => {
      models.instance.singlelistings.findOne({ listing_id }, (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });
  },
  search: (location, priceMin = 0, priceMax, accomodation_type, beds) => {
    // check args length
    // if args length is 0
    // run query with anywhere table in singlelistings model
    // overall rating is 3, filter by gte 3
    // else if args length is 1
    // check each arg and search according to MV in singlelistings model
    // else find listings matching criteria
    // if (arguments.length === 0) {
    //   models.instance.singleListings.find()
    // } else if (arguments.length === 1) {
    //   models.instance.singleListings.find()
    // } else {
      return new Promise((resolve, reject) => {
        const query = {
          location,
          overall_rating: { $gte: 1 },
          price: { $gte: Number(priceMin), $lte: Number(priceMax) },
          accomodation_type,
          beds: Number(beds),
        };
        models.instance.listings.find(query, (err, results) => {
          if (err) reject(err);
          resolve(results);
        });
      });
    // }
  }
};
