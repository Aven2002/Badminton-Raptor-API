const express = require('express');
const router = express.Router();
const chatbotController = require('../controllers/chatbotController');

// Route to handle chat
router.post('/chat', chatbotController.handleChat);

module.exports = router;
