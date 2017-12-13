const express = require('express');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 1337;

const app = express();

app.use(bodyParser.json());

app.get('/analytics', (req, res) => {
  res.status(200).json({ listingID: 1, location: 'San Francisco' });
});

const App = app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
  console.log(`Visit 127.0.0.1:${PORT} to view app`);
});

module.exports = App;
