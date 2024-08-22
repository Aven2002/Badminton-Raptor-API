// src/routes/securityRoutes.js
const express = require('express');
const router = express.Router();
const securityController = require('../controllers/securityController');

// Route to get security questions
router.get('/security-questions', securityController.getSecurityQuestions);

// Route to verify security answers
router.post('/security-answers/verify', securityController.verifySecurityAnswers);

// Define route to handle security answer creation
router.put('/security-answers', securityController.addSecurityAnswer);

module.exports = router;
