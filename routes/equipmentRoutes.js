const express = require('express');
const router = express.Router();
const equipmentController = require('../controllers/equipmentController');

// Route to get all equipment
router.get('/', equipmentController.getAllEquipment);

// Route to get detailed information for a specific equipment item
router.get('/:id/details', equipmentController.getEquipmentDetails);

// Route to get equipment by category
router.get('/:category', equipmentController.getEquipmentByCategory);

// Route to create new equipment
router.post('/', equipmentController.createEquipment);

// Route to update existing equipment
router.put('/:id', equipmentController.updateEquipment);

// Route to delete equipment
router.delete('/:id', equipmentController.deleteEquipment);

// Route to download equipment
router.get('/:id/details/pdf', equipmentController.getEquipmentDetailsPDF);

module.exports = router;


