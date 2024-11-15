const { checkRateLimit } = require("./rateLimiter");

const test = function () {
  console.log(checkRateLimit("user123").toString()); // true (first request, allowed)
  console.log(checkRateLimit("user123").toString()); // false (second request within 1 second)
  setTimeout(() => console.log(checkRateLimit("user123")), 1000);
}; // true (after 1 second)

module.exports = { test };
