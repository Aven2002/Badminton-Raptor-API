const express = require('express');
const router = express.Router();
const feedbackController = require('../controllers/feedbackController');

// Route to get all feedback
router.get('/', feedbackController.getAllFeedback);

//Route to create new feedback
router.post('/', feedbackController.createFeedback);

router.delete('/:id', feedbackController.deleteFeedback);

module.exports = router;
