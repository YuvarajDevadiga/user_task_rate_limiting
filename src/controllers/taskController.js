const { addTaskToQueue } = require("../queue/taskQueue");
const rateLimiter = require("../utils/rateLimiter");

const taskController = async (req, res) => {
  const { userId, timestamp } = req.body;
  console.log(userId, timestamp);

  // Check if user exceeds rate limit
  const canProcess = rateLimiter.checkRateLimit(userId);
  if (!canProcess) {
    return res
      .status(429)
      .json({ message: "Rate limit exceeded. Task will be queued." });
  }

  // Add task to queue
  console.log("--------------------------------");
  await addTaskToQueue(userId, timestamp);

  res.status(200).json({ message: "Task queued successfully" });
};

module.exports = taskController;
