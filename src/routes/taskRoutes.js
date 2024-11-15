const express = require('express');
const taskController = require('../controllers/taskController');

const router = express.Router();

// POST route to handle tasks
router.post('/task', taskController);

module.exports = router;
