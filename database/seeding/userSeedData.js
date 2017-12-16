const fs = require('file-system');
const faker = require('faker');
const uuidv4 = require('uuid/v4');
const username = require('username-generator');

const isHost = [true, false, false, false, false];
const superhostStatus = [true, false, false];
let users = [];

const seedAmt = 1000;

const createUsersFile = () => {
  for (let i = 0; i < seedAmt; i++) {
    const userObj = {
      id: uuidv4(),
      username: username.generateUsername(),
      isHost: isHost[Math.floor(Math.random() * isHost.length)],
      superhostStatus: superhostStatus[Math.floor(Math.random() * superhostStatus.length)],
      updatedAt: faker.date.between('2016-01-01', '2016-12-31'),
    };
    users.push(userObj);
  }

  users = JSON.stringify(users);

  fs.writeFile('./fixtures/users.json', users, (err) => {
    if (err) throw err;
    console.log('Users json file saved');
  });
};

createUsersFile();
