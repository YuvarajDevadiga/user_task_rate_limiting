require("dotenv").config();
const cluster = require("cluster");
const numCPUs = require("os").cpus().length;  // Get the number of CPU cores
const express = require("express");
const taskRoutes = require("./routes/taskRoutes");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use("/api/v1", taskRoutes);

// Check if the current process is the master process
if (cluster.isMaster) {
  console.log(`Master process ${process.pid} is running`);

  // Fork worker processes based on the number of CPU cores
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();  // Create a worker for each CPU core
  }

  // When a worker dies, log it
  cluster.on("exit", (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died`);
  });
} else {
  // Workers can share the same server port
  app.listen(port, () => {
    console.log(`Worker ${process.pid} is listening on port ${port}`);
  });
}
