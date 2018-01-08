const models = require('./helpers/models');
const q = require('./helpers/queries');

const cassandra = require('cassandra-driver');

// const userSeed = require('./seeding/userSeedData');
// const listingSeed = require('./seeding/listingSeedData');

const dbConfig = {
  contactPoints: ['127.0.0.1'],
  protocolOptions: { port: 9042 },
  socketOptions: {
    readTimeout: 0,
  },
};
const client = new cassandra.Client(dbConfig);

module.exports.client = client;
module.exports.doUserBatch = (users) => {
  return new Promise((resolve, reject) => {
    users.forEach((user) => {
      client.execute(q.addAllUsers(user))
        .then(() => {
          client.execute(q.addSingleUser(user))
            .then((result) => {
              resolve(result);
            })
            .catch((err) => {
              console.log('single user: ', user);
              reject(err);
            });
        })
        .catch((err) => {
          console.log('all users: ', user);
          reject(err);
        });
    });
  });
};
module.exports.doListingBatch = (listings) => {
  return new Promise((resolve, reject) => {
    listings.forEach((listing) => {
      client.execute(q.addAnyListing(listing))
        .then(() => {
          client.execute(q.addListing(listing))
            .then(() => {
              client.execute(q.addLocationListings(listing))
                .then((result) => {
                  resolve(result);
                })
                .catch((err) => {
                  reject(err);
                });
            })
            .catch((err) => {
              reject(err);
            });
        })
        .catch((err) => {
          reject(err);
        });
    });
  });
};


client.execute(models.buildKeyspace)
  .then(() => {
    client.execute(models.useKeyspace)
      .then(() => {
        // *************
        // BUILD TABLES
        // *************
        client.execute(models.buildUsers)
          .then(() => {
            client.execute(models.indexUserId);
            client.execute(models.indexUserName);
            client.execute(models.indexUserSH);
          })
          .then(() => {
            client.execute(models.buildSingleUser)
              .then(() => {
                client.execute(models.indexSingleUserId);
              });
              // for seeding DB with user data
                // .then(() => {
                //   userSeed.createUsersFile();
                // });
          });
        client.execute(models.buildAllCriteria)
          .then(() => {
            client.execute(models.buildListings)
              .then(() => {
                client.execute(models.buildLocation)
                  .then(() => {
                    client.execute(models.indexLocationPrice);
                    client.execute(models.indexLocationAcc);
                    client.execute(models.indexLocationBed);
                  // })
                  // .then(() => {
                  //   listingSeed.createListingsFile();
                  });
              });
          });
      });
  });

module.exports = {
  addUser: (userObj) => {
    return (
      client.execute(q.addAllUsers(userObj))
        .then(() => {
          client.execute(q.addSingleUser(userObj));
        })
    );
  },
  findUser: (id) => {
    client.execute(q.findUser(id));
  },
  addListing: (listingObj) => {
    return (
      client.execute(q.addAnyListing(listingObj))
        .then(() => {
          client.execute(q.addListing(listingObj))
            .then(() => {
              client.execute(q.addLocationListings(listingObj));
            });
        })
    );
  },
  getListing: (location, accomodation_type, beds, listing_id) => {
    return (
      client.execute(q.findListing(location, accomodation_type, beds, listing_id))
        .catch((err) => {
          throw err;
        })
    );
  },
  search: (location, price_min, price_max, accomodation_type, beds) => {
    if (location === 'default' && price_min === 0 && price_max === 3000 && accomodation_type === 'any' && beds === 500) {
      return (
        client.execute(q.generalSearch())
          .catch((err) => {
            throw err;
          })
      );
    } else if (location !== 'default' && price_min === 0 && price_max === 3000 && accomodation_type === 'any' && beds === 500) {
      return (
        client.execute(q.searchLoc(location))
          .catch((err) => {
            throw err;
          })
      );
    } else if (location !== 'default' && price_max !== 3000 && accomodation_type === 'any' && beds === 500) {
      return (
        client.execute(q.searchLocPrice(location, price_min, price_max))
          .catch((err) => {
            throw err;
          })
      );
    } else if (location !== 'default' && price_min === 0 && price_max === 3000 && accomodation_type !== 'any' && beds === 500) {
      return (
        client.execute(q.searchLocAcc(location, accomodation_type))
          .catch((err) => {
            throw err;
          })
      );
    } else if (location !== 'default' && price_min === 0 && price_max === 3000 && accomodation_type === 'any' && beds !== 500) {
      return (
        client.execute(q.searchLocBeds(location, beds))
          .catch((err) => {
            throw err;
          })
      );
    } else {
      return (
        client.execute(q.searchAllCrit(location, price_min, price_max, accomodation_type, beds))
          .catch((err) => {
            throw err;
          })
      );
    }
  },
};
