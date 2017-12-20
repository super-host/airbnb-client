const faker = require('faker');
const uuidv4 = require('uuid/v4');
const username = require('username-generator');
const db = require('../index.js');

// const seedAmt = 3000000;
// const batchAmt = 2000;
const seedAmt = 100;
const batchAmt = 10;

const isHost = [true, false, false];
const superhostStatus = [true, false, false];

const createUsersFile = (count) => {
  let counter = count || 0;
  if (counter <= seedAmt) {
    const queries = [];
    for (let i = 0; i < batchAmt; i++) {
      const user = username.generateUsername();
      const hostStatus = isHost[Math.floor(Math.random() * isHost.length)];
      let shstatus = false;
      if (hostStatus) {
        shstatus = superhostStatus[Math.floor(Math.random() * superhostStatus.length)];
      }

      const userObj = {
        id: uuidv4(),
        username: user,
        is_host: isHost[Math.floor(Math.random() * isHost.length)],
        superhost_status: shstatus,
        updated_at: faker.date.between('2016-01-01', '2016-12-31'),
      };
      const query = db.addUser(userObj);
      queries.push(query);
    }
    db.doBatch(queries, (err) => {
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

console.time('createUsersFile');
createUsersFile();
console.timeEnd('createUsersFile');
