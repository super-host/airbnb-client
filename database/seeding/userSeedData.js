const faker = require('faker');
const uuidv4 = require('uuid/v4');
const randomName = require('random-name');
const db = require('../index.js');

// const seedAmt = 100;
// const batchAmt = 50;
const seedAmt = 3000000;
const batchAmt = 2000;

const isHost = [true, false, false];
const superhostStatus = [true, false, false];

const createUsersFile = (count) => {
  let counter = count || 0;
  if (counter <= seedAmt) {
    const users = [];
    for (let i = 0; i < batchAmt; i++) {
      let username = `${randomName.first()}${randomName.middle()}${(Math.floor(Math.random() * 3000))}`;
      username = username.replace('-', '');
      username = username.replace('\'', '');
      const hostStatus = isHost[Math.floor(Math.random() * isHost.length)];
      let shstatus = false;
      if (hostStatus === true) {
        shstatus = superhostStatus[Math.floor(Math.random() * superhostStatus.length)];
      }

      const userObj = {
        id: uuidv4(),
        username,
        is_host: isHost[Math.floor(Math.random() * isHost.length)],
        superhost_status: shstatus,
        updated_at: JSON.stringify(faker.date.between('2016-01-01', '2016-12-31')),
      };
      users.push(userObj);
    }
    db.doUserBatch(users, (err) => {
      if (err) throw err;
    }).then(() => {
      counter += batchAmt;
      console.log('Completed uploading batch ', counter, ' of ', seedAmt);
      setTimeout(() => {
        createUsersFile(counter);
      }, 500);
    });
  }
};

module.exports.createUsersFile = createUsersFile;
