const express = require('express');
const router = express.Router();
const chatbotController = require('../controllers/chatbotController');

// Route to handle chat
router.post('/chat', async (req, res, next) => {
  try {
    await chatbotController.handleChat(req, res);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
