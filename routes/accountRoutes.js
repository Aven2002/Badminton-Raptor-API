const express = require('express');
const router = express.Router();
const accountController = require('../controllers/accountController');

// Route to get all account
router.get('/', accountController.getAllAccount);

// Route to get one account
router.get('/:id', accountController.getAccount);

// Route to create account
router.post('/createAccount', accountController.createAccount);

// Route to update existing account
router.put('/:id', accountController.updateAccount);

// Route to delete account
router.delete('/:id', accountController.deleteAccount);

// Route to get user role 
router.get('/:id/role', accountController.getUserRole);

// Route to get userID by username
router.get('/user/:username', accountController.getUserIDByUsername);

// Route to verify password 
router.post('/verifyPassword', accountController.verifyPassword);

module.exports = router;
