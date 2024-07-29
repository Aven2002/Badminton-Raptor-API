const express = require('express');
const router = express.Router();
const favoriteController = require('../controllers/favoriteController');

router.get('/', favoriteController.getAllFavorite);
router.get('/check', favoriteController.checkFavorite);
router.post('/', favoriteController.createFavorite);
router.put('/:id', favoriteController.updateFavorite);
router.delete('/:id', favoriteController.deleteFavorite);

router.get('/:userID', favoriteController.getFavoritesByUserID);

module.exports = router;
