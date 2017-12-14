const app = require('./app.js');
require('dotenv').config();

const PORT = process.env.PORT || 1337;

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
  console.log(`Visit 127.0.0.1:${PORT} to view app`);
});
