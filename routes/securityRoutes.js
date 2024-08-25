// src/routes/securityRoutes.js
const express = require('express');
const router = express.Router();
const securityController = require('../controllers/securityController');

// Route to get security questions
router.get('/security-questions', securityController.getSecurityQuestions);

// Get a random security question for a user
router.get('/security-question/random/:userID', securityController.getRandomSecurityQuestion);

// Route to verify security answers
router.post('/verifySecurityAnswer', securityController.verifySecurityAnswer);

// Define route to handle security answer creation
router.put('/security-answer', securityController.addSecurityAnswer);

// Route to get security question by questionID
router.get('/security-question/:questionID', securityController.getSecurityQuestionByID);

// Route to update the user's password
router.put('/updatePassword', securityController.updatePassword);

module.exports = router;
