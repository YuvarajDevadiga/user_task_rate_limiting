
const rateLimitData = {};

const checkRateLimit = (userId) => {
  const currentTimestamp = Date.now();
  const userRateLimit = rateLimitData[userId] || {
    lastRequestTime: currentTimestamp,
    requestCount: 0,
    minuteStartTime: currentTimestamp, // Track the start of the current minute
  };

  // Check if it's a new minute
  const isNewMinute = currentTimestamp - userRateLimit.minuteStartTime >= 60000;

  if (isNewMinute) {
    userRateLimit.requestCount = 0; // Reset the request count at the start of a new minute
    userRateLimit.minuteStartTime = currentTimestamp; // Update the minute start time
  }

  // Enforce 1 task per second
  if (currentTimestamp - userRateLimit.lastRequestTime < 1000) {
    if (userRateLimit.requestCount >= 20) {
      // Exceeds the task per minute limit
      console.log("Rate limit exceeded for user: " + userId);
      return false;
    }
  }

  // If no limits exceeded, update the user data
  rateLimitData[userId] = {
    lastRequestTime: currentTimestamp, // Update the last request time
    requestCount: userRateLimit.requestCount + 1, // Increment the task count for this minute
    minuteStartTime: userRateLimit.minuteStartTime, // Retain the minute start time
  };

  return true; // Task can proceed
};

module.exports = { checkRateLimit };
