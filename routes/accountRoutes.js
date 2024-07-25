const express = require('express');
const router = express.Router();
const accountController = require('../controllers/accountController');

// Route to get all equipment
router.get('/', accountController.getAllAccount);

// Route to create new equipment
router.post('/', accountController.createAccount);

// Route to update existing equipment
router.put('/:id', accountController.updateAccount);

// Route to delete equipment
router.delete('/:id', accountController.deleteAccount);

module.exports = router;
