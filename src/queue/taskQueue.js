const { Queue, Worker } = require("bullmq");
const redis = require("../config/redis"); // Assuming redis is exported from this file
const fs = require("fs");
const path = require("path");
const { test } = require("../utils/test");




const taskQueue = new Queue("taskQueue", {
  connection: redis, // Pass the Redis connection here
});

// Create the worker
const worker = new Worker(
  "taskQueue", // Queue name
  async (job) => {
    const { userId, timestamp } = job.data;
    logTaskCompletion(userId, timestamp); // Assuming this function is defined
  },
  { connection: redis } // Pass the complete Redis connection here
);

// Upsert Job Scheduler
const scheduler = taskQueue.upsertJobScheduler("taskQueue", {
  redis,
  queueDelay: 1000, // Set delay if needed
});

const addTaskToQueue = async (userId, timestamp) => {
  try {
    await taskQueue.add("processTask", { userId, timestamp }, { delay: 1000 }); // Add task with optional delay
    console.log(`Task added to queue for user ${userId}`);
  } catch (error) {
    console.error("Error adding task to queue:", error);
  }
};

const logTaskCompletion = (userId, timestamp) => {
  try {
    if (isNaN(timestamp)) {
      throw new Error(`Invalid timestamp: ${timestamp}`);
    }
    const date = new Date(Number(timestamp));
    const logMessage = `Task completed for user ${userId} at ${date.toISOString()}\n`;
    fs.appendFileSync("src/logs/task_logs.txt", logMessage);
    test();
  } catch (error) {
    console.error("Error in logTaskCompletion:", error);
  }
};

module.exports = { taskQueue, addTaskToQueue };
