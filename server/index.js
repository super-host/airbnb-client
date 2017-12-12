const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

app.get('/analytics', (req, res) => {
  res.status(200).json({ listingID: 1, location: 'San Francisco' });
});

const App = app.listen(1337, () => {
  console.log('App listening on port 1337!');
  console.log('Visit 127.0.0.1:1337 to view app');
});

module.exports = App;