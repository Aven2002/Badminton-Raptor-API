const express = require('express');
const router = express.Router();
const favoriteController = require('../controllers/favoriteController');

//Route to get all favorite table content
router.get('/', favoriteController.getAllFavorite);

//Route to check the equipment did favorite by the user or not _ return boolean
router.get('/check', favoriteController.checkFavorite);

//Route to get list of favorite equipment from same user
router.get('/:userID', favoriteController.getFavoritesByUserID);

//Route to create favorite equipment
router.post('/', favoriteController.createFavorite);

//Route to remove favorite equipment
router.delete('/:id', favoriteController.deleteFavorite);

module.exports = router;
