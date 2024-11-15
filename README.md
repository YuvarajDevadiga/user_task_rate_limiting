# Node.js API Cluster with Rate-Limited Task Queue

This project demonstrates how to build a **Node.js API Cluster** with **BullMQ** for rate-limited task processing using **Redis**. The tasks have a rate limit of **1 task per second** and **20 tasks per minute** per user. Redis is used for task queuing, and Docker is used to run Redis for a simplified setup.

## **Prerequisites**

Ensure the following tools are installed:

- **Node.js**: [Download Node.js](https://nodejs.org/)
- **Docker**: [Install Docker](https://www.docker.com/get-started)
- **PM2** (optional, but recommended for clustering): Install PM2 globally:

    ```bash
    npm install pm2 -g
    ```

## **Getting Started**

Follow the steps below to set up and run the project:

### 1. **Clone the Repository**

Clone the repository to your local machine:





###2. ** Install Dependencies**
npm install

3. Run Redis Using Docker

4. Run the Node.js API Cluster
pm2 start server.js -i max


Project Structure
user-task-rate-limiting/
│
├── src/
│   ├── config/
│   │   └── redis.js                  # Redis configuration file
│   ├── queue/
│   │   ├── taskQueue.js              # Setup the BullMQ queue, worker, and scheduler
│   └── logs/
│   │   └── task_logs.txt             # Log file for task completion
│   ├── controllers/
│   │   └── taskController.js         # Controller to handle task routes
│   ├── routes/
│   │   └── taskRoutes.js             # API routes for POST request
│   ├── utils/
│   │   └── rateLimiter.js            # Rate limiting logic for each user
│   └── server.js                     # Entry point to the application
├── package.json                      # NPM dependencies and scripts
├── .env                               # Environment variables (for Redis, etc.)
├── README.md                         # Documentation and setup instructions
└── node_modules/                     # Project dependencies (auto-generated)





