// Include the cluster module
const cluster = require('cluster');
const app = require('./app.js');
require('dotenv').config();

const PORT = process.env.PORT || 1337;

if (cluster.isMaster) {
  var cpuCount = require('os').cpus().length;

  for (var i = 0; i < cpuCount; i += 1) {
    cluster.fork();
  }

} else {
  app.listen(PORT, () => {
    console.log(`Visit 127.0.0.1:${PORT} to view app`);
    console.log(`Worker ${cluster.worker.id} running!`);
  });
}
