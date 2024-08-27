// src/routes/securityRoutes.js
const express = require('express');
const router = express.Router();
const securityController = require('../controllers/securityController');

// Route to get all security questions
router.get('/security-questions', securityController.getSecurityQuestions);

// Route to get random security question for a user (UserID needed)
router.get('/random-security-question/:userID', securityController.getRandomSecurityQuestion);

// Route to get security question by questionID
router.get('/security-question/:questionID', securityController.getSecurityQuestionByID);

// Route to verify security answers
router.post('/verify-security-answer', securityController.verifySecurityAnswer);

// Route to update the user's password
router.put('/updatePassword', securityController.updatePassword);

module.exports = router;
