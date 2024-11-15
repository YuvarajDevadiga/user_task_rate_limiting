const redis = require("./config/redis");
async function clearQueueInRedis(queueName) {
  const keys = await redis.keys(`bull:${queueName}:*`); // Get all keys related to the queue
  if (keys.length > 0) {
    await redis.del(...keys); // Delete all the keys found
    console.log(`All keys related to ${queueName} have been deleted.`);
  } else {
    console.log("No keys found for this queue.");
  }
}

clearQueueInRedis("taskQueue");
