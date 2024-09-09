const express = require('express');
const router = express.Router();
const recommendationController = require('../controllers/recommendationController');

// Route to get all recommendations
router.get('/', recommendationController.getAllRecommendation);

// Route to get one recommendation
router.get('/:id', recommendationController.getRecommendation);

// Route to delete recommendation
router.delete('/:id', recommendationController.deleteRecommendation);

//Route to generate recommendation
router.post('/generateRecommendation', recommendationController.generateRecommendations);

// Route to update rating
router.put('/updateRating', recommendationController.updateRating);

module.exports = router;
