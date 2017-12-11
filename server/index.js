const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(express.static(__dirname + '/../dist'));
app.use(bodyParser.json());

app.listen(1337, () => {
  console.log('App listening on port 1337!');
  console.log('Visit 127.0.0.1:1337 to view app');
});

app.get('/analytics', (req, res) => {
  res.status(200).json({ listingID: 1, location: 'San Francisco' });
});