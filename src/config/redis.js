const Redis = require("ioredis");

const redis = new Redis({
  host: "127.0.0.1", // or your Redis server hostname
  port: 6379,
  password: process.env.REDIS_PASSWORD || null,
  maxRetriesPerRequest: null,
});

module.exports = redis;
